import { isFail, Options } from './option'

export const OptionResponseReturn = <T, E, R>(o: Options<T, E>, res: R, successFn: (res: R) => void, failedFn: (res: R) => void) => {
  if (isFail(o)) return failedFn(res)
  return successFn(res)
}
