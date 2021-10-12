import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema is already present in Atlas. Fetch using collection option.
const ContestSchema = new Schema({}, {collection: 'Contests'})

const Contests = mongoose.model('Contests', ContestSchema);

export default Contests;
