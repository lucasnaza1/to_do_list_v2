const mongoose = require('mongoose');

// No MongoDB, primeiro definimos o "Schema" (a estrutura do documento)
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pendente',
  },
  created_at: {
    type: Date,
    default: Date.now, // O Mongo já gerencia a data pra você!
  },
});

// Criamos o modelo baseado no schema
const Task = mongoose.model('Task', taskSchema);

// --- Funções de manipulação ---

const getAll = async () => {
  // O .find() sem argumentos busca tudo
  return await Task.find();
};

const addTask = async (taskData) => {
  // Criamos uma nova instância do modelo e salvamos
  const newTask = new Task({
    title: taskData.title,
    // status e created_at usam os valores default do Schema
  });
  
  const savedTask = await newTask.save();
  return { insertId: savedTask._id }; // No Mongo, o ID padrão é _id
};

const deleteTask = async (id) => {
  //findByIdAndDelete resolve tudo em uma linha
  return await Task.findByIdAndDelete(id);
};

const updateTask = async (id, taskData) => {
  const { title, status } = taskData;
  // { new: true } serve para retornar o documento já atualizado
  return await Task.findByIdAndUpdate(
    id, 
    { title, status }, 
    { new: true }
  );
};

module.exports = {
  getAll,
  addTask,
  deleteTask,
  updateTask,
};