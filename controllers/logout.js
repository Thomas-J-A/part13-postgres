const express = require('express');
const { User, Session } = require('../models');
const extractToken = require('../utils/extract-token');

const router = express.Router();

router.delete('/', extractToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.tokenPayload.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Session.destroy({ where: { userId: user.id } });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
