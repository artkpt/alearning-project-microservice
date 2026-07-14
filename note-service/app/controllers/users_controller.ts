import User from '#models/user'
import { userValidator } from '#validators/userValidator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async createUser({request, auth, bouncer, response}: HttpContext){
        const payload = await request.validateUsing(userValidator)
        const user = auth.getUserOrFail()
        await bouncer.with('UserPolicy').authorize('createUser')
        
        const newUser = await User.create({
            username: payload.username,
            email: payload.email,
            password: payload.password,
            role: payload.role,
            isActive: true,
            createdBy: user.id,
            firstname: payload.firstname,
            lastname: payload.lastname
        })

        return response.status(201).send(newUser)
    }
}