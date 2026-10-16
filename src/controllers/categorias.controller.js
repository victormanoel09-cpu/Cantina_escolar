const servico = require('../services/categorias.service');

module.exports = {
    async index(req, res, next) {
        try {
            const categorias = await servico.index();
            res.json(categorias);
        } catch (erro) {
            next(erro);
        }
    },

    async show(req, res, next) {
        try {
            const categoria = await servico.show(Number(req.params.id));
            res.json(categoria);
        } catch (erro) {
            next(erro);
        }
    },

    async create(req, res, next) {
        try {
            const categoria = await servico.create(req.body);
            res.status(201).json(categoria);
        } catch (erro) {
            next(erro);
        }
    },

    async update(req, res, next) {
        try {
            const categoria = await servico.update(Number(req.params.id), req.body);
            res.json(categoria);
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

    async listarProdutos(req, res, next) {
        try {
            const produtosServico = require('../services/produtos.service');
            const produtos = await produtosServico.index({ categoriaId: Number(req.params.id) });
            res.json(produtos);
        } catch (erro) {
            next(erro);
        }
    }
};