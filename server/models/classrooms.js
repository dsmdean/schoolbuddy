// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Classrooms Schema
var classroomsSchema = new Schema({
    grade: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schools',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teachers',
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    }],
    schoolYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SchoolYear',
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subjects'
    }]
}, {
    timestamps: true
});

// create model
var Classrooms = mongoose.model('Classrooms', classroomsSchema);

// export model
module.exports = Classrooms;