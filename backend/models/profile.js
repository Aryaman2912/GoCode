import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number},
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    problems: [{
        problemID: {type: Schema.Types.ObjectId},
        verdict: {type: String},
        timeStamp: {type: Date, default: Date.now},
        code: {type: String},
        language: {type: String}
    }],
    createdContests: [{type: Schema.Types.ObjectId, ref: 'Contests'}],
    givenContests: [{type: Schema.Types.ObjectId, ref: 'Contests'}]
}, {collection: 'Profiles'});

const Profiles = mongoose.model("Profiles", profileSchema);

export default Profiles;