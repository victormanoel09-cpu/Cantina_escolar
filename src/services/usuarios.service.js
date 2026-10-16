const repositorio = require('../repositories/usuarios.repository');
const { criarErro } = require('./erros');

module.exports = {
    async index() {
        return repositorio.index();
    },

    async show(id) {
        const usuario = await repositorio.show(id);
        if (!usuario) {
            throw criarErro('Usuário não encontrado', 404);
        }
        return usuario;
    },

    async create(dados) {
        const { nome, email, matricula } = dados;

        if (!nome || !email || !matricula) {
            throw criarErro('Nome, e-mail e matrícula são obrigatórios', 400);
        }

        // Regra de Negócio 8: E-mail e matrícula únicos
        const emailExistente = await repositorio.buscarPorEmail(email);
        if (emailExistente) {
            throw criarErro('E-mail já cadastrado', 409);
        }

        const matriculaExistente = await repositorio.buscarPorMatricula(matricula);
        if (matriculaExistente) {
            throw criarErro('Matrícula já cadastrada', 409);
        }

        return repositorio.create(dados);
    },

    async update(id, dados) {
        const usuario = await repositorio.show(id);
        if (!usuario) {
            throw criarErro('Usuário não encontrado', 404);
        }

        if (dados.email) {
            const emailExistente = await repositorio.buscarPorEmail(dados.email);
            if (emailExistente && emailExistente.id !== id) {
                throw criarErro('E-mail já cadastrado por outro usuário', 409);
            }
        }

        if (dados.matricula) {
            const matriculaExistente = await repositorio.buscarPorMatricula(dados.matricula);
            if (matriculaExistente && matriculaExistente.id !== id) {
                throw criarErro('Matrícula já cadastrada por outro usuário', 409);
            }
        }

        return repositorio.update(id, dados);
    },

    async delete(id) {
        const usuario = await repositorio.show(id);
        if (!usuario) {
            throw criarErro('Usuário não encontrado', 404);
        }

        return repositorio.delete(id);
    }
};