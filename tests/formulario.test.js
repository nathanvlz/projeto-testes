
const {
  emailValido,
  nomeValido,
  mensagemValida
} = require('../js/script');

describe('Validação de Email', () => {
  test('Email válido', () => {
    expect(emailValido('teste@email.com')).toBe(true);
  });

  test('Email sem @', () => {
    expect(emailValido('testeemail.com')).toBe(false);
  });

  test('Email sem ponto', () => {
    expect(emailValido('teste@email')).toBe(false);
  });

  test('Email vazio', () => {
    expect(emailValido('')).toBe(false);
  });

  test('Caso limite "@."', () => {
    expect(emailValido('@.')).toBe(true);
  });
});

describe('Validação de Nome', () => {
  test('Nome válido', () => {
    expect(nomeValido('João')).toBe(true);
  });

  test('Nome curto', () => {
    expect(nomeValido('Jo')).toBe(false);
  });

  test('Nome vazio', () => {
    expect(nomeValido('')).toBe(false);
  });

  test('Nome com espaços', () => {
    expect(nomeValido('   ')).toBe(false);
  });
});

describe('Validação de Mensagem', () => {
  test('Mensagem válida', () => {
    expect(mensagemValida('Mensagem com mais de 15 caracteres')).toBe(true);
  });

  test('Mensagem curta', () => {
    expect(mensagemValida('Curta')).toBe(false);
  });

  test('Mensagem com exatamente 15 caracteres', () => {
    expect(mensagemValida('123456789012345')).toBe(true);
  });

  test('Mensagem vazia', () => {
    expect(mensagemValida('')).toBe(false);
  });
});
