var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Subjects = require('../models/subjects');
var Verify = require('./verify');
var subjectsRouter = express.Router();
subjectsRouter.use(bodyParser.json());

// http://localhost:3000/api/subjects
subjectsRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    // GET all subjects
    .get(Verify.verifyAdmin, function(req, res, next) {
        Subjects.find({}, function(err, subjects) {
            if (err) next(err);

            res.json(subjects);
        });
    })
    // POST a subject
    .post(Verify.verifyAdmin, function(req, res, next) {
        Subjects.create(req.body, function(err, subject) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('New Subject Saved! ' + req.body.subject);
        });
    });

subjectsRouter.route('/:id')
    .all(Verify.verifyOrdinaryUser)
    // GET individual subject
    // .get(function(req, res, next) {
    //     Subjects.findById(req.params.id, function(err, subject) {
    //         if (err) next(err);
    //         res.json(subject);
    //     });
    // })
    // PUT individual subject
    // .put(function(req, res, next) {
    //     Subjects.findByIdAndUpdate(req.params.id, {
    //         $set: req.body
    //     }, {
    //         new: true
    //     }, function(err, subject) {
    //         if (err) next(err);
    //         res.json(subject);
    //     });
    // })
    // DELETE individual subject
    .delete(Verify.verifyAdmin, function(req, res, next) {
        Subjects.findById(req.params.id, function(err, subject) {
            if (err) next(err);

            subject.remove({});
            res.json(subject);
        });
    });

module.exports = subjectsRouter;