import { de } from "zod/locales";
import db from "../config/database.js";
// código em sql
db.run(` 
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
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

function findUserByIdRepository(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT id, username, email, avatar
        FROM users 
        WHERE id = ?
      `,
      [id],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function findAllUsersRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT id, username, email, avatar FROM users
      `,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}
// função para atualizar usuário
function updateUserRepository(id, user) {
  // uso de promise para lidar com operações assíncronas
  return new Promise((resolve, reject) => {
    // desestruturação do objeto user para obter os campos que podem ser atualizados
    const { username, email, password, avatar } = user;
    // construção dinâmica da query SQL para atualização
    const fields = ["username", "email", "password", "avatar"];
    // query começa com UPDATE users SET com espaço no final
    let query = "UPDATE users SET ";
    // definimos os campos que serão atualizados
    const values = [];

    fields.forEach((field) => {
      // busca primeiro username, depois email, depois password e por último avatar
      if (user[field] !== undefined) {
        // se o campo existir no objeto user, adiciona o valor ao array values
        query += `${field} = ?,`; // adiciona o campo à query
        values.push(user[field]); // adiciona o valor ao array values
      }
    });
    query = query.slice(0, -1); // remove a última vírgula e espaço
    query += " WHERE id = ?"; // adiciona a condição WHERE para identificar o usuário
    values.push(id); // adiciona o id ao final do array values
    // executa a query de atualização no banco de dados
    db.run(query, values, (err) => {
      if (err) {
        // se der erro, rejeita a promise com o erro
        reject(err);
      } else {
        // se der certo, resolve a promise com o usuário atualizado
        resolve({ ...user, id });
      }
    });
  });
}

async function deleteUserRepository(id) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        DELETE FROM users 
        WHERE id = ?`,
      [id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "User deleted successfully", id });
        }
      }
    );
  });
}

export default {
  createUserRepository,
  findUserByEmailRepository,
  findUserByIdRepository,
  findAllUsersRepository,
  updateUserRepository,
  deleteUserRepository,
};
