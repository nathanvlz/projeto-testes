function emailValido(email) {
  return email.includes('@') && email.includes('.');
}

function nomeValido(nome) {
  return nome && nome.trim().length >= 3;
}

function mensagemValida(msg) {
  return msg && msg.trim().length >= 15;
}

module.exports = {
  emailValido,
  nomeValido,
  mensagemValida
};
