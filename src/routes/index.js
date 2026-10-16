const express = require('express');
const usuariosRoutes = require('./usuarios.routes');
const categoriasRoutes = require('./categorias.routes');
const produtosRoutes = require('./produtos.routes');
const pedidosRoutes = require('./pedidos.routes');

const rotas = express.Router();

rotas.use('/usuarios', usuariosRoutes);
rotas.use('/categorias', categoriasRoutes);
rotas.use('/produtos', produtosRoutes);
rotas.use('/pedidos', pedidosRoutes);

module.exports = rotas;