/**
 * There are just a few differences between class constructor signatures and function signatures:
 * Constructors can’t have type parameters 
 *    - these belong on the outer class declaration
 * Constructors can’t have return type annotations 
 *    - the class instance type is always what’s returned
 */

// Class Heritage

// implements Clauses
interface Pingable {
  ping(): void
}
class Sonar implements Pingable {
  ping(): void {
    throw new Error("Method not implemented.");
  }
}

// Cautions
interface Checkable {
  a: number
  check(name: string): boolean
}
class NameChecker implements Checkable {
  a: number = 1
  check(s): boolean { // s: string is better
    return s.toLowerCase() === 'ok'
  }
}

// extends Clauses
// Overriding Methods
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  // Make this parameter required --> get an error
  greet(name?: string) {
    console.log(`Hello, ${name?.toUpperCase()}`);
  }
}

// Member Visibility
// public
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();

// protected
class Greeter2 {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}
 
class SpecialGreeter extends Greeter2 {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
  }
}
const g2 = new SpecialGreeter();
g2.greet(); // OK
//  g2.getName();

// private
// private is like protected, but doesn’t allow access to the member even from subclasses:

class A {
  private x = 10;
 
  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}

class Dog {
  #barkAmount = 0
  personlity = 'happy'
  constructor() {}
}
