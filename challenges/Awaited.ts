type ExampleType = Promise<string>
type ExampleType2 = Promise<Promise<symbol>>
type Result = MyAwaited<ExampleType> // string
type Result2 = MyAwaited<ExampleType2>

type MyAwaited<T> = 
  T extends Promise<infer R> 
    ? R extends Promise<unknown>
      ? MyAwaited<R>
      : R
    : T
