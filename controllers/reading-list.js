const express = require('express');
const { ReadingList } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const readingList = await ReadingList.create({ ...req.body });
    res.status(201).json(readingList);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
