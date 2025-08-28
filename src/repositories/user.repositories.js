import db from "../config/database.js";
// código em sql
db.run(` 
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT
    )
`); // NOT NULL = campo obrigatório

// função para criar usuário
function createUserRepository(newUser) {
  return new Promise((resolve, reject) => {
    const { username, email, password, avatar } = newUser;
    // tudo maiusculo é comando reservado do sql
    db.run(
      // cria o usuário no banco de dados
      `
        INSERT INTO users (username, email, password, avatar)
        VALUES (?, ?, ?, ?)
      `,
      // os ? são substituidos pelos valores do array
      [username, email, password, avatar],
      // callback para tratar o resultado da operação
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newUser }); // retorna o id do usuário criado
        }
      }
    );
  });
}

export default { createUserRepository };
