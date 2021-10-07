import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema is already present in Atlas. Fetch using collection option.
const ProblemSchema = new Schema({}, {collection: 'ProblemSet'})

const ProblemSet = mongoose.model('ProblemSet', ProblemSchema);

// module.exports = ProblemSet;
export default ProblemSet;