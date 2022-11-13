export interface Cat {
  type: 'cat',
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal',
}
export interface Dog {
  type: 'dog',
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer',
  color: 'brown' | 'white' | 'black',
}
export interface Rabbit {
  type: 'rabbit',
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer',
  color: 'brown' | 'white' | 'black',
}

export type MyDogType = LookUp<Cat | Dog, 'dog'>
export type MyUnionAnimalType = LookUp2<Cat | Dog | Rabbit, 'cat' | 'rabbit'>

export type LookUp<U, K> = U extends { type: K } ? U : never
export type LookUp2<T, K extends string | number | symbol> = {
  [P in K]: T extends { type: P } ? T : never
}[K]
