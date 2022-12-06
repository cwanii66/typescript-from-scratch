type case1 = IsUnion<string>  // false
type case2 = IsUnion<string|number>  // true
type case3 = IsUnion<[string|number]>  // false

type IsUnion<T, B = T> =
  T extends B
    ? [B] extends [T] // Tuple can avoid type distribute
      ? false
      : true
    : never
