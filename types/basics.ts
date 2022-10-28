const names: Array<string> = ['a', 'b', 'c']
names.forEach(function(s: string) {
  console.log(s.toUpperCase())
})
names.forEach((s: string) => {
  console.log(s.toUpperCase())
})

// Object Type & optional type
;(function printName(obj: { first: string, last?: string }) {
  if (obj.last !== undefined) {
    console.log(obj.last.toUpperCase())
  }
  console.log(obj.last?.toUpperCase())
})({ first: 'first' }) // we are not providing a last property

// Union Type
function printId(id: number | string) {
  // we should narrow the union
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    // here is type 'number'
    console.log(id)
  }
  console.log('Your ID is: ', id)
}
// OK
printId(101)
// OK
printId('202')

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // x is string[]
    console.log('hello, ' + x.join(" and "))
  } else {
    // x is string
    console.log('welcome lone traveler ' + x)
  }
}
welcomePeople(['Bob', 'Chandler', 'Jack'])
welcomePeople('cwanii66')

function getFirstThree(x: number[] | string) {
  // both array and string have a slice method
  // So we don't need to narrow types while having properties in common in a union
  return x.slice(0, 3)
}

/** ------------------ */ console.log('\n\n') /** ------------------ */

// Type Aliases
type Point_t = {
  x: number
  y: number
}
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log('The coordinate\'s x value is ' + pt.x)
  console.log('The coordinate\'s y value is ' + pt.y)
}
printCoord({ x: 100, y: 100 })

type ID = number | string

/** ------------------ */ console.log('\n\n') /** ------------------ */

// Interface
// Interface decleration is another way to name an object type

interface Point {
  x: number
  y: number
}

// Differences Between Type Aliases and Interface
// the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}
function getBear(): Bear {
  return ({
    name: 'cute bear',
    honey: true
  })
}
const bear = getBear()
// versus Type
type Animal_t = {
  name: string
}
type Bear_t = Animal_t & {
  honey: boolean
}

// Type Assertion
