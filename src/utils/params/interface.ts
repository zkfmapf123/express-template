import { NextFunction, Request, Response } from 'express'
import { envParams } from '../../configs'

// Controllers
export interface Controller {
  initRoutes(): any
}

export type Middlewares = (req: Request, res: Response, next: NextFunction) => void

export interface Configs {
  init(env: envParams): Promise<void>
  beforeHook(): void
  afterHook(): void
}
