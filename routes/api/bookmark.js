const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middlewares/auth');
const Bookmark = require('../../models/Bookmark');
const Subject = require('../../models/Subject');
const SubTopic = require('../../models/SubTopic');
const Topic = require('../../models/Topic');

const router = express.Router();

// @route     POST /api/bookmark/:subId/:tpId/:subTpId
// @desc      Add bookmark
// @access    Private
router.post(
  '/:subId/:tpId/:subTpId',
  [auth, [check('bookmarkUrl', 'Valid URL is required').isURL()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const subject = await Subject.findById(req.params.subId);
      if (!subject) {
        return res.status(400).json({ errors: [{ msg: 'Subject not found' }] });
      }

      const topic = await Topic.findById(req.params.tpId);
      if (!topic) {
        return res.status(400).json({ errors: [{ msg: 'Topic not found' }] });
      }

      const subTopic = await SubTopic.findById(req.params.subTpId);
      if (!subTopic) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Subtopic not found' }] });
      }

      const bookmark = new Bookmark({
        user: req.user.id,
        subject: req.params.subId,
        topic: req.params.tpId,
        subTopic: req.params.subTpId,
        ...req.body,
      });

      await bookmark.save();

      subTopic.bookmarks.unshift(bookmark.id);
      await subTopic.save();

      res.json(bookmark);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET /api/bookmark/
// @desc      Get all bookmarks
// @access    Public
router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().populate({
      path: 'subject',
      select: 'subject',
    });
    res.json(bookmarks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET /api/bookmark/:bmId
// @desc      Get bookmark by ID
// @access    Public
router.get('/:bmId', async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.bmId);
    if (!bookmark) {
      return res.status(404).json({ errors: [{ msg: 'Bookmark not found' }] });
    }

    res.json(bookmark);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT /api/bookmark/:bmId
// @desc      Update bookmark
// @access    Private
router.put(
  '/:bmId',
  [auth, [check('bookmarkUrl', 'Valid URL is required')]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const bookmark = await Bookmark.findById(req.params.bmId);
      if (!bookmark) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Bookmark not found' }] });
      }

      if (bookmark.user.toString() !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
      }

      bookmark.bookmarkUrl = req.body.bookmarkUrl;
      await bookmark.save();
      res.json(bookmark);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE  /api/bookmark/:bmId
// @desc      Remove bookmark
// @access    Private
router.delete('/:bmId', auth, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.bmId);
    if (!bookmark) {
      return res.status(404).json({ errors: [{ msg: 'Bookmark not found' }] });
    }

    if (bookmark.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized' }] });
    }

    await Bookmark.findByIdAndRemove(req.params.bmId);

    res.json({ msg: 'Bookmark removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
