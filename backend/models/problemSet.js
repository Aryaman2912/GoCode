const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
    name: {
        type: String
    },
    tags: {
        type: Array
    },
    statement: {
        type: String
    },
    input: {
        type: Array
    },
    input: {
        type: Array
    },
    rating: {
        type: Number
    },
    platform: {
        type: String
    },

}, {collection: 'ProblemSet'})

const ProblemSet = mongoose.model('ProblemSet', ProblemSchema);

module.exports = ProblemSet;