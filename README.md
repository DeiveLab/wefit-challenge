# Descrição
## Backend - Wefit

Seja bem vindo ao teste de backend da Wefit.

### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -D

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **root** é **senha_root_123**

### Para iniciar o servidor express basta executar o seguinte comando:

    npm start
    ou
    yarn start

Depois que concluir seu teste não de enviar o seu código junto a pasta data, nela está salvo o volume do MySQL criado pelo docker.

Boa sorte =)

# Detalhes da Resolução
## Instruções de execução
### Com o Node local
- Primeiramente, clone o arquivo *.env.example* e remova o *.example* do nome do novo arquivo, deixando apenas o *.env*
- Certifique-se de ter um node compatível com a versão 18.15.0 usada no projeto
- Execute o comando `npm install` para baixar todas as dependências
- Execute o comando `npx prisma migrate dev` para rodar todas as migrations
- Mantive o comando `npm start` ou `yarn start` para executar o projeto na porta 4568 por padrão
### Com Docker
- Alternativamente **acrescentei um Dockerfile para o projeto**, que servirá como base para subir um container com a versão correta do NodeJS, junto com suas dependências e o banco mysql ao executar o comando `docker compose up -d`
## Como usar o endpoint
A documentação do service pode ser acessada na url http://localhost:4568/docs. A doc contém detalhes sobre a estrutura da requisição e seu caminho.
## Executar testes unitários
### Com o Node local
- Os testes podem ser executados com o comando `npm run test`
### Com Docker
- Um container de testes subirá junto aos dois containers mencionados anteriormente com o comando `docker compose up -d`
- Para executar **somente os testes** use o comando `docker compose up wefit-challenge-tests`, que deve executar os testes, mostrar os resultados e fechar após o término.
## Tech stack
Tentei deixar o projeto coerente, fugindo do over engineering, mas mostrando uma base sólida dos meus conhecimentos no desenvolvimento web. Essa foi minha stack:
- **Web Framework**: O código foi desenvolvido com a base fornecida em `Typescript` e `Express`. 
- **ORM**: usei o `Prisma` para lidar com a conexão com o banco de dados, pela simplicidade de uso e fácil manipulação das migrations.
- **Dependency Injection**: usei o `tsyringe` para injeção de dependência, deixando fácil de aplicar os testes unitários nas classes sem interferir no estado do ambiente.
- **Validação**: usei o `zod` para validar as requisições e inferir os tipos dos parâmetros recebidos.
- **Testing Framework**: `Jest`, apesar de entender a vantagem de velocidade do vitest nesses casos, encontrei problemas de compatibilidade e resolvi seguir com o Jest.
