const express = require('express');
const controller = require('../controllers/pedidos.controller');

const rotas = express.Router();

rotas.get('/', controller.index);
rotas.get('/:id', controller.show);
rotas.post('/', controller.create);
rotas.patch('/:id/status', controller.avancarStatus); // Avança o status do pedido (pendente -> pronto -> entregue)[cite: 6, 7]
rotas.patch('/:id/cancelamento', controller.cancelar); // Cancela o pedido[cite: 6, 7]

module.exports = rotas;