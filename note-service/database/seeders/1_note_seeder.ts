import Note from '#models/note'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Note.createMany([
      {
        title: "Private Admin",
        visibility: "private",
        ownerId: 1,
        description: "This is description of Private for Admin",
        content: "This is content of Private for Admin"
      },
      {
        title: "Public Admin",
        visibility: "public",
        ownerId: 1,
        content: "This is content of Public Admin"
      },
      {
        title: "Private User",
        visibility: "private",
        ownerId: 2,
        description: "This is description of Private for User",
        content: "This is content of Private User",
      },
      {
        title: "Public User",
        visibility: "public",
        ownerId: 2,
        description: "This is description of Public for User",
        content: "This is content of Public User",
      },
      {
        title: "INT690 Full stack",
        visibility: "public",
        ownerId: 2,
        description: "Get A",
        content: "GET A"
      },
    ])
  }
}