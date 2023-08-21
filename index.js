const express = require('express');
const authorRouter = require('./controllers/author');
const blogRouter = require('./controllers/blog');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/user');
const { PORT } = require('./utils/config');
const { connectToDB } = require('./utils/db');
const errorHandler = require('./utils/error-handler');

const app = express();

// Parse json body into req.body
app.use(express.json());

app.use('/api/authors', authorRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
