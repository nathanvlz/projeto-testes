function estaPreenchido(valor) {
  if (valor === null || valor === undefined) return false;
  return String(valor).trim().length > 0;
}
 
function emailValido(email) {
  if (!estaPreenchido(email)) return false;
  if (email.includes(' ')) return false;
  const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return REGEX_EMAIL.test(email);
}
 
function nomeValido(nome) {
  if (!estaPreenchido(nome)) return false;
  return nome.trim().length >= 3;
}
 
function mensagemValida(msg) {
  if (!estaPreenchido(msg)) return false;
  return msg.trim().length >= 15;
}
 
module.exports = {
  estaPreenchido,
  emailValido,
  nomeValido,
  mensagemValida,
};

const validacoes = require('./validacoes');
 
module.exports = validacoes;
 
