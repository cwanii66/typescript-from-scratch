type Data = {
  foo: {
    bar: {
      value: 'foobar',
      count: 6,
    },
    included: true,
  },
  hello: 'world'
}
type A = Get<Data, 'hello'> // world
type B = Get<Data, 'foo.bar.count'> // 6
type C = Get<Data, 'foo.bar'> // { value: 'foobar', count: 6 }

type Get<T, K extends string> =
  K extends `${infer A}.${infer B}` // construct literal template for type inference
    ? A extends keyof T ? Get<T[A], B> : never
    : K extends keyof T ? T[K] : never
