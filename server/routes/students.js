var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var Classrooms = require('../models/classrooms');
var User = require('../models/users');
var Students = require('../models/students');
var Verify = require('./verify');
var studentsRouter = express.Router();
studentsRouter.use(bodyParser.json());

// http://localhost:3000/api/students
studentsRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    // GET all students
    .get(Verify.verifyAdmin, function(req, res, next) {
        Students.find({}, function(err, students) {
            if (err) next(err);
            res.json(students);
        });
    })
    // POST a student
    .post(Verify.verifySchoolAdmin, function(req, res, next) {
        // create student
        User.register(new User({ username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, student: true }),
            req.body.password,
            function(err, user) {
                if (err) {
                    return res.status(500).json({ err: err });
                }

                user.save(function(err, user) {
                    passport.authenticate('local')(req, res, function() {

                        req.body.student = user._id;

                        Students.create(req.body, function(err, student) {
                            if (err) next(err);

                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });

                            res.end('Registration Successful! Student with name ' + req.body.firstname + ' ' + req.body.lastname + ' saved.');
                        });
                    });
                });
            });
    });

studentsRouter.route('/grade')
    .all(Verify.verifyOrdinaryUser)
    // POST students grades
    .post(Verify.verifyTeacher, function(req, res, next) {
        var IDs = [];
        for (var studentID in req.body) {
            IDs.push(studentID);
        }

        Students.find({
            '_id': { $in: IDs }
        }, function(err, students) {
            if (err) next(err);

            for (var i = 0; i < students.length; i++) {
                var exists = false;
                for (var j = 0; j < students[i].grades.length; j++) {
                    if (students[i].grades[j].test == req.body[students[i]._id.toString()].test) {
                        exists = true;
                    }
                }

                if (!exists) {
                    students[i].grades.push(req.body[students[i]._id.toString()]);
                    students[i].save();
                }
            }

            // students.save();

            res.json(students);
        });
    });

studentsRouter.route('/pass')
    .all(Verify.verifyOrdinaryUser)
    // PUT students grades
    .put(Verify.verifyTeacher, function(req, res, next) {
        Students.find({
            '_id': { $in: req.body.studentsToPass }
        }, function(err, students) {
            if (err) next(err);

            for (var i = 0; i < students.length; i++) {
                students[i].level = req.body.newGrade;
                students[i].save();
            }

            Classrooms.findById(req.body.classroomID)
                .populate('students')
                .exec(function(err, classroom) {
                    classroom.passed = true;
                    classroom.save();

                    res.json(classroom);
                });
        });
    });

studentsRouter.route('/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual student
    // .get(function(req, res, next) {
    //     Students.findById(req.params.id, function(err, student) {
    //         if (err) next(err);
    //         res.json(student);
    //     });
    // })
    // PUT individual student
    .put(Verify.verifyStudent, function(req, res, next) {
        Students.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, student) {
            if (err) next(err);
            res.json(student);
        });
    })
    // DELETE individual student
    .delete(Verify.verifySchoolAdmin, function(req, res, next) {
        Students.findById(req.params.id, function(err, student) {
            if (err) next(err);

            student.remove({});

            User.findById(student.student, function(err, user) {
                if (err) next(err);

                user.remove({});
                res.json(user);
            })
        });
    });

studentsRouter.route('/:id/suspend')
    .all(Verify.verifyOrdinaryUser)
    // suspend individual student
    .put(Verify.verifySchoolAdmin, function(req, res, next) {
        Students.findById(req.params.id, function(err, student) {
            if (err) next(err);

            student.suspended = !student.suspended;
            student.save();

            User.findById(student.student, function(err, user) {
                if (err) next(err);

                user.suspended = !user.suspended;
                user.save();
                res.json(student);
            })
        });
    });

studentsRouter.route('/school/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET all students from individual school
    .get(Verify.verifySchoolAdmin, function(req, res, next) {
        Students.find({ school: req.params.id }, function(err, students) {
            if (err) next(err);
            res.json(students);
        });
    });

studentsRouter.route('/admin/:id')
    // .all(Verify.verifyOrdinaryUser)
    // GET individual student by userID
    .get(function(req, res, next) {
        Students.findOne({ student: req.params.id }, function(err, student) {
            if (err) next(err);
            res.json(student);
        });
    });

studentsRouter.route('/:id/grades/classroom/:classId')
    .all(Verify.verifyOrdinaryUser)
    // GET individual student's grades from specific classroom
    .get(Verify.verifyTeacherOrStudent, function(req, res, next) {
        Students.findById(req.params.id)
            .populate('grades.test')
            .exec(function(err, student) {
                if (err) next(err);

                var grades = [];
                for (var i = 0; i < student.grades.length; i++) {
                    if (student.grades[i].test.classroom == req.params.classId) {
                        grades.push(student.grades[i]);
                    }
                }

                res.json(grades);
            });
    });

studentsRouter.route('/school/:id/grade/:grade')
    .all(Verify.verifyOrdinaryUser)
    // GET all students from individual school in specific grade not in a specific classroom
    .get(Verify.verifySchoolAdmin, function(req, res, next) {
        Students.find({ school: req.params.id, level: req.params.grade, graduated: false, endDate: undefined }, function(err, students) {
            if (err) next(err);

            Classrooms.find({ school: req.params.id })
                .populate('schoolYear')
                .exec(function(err, classrooms) {
                    if (err) next(err);

                    var availableStudents = [];
                    var takenStudents = [];

                    for (var i = 0; i < classrooms.length; i++) {
                        takenStudents = takenStudents.concat(classrooms[i].students);
                    }

                    for (var j = 0; j < students.length; j++) {
                        if (takenStudents.map(function(e) { return e.toString(); }).indexOf(students[j]._id.toString()) === -1) {
                            availableStudents.push(students[j]);
                        }
                    }

                    res.json(availableStudents);
                });
        });
    });

module.exports = studentsRouter;