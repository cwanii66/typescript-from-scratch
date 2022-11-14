type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number

type AppendArgument<Fn, A> = 
  Fn extends (...args: infer R) => infer T
    ? (...args: [...R, A]) => T 
    : never
