import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable()
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
      table.integer('note_id').unsigned().notNullable()
            .references('id').inTable('notes').onDelete('CASCADE')
      table.integer('topic_id').unsigned().notNullable().references('id').inTable('topics')
      table.unique(['note_id', 'topic_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}