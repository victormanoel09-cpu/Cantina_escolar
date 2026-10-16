const repositorio = require('../repositories/pedidos.repository');
const produtosRepositorio = require('../repositories/produtos.repository');
const usuariosRepositorio = require('../repositories/usuarios.repository');
const { criarErro } = require('./erros');

module.exports = {
    async index(filtros) {
        const pedidos = await repositorio.index(filtros);
        return pedidos.map(formatar);
    },

    async show(id) {
        const pedido = await repositorio.show(id);
        if (!pedido) {
            throw criarErro('Pedido não encontrado', 404);
        }
        return formatar(pedido);
    },

    async create(dados) {
        const { usuario_id, produto_id, quantidade } = dados;

        if (!usuario_id || !produto_id || !quantidade) {
            throw criarErro('usuario_id, produto_id e quantidade são obrigatórios', 400);
        }

        // Valida se o usuário existe
        const usuario = await usuariosRepositorio.show(usuario_id);
        if (!usuario) {
            throw criarErro('Usuário inexistente', 400);
        }

        // Valida se o produto existe
        const produto = await produtosRepositorio.show(produto_id);
        if (!produto) {
            throw criarErro('Produto inexistente', 400);
        }

        // Regra de Negócio 1: Não é possível criar pedido de produto com disponivel = false (409)
        if (!produto.disponivel) {
            throw criarErro('Não é possível realizar pedido de um produto indisponível', 409);
        }

        // Regra de Negócio 2: A quantidade precisa ser um inteiro maior que zero (400)
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            throw criarErro('A quantidade deve ser um número inteiro maior que zero', 400);
        }

        // Regra de Negócio 3: O preco_unitario do pedido é copiado do produto no momento da criação
        const preco_unitario = produto.preco;
        const status = 'pendente';

        const criado = await repositorio.create({
            usuario_id,
            produto_id,
            quantidade,
            preco_unitario,
            status
        });

        return formatar(criado);
    },

    async avancarStatus(id) {
        const pedido = await repositorio.show(id);
        if (!pedido) {
            throw criarErro('Pedido não encontrado', 404);
        }

        let novoStatus;
        // Regra de Negócio 5: O status só avança na ordem pendente -> pronto -> entregue
        if (pedido.status === 'pendente') {
            novoStatus = 'pronto';
        } else if (pedido.status === 'pronto') {
            novoStatus = 'entregue';
        } else {
            throw criarErro('O pedido já foi entregue e não pode avançar de status', 400);
        }

        const atualizado = await repositorio.atualizarStatus(id, novoStatus);
        return formatar(atualizado);
    },

    async cancelar(id) {
        const pedido = await repositorio.show(id);
        if (!pedido) {
            throw criarErro('Pedido não encontrado', 404);
        }

        // Regra de Negócio 6: Só é possível cancelar um pedido que ainda esteja pendente
        if (pedido.status !== 'pendente') {
            throw criarErro('Só é possível cancelar pedidos que estejam com status pendente', 400);
        }

        const atualizado = await repositorio.atualizarStatus(id, 'cancelado');
        return formatar(atualizado);
    }
};

// Função de formatação para estruturar a resposta aninhada exigida pela especificação
function formatar(linha) {
    const precoUnitario = Number(linha.preco_unitario);
    const quantidade = Number(linha.quantidade);

    return {
        id: linha.id,
        quantidade: quantidade,
        precoUnitario: precoUnitario,
        total: quantidade * precoUnitario, // Regra de Negócio 4: calculado na resposta
        status: linha.status,
        criadoEm: linha.criado_em,
        usuario: {
            id: linha.usuario_id,
            nome: linha.usuario_nome
        },
        produto: {
            id: linha.produto_id,
            nome: linha.produto_nome,
            categoria: linha.categoria_nome
        }
    };
}