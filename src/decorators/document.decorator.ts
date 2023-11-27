import { DocumentDecoratorParams } from '../utils'

export function apiDocument({ url, method, description }: DocumentDecoratorParams) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.debug(method, url, description)
  }
}
