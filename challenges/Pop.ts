type arr11 = ['a', 'b', 'c', 'd']
type arr22 = [3, 2, 1]

type re1 = Pop<arr11> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr22> // expected to be [3, 2]

/**
 * 实现一个通用Pop<T>，
 * 它接受一个数组T，
 * 并返回一个由数组T的前length-1项以相同的顺序组成的数组。
 */
type Pop<T extends unknown[]> = T extends [...infer F, unknown] ? F : never
type Push<T extends unknown[], U> = [...T, U]
type Shift<T extends unknown[]> = T extends [unknown, ...infer L] ? L : never
type Unshift<T extends unknown[], U> = [U, ...T]
