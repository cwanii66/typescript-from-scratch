type Res = Without<[1, 2], 1>; // expected to be [2]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []

type Without<T extends unknown[], U> =
  T extends [infer F, ...infer Rest]
    ? F extends ArrayToUnion<U>
      ? Without<Rest, U>
      : [F, ...Without<Rest, U>]
    : T
type ArrayToUnion<A> =
  A extends Array<infer i>
    ? i
    : A
