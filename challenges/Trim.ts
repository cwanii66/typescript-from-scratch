type trimmedString = Trim2<'   Hello World   '>

type Space_Trim = ' ' | '\n' | '\t'
type Trim1<S extends string> =
  S extends `${Space_Trim}${infer F}`
    ? Trim1<F>
    : S extends `${infer L}${Space_Trim}`
      ? Trim1<L>
      : S
type Trim2<S extends string> =
  S extends `${Space_Trim}${infer T}` | `${infer T}${Space_Trim}`
    ? Trim2<T>
    : S
