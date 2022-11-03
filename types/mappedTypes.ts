// Mapped types build on the syntax for index signatures
interface Horse {
  name: string
}
type OnlyBoolsAndHorse = {
  [key: string]: boolean | Horse
}
// Mapped type is a generic type which uses a union of PropertyKeys to iterate through keys to create a type
type OptionsFlags<Type> = {
  [P in keyof Type]: boolean
}
type FeatureFlags = {
  darkMode: () => void
  newUserProfile: () => void
}
type FeatureOptions = OptionsFlags<FeatureFlags>

// Mapping Modifiers
// readonly and ?
// we can remove or add these modifiers by prefixing with - or +
    // normally we don't add a prefix, then + is assumed
type CreateMutable<Type> = {
  -readonly [P in keyof Type]: Type[P]
}
type LockedAccount = {
  readonly id: string
  readonly name: string
}
type UnlockedAccount = CreateMutable<LockedAccount>

// Remove 'Optional'
type Concrete<T> = {
  [P in keyof T]-?: T[P]
}


// Key Remapping via as
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
}
interface Person {
  name: string
  age: number
  location: string
}
type LazyPerson = Getters<Person>

// filter out keys by producing never via a confitional type
type MyExclude<T, U> = T extends U ? never : T
type RemoveKindField<T> = {
  [P in keyof T as MyExclude<P, 'kind'>]: T[P]
}
interface Circle {
  kind: 'circle'
  radius: number
}
type KindlessCircle = RemoveKindField<Circle>

// map over arbitrary unions
type EventConfig<Event extends { kind: string }> = {
  [E in Event as E['kind']]: (event: E) => void
}
type SquareEvent = {
  kind: 'square'
  x: number
  y: number
}
type CircleEvent = {
  kind: 'circle'
  radius: number
}
type Config = EventConfig<SquareEvent | CircleEvent>


// Further Exploration
// introduce conditional types
type ExtractPII<T> = {
  [P in keyof T]: T[P] extends { pii: true } ? true : false
}
type DBField = {
  id: {
    format: 'increment'
  }
  name: {
    type: string
    pii: true
  }
}
type ObjectsNeedingGDPRDeletion = ExtractPII<DBField>

