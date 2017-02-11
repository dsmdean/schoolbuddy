// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Classrooms Schema
var classroomsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schools',
        required: true
    }
}, {
    timestamps: true
});

// create model
var Classrooms = mongoose.model('Classrooms', classroomsSchema);

// export model
module.exports = Classrooms;