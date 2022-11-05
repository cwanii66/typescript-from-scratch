namespace Challenge10 {
  type Arr = ['1', '2', '3']
  type Test = TupleToUnion<Arr>

  /**
   * 实现泛型TupleToUnion<T>，它返回元组所有值的合集。
   */
  // export type TupleToUnion<T extends any[]> = T[number]
  export type TupleToUnion<T> = T extends Array<infer i> ? i : never
}
