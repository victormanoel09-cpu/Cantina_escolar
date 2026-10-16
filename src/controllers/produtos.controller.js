const servico = require('../services/produtos.service');

module.exports = {
  async index(req, res, next) {
    try {
      const filtros = {
        categoriaId: req.query.categoria ? Number(req.query.categoria) : undefined,
        busca: req.query.busca,
        disponivel: req.query.disponivel !== undefined ? req.query.disponivel === 'true' : undefined,
        limite: req.query.limite ? Number(req.query.limite) : undefined,
        deslocamento: req.query.pagina && req.query.limite 
          ? (Number(req.query.pagina) - 1) * Number(req.query.limite) 
          : undefined
      };

      const produtos = await servico.index(filtros);
      res.json(produtos);
    } catch (erro) {
      next(erro);
    }
  },

  async show(req, res, next) {
    try {
      const produto = await servico.show(Number(req.params.id));
      res.json(produto);
    } catch (erro) {
      next(erro);
    }
  },

  async create(req, res, next) {
    try {
      const produto = await servico.create(req.body);
      res.status(201).json(produto);
    } catch (erro) {
      next(erro);
    }
  },

  async update(req, res, next) {
    try {
      const produto = await servico.update(Number(req.params.id), req.body);
      res.json(produto);
    } catch (erro) {
      next(erro);
    }
  },

  async atualizarDisponibilidade(req, res, next) {
    try {
      const { disponivel } = req.body;
      const produto = await servico.atualizarDisponibilidade(Number(req.params.id), disponivel);
      res.json(produto);
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
  }
};