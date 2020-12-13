const { check, validationResult } = require('express-validator');
const Subject = require('../../models/Subject');
const Topic = require('../../models/Topic');
const auth = require('../../middlewares/auth');
const SubTopic = require('../../models/SubTopic');
const Bookmark = require('../../models/Bookmark');
const { populate } = require('../../models/Subject');

const router = require('express').Router();

// @route   POST api/subtopic/:subId/:tpId
// @desc    Add new subtopic
// @access  Private
router.post(
  '/:subId/:tpId',
  [auth, [check('subTopic', 'Subtopic name is required')]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const topic = await Topic.findOne({
        _id: req.params.tpId,
        subject: req.params.subId,
        user: req.user.id,
      });
      if (!topic) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Topic doesn't exist" }] });
      }

      const subject = await Subject.findById(req.params.subId);

      if (!subject) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Subject doesn't exist" }] });
      }

      const newSubtopic = new SubTopic({
        user: req.user.id,
        subject: req.params.subId,
        topic: req.params.tpId,
        ...req.body,
      });

      await newSubtopic.save();

      topic.subTopics.unshift(newSubtopic.id);
      await topic.save();

      res.json(newSubtopic);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/subtopic
// @desc    Get all subtopics
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const subTopics = await SubTopic.find({ user: req.user.id }).populate({
      path: 'bookmarks',
      select: 'subject topic subTopic bookmarkUrl year',
    });

    res.json(subTopics);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/subtopic/:subTpId
// @desc    Get subtopic by ID
// @access  Private
router.get('/:subTpId', auth, async (req, res) => {
  try {
    const subTopic = await SubTopic.findOne({
      _id: req.params.subTpId,
      user: req.user.id,
    }).populate({
      path: 'bookmarks',
      select: 'bookmarkUrl year',
    });

    if (!subTopic) {
      return res.status(404).json({ errors: [{ msg: 'Subtopic not found' }] });
    }

    res.json(subTopic);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Subtopic not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/subtopic/:subId/:tpId
// @desc    Get all subtopics of a topic of a subject
// @access  Private
router.get('/:subId/:tpId', auth, async (req, res) => {
  try {
    const subTopics = await SubTopic.find({
      subject: req.params.subId,
      topic: req.params.tpId,
      user: req.user.id,
    }).populate({
      path: 'bookmarks',
      select: 'bookmarkUrl year',
    });

    res.json(subTopics);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Resource not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/subtopic/:subTpId
// @desc    Update subTopic name
// @access  Private
router.put(
  '/:subTpId',
  [auth, [check('subTopic', 'Subtopic name is required')]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const subTopic = await SubTopic.findOne({
        _id: req.params.subTpId,
        user: req.user.id,
      }).populate('bookmarks', ['subject', 'topic', 'subTopic', 'bookmarkUrl']);

      subTopic.subTopic = req.body.subTopic;
      await subTopic.save();

      res.json(subTopic);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Subtopic not found' }] });
      }
    }
  }
);

// @route   DELETE api/subtopic/:subTpId
// @desc    Delete a subtopic
// @access  Private
router.delete('/:subTpId', auth, async (req, res) => {
  try {
    const subTopic = await SubTopic.findOne({
      _id: req.params.subTpId,
      user: req.user.id,
    });

    subTopic.bookmarks.forEach(
      async bm => await Bookmark.findByIdAndRemove(bm)
    );

    await subTopic.remove();
    res.json({ msg: 'Subtopic deleted along with its bookmarks' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Subtopic not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
