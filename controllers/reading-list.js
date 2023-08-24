const express = require('express');
const { ReadingList } = require('../models');
const extractToken = require('../utils/extract-token');
const validateSession = require('../utils/validate-session');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const readingList = await ReadingList.create({ ...req.body });
    res.status(201).json(readingList);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', extractToken, validateSession, async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id);

    if (!readingList) {
      return res.status(404).end();
    }

    if (readingList.userId !== req.tokenPayload.id) {
      return res
        .status(401)
        .json({ error: 'Only owner of this list may mark as read' });
    }

    readingList.isRead = req.body.isRead;
    await readingList.save();

    res.status(200).json(readingList);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
