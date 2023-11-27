import { NextFunction, Request, Response } from 'express'

// Controllers
export interface Controller {
  initRoutes(): any
}

export type Middlewares = (req: Request, res: Response, next: NextFunction) => void
