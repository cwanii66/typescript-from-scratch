type Res = Unique2<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
type Res1 = Unique2<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique2<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
type Res3 = Unique2<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]
type Res4 = Unique2<[unknown, unknown, any, any, never, never]>; // expected to be [unknown, any, never]

type Unique<T extends unknown[], R extends unknown[] = []> =
  T extends [infer F, ...infer L]
    ? Unique<L, F extends R[number] ? R : [...R, F]>
    : R


type IfEqualForUnique<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2)
    ? true
    : false

type Include<T extends unknown, U> =
  T extends [infer Head, ...infer Tail]
    ? IfEqualForUnique<Head, U> extends true
      ? true
      : Include<Tail, U>
    : false

// U --> unique tuple
type Unique2<T extends unknown[], U extends unknown[] = []> =
  T extends [infer Head, ...infer Tail]
    ? Unique2<Tail, Include<U, Head> extends true ? U : [...U, Head]>
    : U


