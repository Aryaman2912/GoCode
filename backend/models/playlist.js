import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    name: {type: String, required:true},
    description: {type: String, required:true},
    likes: {type: Number, required:true},
    problems: [{type: Schema.Types.ObjectId, ref: 'ProblemSet'}],
    comments: [{type: String}]
}, {collection: 'Playlists'});

const Playlists = mongoose.model("Playlists", playlistSchema);

export default Playlists;