const express = require('express');
const controller = require('../controllers/produtos.controller');

const rotas = express.Router();

rotas.get('/', controller.index);
rotas.get('/:id', controller.show);
rotas.post('/', controller.create);
rotas.put('/:id', controller.update);
rotas.patch('/:id/disponibilidade', controller.atualizarDisponibilidade); // Liga ou desliga a venda[cite: 6]
rotas.delete('/:id', controller.delete);

module.exports = rotas;