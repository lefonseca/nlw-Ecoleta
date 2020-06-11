// Criar Servidor
const express = require("express");
const server = express();

// Pegar as Rotas
const routes = require("./routes");

// pegar o banco de dados
const db = require("./database/db"); 

// configurar servidor
server.use(express.static("public"));
server.use(routes);
server.use(express.urlencoded({ extended: true}));

// Configurar template engine (nunjucks)
const nunjucks = require("nunjucks");

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
    watch: true
})


// Ligar servidor
server.listen(3000);