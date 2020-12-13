const Subject = require('../../models/Subject');
const { check, validationResult } = require('express-validator');
const auth = require('../../middlewares/auth');

const router = require('express').Router();

// @route   POST /api/subject
// @desc    Add a subject
// @access  Private
router.post(
  '/',
  [auth, [check('subject', 'Subject name is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const hasSubject = await Subject.findOne({
        subject: req.body.subject,
        user: req.user.id,
      });

      if (hasSubject) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Subject already exists' }] });
      }
      const { subject } = req.body;

      const newSubject = new Subject({ subject, user: req.user.id });

      await newSubject.save();

      res.json(newSubject);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/subject
// @desc    Get all subjects
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id }).populate({
      path: 'topics',
      select: 'topic user subTopics',
      populate: {
        path: 'subTopics',
        select: 'subTopic user bookmarks',
        populate: {
          path: 'bookmarks',
          select: 'bookmarkUrl year user',
        },
      },
    });

    res.json(subjects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/subject/:subId
// @desc    Get subject by subject ID
// @access  Private
router.get('/:subId', auth, async (req, res) => {
  try {
    const subject = await Subject.findOne({
      _id: req.params.subId,
      user: req.user.id,
    }).populate({
      path: 'topics',
      select: 'topic user subTopics',
      populate: {
        path: 'subTopics',
        select: 'subTopic user bookmarks',
        populate: {
          path: 'bookmarks',
          select: 'bookmarkUrl user',
        },
      },
    });
    res.json(subject);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Subject not found' }] });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/subject/:subId
// @desc    Update subject name
// @access  Private
router.put(
  '/:subId',
  [auth, [check('subject', 'Subject name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body.subject);

    try {
      const subject = await Subject.findOne({
        _id: req.params.subId,
        user: req.user.id,
      }).populate({
        path: 'topics',
        select: 'topic user subTopics',
        populate: {
          path: 'subTopics',
          select: 'subTopic user bookmarks',
          populate: {
            path: 'bookmarks',
            select: 'bookmarkUrl user',
          },
        },
      });

      subject.subject = req.body.subject;

      await subject.save();

      res.json(subject);
    } catch (error) {
      console.error(error.message);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ errors: [{ msg: 'Subject not found' }] });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/subject/:subId
// @desc    Delete a subject
// @access  Private
router.delete('/:subId', auth, async (req, res) => {
  try {
    await Subject.findOneAndRemove({
      _id: req.params.subId,
      user: req.params.id,
    });
    res.json({ msg: 'Subject removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ errors: [{ msg: 'Subject not found' }] });
    }
  }
});

module.exports = router;
