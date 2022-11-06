declare const config: Chainable
const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', {
    value: 'hello'
  })
  .get()
// expected type
interface result {
  foo: number
  name: string
  bar: {
    value: string
  }
}

interface Chainable<T = {}> {
  option: <K extends string, V>
  (
    key: K extends keyof T
      ? V extends T[K] ? never : K
      : K,
    value: V
  ) => Chainable<Omit<T, K> & Record<K, V>>
  get: () => T
}


