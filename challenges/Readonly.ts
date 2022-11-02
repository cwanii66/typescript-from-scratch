interface Todo2 {
  title: string
  description: string
}

const todo2: MyReadonly<Todo2> = {
  title: 'Hey',
  description: 'MyReadonly'
}

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
// todo2.title = 'hello'
// todo2.description = 'something';
