export interface DocumentDecoratorParams {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  description: string
}
