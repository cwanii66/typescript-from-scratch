const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type A = MyReturnType<typeof fn> // should infer type "1 | 2"

// 产生条件的时候存在推断，在conditional types 里我们可以infer 一个type param 在true branch
type MyReturnType<T extends Function> =
  T extends (...args: any) => infer R
    ? R 
    : never

