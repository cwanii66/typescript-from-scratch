type foo = {
  name: string
  age: string
}
type coo = {
  age: number
  sex: string
}

type MergedResult = Merge2<foo, coo>
// merge two types and the second override the first
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never
}
type Merge2<F, S> = {
  [K in keyof (F & S)]: K extends keyof S
    ? S[K]
    : (F & S)[K]
}
