type trimed = TrimLeft1<'  Hello World  '> // expected to be 'Hello World  '

type Space = ' ' | '\n' | '\t'
type TrimLeft1<S extends string> =
  S extends `${Space}${infer R}`
    ? TrimLeft1<R>
    : S

