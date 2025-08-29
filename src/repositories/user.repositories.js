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

function findUserByEmailRepository(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, username, email, avatar 
        FROM users 
        WHERE email = ?
      `,
      [email], // substitui o ? pelo email, esses dados no array são passados de forma sequencial
      (err, row) => {
        // envia row porque é aonde vem o resultado da consulta
        if (err) {
          reject(err);
        } else {
          resolve(row); // row é o usuário encontrado ou undefined se não encontrar
        }
      }
    );
  });
}

export default { createUserRepository, findUserByEmailRepository };
