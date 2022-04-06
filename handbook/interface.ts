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