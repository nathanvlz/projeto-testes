# Análise Crítica dos Testes

## Introdução

O presente trabalho foi desenvolvido a partir de um projeto criado anteriormente na disciplina de Programação Web Mobile. O projeto original consistia em uma aplicação simples em HTML com o objetivo de apresentar uma biografia pessoal, incluindo informações básicas organizadas em uma interface web.

Para a realização desta atividade, foi selecionado o módulo de validação de formulário, responsável por verificar os dados inseridos pelo usuário, como nome, e-mail e mensagem. Essa escolha foi feita por se tratar de uma parte do sistema que contém lógica de negócio relevante e que impacta diretamente na qualidade dos dados recebidos.

## Estratégia de Testes

Os testes foram implementados utilizando o framework Jest, com o objetivo de validar o comportamento das funções responsáveis pela verificação dos dados do formulário.

Foram considerados três tipos principais de cenários:

- Cenários válidos, nos quais os dados inseridos atendem aos critérios esperados
- Casos de erro, com entradas inválidas ou incompletas
- Casos de limite (edge cases), como campos vazios, valores mínimos e entradas com espaços em branco

Essa abordagem permitiu avaliar o comportamento do sistema em diferentes situações, garantindo uma análise mais completa da qualidade do código.

## Resultados

Após a execução dos testes, foi possível observar que a cobertura de código atingiu 100% em todos os critérios, incluindo linhas, funções e ramificações. Isso indica que todas as partes do código analisado foram executadas durante os testes.

Apesar da alta cobertura, nem todos os testes passaram com sucesso, o que evidencia que a cobertura de código, por si só, não garante a ausência de erros. Esse resultado reforça a importância de se criar testes bem planejados e significativos, que realmente validem o comportamento esperado do sistema.

## Problemas Encontrados

Durante a execução dos testes, foram identificadas falhas relacionadas à validação de e-mail. A implementação atual utiliza uma verificação simplificada baseada apenas na presença dos caracteres "@" e ".", o que permite que entradas inválidas, como "@." ou "a@b", sejam consideradas válidas.

Esse comportamento representa um risco para a integridade dos dados, pois pode permitir o envio de informações incorretas ou incompletas pelo usuário.

Além disso, foram observadas limitações em relação ao tratamento de entradas com espaços em branco e à ausência de validações mais rigorosas para os campos do formulário.

## Melhorias Sugeridas

Como forma de melhorar a qualidade do sistema, recomenda-se a substituição da validação atual de e-mail por uma expressão regular mais robusta, capaz de verificar corretamente o formato esperado.

Também é importante ampliar a quantidade de testes, incluindo novos cenários extremos, como entradas muito longas, caracteres especiais e diferentes formatos de dados.

Outra melhoria relevante seria a implementação de mensagens de erro mais claras para o usuário, facilitando a correção dos dados inseridos.

## Testes de Integração

Com o objetivo de evoluir a qualidade dos testes do sistema, foram implementados testes de integração, permitindo validar o comportamento do sistema de forma mais abrangente, considerando a interação entre diferentes módulos.

Para isso, foi desenvolvido um fluxo de criação de usuário, envolvendo as camadas de validação, serviço e repositório. Esse fluxo possibilitou verificar não apenas o funcionamento isolado das funções, mas também a comunicação entre os componentes do sistema.

Foram criados testes que contemplam:

Cenário de sucesso, no qual um usuário é criado corretamente com dados válidos
Cenário de erro, no qual o sistema impede a criação de usuário com dados incompletos

Durante a execução desses testes, foi possível garantir que as validações estão sendo aplicadas corretamente antes da persistência dos dados, assegurando a integridade das informações.

Além disso, os testes de integração permitiram identificar e isolar inconsistências existentes em testes anteriores, reforçando a importância de validar o sistema como um todo, e não apenas em partes isoladas.



## Conclusão

A realização desta atividade permitiu compreender, na prática, a importância dos testes de software na garantia da qualidade do código. Mesmo em um projeto simples, foi possível identificar falhas que poderiam passar despercebidas durante o desenvolvimento.

O uso de testes unitários mostrou-se essencial para validar o comportamento das funções e evidenciar pontos de melhoria. Além disso, a análise da cobertura de código contribuiu para uma visão mais ampla sobre o nível de testes aplicado.

Por fim, a atividade reforça que a qualidade de um software não depende apenas de sua funcionalidade, mas também da confiabilidade e consistência de seus resultados.
