const express = require('express');
const { Op } = require('sequelize');
const { User, Blog } = require('../models');
const extractToken = require('../utils/extract-token');
const validateSession = require('../utils/validate-session');

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
  const where = {};

  // if (req.query.search) {
  //   where.title = {
  //     [Op.iLike]: `%${req.query.search}%`,
  //   };
  // }

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  try {
    const blogs = await Blog.findAll({
      attributes: {
        exclude: ['userId'],
      },
      include: {
        model: User,
        attributes: ['name'],
      },
      where,
      order: [['likes', 'DESC']],
    });

    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.post('/', extractToken, validateSession, async (req, res, next) => {
  try {
    // Find logged-in user
    const user = await User.findByPk(req.tokenPayload.id);

    // Create a new blog, associated with logged-in user
    const blog = await Blog.create({
      ...req.body,
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

router.delete(
  '/:id',
  extractToken,
  validateSession,
  blogFinder,
  async (req, res, next) => {
    if (req.blog) {
      try {
        // Only blog author may delete their blog
        if (req.blog.userId !== req.tokenPayload.id) {
          return res
            .status(401)
            .json({ error: 'Only blog author may delete this blog' });
        }

        // Delete blog
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
  },
);

module.exports = router;
