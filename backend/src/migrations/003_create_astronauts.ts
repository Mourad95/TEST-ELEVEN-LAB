import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('astronauts', (table) => {
    table.increments('id').primary();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.integer('originPlanetId').unsigned().references('id').inTable('planets');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('astronauts');
}
