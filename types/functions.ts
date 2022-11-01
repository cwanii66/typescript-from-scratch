// Function Type Expressions
function greeter(fn: (a: string) => void) {
  fn('hello world')
}
function printToConsole(s: string) {
  console.log(s)
}
greeter(printToConsole)

type GreetFunction = (a: string) => void
function greeter1(fn: GreetFunction) {
  // ...
}

// Call Signatures
type DescribableFunction = {
  descriptions: string
  (someArg: number): number
}
function doSomething(fn: DescribableFunction) {
  console.log(fn.descriptions + ' return ' + fn(6))
}
function fn1(num: number) {
  return num
}
fn1.descriptions = 'hello'
doSomething(fn1)


// Construct Signatures
type SomeConstructor = {
  new (s: string): DescribableFunction
}
function fn(ctor: SomeConstructor) {
  return new ctor('hello')
}

interface CallOrConstruct {
  new (s: string): Date
  (n?: number): number
}

// Generic Functions
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0]
}
const s = firstElement(['a', 'b'])
const n = firstElement([1, 2])
const u = firstElement([])
console.log(s, n, u)

// Inference
function map<Input, Output>(
  arr: Input[], 
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func)
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(['1', '2', '3'], (n) => parseInt(n))
console.log(parsed)

// Constraints
function longest<Type extends { length: number }>(
  a: Type, 
  b: Type
) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
} // contrain the Type, must have the length property
// !!generics are all about relating two or more values with the same type!

// Working with Constrained Values
/* function minimumLength<Type extends { length: number }> (
  obj: Type,
  minimum: number
): Type { // function promises to return the same kind of obj as was passed in
  if (obj.length >= minimum) {
    return obj
  } else {
    return {
      length: minimum
    }
  }
}*/

// specifying Type Arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}
// we can manually specify Type variable
console.log(combine<string | number | object>([1, 2, 3], [{ a: 'hello' }]))


/** ----------- */ console.log('\n\n') /** ----------- */

// Guidelines for Writing Good Generic Functions

// --> Push Type Parameters Down

// Rule: When possible, use the type parameter itself rather than constraining it
// firstElement1 is much better
function firstElement1<Type>(arr: Type[]) {
  return arr[0]
}
function firstElement2<Type extends any[]>(arr: Type[]) {
  return arr[0]
}

// --> Use Fewer Type Parameters
function filter1<Type> (
  arr: Type[],
  func: (arg: Type) => boolean
): Type[] {
  return arr.filter(func)
}
/**  red flag => there's no reason to set Func type param, it doesn't do anything  */
function filter2<Type, Func extends (arg: Type) => boolean> (
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func)
}

// --> Type Parameters Should Appear Twice
// Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it
function greet1(s: string) {
  console.log(s)
}
/** red flag ** ==> type params are for relating the types of multiple values */
function greet2<Str extends string> (s: Str) {
  console.log(s)
}



// Optional Parameters
declare function f(x?: number): void;
// f()   f(10) f(undefined) All OK

// Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i)
  }
}
myForEach([1, 2, 3], (a) => console.log(a))
myForEach([1, 2, 3], (a, i) => console.log('i: ', i, 'a: ', a))

// Function Overloads
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);

// Writing Good Overloads
// 很多时候重载很多余，直接用union type就好
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length
}

// Always prefer parameters with union types instead of overloads when possible
function len2(x: any[] | string) {
  return x.length
}

// Declaring this in a Function
type User = {
  id: number
  admin: boolean
}
declare const getDB: () => DB
interface DB {
  filterUsers(filter: (this: User) => boolean): User[]
}
// const db = getDB()
// const admins = db.filterUsers(function(this: User) {
//   return this.admin
// })

/** ----------- */ console.log('\n\n') /** ----------- */

// Other Types to Know About

// void
function noop() {
  return;
}
// object
// The special type object refers to any value that isn't a primitive
// this is different from the empty object {}, and also different from the global type Object
// object is not Object. Always use object

// unknown
// top type

// never
// exhaustive

// Function


// Rest Parameters and Arguments



