import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export const schemaMiddleware = (schema: Joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if (!error) {
      return next()
    }

    const errorDetails = error?.details?.map((ms) => ms.message)
    return res.status(400).json({
      msg: errorDetails,
    })
  }
}
