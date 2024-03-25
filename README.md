# Projeto Futebol Clube

Este projeto é um sistema de gerenciamento de futebol abrangente projetado para lidar com vários aspectos do gerenciamento de partidas de futebol, equipes, autenticação de usuários e classificações. Ele oferece funcionalidades como registro e gerenciamento de equipes, autenticação de usuários, gerenciamento de partidas e geração de classificações com base nos resultados das partidas.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Sequelize
- TypeScript
- MySQL
- Mocha (para testes)
- JWT (JSON Web Tokens) para autenticação

## Requisitos

### Teams

#### Migration e Model da Tabela de Equipes

Desenvolva a Migration e o Model para a tabela de equipes em `/app/backend/src/database`. 
Garanta que a tabela contenha os dados iniciais corretos.

#### Testes de Integração para Equipes

Desenvolva testes de integração cobrindo pelo menos 5% dos arquivos em `/app/backend/src`. 
Garanta um mínimo de 7 linhas cobertas. Concentre-se em testar o contrato do endpoint `/teams`.

#### Teams Endpoint

Desenvolva o endpoint /teams no backend para retornar corretamente todas as equipes. 
Implemente uma rota GET retornando um array JSON de equipes.

- Mais Testes de Integração para Equipes:
    Desenvolva testes de integração adicionais cobrindo pelo menos 10% dos arquivos em `/app/backend/src`. 
    Garanta um mínimo de 19 linhas cobertas. 
    Evolua os testes de integração considerando o contrato do próximo requisito. 

- Endpoint de Detalhes da Equipe:
    Desenvolva o endpoint `/teams/:id` no backend para retornar dados específicos da equipe. 
    Implemente uma rota GET retornando detalhes da equipe no formato JSON. 

#### Usuários e Login: 

- Migração e Modelo da Tabela de Usuários:
    Desenvolva a migração e o modelo para a tabela de usuários em `/app/backend/src/database`. 
    Garanta que a tabela contenha os dados iniciais corretos. 

- Testes de Integração para Usuários:
    Desenvolva testes de integração cobrindo pelo menos 15% dos arquivos em `/app/backend/src`. 
    Garanta um mínimo de 25 linhas cobertas. 
    Concentre-se em testar o contrato do endpoint `/login`. 

- Endpoint de Login:
    Desenvolva o endpoint `/login` no backend para lidar com a autenticação do usuário. 
    Implemente uma rota POST validando e-mail e senha. 

- Mais Testes de Integração para Usuários:
    Desenvolva testes de integração adicionais cobrindo pelo menos 20% dos arquivos em `/app/backend/src`. 
    Garanta um mínimo de 35 linhas cobertas. 
    Evolua os testes de integração considerando o contrato do próximo requisito. 

- Endpoint de Login Melhorado:
    Aprimore o endpoint `/login` para prevenir o acesso com e-mail ou senha inválidos. 
    Garanta respostas apropriadas para diferentes cenários. 

- Ainda Mais Testes de Integração para Usuários:
    Desenvolva mais testes de integração cobrindo pelo menos 30% dos arquivos em `/app/backend/src`. 
    Garanta um mínimo de 45 linhas cobertas. 
    Baseie esses testes no contrato do endpoint `/login/role`. 

- Middleware de Validação de Token e Endpoint de Função:
    Desenvolva um middleware para validação de token. 
    Desenvolva o endpoint `/login/role` para retornar dados de função do usuário com base em um token válido.

### Matches:

#### Migration e Model da Tabela de Partidas:

Desenvolva a Migration e o Model para a tabela de partidas em /app/backend/src/database. 
Garanta que a tabela contenha os dados iniciais corretos.

#### Testes de Integração para Partidas:

Desenvolva testes de integração cobrindo pelo menos 45% dos arquivos em `/app/backend/src`. 
Garanta um mínimo de 70 linhas cobertas. 
Concentre-se em testar o contrato do endpoint `/matches`. 

- Endpoint de Partidas:
    Desenvolva o endpoint `/matches` no backend para retornar corretamente os dados das partidas. 
    Implemente uma rota GET retornando uma lista de partidas no formato JSON. 

- Endpoint de Filtragem de Partidas:
    Aprimore o endpoint `/matches` para permitir a filtragem de partidas em andamento ou finalizadas. 
    Implemente parâmetros de consulta para filtragem. 

- Endpoint de Finalização de Partida:
    Desenvolva o endpoint `/matches/:id/finish` para finalizar uma partida no banco de dados. 
    Implemente uma rota PATCH para finalizar uma partida. 

- Endpoint de Atualização de Partida:
    Desenvolva o endpoint `/matches/:id` para permitir a atualização de partidas em andamento.
    Implemente uma rota PATCH para atualizar os detalhes da partida.

- Mais Testes de Integração para Partidas:
    Desenvolva testes de integração adicionais cobrindo pelo menos 60% dos arquivos em `/app/backend/src`. 
    Garanta um mínimo de 80 linhas cobertas. 
    Baseie esses testes no contrato do endpoint `/leaderboard`. 

- Endpoint de Criação de Nova Partida:
    Desenvolva o endpoint `/matches` para permitir a adição de novas partidas em andamento ao banco de dados.
    Implemente uma rota POST para criar uma partida.

- Restrições de Partida e Tratamento de Erros:
    Implemente restrições para evitar a criação de partidas com equipes duplicadas ou inexistentes.
    Garanta que mensagens de erro apropriadas e códigos de status sejam retornados.

### Leaderboards:

#### Bonus: 
#### Teste Abrangente:

Desenvolva testes extensivos cobrindo pelo menos 80% dos arquivos em `/app/backend/src`. 
Garanta um mínimo de 100 linhas cobertas. 
Concentre-se no endpoint `/leaderboard`. 

- Endpoint do Leaderboard Home:
    Desenvolva o endpoint `/leaderboard/home` para retornar dados de desempenho da equipe de casa. 
    Implemente uma rota GET retornando dados relevantes. 

- Endpoint do Leaderboard Home Aprimorado:
    Estenda o endpoint `/leaderboard/home` para incluir estatísticas adicionais. 
    Garanta a ordenação correta dos dados com base em regras predefinidas. 

- Leaderboard Home Atualizado com Inserção de Partida:
    Verifique se o endpoint `/leaderboard/home` atualiza corretamente após a inserção de uma nova partida. 
    Garanta a ordenação correta e a representação de dados. 

- Endpoint do Leaderboard Away:
    Desenvolva o endpoint `/leaderboard/away` para retornar dados de desempenho da equipe visitante. 
    Implemente uma rota GET retornando dados relevantes. 

- Endpoint do Leaderboard Visitante Aprimorado:
    Estenda o endpoint `/leaderboard/away` para incluir estatísticas adicionais. 
    Garanta a ordenação correta dos dados com base em regras predefinidas. 

- Leaderboard Visitante Atualizado com Inserção de Partida:
    Verifique se o endpoint `/leaderboard/away` atualiza corretamente após a inserção de uma nova partida. 
    Garanta a ordenação correta e a representação de dados. 

#### Endpoint do Leaderboard Geral:

Desenvolva o endpoint `/leaderboard` para retornar dados de desempenho geral da equipe. 
Implemente uma rota GET retornando dados relevantes. 

#### Bônus: 

- Leaderboard Geral Atualizado com Inserção de Partida:
    Verifique se o endpoint `/leaderboard` atualiza corretamente após a inserção de uma nova partida. 
    Garanta a ordenação correta e a representação de dados.

## Conclusão

O Sistema de Gerenciamento de Futebol é uma aplicação robusta projetada para lidar eficientemente com vários aspectos do gerenciamento de futebol. Seguindo os requisitos delineados e utilizando tecnologias modernas, o sistema garante representação precisa de dados, autenticação de usuário sem problemas e geração abrangente de leaderboard.
