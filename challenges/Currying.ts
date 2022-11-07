const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)

declare function Currying<F>(fn: F): Curried<F>
type Curried<F> =
  F extends (...args: infer A) => infer R // we don't know the argType and returnType
  ? A['length'] extends 1
    ? (arg: Shift<A>) => R
    : (arg: Shift<A>) => Curried<(...args: GetShiftedArrayType<A>) => R>
  : never
  
type GetShiftedArrayType<T> = T extends [unknown, ...infer Rest] ? Rest : never
type Shift<T> = T extends [infer First, ...unknown[]] ? First : never
