// grab the things we need
var User = require('../models/users');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

// get token
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {
        expiresInMinutes: 1440
    });
};

// verify ordinary user
exports.verifyOrdinaryUser = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

// verify admin
exports.verifyAdmin = function(req, res, next) {
    if (req.decoded.admin) {
        next();
    } else {
        // error
        var err = new Error('You are authenticated but not a admin!');
        err.status = 403;
        return next(err);
    }
};

// verify school admin
exports.verifySchoolAdmin = function(req, res, next) {
    if (req.decoded.school_admin) {
        next();
    } else {
        // error
        var err = new Error('You are authenticated but not a school admin!');
        err.status = 403;
        return next(err);
    }
};

// verify teacher
exports.verifyTeacher = function(req, res, next) {
    if (req.decoded.teachers) {
        next();
    } else {
        // error
        var err = new Error('You are authenticated but not a teacher!');
        err.status = 403;
        return next(err);
    }
};

// verify student
exports.verifyStudent = function(req, res, next) {
    if (req.decoded.student) {
        next();
    } else {
        // error
        var err = new Error('You are authenticated but not a student!');
        err.status = 403;
        return next(err);
    }
};

// verify admin or school admin
exports.verifyAdminOrSchoolAdmin = function(req, res, next) {
    if (req.decoded.admin || req.decoded.school_admin) {
        next();
    } else {
        // error
        var err = new Error('You are authenticated but not a student!');
        err.status = 403;
        return next(err);
    }
};

// verify admin or school admin
exports.verifySchoolAdminorTeacher = function(req, res, next) {
    if (req.decoded.school_admin || req.decoded.teachers) {
        next();
    } else {
        // error
        var err = new Error('You are authenticated but not a student!');
        err.status = 403;
        return next(err);
    }
};

// verify teacher or student
exports.verifyTeacherOrStudent = function(req, res, next) {
    if (req.decoded.teachers || req.decoded.student) {
        next();
    } else {
        // error
        var err = new Error('You are authenticated but not a student!');
        err.status = 403;
        return next(err);
    }
};