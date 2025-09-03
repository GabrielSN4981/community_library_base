import { userIdSchema } from "../schema/user.schema.js";

// Middleware para validação de dados usando Zod
const validate = (schema) => (req, res, next) => {
  try {
    // parse vem do zod
    schema.parse(req.body);
    // se atender ao schema, prossegue
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};
// Middleware para validar o ID do usuário
const validateUserId = (req, res, next) => {
  try {
    // converte o id para número com o +
    const userId = +req.params.id;
    userIdSchema.parse({ userId: userId });
    next();
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
};

export { validate, validateUserId };
