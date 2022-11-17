/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object
  
  ### Question
  
  Implement the type version of ```Object.entries```
  
  For example 
  
  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```
  
  > View on GitHub: https://tsch.js.org/2946
*/


/* _____________ Your Code Here _____________ */
type RemoveUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>

type ObjectEntries1<T> = {
  [K in keyof Required<T>]: [K, T[K]]
}[keyof T]

type ObjectEntries<T> = {
  [K in keyof T]-?: [K, Exclude<T[K], undefined>]
}[keyof T]

type ObjectEntries2<T, U extends keyof T = keyof T> =
  U extends unknown
    ? [U, T[U] extends (infer F | undefined)
      ? F extends never
        ? undefined
        : F
      : T[U]]
  : never

interface Model {
  name: string
  age: number
  locations: string[] | null
  nonsense: undefined
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type test1 = ObjectEntries<Model>
type test2 = ObjectEntries1<Model>
type test3 = ObjectEntries2<Model>
/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/
