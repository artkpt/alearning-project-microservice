import Tag from '#models/tag'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Tag.createMany([
      {
        noteId: 1,
        topicId: 1   
      },
      {
        noteId: 1,
        topicId: 2   
      },
      {
        noteId: 5,
        topicId: 2   
      },
      {
        noteId: 4,
        topicId: 2   
      }
    ])
  }
}