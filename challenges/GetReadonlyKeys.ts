interface Chris {
  readonly name: 'chris',
  readonly age: 22,
  learning: 'typescript'
}

type ReadonlyPartForChris = GetReadonlyKeys<Chris>

type GetReadonlyKeys<T extends object> = {
  [P in keyof T]-?: IfEqual<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >
}[keyof T]

// the assignability rule for conditional types, 
// ---> requires that the types after extends be "identical" as that is defined by the checker
type IfEqual<X, Y, A, B> = 
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2 )
      ? A
      : B
