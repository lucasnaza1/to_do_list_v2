// Importa a aplicação Express configurada
const { connect } = require("mongoose");
const app = require("./app");
const connectDB = require("./models/connection")
// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Define a porta da aplicação (usa a variável de ambiente ou 3333 como padrão)
const PORT = process.env.PORT || 3333;

// Inicia o servidor e escuta na porta definida
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
    console.log("Erro ao se conectar com o MongoDB", err)
})
