const express = require('express');
const blogRouter = require('./controllers/blog');
const { PORT } = require('./utils/config');
const { connectToDB } = require('./utils/db');
const errorHandler = require('./utils/error-handler');

const app = express();

// Parse json body into req.body
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
