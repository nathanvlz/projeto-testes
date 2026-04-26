const users = [];

function saveUser(user) {
  users.push(user);
  return user;
}

module.exports = { saveUser, users };
