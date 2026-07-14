import Note from '#models/note'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Note.createMany([
      {
        title: "Private Admin",
        slug: "private-for-admin",
        visibility: "private",
        ownerId: 1,
        isShadow: false,
        description: "This is description of Private for Admin",
        content: "This is content of Private for Admin"
      },
      {
        title: "Public Admin",
        slug: "public-admin",
        visibility: "public",
        ownerId: 1,
        isShadow: false,
        content: "This is content of Public Admin"
      },
      {
        title: "Private User",
        slug: "private-user",
        visibility: "private",
        ownerId: 2,
        isShadow: false,
        description: "This is description of Private for User",
        content: "This is content of Private User",
      },
      {
        title: "Public User",
        slug: "public-user",
        visibility: "public",
        ownerId: 2,
        isShadow: false,
        description: "This is description of Public for User",
        content: "This is content of Public User",
      },
      {
        title: "INT690 Full stack",
        slug: "test2",
        visibility: "public",
        ownerId: 2,
        isShadow: false,
        description: "Get A",
        content: "GET A"
      },
    ])
  }
}