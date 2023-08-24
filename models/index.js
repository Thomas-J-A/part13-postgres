const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading-list');
const Session = require('./session');

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

// User.hasMany(Session, { foreignKey: 'userId' });
// Session.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingList });

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
