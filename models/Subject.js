const mongoose = require('mongoose');

const SubjectShema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  subject: { type: String, required: true, unique: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'topics' }],
});

module.exports = Subject = mongoose.model('subjects', SubjectShema);
