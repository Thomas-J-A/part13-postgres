const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');

// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: DataTypes.TEXT,
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    // modelName: 'blog',
  },
);

// Parse json body into req.body
app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll({});
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    // Verify that id is valid
    const blog = await Blog.findByPk(req.params.id);

    if (blog) {
      // If exists, destroy
      await blog.destroy();
      res.status(200).end();
    } else {
      // If not exists, send appropriate error code
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
