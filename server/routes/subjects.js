var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Subjects = require('../models/subjects');
var subjectsRouter = express.Router();
subjectsRouter.use(bodyParser.json());

// http://localhost:3000/api/subjects
subjectsRouter.route('/')
    // GET all subjects
    .get(function(req, res, next) {
        Subjects.find({}, function(err, subjects) {
            if (err) next(err);

            res.json(subjects);
        });
    })
    // POST a subject
    .post(function(req, res, next) {
        Subjects.create(req.body, function(err, subject) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('New Subject Saved! ' + req.body.subject);
        });
    });

subjectsRouter.route('/:id')
    // GET individual subject
    .get(function(req, res, next) {
        Subjects.findById(req.params.id, function(err, subject) {
            if (err) next(err);
            res.json(subject);
        });
    })
    // PUT individual subject
    .put(function(req, res, next) {
        Subjects.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, subject) {
            if (err) next(err);
            res.json(subject);
        });
    })
    // DELETE individual subject
    .delete(function(req, res, next) {
        Subjects.findById(req.params.id, function(err, subject) {
            if (err) next(err);

            subject.remove({});
        });
    });

module.exports = subjectsRouter;