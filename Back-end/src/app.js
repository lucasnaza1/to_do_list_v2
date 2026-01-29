// Importa o Express
const express = require("express");
// Importa o middleware CORS
const cors = require("cors");
// Importa o roteador da aplicação
const router = require("./router");

// Cria uma instância da aplicação Express
const app = express();

// Aplica o middleware CORS para permitir requisições externas
app.use(cors());
// Permite receber e enviar JSON no corpo das requisições
app.use(express.json());
// Aplica as rotas definidas no roteador
app.use(router);

// Exporta a aplicação
module.exports = app;
