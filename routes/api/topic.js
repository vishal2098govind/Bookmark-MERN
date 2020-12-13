const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Topic = require('../../models/Topic');
const auth = require('../../middlewares/auth');
const Subject = require('../../models/Subject');
const SubTopic = require('../../models/SubTopic');
const Bookmark = require('../../models/Bookmark');

// @route   POST /api/topic/:subId
// @desc    Add new topic to a subject
// @access  Private
router.post(
  '/:subId',
  [auth, [check('topic', 'Topic name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const subject = await Subject.findOne({
        _id: req.params.subId,
        user: req.user.id,
      });

      if (!subject) {
        return res.status(404).json({ errors: [{ msg: 'Subject not found' }] });
      }

      const topic = await Topic.findOne({
        topic: req.body.topic,
        subject: req.params.subId,
        user: req.user.id,
      });
      if (topic) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Topic already exists' }] });
      }

      const newTopic = new Topic({
        ...req.body,
        subject: req.params.subId,
        user: req.user.id,
      });
      await newTopic.save();

      subject.topics.unshift(newTopic.id);
      await subject.save();

      res.json(newTopic);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ errors: [{ msg: 'Subject not found' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/topic
// @desc    Get all topics
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user.id }).populate({
      path: 'subTopics',
      select: 'subTopic bookmarks',
      populate: {
        path: 'bookmarks',
        select: 'bookmarkUrl',
      },
    });
    res.json(topics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/topic/:tpId
// @desc    Get topic by ID
// @access  Private
router.get('/:tpId', auth, async (req, res) => {
  try {
    const topic = await Topic.findOne({
      _id: req.params.tpId,
      user: req.user.id,
    }).populate({
      path: 'subTopics',
      select: 'subTopic bookmarks',
      populate: {
        path: 'bookmarks',
        select: 'bookmarkUrl year',
      },
    });
    res.json(topic);
  } catch (error) {
    console.error(error.message);
    if (error.king === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Topic not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/topic/sub/:subId
// @desc    Get all topics of subject
// @access  Private
router.get('/sub/:subId', auth, async (req, res) => {
  try {
    const topics = await Topic.find({
      subject: req.params.subId,
      user: req.user.id,
    }).populate({
      path: 'subTopics',
      select: 'subTopic bookmarks',
      populate: {
        path: 'bookmarks',
        select: 'bookmarkUrl year',
      },
    });

    res.json(topics);
  } catch (error) {
    console.error(error.message);
    if (error.king === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Subject not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/topic/:tpId
// @desc    Delete topic
// @access  Private
router.delete('/:tpId', auth, async (req, res) => {
  try {
    const topic = await Topic.findOne({
      _id: req.params.tpId,
      user: req.user.id,
    });

    if (!topic) {
      return res.status(404).json({ errors: [{ msg: 'Topic not found' }] });
    }

    const subTopics = topic.subTopics.map(subTp => subTp._id);
    subTopics.forEach(async subTp => {
      const subTopic = await SubTopic.findOne({
        _id: subTp,
        user: req.user.id,
      });

      if (subTopic) {
        const bookmarks = subTopic.bookmarks.map(bm => bm._id);
        bookmarks.forEach(async bm => await Bookmark.findByIdAndRemove(bm));

        await subTopic.remove();
      }
    });

    await topic.remove();

    res.json({ msg: 'Topic Deleted along with its subtopics and bookmarks' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Topic not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/topics/:subId/:tpId
// @desc    Update topic name
// @access  Private
router.put(
  '/:subId/:tpId',
  [auth, [check('topic', 'Topic name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const topic = await Topic.findOne({
        subject: req.params.subId,
        _id: req.params.tpId,
        user: req.user.id,
      }).populate({
        path: 'subTopics',
        select: 'subTopic bookmarks',
        populate: {
          path: 'bookmarks',
          select: 'bookmarkUrl',
        },
      });

      if (!topic) {
        return res.status(404).json({ errors: [{ msg: 'Topic not found' }] });
      }

      topic.topic = req.body.topic;
      topic.save();

      res.json(topic);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Subject or Topic not found' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
