exports.up = function (knex) {
  return knex.schema.createTable("pedidos", function (table) {
   table.increments("id").primary();
   table.integer("quantidade").notNullable().defaultTo(1);
   table.decimal("preco_unitario").notNullable();
   table.string("status").defaultTo("pendente");
   table.timestamp("criado_em").defaultTo(knex.fn.now());
   table.integer("usuario_id").notNullable().references("id").inTable("usuarios");
   table.integer("produto_id").notNullable().references("id").inTable("produtos");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pedidos");
};