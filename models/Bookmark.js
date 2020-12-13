const mongoose = require('mongoose');
require('mongoose-type-url');

const BookmarkSchema = new mongoose.Schema({
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
    ref: 'subTopics',
  },
  bookmarkUrl: {
    type: mongoose.SchemaTypes.Url,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = Bookmark = mongoose.model('bookmarks', BookmarkSchema);
