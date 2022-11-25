type ResultForRequiredKeys = RequiredKeys2<{ foo: number; bar?: string }>;
// expected to be “foo”

type RequiredKeys<T, K = keyof T> =
  K extends keyof T
    ? T extends Required<Pick<T, K>>
      ? K
      : never
    : never

type IfEqualForRequiredKeys2<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2)
      ? A
      : B
type RequiredKeys2<T> = Required<{
  [P in keyof T]: IfEqualForRequiredKeys2<{
    [K in P]: T[K]
  },
  {
    [K in P]-?: T[K]
  },
  P,
  never
>
}>[keyof T]
