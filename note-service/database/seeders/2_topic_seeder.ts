import Topic from '#models/topic'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Topic.createMany([
      {
        id: 1,
        name: "frontend"
      },
      {
        id: 2,
        name: "Frontend Dev"
      },
      {
        id: 3,
        name: "development"
      },
      {
        id: 4,
        name: "20%"
      },
      {
        name: "front_dev"
      }
    ])
  }
}