// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Teachers Schema
var teachersSchema = new Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schools',
        required: true
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
    }
}, {
    timestamps: true
});

// create model
var Teachers = mongoose.model('Teachers', teachersSchema);

// export model
module.exports = Teachers;