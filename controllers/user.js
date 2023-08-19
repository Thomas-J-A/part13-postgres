const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:username', async (req, res, next) => {
  try {
    // Find user record with corresponding username value
    const user = await User.findOne({
      where: { userName: req.params.username },
    });

    if (user) {
      // Update username and return updated record
      user.userName = req.body.userName;
      await user.save();
      res.json(user);
    } else {
      // User not found with that username
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;