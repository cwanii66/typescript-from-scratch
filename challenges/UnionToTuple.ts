/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersectionHere<U> = (
  U extends unknown ? (arg: U) => void : never
) extends (arg: infer R) => void ? R : never

/**
 * LastInUnion<1 | 2> = 2.
 */
type LastInUnion<U> = UnionToIntersectionHere<
  U extends unknown ? (x: U) => void : never
> extends (x: infer L) => void ? L : never
// when function intersect, TS pick the last signature in the overload

/**
 * @description Implement a type, UnionToTuple, that converts a union to a tuple.
 */
type UnionToTuple<U, Last = LastInUnion<U>> =
  [U] extends [never]
    ? []
    : [...UnionToTuple<Exclude<U, Last>>, Last]
