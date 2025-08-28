import express from "express";

const app = express();

app.use(express.json());

const users = []; // cria um array vazio para adicionar usuários

// METHOD => GET, POST, PUT/PATCH, DELETE
// NAME => /    - sempre no plural
// Callback functions => onde executamos o backend (lógica, regra de negócio)

app.post("/users", (req, res) => {
  const body = req.body; // obtém o corpo da requisição
  users.push(body); // adiciona o corpo da requisição ao array de usuários
  res.status(201).send("User created"); // envia uma resposta de sucesso
});

app.get("/users", (req, res) => {
  res.send({ message: "Esses são os usuários", users }); // envia o array de usuários como resposta
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
