// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Teachers Schema
var studentsSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schools',
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
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