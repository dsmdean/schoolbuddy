// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Grades Schema
var gradesSchema = new Schema({
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tests'
    },
    grade: {
        type: String
    },
    feedback: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

//create a Teachers Schema
var studentsSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schools',
        required: true
    },
    level: {
        type: String,
        default: 'Kindergarten'
    },
    grades: [gradesSchema],
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    currentClassroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms',
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    suspended: {
        type: Boolean,
        default: false
    },
    graduated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// create model
var Students = mongoose.model('Students', studentsSchema);

// export model
module.exports = Students;