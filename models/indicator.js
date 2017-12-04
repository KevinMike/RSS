const mongoose = require('mongoose');

let tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    units : {
        type: String,
        required : true
    }
}, {
    collection: 'Indicators'
});
module.exports = mongoose.model('indicator', tagSchema);
