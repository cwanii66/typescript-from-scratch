let isDone: boolean = true;
let list: number[] = [1, 2, 3];
let list2generic: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ['hello', 10];
// Initialize it incorrectly
// x = [10, 'hello'];

// Enum
enum Color {Red = 0, Green = 1, Blue = 6};
let c: Color = Color.Green;
let colorName: string = Color[0];

console.log(colorName); // Red default index: 0

// unknown
let notSure: unknown = 4;
notSure = "maybe a string instead";

// OK, definitely a boolean
notSure = false;

declare const maybe: unknown;
// 'maybe' could be a string, object, boolean, undefined, or other types
// const aNumber: number = maybe;

if (maybe === true) {
    // TypeScript knows that maybe is a boolean now
    const aBoolean: boolean = maybe;
    // So, it cannot be a string
    // const aString: string = maybe;
}
if (typeof maybe === 'string') {
    // TypeScript knows that maybe is a string now
    const aString: string = maybe;
    // so it cannot be a boolean
    // const aBoolean: boolean = maybe;
}

function warnUser(): void {
    console.log("this is my warning message");
    // without returns
}

let unusable: void = undefined; // only null or undefined

// Not much else we can assign to these varibles!
let u: undefined = undefined;
let n: null = null;

// Never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断返回值的类型为never
function fail() {
    return error("Something failed");
}

function infiniteLoop(): never {
    while(true) { 
    }
}

// Object
// better to use API like Object.create()
declare function create(o: object | null): void;

create({prop: 0});
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

// 类型断言

// 1. 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 2. as 语法
let someV: any = "this is a string";
let strL: number = (someV as string).length;

// Number, String, Booelean, Symbol & Object 并非基本类型
// @errors: 2339
function reverseF(s: String): String {
    return s.split("").reverse().join("");
}
reverseF("hello world");

function reverseT(s: string): string {
    return s.split("").reverse().join("");
}
reverseT("dlrow olleh");