const mongoose = require("mongoose");

const validateID = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({message: "ID Inválido." })
  }

  next();
}


// Função que valida se o campo 'title' está presente e não está vazio
const validateBody = (req, res, next) => {
  const { body } = req;

  if (body.title == undefined) {
    return res.status(400).json({ message: "The Field 'title' is required" });
  }
  if (body.title == "") {
    return res.status(400).json({ message: "title cannot be empty" });
  }

  next();
};

// Função que valida se o campo 'status' está presente e não está vazio
const validateStatus = (req, res, next) => {
  const { body } = req;

  if (body.status == undefined) {
    return res.status(400).json({ message: "The Field 'status' is required" });
  }
  if (body.status == "") {
    return res.status(400).json({ message: "status cannot be empty" });
  }

  next();
};

// Exporta as funções de validação
module.exports = {
  validateBody,
  validateStatus,
};
