const { Session } = require('../models');

const validateSession = async (req, res, next) => {
  const token = req.get('authorization').substring(7);
  const userId = req.tokenPayload.id;

  const session = await Session.findOne({ where: { userId } });

  if (!session || !(session.token === token)) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  next();
};

module.exports = validateSession;
