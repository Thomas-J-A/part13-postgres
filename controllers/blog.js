const express = require('express');
const { Blog } = require('../models');

const router = express.Router();

// Create middleware for finding single blog (DRY)
const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (err) {
    next(err);
  }
};

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      await req.blog.destroy();
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }

  // Return 204 also if blog doesn't exist
  else {
    res.status(204).end();
  }
});

module.exports = router;
