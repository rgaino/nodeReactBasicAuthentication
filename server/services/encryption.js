var bcrypt = require("bcrypt");

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = {
  generateHash
};
