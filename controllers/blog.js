const express = require('express');
const { Blog } = require('../models');

const router = express.Router();

// Create middleware for finding single blog (DRY)
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({});
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    // If exists, destroy
    await req.blog.destroy();
  }

  // Return 204 if blog has been successfully deleted OR doesn't exist
  res.status(204).end();
});

module.exports = router;
