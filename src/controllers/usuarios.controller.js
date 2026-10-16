const servico = require('../services/usuarios.service');

module.exports = {
  async index(req, res, next) {
    try {
      const usuarios = await servico.index();
      res.json(usuarios);
    } catch (erro) {
      next(erro);
    }
  },

  async show(req, res, next) {
    try {
      const usuario = await servico.show(Number(req.params.id));
      res.json(usuario);
    } catch (erro) {
      next(erro);
    }
  },

  async create(req, res, next) {
    try {
      const usuario = await servico.create(req.body);
      res.status(201).json(usuario);
    } catch (erro) {
      next(erro);
    }
  },

  async update(req, res, next) {
    try {
      const usuario = await servico.update(Number(req.params.id), req.body);
      res.json(usuario);
    } catch (erro) {
      next(erro);
    }
  },

  async delete(req, res, next) {
    try {
      await servico.delete(Number(req.params.id));
      res.status(204).send();
    } catch (erro) {
      next(erro);
    }
  },

  async listarPedidos(req, res, next) {
    try {
      const pedidosServico = require('../services/pedidos.service');
      const pedidos = await pedidosServico.index({ usuarioId: Number(req.params.id) });
      res.json(pedidos);
    } catch (erro) {
      next(erro);
    }
  }
};