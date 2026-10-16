const express = require('express');
const controller = require('../controllers/usuarios.controller');

const rotas = express.Router();

rotas.get('/', controller.index);
rotas.get('/:id', controller.show);
rotas.post('/', controller.create);
rotas.put('/:id', controller.update);
rotas.delete('/:id', controller.delete);
rotas.get('/:id/pedidos', controller.listarPedidos); // Histórico de pedidos do utilizador[cite: 6]

module.exports = rotas;