const db = require('../infra/database');
const TABELA = 'categorias';

module.exports = {
  async index() {
    return db(TABELA).select('*').orderBy('nome', 'asc');
  },

  async show(id) {
    return db(TABELA).where({ id }).first();
  },

  async create(dados) {
    const [id] = await db(TABELA).insert(dados);
    return db(TABELA).where({ id }).first();
  },

  async update(id, dados) {
    const linhas = await db(TABELA).where({ id }).update(dados);
    if (linhas === 0) return null;
    return db(TABELA).where({ id }).first();
  },

  async delete(id) {
    const linhas = await db(TABELA).where({ id }).del();
    return linhas > 0;
  },

  async buscarPorNome(nome) {
    return db(TABELA).where({ nome }).first();
  },

  // Método auxiliar para checar regra de negócio 7 no serviço
  async contarProdutosVinculados(categoriaId) {
    const resultado = await db('produtos')
      .where({ categoria_id: categoriaId })
      .count('id as total')
      .first();
    return resultado.total;
  }
};