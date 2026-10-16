exports.seed = async function(knex) {
  // Apagar os dados na ordem inversa da criação antes de inserir[cite: 3]
  await knex('pedidos').del();
  await knex('produtos').del();
  await knex('usuarios').del();
  await knex('categorias').del();

  // 1. Inserir pelo menos 3 categorias[cite: 7]
  await knex('categorias').insert([
    { id: 1, nome: 'Salgados' },
    { id: 2, nome: 'Bebidas' },
    { id: 3, nome: 'Doces' }
  ]);

  // 2. Inserir pelo menos 8 produtos[cite: 7] (com nomes reais de cantina[cite: 3])
  await knex('produtos').insert([
    { id: 1, nome: 'Coxinha', preco: 6.50, disponivel: true, categoria_id: 1 },
    { id: 2, nome: 'Pastel de Carne', preco: 7.00, disponivel: true, categoria_id: 1 },
    { id: 3, nome: 'Empada de Frango', preco: 6.00, disponivel: true, categoria_id: 1 },
    { id: 4, nome: 'Refrigerante Lata', preco: 5.00, disponivel: true, categoria_id: 2 },
    { id: 5, nome: 'Água Mineral', preco: 3.50, disponivel: true, categoria_id: 2 },
    { id: 6, nome: 'Suco Natural', preco: 6.00, disponivel: false, categoria_id: 2 },
    { id: 7, nome: 'Brigadeiro', preco: 2.50, disponivel: true, categoria_id: 3 },
    { id: 8, nome: 'Bolo de Chocolate', preco: 8.00, disponivel: true, categoria_id: 3 }
  ]);

  // 3. Inserir pelo menos 4 utilizadores[cite: 7]
  await knex('usuarios').insert([
    { id: 1, nome: 'Ana Souza', email: 'ana.souza@escola.com', matricula: '2026001' },
    { id: 2, nome: 'Carlos Silva', email: 'carlos.silva@escola.com', matricula: '2026002' },
    { id: 3, nome: 'Beatriz Lima', email: 'beatriz.lima@escola.com', matricula: '2026003' },
    { id: 4, nome: 'Lucas Mendes', email: 'lucas.mendes@escola.com', matricula: '2026004' }
  ]);

  // 4. Inserir pelo menos 6 pedidos[cite: 7]
  await knex('pedidos').insert([
    { id: 1, quantidade: 2, preco_unitario: 6.50, status: 'pendente', usuario_id: 1, produto_id: 1 },
    { id: 2, quantidade: 1, preco_unitario: 5.00, status: 'pronto', usuario_id: 1, produto_id: 4 },
    { id: 3, quantidade: 3, preco_unitario: 2.50, status: 'entregue', usuario_id: 2, produto_id: 7 },
    { id: 4, quantidade: 1, preco_unitario: 7.00, status: 'pendente', usuario_id: 3, produto_id: 2 },
    { id: 5, quantidade: 2, preco_unitario: 3.50, status: 'entregue', usuario_id: 4, produto_id: 5 },
    { id: 6, quantidade: 1, preco_unitario: 8.00, status: 'pronto', usuario_id: 2, produto_id: 8 }
  ]);
};