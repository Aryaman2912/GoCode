import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const problemSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, 
    statement: { type: String, required: true },
    tags: {type: Array},
    input:{type:Array},
    output:{type:Array},
    testInput: {type:Array},
    testOutput: {type: Array},
    hidden: {type: Boolean},
    score: {type: Number}
})

export default mongoose.model("GoCodeProblems", problemSchema);
