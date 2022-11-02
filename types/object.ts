/** Object Types */

interface Person {
  name: string
  age: number
}
function greet({ name, age }: Person) {
  return name + ': ' +age
}
greet({ name: 'chris', age: 21 })

/** ------------------ */ console.log('\n\n') /** ------------------ */

// Property Modifiers

// Optional Properties
type Shape = {}
interface PaintOptions {
  shape: Shape
  xPos?: number
  yPos?: number
}

// readonly Properties
interface SomeType {
  readonly prop: string
}

interface Person2 {
  name: string
  age: number
}
interface ReadonlyPerson {
  readonly name: string
  readonly age: number
}
let writablePerson: Person2 = {
  name: 'wong',
  age: 22,
}
let readonlyPerson: ReadonlyPerson = writablePerson
console.log(readonlyPerson.age)
writablePerson.age++ // readonly properties can also change via aliasing.
console.log(readonlyPerson.age)


// Index Signatures
interface StringArray {
  [index: number]: string
}
// An index signature property type must be either ‘string’ or ‘number’.

// but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.

// "dictionary" pattern
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

// Extending Types
interface BasicAddress {
  name?: string
  street: string
  city: string
  country: string
  postalCode: string
}
interface AddressWithUnit extends BasicAddress {
  unit: string
}
interface Colorful {
  color: string;
}
 
interface Circle1 {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, Circle1 {}
 
const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

// Intersection Types
interface Colorful2 {
  color: string;
}
interface Circle2 {
  radius: number;
}
type ColorfulCircle2 = Colorful2 & Circle2;

// Interfaces vs. Intersections
// how to handle conflicts

// *Generic Object Types
interface Box1 {
  contents: unknown
}
let x: Box1 = {
  contents: "hello world",
};
// we could check 'x.contents'
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}
// or we could use a type assertion
console.log((x.contents as string).toLowerCase());

// One type safe approach would be to instead scaffold out different Box types for every type of contents.
interface NumberBox {
  contents: number;
}
interface StringBox {
  contents: string;
}
interface BooleanBox {
  contents: boolean;
}
// alternative
interface Box<Type> {
  contents: Type
}
let box: Box<string>

interface Apple {
  // ....
}
// Same as '{ contents: Apple }'.
type AppleBox = Box<Apple>;

// we can avoid overloads
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents
}

// Since type aliases, unlike interfaces, can describe more than just object types, we can also use them to write other kinds of generic helper types.
type Box2<Type> = {
  contents: Type
}
type OrNull<Type> = Type | null
type OneOrMany<Type> = Type | Type[]
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;          
// type OneOrManyOrNull<Type> = OneOrMany<Type> | null

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
// type OneOrManyOrNullStrings = OneOrMany<string> | null

// The Array Type
interface Array1<Type> {
  /**
   * Gets or sets the length of the array.
   */
   length: number;
   /**
    * Removes the last element from an array and returns it.
    */
   pop(): Type | undefined;
  
   /**
    * Appends new elements to an array, and returns the new length of the array.
    */
   push(...items: Type[]): number;
   // ...
}

// The ReadonlyArray Type
function doStuff(values: readonly string[]): any {
  console.log(...values)
};
function doStuffEqualAbove(values: ReadonlyArray<string>): any {
  console.log(...values)
};

let x1: readonly string[] = []
let y1: string[] = []
x1 = y1
// y1 = x1 ---> assignability isn't bidirectional

/** ------------------ */ console.log('\n\n') /** ------------------ */

// *Tuple Types

type StringNumberPair = [string, number]
function doSomething(pair: StringNumberPair) {
  const a = pair[0]; // const a: string
  const b = pair[1];// const b: number
  // ...
  console.log(a, b)
}
doSomething(["hello", 42]);

interface StringNumberPair2 {
  // specialized properties
  length: 2
  0: string
  1: number

  slice: (start?: number, end?: number) => Array<string | number>
}


type Either2dOr3d = [number, number, number?];
 
function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  // const z: number | undefined
 
  console.log(`Provided coordinates had ${coord.length} dimensions`);                                 
  // (property) length: 2 | 3
}
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// readonly Tuple Types
function doSomething2(pair: readonly [string, number]) {
  // ...
}

let point = [3, 4] as const
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
// The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.
// distanceFromOrigin(point)
