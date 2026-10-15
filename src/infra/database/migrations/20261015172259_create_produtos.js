exports.up = function (knex) {
  return knex.schema.createTable("produtos", function (table) {
    table.increments("id").primary();
    table.string("nome").notNullable();
    table.decimal("preco").notNullable().defaultTo(1);
    table.boolean("disponivel").notNullable().defaultTo(true);
    table.integer("categoria_id").notNullable().references("id").inTable("categorias");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("produtos");
};