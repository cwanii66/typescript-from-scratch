type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }

type OmitByType<T extends object, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
} // remapped keys
