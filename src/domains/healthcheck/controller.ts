import { Request, Response, Router } from 'express'
import { apiDocument } from '../../decorators/document.decorator'
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
    return res.status(200).send('OK')
  }

  @apiDocument({
    url: UrlParams.TEST,
    method: 'POST',
    description: 'test 하는 함수입니다.',
  })
  private testBodyData(req: Request, res: Response) {
    return res.status(200).json('ok')
  }
}

export const healthController = new HealthCheckContrller()
