import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unsigned().unique()
      table.string('title',100).notNullable()
      table.string('slug',100).notNullable().unique()
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
      table.enum('visibility', ['public', 'private']).notNullable()
      table.integer('owner_id').unsigned().notNullable()
            .references('id').inTable('users').onDelete('CASCADE')

      table.tinyint('is_shadow', 1).notNullable()
      table.string('description',300)
      table.text('content', 'mediumtext')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}