// server.js
const app = require("./src/app")
const porta = 3000
app.listen(porta, () => {
    console.log("Servidor rodando em http://localhost:" + porta)
})