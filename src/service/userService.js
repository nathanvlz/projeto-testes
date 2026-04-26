const { validateUser } = require('../validation/userValidation');
const { saveUser } = require('../repository/userRepository');

function createUser(user) {
  validateUser(user);
  return saveUser(user);
}

module.exports = { createUser };
