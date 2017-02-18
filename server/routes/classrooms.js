var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/users');
var Classrooms = require('../models/classrooms');
var classroomsRouter = express.Router();
classroomsRouter.use(bodyParser.json());

// http://localhost:3000/api/classrooms
classroomsRouter.route('/')
    // POST a classroom
    .post(function(req, res, next) {
        Classrooms.create(req.body, function(err, classroom) {
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Registration Successful! ' + req.body.grade + ' classroom saved.');
        });
    });

classroomsRouter.route('/school/:id')
    // GET all classrooms from individual school
    .get(function(req, res, next) {
        Classrooms.find({ school: req.params.id })
            .populate('teacher')
            .exec(function(err, classrooms) {
                if (err) next(err);

                res.json(classrooms);
            });
    });

classroomsRouter.route('/teacher/:id')
    // GET individual classroom by teacher
    .get(function(req, res, next) {
        Classrooms.findOne({ teacher: req.params.id }, function(err, classroom) {
            if (err) next(err);
            res.json(classroom);
        });
    });

classroomsRouter.route('/:id')
    // GET individual classroom
    .get(function(req, res, next) {
        Classrooms.findById(req.params.id)
            .populate('teacher')
            .populate('students')
            .exec(function(err, classroom) {
                if (err) next(err);
                res.json(classroom);
            });
    })
    // PUT individual classroom
    .put(function(req, res, next) {
        Classrooms.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        }, function(err, classroom) {
            if (err) next(err);
            res.json(classroom);
        });
    })
    // DELETE individual classroom
    .delete(function(req, res, next) {
        Classrooms.findById(req.params.id, function(err, classroom) {
            if (err) next(err);

            classroom.remove({});
        });
    });

module.exports = classroomsRouter;