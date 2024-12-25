////////////////////////////// Passed //////////////////////////////
type Pass<T> = {
  tag: 'pass'
  data: T
  error: null
}

export const passed = <T>(data: T): Pass<T> => ({
  tag: 'pass',
  data,
  error: null,
})

////////////////////////////// Failed //////////////////////////////
type Fail<E> = {
  tag: 'fail'
  data: null
  error: E
}

export const failed = <E>(error: E): Fail<E> => ({
  tag: 'fail',
  data: null,
  error,
})

////////////////////////////// Options //////////////////////////////
export type Options<T, E> = Pass<T> | Fail<E>
export const isPass = <T, E>(p: Options<T, E>): p is Pass<T> => p.tag === 'pass'
export const isFail = <T, E>(p: Options<T, E>): p is Fail<E> => p.tag === 'fail'
