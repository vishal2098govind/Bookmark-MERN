const mongoose = require('mongoose');
const TopicSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects',
    required: true,
  },
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  subTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtopics' }],
});

module.exports = Topic = mongoose.model('topics', TopicSchema);
