// knexfile.js
require('dotenv').config()
const path = require("path")
module.exports = {
  development: {
    // Qual banco estamos usando
    client: "sqlite3",
    // Onde fica o arquivo do banco
    connection: {

      filename: path.resolve(__dirname, "src", "infra", "database", "cantina.sqlite")
    },
    // Onde ficam os arquivos de migration
    migrations: {
      directory: path.resolve(__dirname, "src", "infra", "database", "migrations")
    },
    // Onde ficam os arquivos de seed
    seeds: {
      directory: path.resolve(__dirname, "src", "infra", "database", "seeds")
    },
    // Obrigatório no SQLite
    useNullAsDefault: true,
    pool: {
      afterCreate: function (conexao, callback) {
        conexao.run("PRAGMA foreign_keys = ON", callback)
      }
    }
  },
}