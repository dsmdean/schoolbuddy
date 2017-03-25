var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var User = require('../models/users');
var Schools = require('../models/schools');
var Verify = require('./verify');
var schoolsRouter = express.Router();
schoolsRouter.use(bodyParser.json());


// http://localhost:3000/api/schools
schoolsRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    // GET all schools
    .get(Verify.verifyAdmin, function(req, res, next) {
        Schools.find({}, function(err, schools) {
            if (err) next(err);
            res.json(schools);
        });
    })
    // POST a school
    .post(Verify.verifyAdmin, function(req, res, next) {
        // create school admin
        User.register(new User({ username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, school_admin: true }),
            req.body.password,
            function(err, user) {
                if (err) {
                    return res.status(500).json({ err: err });
                }

                user.save(function(err, user) {
                    passport.authenticate('local')(req, res, function() {

                        req.body.school_admin = user._id;

                        Schools.create(req.body, function(err, school) {
                            if (err) next(err);

                            res.writeHead(200, {
                                'Content-Type': 'text/plain'
                            });

                            res.end('Registration Successful! School with name ' + req.body.name + ' saved.');
                        });
                    });
                });
            });
    });

schoolsRouter.route('/admin/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual school by userID
    .get(Verify.verifySchoolAdmin, function(req, res, next) {
        Schools.findOne({ school_admin: req.params.id }, function(err, school) {
            if (err) next(err);
            res.json(school);
        });
    });

schoolsRouter.route('/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual school
    .get(function(req, res, next) {
        Schools.findById(req.params.id)
            .populate('school_admin')
            .exec(function(err, school) {
                if (err) next(err);
                res.json(school);
            });
    })
    // PUT individual school
    .put(Verify.verifySchoolAdmin, function(req, res, next) {
        Schools.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, school) {
            if (err) next(err);
            res.json(school);
        });
    })
    // DELETE individual school
    .delete(Verify.verifyAdmin, function(req, res, next) {
        Schools.findById(req.params.id, function(err, school) {
            if (err) next(err);

            school.remove({});

            User.findById(school.school_admin, function(err, user) {
                if (err) next(err);

                user.remove({});
                res.json(school);
            })
        });
    });

schoolsRouter.route('/:id/suspend')
    .all(Verify.verifyOrdinaryUser)
    // suspend individual school
    .put(Verify.verifyAdmin, function(req, res, next) {
        Schools.findById(req.params.id, function(err, school) {
            if (err) next(err);

            school.suspended = !school.suspended;
            school.save();

            User.findById(school.school_admin, function(err, user) {
                if (err) next(err);

                user.suspended = !user.suspended;
                user.save();
                res.json(school);
            })
        });
    });

module.exports = schoolsRouter;