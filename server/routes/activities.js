var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Classrooms = require('../models/classrooms');
var Activities = require('../models/activities');
var Verify = require('./verify');
var activitiesRouter = express.Router();
activitiesRouter.use(bodyParser.json());

// http://localhost:3000/api/activities
activitiesRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    // GET all activites
    .get(Verify.verifyAdmin, function(req, res, next) {
        Activities.find({}, function(err, activities) {
            if (err) next(err);

            res.json(activities);
        });
    })
    // POST a activity
    .post(Verify.verifyTeacher, function(req, res, next) {
        Activities.create(req.body, function(err, activity) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('New Activity Saved! ' + req.body.name);
        });
    });

activitiesRouter.route('/classroom/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET activities from individual classroom
    .get(Verify.verifyTeacherOrStudent, function(req, res, next) {
        Activities.find({ classroom: req.params.id })
            .populate('classroom')
            .exec(function(err, activities) {
                if (err) next(err);
                res.json(activities);
            });
    });

activitiesRouter.route('/school/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET activities from individual school
    .get(Verify.verifySchoolAdmin, function(req, res, next) {
        Activities.find({ school: req.params.id })
            .populate('classroom')
            .exec(function(err, activities) {
                if (err) next(err);
                res.json(activities);
            });
    });

activitiesRouter.route('/teacher/:id/:year')
    .all(Verify.verifyOrdinaryUser)
    // GET activities from individual classroom connected to individual teacher
    .get(Verify.verifyTeacher, function(req, res, next) {
        Classrooms.findOne({ teacher: req.params.id, schoolYear: req.params.year }, function(err, classroom) {
            if (err) next(err);

            res.json(classroom);

            // Activities.find({ classroom: classroom._id })
            //     .populate('classroom')
            //     .exec(function(err, activities) {
            //         if (err) next(err);
            //         res.json({ classroom: classroom, activities: activities });
            //     });
        });
    });

activitiesRouter.route('/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual activity
    // .get(function(req, res, next) {
    //     Activities.findById(req.params.id, function(err, activity) {
    //         if (err) next(err);
    //         res.json(activity);
    //     });
    // })
    // PUT individual activity
    .put(Verify.verifySchoolAdmin, function(req, res, next) {
        Activities.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, activity) {
            if (err) next(err);
            res.json(activity);
        });
    })
    // DELETE individual activity
    .delete(function(req, res, next) {
        Activities.findById(req.params.id, function(err, activity) {
            if (err) next(err);

            activity.remove({});
            res.json(activity);
        });
    });

module.exports = activitiesRouter;