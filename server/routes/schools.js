var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Schools = require('../models/schools');
var schoolsRouter = express.Router();
schoolsRouter.use(bodyParser.json());


// http://localhost:3000/api/schools
schoolsRouter.route('/')
    // GET all schools
    .get(function(req, res, next) {
        Schools.find({}, function(err, schools) {
            if (err) next(err);
            res.json(schools);
        });
    })
    // POST a school
    .post(function(req, res, next) {
        Schools.create(req.body, function(err, school) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Saved the school with name ' + req.body.name);
        });
    });

schoolsRouter.route('/:id')
    // GET individual school
    .get(function(req, res, next) {
        Schools.findById(req.params.id, function(err, school) {
            if (err) next(err);
            res.json(school);
        });
    })
    // PUT individual school
    .put(function(req, res, next) {
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
    .delete(function(req, res, next) {
        Schools.findById(req.params.id, function(err, school) {
            if (err) next(err);

            school.remove({});
            res.json(school);
        });
    });

module.exports = schoolsRouter;