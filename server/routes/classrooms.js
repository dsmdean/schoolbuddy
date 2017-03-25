var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Students = require('../models/students');
var User = require('../models/users');
var Classrooms = require('../models/classrooms');
var Verify = require('./verify');
var classroomsRouter = express.Router();
classroomsRouter.use(bodyParser.json());

// http://localhost:3000/api/classrooms
classroomsRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    // GET all classrooms
    .get(Verify.verifyAdmin, function(req, res, next) {
        Classrooms.find({}, function(err, classrooms) {
            if (err) next(err);

            res.json(classrooms);
        });
    })
    // POST a classroom
    .post(Verify.verifySchoolAdmin, function(req, res, next) {
        Classrooms.create(req.body, function(err, classroom) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Registration Successful! ' + req.body.grade + ' classroom saved.');
        });
    });

classroomsRouter.route('/school/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET all classrooms from individual school
    .get(Verify.verifySchoolAdmin, function(req, res, next) {
        Classrooms.find({ school: req.params.id })
            .populate('teacher')
            .populate('students')
            .populate('schoolYear')
            .exec(function(err, classrooms) {
                if (err) next(err);

                res.json(classrooms);
            });
    });

classroomsRouter.route('/teacher/:id/:year')
    .all(Verify.verifyOrdinaryUser)
    // GET individual classroom by teacher
    .get(Verify.verifyTeacher, function(req, res, next) {
        Classrooms.findOne({ teacher: req.params.id, schoolYear: req.params.year })
            .populate('schoolYear')
            .populate('students')
            .exec(function(err, classroom) {
                if (err) next(err);
                res.json(classroom);
            });
    });

classroomsRouter.route('/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual classroom
    .get(function(req, res, next) {
        Classrooms.findById(req.params.id)
            .populate('teacher')
            .populate('students')
            .populate('schoolYear')
            .exec(function(err, classroom) {
                if (err) next(err);
                res.json(classroom);
            });
    })
    // PUT individual classroom
    .put(function(req, res, next) {
        Classrooms.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, classroom) {
            if (err) next(err);
            res.json(classroom);
        });
    })
    // DELETE individual classroom
    .delete(Verify.verifySchoolAdmin, function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            classroom.remove({});
            res.json(classroom);
        });
    });

classroomsRouter.route('/:id/students')
    .all(Verify.verifyOrdinaryUser)
    // GET individual classroom's students
    // .get(function(req, res, next) {
    //     Classrooms.findById(req.params.id, function(err, classroom) {
    //         if (err) next(err);
    //         res.json(classroom.students);
    //     });
    // })
    // update individual classroom's students
    .put(Verify.verifySchoolAdmin, function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            // classroom.students.map(function(e) { return e.toString(); }).concat(req.body.toString());

            for (var i = 0; i < req.body.students.length; i++) {
                classroom.students.push(req.body.students[i]);
            }
            classroom.save();

            Students.find({
                '_id': { $in: req.body.students }
            }, function(err, students) {
                for (var i = 0; i < students.length; i++) {
                    students[i].currentClassroom = req.params.id;
                    students[i].save();
                }
            });

            res.json(classroom);
        });
    });

classroomsRouter.route('/:id/students/delete')
    .all(Verify.verifyOrdinaryUser)
    // delete individual classroom's students
    .put(Verify.verifySchoolAdmin, function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            for (var i = 0; i < req.body.students.length; i++) {
                if (classroom.students.indexOf(req.body.students[i]._id) != -1) {
                    classroom.students.splice(classroom.students.indexOf(req.body.students[i]._id), 1);
                }
            }

            classroom.save();

            res.json(classroom);
        });
    });

classroomsRouter.route('/:id/subjects')
    .all(Verify.verifyOrdinaryUser)
    // get subjects from a specific classroom
    .get(Verify.verifyTeacherOrStudent, function(req, res, next) {
        Classrooms.findById(req.params.id)
            .populate('subjects')
            .exec(function(err, classroom) {
                if (err) next(err);

                res.json(classroom.subjects);
            });
    })
    // save subject for a specific classroom
    .post(Verify.verifyTeacher, function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            if (classroom.subjects.indexOf(req.body.subjectID) === -1) {
                classroom.subjects.push(req.body.subjectID);
                classroom.save(function(err, classroom) {
                    if (err) next(err);

                    res.json('Added the subject.');
                });
            } else {
                res.json('You have already added this subject.');
            }
        });
    })
    // update individual classroom's subjects
    .put(Verify.verifyTeacher, function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            for (var i = 0; i < req.body.subjects.length; i++) {
                classroom.subjects.push(req.body.subjects[i]);
            }

            classroom.save();

            res.json(classroom);
        });
    });

classroomsRouter.route('/:id/subjects/delete')
    .all(Verify.verifyOrdinaryUser)
    // delete individual classroom's subjects
    .put(Verify.verifyTeacher, function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            for (var i = 0; i < req.body.subjects.length; i++) {
                if (classroom.subjects.indexOf(req.body.subjects[i]._id) != -1) {
                    classroom.subjects.splice(classroom.subjects.indexOf(req.body.subjects[i]._id), 1);
                }
            }

            classroom.save();

            res.json(classroom);
        });
    });

classroomsRouter.route('/:id/subjects/:subject')
    .all(Verify.verifyOrdinaryUser)
    // delete a specific subject from a specific classroom
    .delete(function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            if (classroom.subjects.indexOf(req.params.subject) !== -1) {
                classroom.subjects.splice(classroom.subjects.indexOf(req.params.subject), 1);

                classroom.save(function(err, classroom) {
                    if (err) next(err);

                    res.json('Deleted the subject.');
                });
            } else {
                res.json('Subject not deleted.');
            }
        });
    });

module.exports = classroomsRouter;