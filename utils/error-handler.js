const errorHandler = (err, req, res, next) => {
  console.log(err);

  return res.status(500).json({ error: 'Something went terribly wrong...' });
};

module.exports = errorHandler;
