import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RequireAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (!ctx.user) {
      return ctx.response.unauthorized({ message: 'Login required for this endpoint' })
    }
    return next()
  }
}