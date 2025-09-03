import userServices from "../service/user.services.js";
// função para criar usuário
async function createUserController(req, res) {
  // pega o corpo da requisição
  const newUser = req.body;
  // chama o serviço para criar o usuário
  try {
    // chama o serviço para criar o usuário
    const user = await userServices.createUserService(newUser);
    // 201 = criado com sucesso 400 = erro do cliente
    return res.status(201).send({ user });
  } catch (err) {
    return res.status(400).send(err.message);
  }
}
// função para buscar todos os usuários
async function findAllUserController(req, res) {
  try {
    // chama o serviço para buscar todos os usuários
    const users = await userServices.findAllUsersService();
    return res.send({ users });
  } catch (e) {
    return res.status(400).send(e.message);
  }
}
// função para buscar usuário por id
async function findUserByIdController(req, res) {
  const { id } = req.params; // pega o id dos parâmetros da requisição
  try {
    // chama o serviço para buscar o usuário por id
    const user = await userServices.findUserByIdService(id);
    res.send({ user });
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function updateUserController(req, res) {
  const { id } = req.params; // pega o id dos parâmetros da requisição
  const newUser = req.body; // pega o corpo da requisição

  try {
    // chama o serviço para atualizar o usuário
    const user = await userServices.updateUserService(newUser, id);
    res.send({ user });
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function deleteUserController(req, res) {
  const { id } = req.params; // pega o id dos parâmetros da requisição

  try {
    // chama o serviço para deletar o usuário
    const message = await userServices.deleteUserService(id);
    res.send({ message });
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

export default {
  createUserController,
  findAllUserController,
  findUserByIdController,
  updateUserController,
  deleteUserController,
};
