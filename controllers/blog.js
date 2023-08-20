const express = require('express');
const { User, Blog } = require('../models');
const extractToken = require('../utils/extract-token');

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

router.post('/', extractToken, async (req, res, next) => {
  try {
    // Find logged-in user
    const user = await User.findByPk(req.tokenPayload.id);

    // Create a new blog, associated with logged-in user
    const blog = await Blog.create({
      ...req.body,
      author: user.name,
      userId: user.id,
    });

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
