// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schools Schema
var schoolsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    principal: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create model
var Schools = mongoose.model('Schools', schoolsSchema);

// export model
module.exports = Schools;