type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}
type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type DeepReadonlyRes = DeepReadOnly<X>

/**
 * 实现一个通用的DeepReadonly<T>，
 * 它将对象的每个参数及其子对象递归地设为只读。
 */
type DeepReadOnly<T> = 
  keyof T extends never // set up of the base case: recursion stops if T is no longer an object
    ? T
    : {
      readonly [P in keyof T]: DeepReadOnly<T[P]>
    }
