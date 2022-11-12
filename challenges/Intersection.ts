type Res = Intersection<[[1, 2], [2, 3], [2, 2]]> // expected 2
type Res1 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>; // expected to be 2 | 3
type Res2 = Intersection<[[1, 2], [3, 4], [5, 6]]>; // expected to be never
type Res3 = Intersection<[[1, 2, 3], [2, 3, 4], 3]>; // expected to be 3
type Res4 = Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>; // expected to be 2 | 3
type Res5 = Intersection<[[1, 2, 3], 2, 3]>; // expected to be never
/**
 * Implement the type version of Lodash.
 * intersection with a little difference. 
 * Intersection takes an Array T containing several arrays 
 * or any type element including the union type, 
 * and returns a new union containing all intersection elements.
 */
type Intersection<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    ? (First extends unknown[]
      ? First[number]
      : First) & Intersection<Rest>
    : unknown

