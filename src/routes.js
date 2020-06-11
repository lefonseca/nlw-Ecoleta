const express = require("express");
const db = require("./database/db");
const controller = require("./controller");

const routes = express.Router();
routes.use(express.urlencoded({ extended: true }));

// Configuração das Routas

// Home
routes.get("/", controller.index)

// Página para criar ponto de coleta
routes.get("/create-point", controller.create);

// Criar ponto de coleta
routes.post("/savepoint", controller.post);

// Pesquisar Ponto (Result)
routes.get("/search", controller.search);

// Deletar Ponto
routes.post("/delete", controller.delete);

// Página de editar Ponto
routes.get("/edit/:id", controller.edit);

// Editar ponto
routes.post("/edited/:id", controller.put);

module.exports = routes
