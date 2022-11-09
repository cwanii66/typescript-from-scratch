// expected to be 'foo' & 42 & true
type I = UnionToIntersection<'foo' | 42 | true>

type UnionToIntersection<U> = // if you want to find an argument(using keyword infer) satisfying U and V, the type of it must be U & V;
  (U extends any ? (arg: U) => any : never) extends 
    ((arg: infer I) => any) ? I : never

// 1. generate the union functions
type A<U> = (U extends any ? (arg: U) => any : never)
// 2. extends (x: infer V) => any ? V : never will find the function that is superset of above union. 
  // The function that satisfy the condition is that (x: 'foo' & 42 & true) => any

// 3. get the answer. It is the type of the argument of obtained function.


type C = 'foo' & true & 42 // never


