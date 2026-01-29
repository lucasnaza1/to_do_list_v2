const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Banco MongoDB Conectado com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar-se com o Banco MongoDB:', err.message);
    process.exit(1); // Para o app se não conectar
  }
};

module.exports = connectDB;