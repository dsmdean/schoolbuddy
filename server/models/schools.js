// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Principal Schema
var principalsSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    startDate: Date,
    endDate: Date,
    current: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//create a Schools Schema
var schoolsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    school_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    location: {
        address: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        province: {
            type: String,
            default: ''
        }
    },
    phone: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: ''
    },
    principals: [principalsSchema],
    suspended: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// create model
var Schools = mongoose.model('Schools', schoolsSchema);

// export model
module.exports = Schools;