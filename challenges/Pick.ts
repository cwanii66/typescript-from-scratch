interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

type MyPick<T, K extends keyof T> = {
  [k in K]: T[k]
}

/**
 * @keyof 取interface的键，保存为联合类型
 * @in 取联合类型的值，主要用于数组和对象的构建
 */
