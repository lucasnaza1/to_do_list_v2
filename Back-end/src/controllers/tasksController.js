const tasksModel = require("../models/taskModel");

const getAll = async (_req, res) => {
  const tasks = await tasksModel.getAll();
  // No Mongo, o retorno é um array de documentos. 
  // O Express já transforma isso em JSON automaticamente.
  return res.status(200).json(tasks);
};

const addTask = async (req, res) => {
  // Chamamos o model que já criamos para o Mongo
  const addedTask = await tasksModel.addTask(req.body);
  
  // Como retornamos { insertId: savedTask._id } no Model, 
  // vamos garantir que ele vá como string para o Front
  return res.status(201).json({ 
    insertId: addedTask.insertId.toString() 
  });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  // O delete do Mongoose no seu model já faz o trabalho duro
  await tasksModel.deleteTask(id);
  
  // Status 204 significa "Sucesso, mas não tenho nada para te mostrar"
  return res.status(204).json();
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  // Passamos o ID e o corpo da requisição (title, status)
  await tasksModel.updateTask(id, req.body);

  return res.status(204).json();
};

module.exports = {
  getAll,
  addTask,
  deleteTask,
  updateTask,
};