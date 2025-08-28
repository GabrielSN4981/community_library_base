import sqlite from "sqlite3";

// Conecta ao banco de dados SQLite (ou cria o arquivo se não existir)
const db = new sqlite.Database("library_db.sqlite", (err) => {
  // .Database faz a conexão com o banco de dados SQLite
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado com sucesso ao banco de dados SQLite.");
  }
});

export default db;
