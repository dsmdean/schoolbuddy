var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var SchoolYear = require('../models/schoolYear');
var schoolYearRouter = express.Router();
schoolYearRouter.use(bodyParser.json());

// http://localhost:3000/api/schoolyear
schoolYearRouter.route('/')
    // GET all school years
    .get(function(req, res, next) {
        SchoolYear.find({}, function(err, schoolYears) {
            if (err) next(err);

            res.json(schoolYears);
        });
    })
    // POST a school year
    .post(function(req, res, next) {
        SchoolYear.create(req.body, function(err, schoolYear) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('New School Year Started! ' + req.body.year);
        });
    });

schoolYearRouter.route('/current')
    // GET current school year
    .get(function(req, res, next) {
        SchoolYear.findOne({ current: true }, function(err, schoolYear) {
            if (err) next(err);

            res.json(schoolYear);
        });
    });

schoolYearRouter.route('/:id')
    // GET individual school year
    .get(function(req, res, next) {
        SchoolYear.findById(req.params.id, function(err, schoolYear) {
            if (err) next(err);
            res.json(schoolYear);
        });
    })
    // PUT individual school year
    .put(function(req, res, next) {
        SchoolYear.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, schoolYear) {
            if (err) next(err);
            res.json(schoolYear);
        });
    })
    // DELETE individual school year
    .delete(function(req, res, next) {
        SchoolYear.findById(req.params.id, function(err, schoolYear) {
            if (err) next(err);

            schoolYear.remove({});
            res.json(schoolYear);
        });
    });

module.exports = schoolYearRouter;