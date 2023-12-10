import { Request, Response, Router } from 'express'
import { apiDocument } from '../../decorators/document.decorator'
import { OptionResponseReturn } from '../../lib/core-fp/fp'
import { passed } from '../../lib/core-fp/option'
import { schemaMiddleware } from '../../middlewares/schema.middleware'
import { Controller } from '../../utils'
import { testSchema } from './schema'

enum UrlParams {
  HEALTH = '/health',
  TEST = '/test',
}

class HealthCheckContrller implements Controller {
  public initRoutes() {
    const r = Router()

    r.get(UrlParams.HEALTH, this.handleHealthCheck)
    r.post(UrlParams.TEST, schemaMiddleware(testSchema), this.testBodyData)
    return r
  }

  @apiDocument({
    url: UrlParams.HEALTH,
    method: 'GET',
    description: 'health check를 하는 함수입니다.',
  })
  private handleHealthCheck(req: Request, res: Response) {
    const healthCheck = passed<string>('success')
    return OptionResponseReturn(
      healthCheck,
      res,
      (res) => res.status(200).json(healthCheck),
      (res) => res.status(500).json(healthCheck)
    )
  }

  @apiDocument({
    url: UrlParams.TEST,
    method: 'POST',
    description: 'test 하는 함수입니다.',
  })
  private testBodyData(req: Request, res: Response) {
    const test = passed<string>('test')
    return OptionResponseReturn(
      test,
      res,
      (res) => res.status(200).json(test),
      (res) => res.status(500).json(test)
    )
  }
}

export const healthController = new HealthCheckContrller()
