var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Activities = require('../models/activities');
var activitiesRouter = express.Router();
activitiesRouter.use(bodyParser.json());

// http://localhost:3000/api/activities
activitiesRouter.route('/')
    // GET all activities
    .get(function(req, res, next) {
        Activities.find({})
            .populate('classroom')
            .populate('school')
            .exec(function(err, activities) {
                if (err) next(err);
                res.json(activities);
            });
    })
    // POST a activity
    .post(function(req, res, next) {
        Activities.create(req.body, function(err, activity) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Saved the activity with name ' + req.body.name);
        });
    });

activitiesRouter.route('/:id')
    // GET individual activity
    .get(function(req, res, next) {
        Activities.findById(req.params.id)
            .populate('classroom')
            .populate('school')
            .exec(function(err, activity) {
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