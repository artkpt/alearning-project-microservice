import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    async login({auth, request, response}:HttpContext){
        const {username, password} = request.body()
        const user = await User.verifyCredentials(username, password)
        const jwt = await auth.use('jwt').generate(user)
        return response.ok({
            userId: user.id, 
            username: user.username, 
            role: user.role, 
            accessTokens: jwt.token, 
        })
    }

    async refresh({ auth }:HttpContext){
        // this will authenticate the user using the refresh token
        // it will delete the old refresh token and generate a new one
        // it accepts an optional refresh token, otherwise it looks in:
        // 1. request body 'refreshToken'
        // 2. cookies (if enabled)
        // 3. Authorization header
        return await auth.use('jwt').generateWithRefreshToken()
    }

    async logout({auth, response}:HttpContext){
        await auth.use('jwt').revoke()
        response.ok({message: 'Logged out success'})
    }
}