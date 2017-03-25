var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var User = require('../models/users');
var Teachers = require('../models/teachers');
var Verify = require('./verify');
var teachersRouter = express.Router();
teachersRouter.use(bodyParser.json());

// http://localhost:3000/api/teachers
teachersRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    // GET all teachers
    .get(Verify.verifyAdmin, function(req, res, next) {
        Teachers.find({}, function(err, teachers) {
            if (err) next(err);
            res.json(teachers);
        });
    })
    // POST a teacher
    .post(Verify.verifySchoolAdmin, function(req, res, next) {
        // create teacher
        User.register(new User({ username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, teachers: true }),
            req.body.password,
            function(err, user) {
                if (err) {
                    return res.status(500).json({ err: err });
                }

                user.save(function(err, user) {
                    passport.authenticate('local')(req, res, function() {

                        req.body.teacher = user._id;

                        Teachers.create(req.body, function(err, teacher) {
                            if (err) next(err);

                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });

                            res.end('Registration Successful! Teacher with name ' + req.body.firstname + ' ' + req.body.lastname + ' saved.');
                        });
                    });
                });
            });
    });

teachersRouter.route('/school/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET all teachers from individual school
    .get(Verify.verifySchoolAdmin, function(req, res, next) {
        Teachers.find({ school: req.params.id })
            .populate('teacher')
            .exec(function(err, teachers) {
                if (err) next(err);
                res.json(teachers);
            });
    });

teachersRouter.route('/admin/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual teacher by userID
    .get(Verify.verifyTeacher, function(req, res, next) {
        Teachers.findOne({ teacher: req.params.id }, function(err, teacher) {
            if (err) next(err);
            res.json(teacher);
        });
    });

teachersRouter.route('/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual teacher
    // .get(function(req, res, next) {
    //     Teachers.findById(req.params.id)
    //         .populate('teacher')
    //         .exec(function(err, teacher) {
    //             if (err) next(err);
    //             res.json(teacher);
    //         });
    // })
    // PUT individual teacher
    .put(Verify.verifySchoolAdminorTeacher, function(req, res, next) {
        Teachers.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, teacher) {
            if (err) next(err);
            res.json(teacher);
        });
    })
    // DELETE individual teacher
    .delete(Verify.verifySchoolAdmin, function(req, res, next) {
        Teachers.findById(req.params.id, function(err, teacher) {
            if (err) next(err);

            teacher.remove({});

            User.findById(teacher.teacher, function(err, user) {
                if (err) next(err);

                user.remove({});
                res.json(user);
            })
        });
    });

teachersRouter.route('/:id/suspend')
    .all(Verify.verifyOrdinaryUser)
    // suspend individual teacher
    .put(Verify.verifySchoolAdmin, function(req, res, next) {
        Teachers.findById(req.params.id, function(err, teacher) {
            if (err) next(err);

            teacher.suspended = !teacher.suspended;
            teacher.save();

            User.findById(teacher.teacher, function(err, user) {
                if (err) next(err);

                user.suspended = !user.suspended;
                user.save();
                res.json(teacher);
            })
        });
    });

module.exports = teachersRouter;