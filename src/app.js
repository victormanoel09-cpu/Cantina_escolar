// src/app.js

const express = require("express")
const rotas = require("./routes")

const app = express()
// Permite receber JSON no corpo da requisição
app.use(express.json())
// Todas as rotas ficam sob /api
app.use("/api", rotas)
// Rota não encontrada (404) — precisa vir DEPOIS das rotas
app.use(function (req, res) {
    res.status(404).json({ erro: "Rota não encontrada" })
})

// Middleware de erro — sempre o ÚLTIMO
app.use(function (erro, req, res, next) {
    // Erros que nós lançamos têm status; bugs inesperados, não
    const status = erro.status || 500
    if (status === 500) {
        console.error(erro) // registra o problema real no terminal
    }

    res.status(status).json({
        status,
        erro: status === 500 ? "Erro interno do servidor" : erro.message
    })
})
module.exports = app