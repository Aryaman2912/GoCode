import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema is already present in Atlas. Fetch using collection option.
// const ContestSchema = new Schema({}, {collection: 'Contests'})

// const Contests = mongoose.model('Contests', ContestSchema);

const ContestProblemsSchema = new Schema({
    contestId: {type: Schema.Types.ObjectId, ref: 'Contest'},
    problemId: {type: Schema.Types.ObjectId, ref: 'GoCodeProblems'}
}, {collection: 'ContestProblems'});

const ContestProblems = mongoose.model("ContestProblems",ContestProblemsSchema);
export default ContestProblems;
