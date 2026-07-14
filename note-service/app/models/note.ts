import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Topic from './topic.js'
import User from './user.js'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare visibility: 'public' | 'private'

  @column()
  declare ownerId: number

  @column()
  declare isShadow: boolean

  @column()
  declare description: string | null

  @column()
  declare content: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(()=> Topic, {
    pivotTable: 'tags'
  })
  declare topics: ManyToMany<typeof Topic>

  @belongsTo(()=> User, {
    foreignKey: 'ownerId',
    localKey: 'id'
  })
  declare owner: BelongsTo<typeof User>
}