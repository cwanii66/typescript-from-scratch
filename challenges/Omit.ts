// 不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。
// Omit 会创建一个省略 K 中字段的 T 对象。

interface Todo {
  title: string
  description: string
  completed: boolean
}
type TodoPreview = MyOmit<Todo, 'description' | 'title'>
const todo: TodoPreview = {
  completed: false
}

// You can filter out keys by producing never via a conditional type
type MyExclude<A, B> = A extends B ? never : A
type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P]
}
// As of TypeScript 4.1, we can make use of key remapping via as and inline the Exclude:
type MyOmit2<T, K extends keyof T> = {
  [P in keyof T as MyExclude<P, K>]: T[P]
}
