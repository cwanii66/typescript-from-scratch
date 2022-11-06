interface TodoForReadonly2 {
  title: string
  description: string
  completed: boolean
}
const todo: MyReadonly2<TodoForReadonly2, 'title' | 'description'> = {
  title: 'hey',
  description: 'foo',
  completed: false
}


/**
 * 通用MyReadonly2<T, K>，它带有两种类型的参数T和K。
 * K指定应设置为Readonly的T的属性集。
 * 如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。
 */
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & Omit<T, K>
