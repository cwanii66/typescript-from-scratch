// 类型检查
// 接口为这些类型命名

function printLabel(labelObj: { label: string }) {
    console.log(labelObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

interface LabeledValue {
    label: string;
}

function printLabel2(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}
printLabel2(myObj);

// option bags
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any; // 字符串索引签名
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };

    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width**2;
    }
    return newSquare;
}
let mySquare = createSquare({ color: "black" });

// readonly
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro is immutable

// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
// let mySquareError = createSquare({ colour: "red", width: 100 });

// use type assert
let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);


// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let res = source.search(subString);
    return res > -1;
};

// let mySearch2: SearchFunc;
// error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// Type 'string' is not assignable to type 'boolean'.
// mySearch2 = function(src, sub) {
//   let result = src.search(sub);
//   return "string";
// };

// indexable type
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

interface NumberOrStringDictionary {
    [index: string]: number | string; // union type
    length: number; // ok, length is a number
    name: string; // ok, name is a string
}


// class type
// same as java, force class to conform to a contract
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}
class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) {}
}

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface2;
}
interface ClockInterface2 {
    tick(): void;
}

function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
): ClockInterface2 {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface2 {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep...");
    }
}

class AnalogClock implements ClockInterface2 {
    constructor(h: number, m: number) {}
    tick() {
        console.log("tick tick...");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
/**
 * 因为createClock的第一个参数是ClockConstructor类型，
 * 在createClock(AnalogClock, 7, 32)里，
 * 会检查AnalogClock是否符合构造函数签名。
 */

// 另一种简单方式是使用类表达式：
interface ClockConstructor2 {
    new (hour: number, minute: number);
}
interface ClockInterface3 {
    tick(): unknown;
}

const Clock2: ClockConstructor2 = class Clock2 implements ClockInterface3 {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep...")
    }
};

// inherit interface
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 60;
square.penWidth = 30.0;

// mixed type
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = function(start: number) {} as Counter;
    counter.interval = 123;
    counter.reset = function() {};
    return counter;
};
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


// interface inherit class

// work at specific subclass has particular properties
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}
class Button extends Control implements SelectableControl {
    select() {}
}

class TextBox extends Control {
    select() {}
}

// class ImageControl implements SelectableControl {
//     private state: any;
//     select() {}
// }
// 只有control的子类才能实现SelectableControl接口