import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    problems: [{type: Schema.Types.ObjectId, ref: 'ProblemSet'}],
    createdContests: [{type: Schema.Types.ObjectId, ref: 'Contests'}],
    givenContests: [{type: Schema.Types.ObjectId, ref: 'Contests'}]
}, {collection: 'Profiles'});

const Profiles = mongoose.model("Profiles", profileSchema);

export default Profiles;