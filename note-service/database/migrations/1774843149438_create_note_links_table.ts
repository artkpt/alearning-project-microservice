import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'note_links'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable()
      table.integer('source_note_id').unsigned().notNullable().references('id').inTable('notes')
      table.integer('target_note_id').unsigned().notNullable().references('id').inTable('notes')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}