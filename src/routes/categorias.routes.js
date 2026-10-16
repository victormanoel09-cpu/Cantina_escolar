const express = require('express');
const controller = require('../controllers/categorias.controller');

const rotas = express.Router();

rotas.get('/', controller.index);
rotas.get('/:id', controller.show);
rotas.post('/', controller.create);
rotas.put('/:id', controller.update);
rotas.delete('/:id', controller.delete);
rotas.get('/:id/produtos', controller.listarProdutos); // Produtos daquela categoria[cite: 6]

module.exports = rotas;