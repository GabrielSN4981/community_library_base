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

export default { createUserService };
