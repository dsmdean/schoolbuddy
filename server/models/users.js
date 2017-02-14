// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

//create a users Schema
var Users = new Schema({
    username: String,
    password: String,
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    school_admin: {
        type: Boolean,
        default: false
    },
    teachers: {
        type: Boolean,
        default: false
    },
    student: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// create model
Users.plugin(passportLocalMongoose);

// export model
module.exports = mongoose.model('Users', Users);