import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    id: {type: String},
    rating: {type: Number},
    friends: {type: [String]},
    problems: {type: [String]},
    createdContests: {type: [String]},
    participatedContests: {type: [String]}
})

export default mongoose.model("Profile", profileSchema);