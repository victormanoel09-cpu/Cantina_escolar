// src/infra/database/index.js
const knex = require("knex")
const configuracao = require("../../../knexfile")

// Cria a conexão usando o ambiente de desenvolvimento
const db = knex(configuracao[mode])
module.exports = db