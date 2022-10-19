const mongoose = require('mongoose');

var details = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    dateLastEdited: {
        type: Date
    }
})
var details = mongoose.model('details', details);

module.exports = details;