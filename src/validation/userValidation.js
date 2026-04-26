function validateUser(user) {
  if (!user.name) throw new Error("Nome obrigatório");
  if (!user.email) throw new Error("Email obrigatório");
}

module.exports = { validateUser };
