// Importa o Express
const express = require("express");

// Importa o controller das tarefas
const tasksController = require("./controllers/tasksController");
// Importa os middlewares de validação
const tasksMiddleware = require("./middlewares/tasksMiddleware");

// Cria o roteador do Express
const router = express.Router();

// Rota para buscar todas as tarefas
router.get("/tasks", tasksController.getAll);

// Rota para adicionar uma nova tarefa com validação do corpo
router.post("/tasks", tasksMiddleware.validateBody, tasksController.addTask);

// Rota para deletar uma tarefa pelo ID
router.delete("/tasks/:id", tasksController.deleteTask);

// Rota para atualizar uma tarefa com validação de título e status
router.put(
  "/tasks/:id",
  tasksMiddleware.validateBody,
  tasksMiddleware.validateStatus,
  tasksController.updateTask
);

// Exporta o router
module.exports = router;
