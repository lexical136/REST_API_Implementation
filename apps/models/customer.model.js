const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    title: String,
    fname: String,
    sname: String,
    mobile: String,
    email: String,
    address1: String,
    address2: String,
    town: String,
    county: String,
    eircode: String
},  {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);