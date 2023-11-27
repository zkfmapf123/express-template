import { Request, Response, Router } from 'express'
import { apiDocument } from '../../decorators/document.decorator'
import { Controller } from '../../utils'

class HealthCheckContrller implements Controller {
  public initRoutes() {
    const r = Router()

    r.get('/', this.handleHealthCheck)
    r.post('/test', this.testBodyData)
    return r
  }

  private handleHealthCheck(req: Request, res: Response) {
    return res.status(200).send('OK')
  }

  @apiDocument({
    url: '/test',
    method: 'POST',
    description: 'test 하는 함수입니다.',
  })
  private testBodyData(req: Request, res: Response) {
    console.log(req.body)
    return res.status(200).json('ok')
  }
}

export const healthController = new HealthCheckContrller()
