# Relatório de Refatoração — Etapa 5
**Disciplina:** Programação Web Mobile  
**Projeto:** Validações de Formulário (`projeto-testes-main`)  
**Aluno:** Kelvson, alex e nathan
**Data:** 28/05/2026

---

## 1. Problemas Identificados na Etapa 4

A análise crítica anterior (Etapa 4) apontou os seguintes problemas no código:

### 1.1 Módulo mal estruturado (`script.js`)
O arquivo `script.js` concentrava tanto a lógica de validação quanto a re-exportação do módulo, gerando **baixa coesão** — um arquivo com múltiplas responsabilidades. Além disso, o nome do arquivo (`script.js`) não descrevia seu conteúdo, dificultando a leitura e manutenção.

### 1.2 Função `estaPreenchido` ausente
Os testes da Etapa 4 já importavam `estaPreenchido`, mas essa função **não existia** no código de produção. Isso causava falha imediata do suite de testes (`Cannot find module`), evidenciando que o código não estava em sincronia com os testes.

### 1.3 Validação de e-mail frágil (falso positivo)
A implementação original:
```js
function emailValido(email) {
  return email.includes('@') && email.includes('.');
}
```
Aceitava entradas claramente inválidas, como `@.`, `a@b.`, ou `@@..`, pois verificava apenas a **presença** dos caracteres, não sua **posição ou estrutura**. Isso representa um _code smell_ do tipo **lógica incompleta / validação insuficiente**.

### 1.4 Duplicação de lógica de guarda (`!!valor`)
As funções `nomeValido` e `mensagemValida` repetiam individualmente a verificação de nulidade e string vazia com `!!valor && valor.trim().length >= N`. Essa duplicação viola o princípio **DRY** (Don't Repeat Yourself).

### 1.5 Ausência de documentação (JSDoc)
Nenhuma função possuía documentação de parâmetros ou retorno, dificultando a compreensão e manutenção futuras.

---

## 2. Refatorações Realizadas

### 2.1 Separação de responsabilidades — criação de `validacoes.js`

**Problema:** `script.js` acumulava lógica de validação e configuração de módulo.  
**Solução:** A lógica de validação foi extraída para um arquivo dedicado `js/validacoes.js`, com nome descritivo e responsabilidade única. O `script.js` foi simplificado para apenas importar e re-exportar esse módulo.

**Antes (`script.js`):**
```js
function emailValido(email) { ... }
function nomeValido(nome) { ... }
function mensagemValida(msg) { ... }
module.exports = { emailValido, nomeValido, mensagemValida };

const validacoes = require('./validacoes');
module.exports = validacoes;
```

**Depois (`js/validacoes.js` + `js/script.js` separados):**
```js
// validacoes.js — responsabilidade única: lógica de validação
function estaPreenchido(valor) { ... }
function emailValido(email) { ... }
...
module.exports = { estaPreenchido, emailValido, nomeValido, mensagemValida };
```

### 2.2 Extração da função utilitária `estaPreenchido`

**Problema:** Verificação de nulidade duplicada em `nomeValido` e `mensagemValida`.  
**Solução:** Criação de uma função utilitária `estaPreenchido(valor)` que centraliza a verificação de nulidade, `undefined` e string em branco. As demais funções passaram a reutilizá-la.

```js
function estaPreenchido(valor) {
  if (valor === null || valor === undefined) return false;
  return String(valor).trim().length > 0;
}
```

### 2.3 Validação de e-mail com expressão regular

**Problema:** `email.includes('@') && email.includes('.')` gerava falsos positivos.  
**Solução:** Substituição por regex que exige a estrutura correta: `usuário@domínio.extensão`, sem espaços, com partes não vazias antes e depois do `@` e do `.`.

```js
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### 2.4 Adição de documentação JSDoc

Todas as funções receberam comentários JSDoc descrevendo parâmetros e retorno, melhorando a legibilidade e facilitando futuras manutenções.

---

## 3. Justificativas Técnicas

| Refatoração | Princípio aplicado |
|---|---|
| Separar `validacoes.js` de `script.js` | Princípio da Responsabilidade Única (SRP) |
| Criar `estaPreenchido` | DRY — eliminar duplicação de lógica de guarda |
| Regex no e-mail | Robustez — eliminar falso positivo identificado nos testes |
| JSDoc | Legibilidade e manutenibilidade |

---

## 4. Impacto das Melhorias

### Testes — antes da refatoração
```
FAIL tests/formulario.test.js
  ● Test suite failed to run
    Cannot find module '../js/validacoes'
Tests: 0 total
```

### Testes — após a refatoração
```
PASS tests/formulario.test.js
  estaPreenchido   ✓ 5 testes
  emailValido      ✓ 9 testes
  nomeValido       ✓ 6 testes
  mensagemValida   ✓ 5 testes

Tests: 25 passed, 25 total

---------------|---------|----------|---------|---------|
File           | % Stmts | % Branch | % Funcs | % Lines |
---------------|---------|----------|---------|---------|
validacoes.js  |   100   |   100    |   100   |   100   |
---------------|---------|----------|---------|---------|
```

As refatorações permitiram que **todos os 25 testes passassem**, com **100% de cobertura** em statements, branches, funções e linhas — incluindo o caso de falso positivo do e-mail `@.` que antes era aceito incorretamente.

A estrutura do código ficou mais clara, com cada arquivo tendo um propósito definido, e a lógica de validação de e-mail passou a rejeitar corretamente todos os formatos inválidos.