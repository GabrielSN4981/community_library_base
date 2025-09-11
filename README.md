# Community Library

Este é um projeto de uma biblioteca comunitária, onde os usuários podem cadastrar livros para compartilhar com outros membros e também realizar empréstimos de livros disponíveis.

## Instalação

### Pré-requisitos

- Node.js (v14.x ou superior)
- npm (Node Package Manager) ou yarn

### Passos para instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/community-library.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd community-library
   ```

3. Instale as dependências:

   Com npm:

   ```bash
   npm install
   ```

   Ou com yarn:

   ```bash
   yarn install
   ```

4. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente. Exemplo:

   ```env
   PORT=3000
   SECRET=your_jwt_secret
   ```

   > Substitua `your_jwt_secret` por uma chave secreta segura que será usada para assinar os tokens JWT.

5. Gerando uma chave secreta de 256 bits (SHA256):

   Execute o comando abaixo no terminal para gerar uma chave aleatória em formato hexadecimal:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Copie a chave gerada e use no campo `SECRET` do seu `.env`.

6. Inicie o servidor:

   Com npm:

   ```bash
   npm start
   ```

   Ou com yarn:

   ```bash
   yarn start
   ```

7. O servidor estará disponível em: [http://localhost:3000](http://localhost:3000)

## Rotas

- **/users** → operações de usuários (criar, listar, buscar por ID, atualizar, excluir).
- **/books** → operações de livros (criar, listar, buscar por ID, atualizar, excluir).
- **/loans** → operações de empréstimos (criar, listar, buscar por ID, excluir).

## Tecnologias Utilizadas

- Node.js
- Express.js
- SQLite (ou outro banco de dados de sua escolha)
- JSON Web Token (JWT) para autenticação
- Zod para validação de dados

## Contribuição

Se você gostou do projeto e deseja contribuir, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.  
Todas as contribuições são bem-vindas! 🎉

Obrigado por acessar o projeto e por considerar contribuir para torná-lo ainda melhor!
