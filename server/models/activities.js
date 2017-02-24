// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Activities Schema
var activitiesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schools',
        required: true
    },
    hold: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// create model
var Activities = mongoose.model('Activities', activitiesSchema);

// export model
module.exports = Activities;