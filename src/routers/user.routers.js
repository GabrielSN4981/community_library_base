import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  validate,
  validateUserId,
} from "../middlewares/validation.middleware.js";
import { userSchema } from "../schemas/user.schema.js";

import { Router } from "express";

const router = Router();

router.post("/", validate(userSchema), userController.createUserController);
router.post("/login", userController.userLoginController);

router.get("/", userController.findAllUserController);
router.get("/:id", validateUserId, userController.findUserByIdController);
router.patch("/:id", validateUserId, userController.updateUserController);
router.delete("/:id", validateUserId, userController.deleteUserController);
router.use(authMiddleware);

export default router;
