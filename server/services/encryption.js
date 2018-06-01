var bcrypt = require("bcrypt");

const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePasswordWithHash = async function(password, hashedPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hashedPassword, (err, passwordMatches) => {
      if (err) {
        reject(err);
      } else {
        resolve(passwordMatches);
      }
    });
  });
};

module.exports = {
  generateHash,
  comparePasswordWithHash
};
