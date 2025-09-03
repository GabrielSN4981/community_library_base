import { Router } from "express";
import userControllers from "../controller/user.controllers.js";
import {
  validate,
  validateUserId,
} from "../middlewares/validation.middlewares.js";
import { userSchema } from "../schema/user.schema.js";

const router = Router();
// rota para criar usuário com validação do corpo da requisição
router.post(
  "/users",
  validate(userSchema),
  userControllers.createUserController
);
// rota para buscar todos os usuários
router.get("/users", userControllers.findAllUserController);
// rota para buscar usuário por id, : significa que é um parâmetro
router.get(
  "/users/:id",
  validateUserId,
  userControllers.findUserByIdController
);
// rota para atualizar usuário por id
router.patch(
  "/users/:id",
  validateUserId,
  userControllers.updateUserController
);
// rota para deletar usuário por id
router.delete(
  "/users/:id",
  validateUserId,
  userControllers.deleteUserController
);

export default router;
