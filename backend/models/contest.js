import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const ContestSchema = new Schema({
    name: {type: String},
    Description: {type: String},
    Host: {type: String},
    Date: {type: Date},
    Duration: {type: String},
    isPublic: {type: Boolean},
    hostId: {type: Schema.Types.ObjectId, ref: 'User'},
    problems: {type: [Schema.Types.ObjectId], ref: 'GoCodeProblems'},
    leaderboard: {type: [Schema.Types.ObjectId], ref: 'User'},
}, {collection: 'Contests'});

const Contests = mongoose.model("Contests",ContestSchema);
export default Contests;
