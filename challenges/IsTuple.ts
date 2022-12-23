type case1 = IsTuple<[number]> // true
type case2 = IsTuple<readonly [number]> // true
type case3 = IsTuple<number[]> // false

type IsTuple<
  T extends unknown[]
    |
  readonly unknown[]
> = T extends readonly any[]
  ? number extends T['length'] // to be a tuple, T['length'] needs to exact number type and not just number type
    ? false
    : true
  : false
