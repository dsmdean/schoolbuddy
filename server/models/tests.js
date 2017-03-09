// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Tests Schema
var testsSchema = new Schema({
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subjects',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create model
var Tests = mongoose.model('Tests', testsSchema);

// export model
module.exports = Tests;