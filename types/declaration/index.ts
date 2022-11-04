/**
 * The global variable myLib has a function makeGreeting for creating greetings, 
 * and a property numberOfGreetings indicating the number of greetings made so far.
 */
declare namespace myLib {
  function makeGreeting(s: string): string
  let numberOfGreetings: number
}

/**
 * The getWidget function accepts a number and returns a Widget, 
 * or accepts a string and returns a Widget array.
 */
declare function getWidget<T>(arg: T): T[] | T

/**
 * When specifying a greeting, you must pass a GreetingSettings object. This object has the following properties:
 * 1 - greeting: Mandatory string
 * 2 - duration: Optional length of time (in milliseconds)
 * 3 - color: Optional string, e.g. ‘#ff00ff’
 */
interface GreetingSettings1 {
  greeting: string
  duration?: number
  color?: string
}
declare function greet1(setting: GreetingSettings1): void

/**
 * Anywhere a greeting is expected, 
 * you can provide a string, a function returning a string, or a Greeter instance.
 */
type GreetingLike = string | (() => string) | MyGreeter
class MyGreeter {}
declare function greet(arg: GreetingLike): void

/**
 * The greeter object can log to a file or display an alert. 
 * You can provide LogOptions to .log(...) and alert options to .alert(...)
 */
declare namespace GreetingLib {
  interface LogOptions {
    verbose?: boolean
  }
  interface AlertOptions {
    modal: boolean
    title?: string
    color?: string
  }
}

/**
 * You can create a greeter by instantiating the Greeter object, or create a customized greeter by extending from it.
 */
declare class Greeter {
  greeting: string
  showGreeting(): void
  constructor(gretting: string)
}

/**
 * The global variable foo contains the number of widgets present.
 */
declare let foo: number

/**
 * You can call the function greet with a string to show a greeting to the user.
 */
declare function greet2(s: string): void
