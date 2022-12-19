type StringToNumber = {
  mapFrom: string // value of key which value is string
  mapTo: number // will eb transformed for number
}
type ExampleA = MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }

type StringToDate = { mapFrom: string; mapTo: Date;}
type ExampleB = MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }

type ExampleC = MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }

type MapTypes<T, R extends { mapFrom: any; mapTo: any}> = {
  [K in keyof T]:
    T[K] extends R['mapFrom']
      ? R extends { mapFrom: T[K] }
        ? R['mapTo']
        : never
      : T[K]
}
