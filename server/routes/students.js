var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var Classrooms = require('../models/classrooms');
var User = require('../models/users');
var Students = require('../models/students');
var studentsRouter = express.Router();
studentsRouter.use(bodyParser.json());

// http://localhost:3000/api/students
studentsRouter.route('/')
    // GET all students
    .get(function(req, res, next) {
        Students.find({}, function(err, students) {
            if (err) next(err);
            res.json(students);
        });
    })
    // POST a student
    .post(function(req, res, next) {
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

studentsRouter.route('/school/:id')
    // GET all students from individual school
    .get(function(req, res, next) {
        Students.find({ school: req.params.id })
            .populate('student')
            .exec(function(err, students) {
                if (err) next(err);
                res.json(students);
            });
    });

studentsRouter.route('/admin/:id')
    // GET individual student by userID
    .get(function(req, res, next) {
        Students.findOne({ student: req.params.id }, function(err, student) {
            if (err) next(err);
            res.json(student);
        });
    });

studentsRouter.route('/:id')
    // GET individual student
    .get(function(req, res, next) {
        Students.findById(req.params.id)
            .populate('student')
            .exec(function(err, student) {
                if (err) next(err);
                res.json(student);
            });
    })
    // PUT individual student
    .put(function(req, res, next) {
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
    .delete(function(req, res, next) {
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
    // suspend individual student
    .put(function(req, res, next) {
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

studentsRouter.route('/school/:id/grade/:grade')
    // GET all students from individual school
    .get(function(req, res, next) {
        Students.find({ school: req.params.id, level: req.params.grade, graduated: false, endDate: undefined })
            .populate('student')
            .exec(function(err, students) {
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