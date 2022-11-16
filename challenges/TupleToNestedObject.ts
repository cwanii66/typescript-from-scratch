type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject2<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type

type TupleToNestedObject<T extends unknown[], U> =
  T extends [infer First, ...infer Rest]
    ? Record<First&string, TupleToNestedObject<Rest, U>>
    : U
type TupleToNestedObject2<T, U> =
  T extends [infer F, ...infer R]
    ? {
      [K in F&string]: TupleToNestedObject<R, U>
    }
    : U
