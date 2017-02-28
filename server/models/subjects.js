// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Subjects Schema
var subjectsSchema = new Schema({
    subject: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create model
var Subjects = mongoose.model('Subjects', subjectsSchema);

// export model
module.exports = Subjects;