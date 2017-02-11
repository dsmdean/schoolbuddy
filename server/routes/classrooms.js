var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Classrooms = require('../models/classrooms');
var classroomsRouter = express.Router();
classroomsRouter.use(bodyParser.json());

// http://localhost:3000/api/classrooms
classroomsRouter.route('/')
    // GET all classrooms
    .get(function(req, res, next) {
        Classrooms.find({})
            .populate('school')
            .exec(function(err, classrooms) {
                if (err) next(err);
                res.json(classrooms);
            });
    })
    // POST a classroom
    .post(function(req, res, next) {
        Classrooms.create(req.body, function(err, classroom) {
            if (err) console.log(err);
            if (err) next(err);

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Saved the classroom with name ' + req.body.name);
        });
    });

classroomsRouter.route('/:id')
    // GET individual classroom
    .get(function(req, res, next) {
        Classrooms.findById(req.params.id)
            .populate('school')
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
            res.json(classroom);
        });
    });

module.exports = classroomsRouter;