type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]

// iterate every type at tuple
type FilterOut<T extends unknown[], F> =
  T extends [infer A, ...infer Rest]
    ? [A] extends [F]
      ? FilterOut<Rest, F>
      : [A, ...FilterOut<Rest, F>]
    : []
