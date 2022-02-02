const database = require('../model');

const post = () => {
  database.post();
};

module.exports = {
  post,
};
