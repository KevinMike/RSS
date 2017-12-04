const mongoose = require('mongoose');

let comunicateSchema = new mongoose.Schema({
    comunicate: {
        type: String,
        required: true
    },
}, {
    collection: 'Comunicate'
});
module.exports = mongoose.model('comunicate', comunicateSchema);
