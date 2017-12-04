const mongoose = require('mongoose');

let priceCooperSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    money:{
      type: String,
      default: 'USD'
    }
}, {
    collection: 'CooperPrice',
    timestamps : true
});
module.exports = mongoose.model('cooperPrice', priceCooperSchema);