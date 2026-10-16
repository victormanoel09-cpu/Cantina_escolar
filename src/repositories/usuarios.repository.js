const db = require('../infra/database');
const TABELA = 'usuarios';

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

  // Consultas auxiliares para verificação de unicidade (Regra de Negócio 8)
  async buscarPorEmail(email) {
    return db(TABELA).where({ email }).first();
  },

  async buscarPorMatricula(matricula) {
    return db(TABELA).where({ matricula }).first();
  }
};