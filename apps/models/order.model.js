const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    fnameO: String,
    snameO: String,
    modelO: String
},  {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);