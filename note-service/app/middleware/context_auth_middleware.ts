import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export class GatewayUser {
  public id: number
  public role: string

  constructor(data: { id: number; role: string }) {
    this.id = data.id
    this.role = data.role
  }
}

export default class ContextAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const userId = ctx.request.header('x-user-id')
    const userRole = ctx.request.header('x-user-role') || 'user'

    if (userId) {
      ctx.user = new GatewayUser({
        id: Number(userId),
        role: userRole
      })
    }

    return next()
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    user?: GatewayUser
  }
}