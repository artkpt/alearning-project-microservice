import User from '#models/user'
import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import { sessionUserProvider } from '@adonisjs/auth/session'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'
import { BaseJwtContent, JwtGuardUser } from '@maximemrf/adonisjs-jwt/types'

interface JwtContent extends BaseJwtContent{
  username: string
}

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/user')
      }),
    }),
    jwt: jwtGuard({
      tokenExpiresIn: '1h',
      useCookies: false,
      provider: sessionUserProvider({
        model: () => import('#models/user')
      }),
      // if you want to use refresh tokens, you have to set the refreshTokenUserProvider
      refreshTokenUserProvider: tokensUserProvider({
        tokens: 'refreshTokens',
        model: () => import('#models/user'),
      }),
      // optionally set the expiry for the refresh token
      refreshTokenExpiresIn: '7d',
      // ability to separate cookie usage for refresh token
      useCookiesForRefreshToken: true,
      // ability to configure the cookies options
      cookie: {
        httpOnly: true,
        secure: true,
      },
      // limit the abilities of the refresh token
      refreshTokenAbilities: ['refresh_token'],
      content: (user: JwtGuardUser<User>):JwtContent => ({
        userId: user.getId(),
        username: user.getOriginal().username
      })
    })
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}

