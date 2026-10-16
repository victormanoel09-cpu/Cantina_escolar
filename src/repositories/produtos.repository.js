const db = require('../infra/database');
const TABELA = 'produtos';

const COLUNAS = [
  'produtos.id',
  'produtos.nome',
  'produtos.preco',
  'produtos.disponivel',
  'categorias.id as categoria_id',
  'categorias.nome as categoria_nome'
];

module.exports = {
  async index(filtros = {}) {
    const consulta = db(TABELA)
      .innerJoin('categorias', 'produtos.categoria_id', 'categorias.id')
      .select(COLUNAS);

    // Filtros exigidos: ?categoria=?busca=?disponivel=?pagina=?limite=
    if (filtros.categoriaId) {
      consulta.where('produtos.categoria_id', filtros.categoriaId);
    }

    if (filtros.busca) {
      consulta.where('produtos.nome', 'like', `%${filtros.busca}%`);
    }

    if (filtros.disponivel !== undefined) {
      consulta.where('produtos.disponivel', filtros.disponivel);
    }

    if (filtros.limite) {
      const offset = filtros.deslocamento || 0;
      consulta.limit(filtros.limite).offset(offset);
    }

    return consulta.orderBy('produtos.nome', 'asc');
  },

  async show(id) {
    return db(TABELA)
      .innerJoin('categorias', 'produtos.categoria_id', 'categorias.id')
      .select(COLUNAS)
      .where('produtos.id', id)
      .first();
  },

  async create(dados) {
    const [id] = await db(TABELA).insert(dados);
    return this.show(id);
  },

  async update(id, dados) {
    const linhas = await db(TABELA).where({ id }).update(dados);
    if (linhas === 0) return null;
    return this.show(id);
  },

  async delete(id) {
    const linhas = await db(TABELA).where({ id }).del();
    return linhas > 0;
  },

  async atualizarDisponibilidade(id, disponivel) {
    const linhas = await db(TABELA).where({ id }).update({ disponivel });
    if (linhas === 0) return null;
    return this.show(id);
  },

  async listarPorCategoria(categoriaId) {
    return db(TABELA)
      .innerJoin('categorias', 'produtos.categoria_id', 'categorias.id')
      .select(COLUNAS)
      .where('produtos.categoria_id', categoriaId)
      .orderBy('produtos.nome', 'asc');
  }
};