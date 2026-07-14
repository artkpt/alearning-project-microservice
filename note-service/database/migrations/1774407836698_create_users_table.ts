import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unsigned().unique()
      table.string('username',50).notNullable().unique()
      table.string('email').unique()
      table.string('password').notNullable()
      table.string('role').notNullable().defaultTo('user')
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
      table.tinyint('is_active', 1).notNullable().defaultTo(1)
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.string('firstname',50)
      table.string('lastname',50)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}