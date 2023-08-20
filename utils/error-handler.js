const errorHandler = (err, req, res, next) => {
  console.log(err);

  // Return specific error when user attempts to
  // create a new user with an invalid username
  if (err.errors[0].validatorKey === 'isEmail') {
    return res
      .status(400)
      .json({ error: 'Username must be a valid email address' });
  }

  return res.status(500).json({ error: 'Something went terribly wrong...' });
};

module.exports = errorHandler;
