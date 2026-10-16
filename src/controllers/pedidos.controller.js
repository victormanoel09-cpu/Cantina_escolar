const servico = require('../services/pedidos.service');

module.exports = {
  async index(req, res, next) {
    try {
      const filtros = {
        status: req.query.status,
        usuarioId: req.query.usuario ? Number(req.query.usuario) : undefined
      };

      const pedidos = await servico.index(filtros);
      res.json(pedidos);
    } catch (erro) {
      next(erro);
    }
  },

  async show(req, res, next) {
    try {
      const pedido = await servico.show(Number(req.params.id));
      res.json(pedido);
    } catch (erro) {
      next(erro);
    }
  },

  async create(req, res, next) {
    try {
      const pedido = await servico.create(req.body);
      res.status(201).json(pedido);
    } catch (erro) {
      next(erro);
    }
  },

  async avancarStatus(req, res, next) {
    try {
      const pedido = await servico.avancarStatus(Number(req.params.id));
      res.json(pedido);
    } catch (erro) {
      next(erro);
    }
  },

  async cancelar(req, res, next) {
    try {
      const pedido = await servico.cancelar(Number(req.params.id));
      res.json(pedido);
    } catch (erro) {
      next(erro);
    }
  }
};