const {
  emailValido,
  nomeValido,
  mensagemValida,
  estaPreenchido,
} = require('../js/validacoes');

// ─── Utilitário: estaPreenchido ──────────────────────────────────────────────

describe('estaPreenchido', () => {
  test('retorna false para string vazia', () => {
    expect(estaPreenchido('')).toBe(false);
  });

  test('retorna false para string só com espaços', () => {
    expect(estaPreenchido('   ')).toBe(false);
  });

  test('retorna false para null', () => {
    expect(estaPreenchido(null)).toBe(false);
  });

  test('retorna false para undefined', () => {
    expect(estaPreenchido(undefined)).toBe(false);
  });

  test('retorna true para string com conteúdo', () => {
    expect(estaPreenchido('texto')).toBe(true);
  });
});

// ─── Validação de Email ──────────────────────────────────────────────────────

describe('emailValido', () => {
  test('aceita e-mail com formato correto', () => {
    expect(emailValido('usuario@dominio.com')).toBe(true);
  });

  test('aceita e-mail com subdomínio', () => {
    expect(emailValido('usuario@mail.dominio.com.br')).toBe(true);
  });

  test('rejeita e-mail sem @', () => {
    expect(emailValido('usuariodominio.com')).toBe(false);
  });

  test('rejeita e-mail sem domínio após @', () => {
    expect(emailValido('usuario@')).toBe(false);
  });

  test('rejeita e-mail sem ponto no domínio', () => {
    expect(emailValido('usuario@dominio')).toBe(false);
  });

  test('rejeita e-mail vazio', () => {
    expect(emailValido('')).toBe(false);
  });

  test('rejeita caso inválido "@." (falso positivo antigo)', () => {
    expect(emailValido('@.')).toBe(false);
  });

  test('rejeita e-mail com espaços', () => {
    expect(emailValido('usuario @dominio.com')).toBe(false);
  });

  test('rejeita e-mail somente com @', () => {
    expect(emailValido('@')).toBe(false);
  });
});

// ─── Validação de Nome ───────────────────────────────────────────────────────

describe('nomeValido', () => {
  test('aceita nome com 3 ou mais caracteres', () => {
    expect(nomeValido('Ana')).toBe(true);
  });

  test('aceita nome longo com acentos', () => {
    expect(nomeValido('José da Silva')).toBe(true);
  });

  test('rejeita nome com menos de 3 caracteres', () => {
    expect(nomeValido('Jo')).toBe(false);
  });

  test('rejeita nome vazio', () => {
    expect(nomeValido('')).toBe(false);
  });

  test('rejeita nome composto apenas por espaços', () => {
    expect(nomeValido('   ')).toBe(false);
  });

  test('rejeita nome com espaços que resulta em menos de 3 chars', () => {
    expect(nomeValido('  Jo  ')).toBe(false);
  });
});

// ─── Validação de Mensagem ───────────────────────────────────────────────────

describe('mensagemValida', () => {
  test('aceita mensagem com mais de 15 caracteres', () => {
    expect(mensagemValida('Esta é uma mensagem longa o suficiente')).toBe(true);
  });

  test('aceita mensagem com exatamente 15 caracteres (limite)', () => {
    expect(mensagemValida('123456789012345')).toBe(true);
  });

  test('rejeita mensagem com menos de 15 caracteres', () => {
    expect(mensagemValida('Curta demais')).toBe(false);
  });

  test('rejeita mensagem vazia', () => {
    expect(mensagemValida('')).toBe(false);
  });

  test('rejeita mensagem com apenas espaços', () => {
    expect(mensagemValida('   ')).toBe(false);
  });
});
