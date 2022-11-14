type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'

type Replace<
  S extends string, 
  From extends string, 
  To extends string
> =
  From extends ''
    ? S
    : S extends `${infer V}${From}${infer R}`
      ? `${V}${To}${R}`
      : S
