type Foo = {
  [key: string]: any
  foo(): void
}
type A = RemoveIndexSignature<Foo> // expect { foo(): void }

type RemoveIndexSignature<T extends object> = {
  [
    key in keyof T
      as key extends `${infer k}` ? k : never
  ]: T[key]
}

type RemoveIndexSignature2<T, P = PropertyKey> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K]
}

