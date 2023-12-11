const mongoose = require('mongoose');

const PhoneSchema = mongoose.Schema({
    model: String,
    manufacturer: String,
    price: String
},  {
    timestamps: true
});

module.exports = mongoose.model('Phone', PhoneSchema);