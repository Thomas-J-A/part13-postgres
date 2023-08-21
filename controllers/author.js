const express = require('express');
const { Blog } = require('../models');
const { Sequelize } = require('sequelize');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const authorInfo = await Blog.findAll({
      attributes: [
        'author',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'total_blogs'],
        [Sequelize.fn('SUM', Sequelize.col('likes')), 'total_likes'],
      ],
      group: 'author',
      order: [['total_likes', 'DESC']],
    });

    res.status(200).json(authorInfo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
