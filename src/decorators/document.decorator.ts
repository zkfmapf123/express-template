import { logger } from '../configs'
import { DocumentDecoratorParams } from '../utils'

export function apiDocument({ url, method, description }: DocumentDecoratorParams) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    logger.debug("method : ", method, "url ", url, "desc : ", description)
  }
}
