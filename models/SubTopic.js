const mongoose = require('mongoose');
const SubTopicSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects',
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topics',
  },
  subTopic: {
    type: String,
    required: true,
  },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookmarks' }],
});

module.exports = SubTopic = mongoose.model('subtopics', SubTopicSchema);
