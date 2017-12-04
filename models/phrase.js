const mongoose = require('mongoose');

let phraseSchema = new mongoose.Schema({
    phrase: {
        type: String,
        required: true
    }
}, {
    collection: 'Phrase'
});
module.exports = mongoose.model('phrase', phraseSchema);
