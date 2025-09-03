import { de } from "zod/locales";
import userRepository from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

async function createUserService(newUser) {
  // verificar se o email já está cadastrado
  const foundUser = await userRepository.findUserByEmailRepository(
    newUser.email
  );
  if (foundUser) throw new Error("User already registered");
  // criptografar a senha
  const passHash = await bcrypt.hash(newUser.password, 10);
  // na hora de criar o usuário, pega o objeto newUser e sobrescreve a senha com a senha criptografada
  const user = await userRepository.createUserRepository({
    ...newUser,
    password: passHash,
  });
  if (!user) throw new Error("Error creating user");
  return user;
}
// função para buscar todos os usuários
async function findAllUsersService() {
  // usa o user repository para buscar todos os usuários e retorna
  const users = await userRepository.findAllUsersRepository();
  return users;
}
// função para buscar usuário por id
async function findUserByIdService(id) {
  // usa o user repository para buscar o usuário por id
  const user = await userRepository.findUserByIdRepository(id);
  // se não existir, lança um erro
  if (!user) throw new Error("User not found");
  return user;
}
// função para atualizar usuário
async function updateUserService(newUser, userId) {
  const user = await userRepository.findUserByIdRepository(userId);
  if (!user) throw new Error("User not found");
  // se houver nova senha
  if (newUser.password) {
    // criptografa a nova senha
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }
  // chama o repositório para atualizar o usuário e retorna o usuário atualizado
  const userUpadated = await userRepository.updateUserRepository(
    userId,
    newUser
  );
  return userUpadated;
}
// função para deletar usuário
async function deleteUserService(userId) {
  // verifica se o usuário existe
  const user = await userRepository.findUserByIdRepository(userId);
  // se não existir, lança um erro
  if (!user) throw new Error("User not found");
  // se existir, deleta o usuário e retorna uma mensagem de sucesso
  const { message } = await userRepository.deleteUserRepository(userId);
  return message;
}

export default {
  createUserService,
  findAllUsersService,
  findUserByIdService,
  updateUserService,
  deleteUserService,
};
