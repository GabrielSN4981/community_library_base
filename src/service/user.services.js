import userRepository from "../repositories/user.repositories.js";

async function createUserService(newUser) {
  // pega o repositório e cria o usuário
  const user = await userRepository.createUserRepository(newUser);
  return user;
}

export default { createUserService };
