import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
          {
            username: "admin",
            email: "admin",
            password: "admin",
            role: "admin",
            isActive: true
          },
          {
            username: "user",
            email: "user",
            password: "user",
            role: "user",
            isActive: true
          },
    ])
  }
}