const { Sequelize, QueryTypes } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    const blogs = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.SELECT,
    });

    console.log(blogs);
  } catch (err) {
    console.log('Error connecting to database...');
  }
};

main();
