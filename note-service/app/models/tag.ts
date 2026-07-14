import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Note from './note.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Topic from './topic.js'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare noteId: number
  @column()

  declare topicId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(()=> Note)
  declare note: BelongsTo<typeof Note>

  @belongsTo(()=> Topic)
  declare topic: BelongsTo<typeof Topic>
}