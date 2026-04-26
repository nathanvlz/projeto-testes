const { createUser } = require('../../src/service/userService');

test("deve criar usuário com sucesso", () => {
  const user = { name: "Bruno", email: "teste@email.com" };

  const result = createUser(user);

  expect(result).toEqual(user);
});

test("deve falhar sem nome", () => {
  const user = { email: "teste@email.com" };

  expect(() => createUser(user)).toThrow("Nome obrigatório");
});
