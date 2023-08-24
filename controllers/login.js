const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Session } = require('../models');
const { TOKEN_SECRET } = require('../utils/config');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    // Try to find user in db
    const user = await User.findOne({ where: { userName: body.userName } });

    // Verify that password is correct (all users have same password)
    const isValidPassword = body.password === 'secret';

    if (!(user && isValidPassword)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const payload = {
      id: user.id,
      name: user.name,
      userName: user.userName,
    };

    const token = jwt.sign(payload, TOKEN_SECRET);

    // Start a session for authed user
    await Session.create({ userId: user.id, token });

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
