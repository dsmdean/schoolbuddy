// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Tests Schema
var gradesSchema = new Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tests',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students',
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    schoolYear: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SchoolYear',
        required: true
    }
}, {
    timestamps: true
});

// create model
var Grades = mongoose.model('Grades', gradesSchema);

// export model
module.exports = Grades;