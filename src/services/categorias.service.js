const repositorio = require('../repositories/categorias.repository');
const { criarErro } = require('./erros');

module.exports = {
  async index() {
    return repositorio.index();
  },

  async show(id) {
    const categoria = await repositorio.show(id);
    if (!categoria) {
      throw criarErro('Categoria não encontrada', 404);
    }
    return categoria;
  },

  async create(dados) {
    if (!dados.nome) {
      throw criarErro('O nome da categoria é obrigatório', 400);
    }

    const existente = await repositorio.buscarPorNome(dados.nome);
    if (existente) {
      throw criarErro('Já existe uma categoria com este nome', 409);
    }

    return repositorio.create(dados);
  },

  async update(id, dados) {
    const categoria = await repositorio.show(id);
    if (!categoria) {
      throw criarErro('Categoria não encontrada', 404);
    }

    if (dados.nome) {
      const existente = await repositorio.buscarPorNome(dados.nome);
      if (existente && existente.id !== id) {
        throw criarErro('Já existe uma categoria com este nome', 409);
      }
    }

    const atualizada = await repositorio.update(id, dados);
    return atualizada;
  },

  async delete(id) {
    const categoria = await repositorio.show(id);
    if (!categoria) {
      throw criarErro('Categoria não encontrada', 404);
    }

    // Regra de Negócio 7: Categoria com produtos vinculados não pode ser removida
    const totalProdutos = await repositorio.contarProdutosVinculados(id);
    if (totalProdutos > 0) {
      throw criarErro('Não é possível remover uma categoria que possui produtos vinculados', 409);
    }

    return repositorio.delete(id);
  }
};