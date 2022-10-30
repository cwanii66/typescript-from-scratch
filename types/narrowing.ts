// intro

function padLeft(padding: number | string, input: string): string {
  if (typeof padding === 'number')
    return " ".repeat(padding) + input
  else
    return padding + input
}

// Truthiness narrowing
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  // if (strs) { // no longer handle the empty string '' case
  //   if (typeof strs === "object") {
  //     for (const s of strs) {
  //       console.log(s);
  //     }
  //   } else if (typeof strs === "string") {
  //     console.log(strs);
  //   }
  // }

  if (strs && typeof strs === 'object') {
    for (const s of strs) {
      console.log(s)
    }
  } else if (typeof strs === 'string') {
    console.log(strs)
  }
}
printAll('cwanii66')
printAll(['chris', 'wong', 'cwanii66'])

console.log((function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values
  } else {
    return values.map(x => x * factor)
  }
})([1, 2, 3], 2))

// looser equality
interface Container {
  value: number | null | undefined
}
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
    //(property) Container.value: number

    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

/** ------------------ */ console.log('\n\n') /** ------------------ */

// The in operator narrowing
type Fish = { swim: () => void }
type Bird = { fly: () => void }
interface Pig {
  run: () => void
}
function move(animal: Fish | Bird) {
  if ('swim' in animal) {
    return animal.swim()
  }
  return animal.fly()
}
move({ swim: () => console.log('swim') })

// control flow analysis
function example() {
  let x: string | number | boolean

  x = Math.random() < 0.5
  console.log(x) // let x: boolean

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x); // let x: string
  } else {
    x = 100;
    console.log(x); // let x: number
  }

  return x; // let x: string | number
}

// Using type predicates

// <paramName> is <Type> here is type predicate
// Any time isFish is called with some variable, 
// TypeScript will narrow that variable to that specific type 
// if the original type is compatible.
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

// Discirminated unions
interface Shape1 {
  kind: 'circle' | 'square'
  radius?: number
  sideLength?: number
}
function handleShape(shape: Shape1) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius! ** 2 // give it a non-null assertion
  }
}

interface Circle {
  kind: 'circle'
  radius: number
}
interface Square {
  kind: 'square'
  sideLength: number
}
type Shape2 = Circle | Square
function getArea(shape: Shape2) {
  // if (shape.kind === 'circle')
  //   return Math.PI * shape.radius ** 2
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
      
    // The never type
    // Exhaustiveness checking
    default:
      const _exhaustiveCheck: never = shape
      return _exhaustiveCheck
  }
}

