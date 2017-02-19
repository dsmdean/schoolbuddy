// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a School Year Schema
var schoolYearSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    current: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// create model
var SchoolYear = mongoose.model('SchoolYear', schoolYearSchema);

// export model
module.exports = SchoolYear;