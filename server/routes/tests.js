var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Tests = require('../models/tests');
var Verify = require('./verify');
var testsRouter = express.Router();
testsRouter.use(bodyParser.json());

// http://localhost:3000/api/tests
testsRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    // GET all tests
    .get(Verify.verifyAdmin, function(req, res, next) {
        Tests.find({})
            .populate('subject')
            .exec(function(err, tests) {
                if (err) next(err);

                res.json(tests);
            });
    })
    // POST a test
    .post(Verify.verifyTeacher, function(req, res, next) {
        Tests.create(req.body, function(err, test) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('New Test Saved! ' + req.body.title);
        });
    });

testsRouter.route('/:id')
    // GET individual test
    .get(Verify.verifyTeacher, function(req, res, next) {
        Tests.findById(req.params.id)
            .populate('subject')
            .exec(function(err, test) {
                if (err) next(err);
                res.json(test);
            });
    })
    // PUT individual test
    .put(Verify.verifyTeacher, function(req, res, next) {
        Tests.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, test) {
            if (err) next(err);
            res.json(test);
        });
    })
    // DELETE individual test
    .delete(Verify.verifyTeacher, function(req, res, next) {
        Tests.findById(req.params.id, function(err, test) {
            if (err) next(err);

            test.remove({});
            res.json(test);
        });
    });

testsRouter.route('/classroom/:classroom')
    // GET all tests from a specific classroom
    .get(Verify.verifyTeacherOrStudent, function(req, res, next) {
        Tests.find({ classroom: req.params.classroom })
            .populate('subject')
            .exec(function(err, tests) {
                if (err) next(err);

                res.json(tests);
            });
    });

module.exports = testsRouter;