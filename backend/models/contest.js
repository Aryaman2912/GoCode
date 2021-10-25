import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema is already present in Atlas. Fetch using collection option.
// const ContestSchema = new Schema({}, {collection: 'Contests'})

// const Contests = mongoose.model('Contests', ContestSchema);

const ContestSchema = new Schema({
    name: {type: String},
    Description: {type: String},
    Host: {type: String},
    Date: {type: Date},
    Duration: {type: String},
    isPublic: {type: Boolean},
    hostId: {type: Schema.Types.ObjectId, ref: 'User'}
}, {collection: 'Contests'});

const Contests = mongoose.model("Contests",ContestSchema);
export default Contests;
