import userServices from "../service/user.services.js";

async function createUserController(req, res) {
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

export default { createUserController };
