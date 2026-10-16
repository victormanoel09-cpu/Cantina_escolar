const repositorio = require('../repositories/produtos.repository');
const categoriasRepositorio = require('../repositories/categorias.repository');
const { criarErro } = require('./erros');

module.exports = {
    async index(filtros) {
        const produtos = await repositorio.index(filtros);
        return produtos.map(formatar);
    },

    async show(id) {
        const produto = await repositorio.show(id);
        if (!produto) {
            throw criarErro('Produto não encontrado', 404);
        }
        return formatar(produto);
    },

    async create(dados) {
        await validarDados(dados);
        const produto = await repositorio.create(dados);
        return formatar(produto);
    },

    async update(id, dados) {
        const produtoAtual = await repositorio.show(id);
        if (!produtoAtual) {
            throw criarErro('Produto não encontrado', 404);
        }

        await validarDados(dados);
        const produtoAtualizado = await repositorio.update(id, dados);
        return formatar(produtoAtualizado);
    },

    async atualizarDisponibilidade(id, disponivel) {
        const produto = await repositorio.show(id);
        if (!produto) {
            throw criarErro('Produto não encontrado', 404);
        }

        if (typeof disponivel !== 'boolean') {
            throw criarErro('O campo disponivel deve ser booleano', 400);
        }

        const atualizado = await repositorio.atualizarDisponibilidade(id, disponivel);
        return formatar(atualizado);
    },

    async delete(id) {
        const produto = await repositorio.show(id);
        if (!produto) {
            throw criarErro('Produto não encontrado', 404);
        }

        return repositorio.delete(id);
    }
};

// Função interna de validação
async function validarDados(dados) {
    const { nome, preco, categoria_id } = dados;

    if (!nome || preco === undefined || !categoria_id) {
        throw criarErro('Nome, preço e categoria_id são obrigatórios', 400);
    }

    // Regra: Preço maior que zero
    if (typeof preco !== 'number' || preco <= 0) {
        throw criarErro('O preço deve ser maior que zero', 400);
    }

    // Verificar se a categoria informada existe
    const categoria = await categoriasRepositorio.show(categoria_id);
    if (!categoria) {
        throw criarErro('Categoria informada não existe', 400);
    }
}

// Função de formatação para resposta aninhada (Aula 8)
function formatar(linha) {
    return {
        id: linha.id,
        nome: linha.nome,
        preco: linha.preco,
        disponivel: Boolean(linha.disponivel),
        categoria: {
            id: linha.categoria_id,
            nome: linha.categoria_nome
        }
    };
}