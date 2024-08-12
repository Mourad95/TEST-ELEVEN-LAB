import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('planets', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.boolean('isHabitable').notNullable();
    table.integer('imageId').unsigned().references('id').inTable('images');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('planets');
}
