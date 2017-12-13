const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const indicators = require('./indicator');
const phrase = require('./phrase');
const comunicate = require('./comunicate');

let feederSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    indicators :[{ "type": Schema.Types.ObjectId, "ref": "indicator" }],
    phrases: [{ "type": Schema.Types.ObjectId, "ref": "phrase" }],
    comunicates: [{ "type": Schema.Types.ObjectId, "ref": "comunicate" }],
    cnvs: {
        type: Boolean,
        default: false
    },
    cooperPrice: {
        type: Boolean,
        default: false
    },

}, {
    collection: 'Feeder'
});
let autoPopulateFields = function(next) {
    this.populate('indicators');
    this.populate('phrases');
    this.populate('comunicates');
    next();
};

feederSchema.pre('findOne', autoPopulateFields);

module.exports = mongoose.model('feeder', feederSchema);
