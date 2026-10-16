const db = require('../infra/database');
const TABELA = 'pedidos';

const COLUNAS = [
  'pedidos.id',
  'pedidos.quantidade',
  'pedidos.preco_unitario',
  'pedidos.status',
  'pedidos.criado_em',
  'usuarios.id as usuario_id',
  'usuarios.nome as usuario_nome',
  'produtos.id as produto_id',
  'produtos.nome as produto_nome',
  'categorias.nome as categoria_nome'
];

module.exports = {
  async index(filtros = {}) {
    const consulta = db(TABELA)
      .innerJoin('usuarios', 'pedidos.usuario_id', 'usuarios.id')
      .innerJoin('produtos', 'pedidos.produto_id', 'produtos.id')
      .innerJoin('categorias', 'produtos.categoria_id', 'categorias.id')
      .select(COLUNAS);

    // Filtros obrigatórios: ?status=?usuario=
    if (filtros.status) {
      consulta.where('pedidos.status', filtros.status);
    }

    if (filtros.usuarioId) {
      consulta.where('pedidos.usuario_id', filtros.usuarioId);
    }

    return consulta.orderBy('pedidos.criado_em', 'desc');
  },

  async show(id) {
    return db(TABELA)
      .innerJoin('usuarios', 'pedidos.usuario_id', 'usuarios.id')
      .innerJoin('produtos', 'pedidos.produto_id', 'produtos.id')
      .innerJoin('categorias', 'produtos.categoria_id', 'categorias.id')
      .select(COLUNAS)
      .where('pedidos.id', id)
      .first();
  },

  async create(dados) {
    const [id] = await db(TABELA).insert(dados);
    return this.show(id);
  },

  async atualizarStatus(id, novoStatus) {
    await db(TABELA).where({ id }).update({ status: novoStatus });
    return this.show(id);
  },

  async listarPorUsuario(usuarioId) {
    return db(TABELA)
      .innerJoin('usuarios', 'pedidos.usuario_id', 'usuarios.id')
      .innerJoin('produtos', 'pedidos.produto_id', 'produtos.id')
      .innerJoin('categorias', 'produtos.categoria_id', 'categorias.id')
      .select(COLUNAS)
      .where('pedidos.usuario_id', usuarioId)
      .orderBy('pedidos.criado_em', 'desc');
  }
};