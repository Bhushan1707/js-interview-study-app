 const studyCategories = [
  {
    id: 'core-concepts',
    title: 'Core JavaScript Concepts',
    description: 'Fundamental JavaScript concepts every developer should know',
    icon: '🎯',
    difficulty: 'Beginner',
    estimatedTime: '4-6 hours',
    questions: [
      {
        id: 1,
        question: 'What are the possible ways to create objects in JavaScript?',
        answer: `There are many ways to create objects in JavaScript:

1. **Object constructor:** The simplest way to create an empty object is using the Object constructor. Currently this approach is not recommended.

2. **Object's create method:** The create method of Object creates a new object by passing the prototype object as a parameter.

3. **Object literal syntax:** The object literal syntax (or object initializer), is a comma-separated set of name-value pairs wrapped in curly braces. This is the easiest way to create an object.

4. **Function constructor:** Create any function and apply the new operator to create object instances.

5. **Function constructor with prototype:** This is similar to function constructor but it uses prototype for their properties and methods.

6. **ES6 Class syntax:** ES6 introduces class feature to create the objects.

7. **Singleton pattern:** A Singleton is an object which can only be instantiated one time.`,
        code: `// 1. Object constructor
var object = new Object();

// 2. Object's create method
var object = Object.create(null);

// 3. Object literal syntax
var object = {
     name: "Sudheer",
     age: 34
};

// 4. Function constructor
function Person(name) {
  this.name = name;
  this.age = 21;
}
var object = new Person("Sudheer");

// 5. Function constructor with prototype
function Person() {}
Person.prototype.name = "Sudheer";
var object = new Person();

// 6. ES6 Class syntax
class Person {
  constructor(name) {
    this.name = name;
  }
}
var object = new Person("Sudheer");

// 7. Singleton pattern
var object = new (function () {
  this.name = "Sudheer";
  this.age = 25;
})();`,
        tags: ['objects', 'creation', 'patterns']
      },
      {
        id: 2,
        question: 'What is a prototype chain?',
        answer: `Prototype chaining is used to build new types of objects based on existing ones. It is similar to inheritance in a class based language.

The prototype on object instance is available through Object.getPrototypeOf(object) or __proto__ property whereas prototype on constructors function is available through Object.prototype.`,
        code: `function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return this.name + " makes a sound";
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak()); // "Buddy makes a sound"`,
        tags: ['prototype', 'inheritance', 'chain']
      },
      {
        id: 3,
        question: 'What is the difference between Call, Apply and Bind?',
        answer: `The difference between Call, Apply and Bind:

**Call:** The call() method invokes a function with a given 'this' value and arguments provided one by one.

**Apply:** Invokes the function with a given 'this' value and allows you to pass in arguments as an array.

**Bind:** Returns a new function, allowing you to pass any number of arguments.

Call and apply are pretty interchangeable. Both execute the current function immediately. You need to decide whether it's easier to send in an array or a comma separated list of arguments. You can remember by treating Call is for comma (separated list) and Apply is for Array.

Whereas Bind creates a new function that will have 'this' set to the first parameter passed to bind().`,
        code: `var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

// Call
invite.call(employee1, "Hello", "How are you?"); // Hello John Rodson, How are you?

// Apply
invite.apply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?

// Bind
var inviteEmployee1 = invite.bind(employee1);
inviteEmployee1("Hello", "How are you?"); // Hello John Rodson, How are you?`,
        tags: ['call', 'apply', 'bind', 'this']
      },
      {
        id: 4,
        question: 'What is JSON and its common operations?',
        answer: `JSON is a text-based data format following JavaScript object syntax, which was popularized by Douglas Crockford. It is useful when you want to transmit data across a network and it is basically just a text file with an extension of .json, and a MIME type of application/json.

JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.

Key Features of JSON:
- Text-based: It is a text format that is completely language-independent.
- Structured: JSON structures data using key-value pairs, making it easy to represent complex data.
- Lightweight: Its simplicity makes it efficient for data exchange.`,
        code: `// Parsing: Converting a string to a native object
var text = '{"name":"john","age":20}'
var obj = JSON.parse(text);
console.log(obj.name); // john

// Stringification: converting a native object to a string
var object = { name: "john", age: 20 };
var jsonString = JSON.stringify(object);
console.log(jsonString); // '{"name":"john","age":20}'`,
        tags: ['json', 'parsing', 'stringify']
      },
      {
        id: 5,
        question: 'What is the difference between == and === operators?',
        answer: `JavaScript provides both strict(===, !==) and type-converting(==, !=) equality comparison. The strict operators take type of variable in consideration, while non-strict operators make type correction/conversion based upon values of variables.

The strict operators follow the below conditions for different types:
1. Two strings are strictly equal when they have the same sequence of characters, same length, and same characters in corresponding positions.
2. Two numbers are strictly equal when they are numerically equal. i.e, Having the same number value.
3. Two Boolean operands are strictly equal if both are true or both are false.
4. Two objects are strictly equal if they refer to the same Object.
5. Null and Undefined types are not equal with ===, but equal with ==.`,
        code: `0 == false   // true
0 === false  // false
1 == "1"     // true
1 === "1"    // false
null == undefined // true
null === undefined // false
'0' == false // true
'0' === false // false
[]==[] or []===[] //false, refer different objects in memory
{}=={} or {}==={} //false, refer different objects in memory`,
        tags: ['operators', 'comparison', 'equality']
      },
      {
        id: 6,
        question: 'How do you compare Object and Map?',
        answer: `Objects are similar to Maps in that both let you set keys to values, retrieve those values, delete keys, and detect whether something is stored at a key. Due to this reason, Objects have been used as Maps historically. But there are important differences:

1. The keys of an Object are Strings and Symbols, whereas they can be any value for a Map, including functions, objects, and any primitive.
2. The keys in Map are ordered while keys added to Object are not. Thus, when iterating over it, a Map object returns keys in order of insertion.
3. You can get the size of a Map easily with the size property, while the number of properties in an Object must be determined manually.
4. A Map is an iterable and can thus be directly iterated, whereas iterating over an Object requires obtaining its keys in some fashion and iterating over them.
5. An Object has a prototype, so there are default keys in the map that could collide with your keys if you're not careful.
6. A Map may perform better in scenarios involving frequent addition and removal of key pairs.`,
        code: `// Object
const obj = {
  name: 'John',
  age: 30
};
console.log(Object.keys(obj).length); // 2

// Map
const map = new Map();
map.set('name', 'John');
map.set('age', 30);
map.set(1, 'number key');
console.log(map.size); // 3

// Map can have any type of key
map.set(obj, 'object as key');
map.set(() => {}, 'function as key');`,
        tags: ['object', 'map', 'comparison', 'data-structures']
      }
    ]
  },
  {
    id: 'arrays-methods',
    title: 'Arrays and Methods',
    description: 'Array manipulation methods and their differences',
    icon: '📊',
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    questions: [
      {
        id: 7,
        question: 'What is the purpose of the array slice method?',
        answer: `The slice() method returns the selected elements in an array as a new array object. It selects the elements starting at the given start argument, and ends at the given optional end argument without including the last element. If you omit the second argument then it selects till the end.

The slice method in JavaScript is used to create a shallow copy of a portion of an array. It returns a new array containing the selected elements, without modifying the original array.

Note: Slice method won't mutate the original array but it returns the subset as a new array.`,
        code: `let arrayIntegers = [1, 2, 3, 4, 5];
let arrayIntegers1 = arrayIntegers.slice(0, 2); // returns [1,2]
let arrayIntegers2 = arrayIntegers.slice(2, 3); // returns [3]
let arrayIntegers3 = arrayIntegers.slice(4); //returns [5]

console.log(arrayIntegers); // [1, 2, 3, 4, 5] - original unchanged`,
        tags: ['arrays', 'slice', 'methods']
      },
      {
        id: 8,
        question: 'What is the purpose of the array splice method?',
        answer: `The splice() method is used either adds/removes items to/from an array, and then returns the removed item. The first argument specifies the array position for insertion or deletion whereas the optional second argument indicates the number of elements to be deleted. Each additional argument is added to the array.

The splice method in JavaScript is used to modify an array by adding, removing, or replacing elements. Unlike slice, which creates a new array without changing the original, splice directly alters the original array.

Parameters:
- start: The index at which to begin changing the array.
- deleteCount: The number of elements to remove from the array, starting from the start index.
- itemsToAdd: Optional. One or more elements to add to the array at the start index.

Note: Splice method modifies the original array and returns the deleted array.`,
        code: `let arrayIntegersOriginal1 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal2 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal3 = [1, 2, 3, 4, 5];

let arrayIntegers1 = arrayIntegersOriginal1.splice(0, 2); 
// returns [1, 2]; original array: [3, 4, 5]

let arrayIntegers2 = arrayIntegersOriginal2.splice(3); 
// returns [4, 5]; original array: [1, 2, 3]

let arrayIntegers3 = arrayIntegersOriginal3.splice(3, 1, "a", "b", "c"); 
// returns [4]; original array: [1, 2, 3, "a", "b", "c", 5]`,
        tags: ['arrays', 'splice', 'methods', 'mutating']
      },
      {
        id: 9,
        question: 'What is the difference between slice and splice?',
        answer: `Some of the major differences in a tabular form:

| Slice | Splice |
|-------|--------|
| Doesn't modify the original array(immutable) | Modifies the original array(mutable) |
| Returns the subset of original array | Returns the deleted elements as array |
| Used to pick the elements from array | Used to insert or delete elements to/from array |`,
        code: `let arr1 = [1, 2, 3, 4, 5];
let arr2 = [1, 2, 3, 4, 5];

// Slice - doesn't modify original
let sliced = arr1.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(arr1); // [1, 2, 3, 4, 5] - unchanged

// Splice - modifies original
let spliced = arr2.splice(1, 2, 'a', 'b');
console.log(spliced); // [2, 3] - removed elements
console.log(arr2); // [1, 'a', 'b', 4, 5] - modified`,
        tags: ['arrays', 'slice', 'splice', 'comparison']
      }
    ]
  },
  {
    id: 'functions-scope',
    title: 'Functions and Scope',
    description: 'Understanding functions, closures, and scope in JavaScript',
    icon: '⚡',
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours',
    questions: [
      {
        id: 10,
        question: 'What are lambda or arrow functions?',
        answer: `An arrow function is a shorter syntax for a function expression and does not have its own this, arguments, super, or new.target. These functions are best suited for non-method functions, and they cannot be used as constructors.`,
        code: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Arrow function with block body
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters
const greet = () => "Hello World!";`,
        tags: ['arrow-functions', 'es6', 'functions']
      },
      {
        id: 11,
        question: 'What is a first class function?',
        answer: `In Javascript, functions are first class objects. First-class functions means when functions in that language are treated like any other variable.

For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable.`,
        code: `// Function assigned to a variable
const handler = () => console.log("This is a click handler function");

// Function passed as argument
document.addEventListener("click", handler);

// Function returned from another function
function createMultiplier(multiplier) {
  return function(x) {
    return x * multiplier;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10`,
        tags: ['first-class', 'functions', 'higher-order']
      },
      {
        id: 12,
        question: 'What is a first order function?',
        answer: `First-order function is a function that doesn't accept another function as an argument and doesn't return a function as its return value.`,
        code: `const firstOrder = () => console.log("I am a first order function!");

// Another example
function add(a, b) {
  return a + b;
}

function greet(name) {
  return "Hello " + name;
}`,
        tags: ['first-order', 'functions']
      },
      {
        id: 13,
        question: 'What is a higher order function?',
        answer: `Higher-order function is a function that accepts another function as an argument or returns a function as a return value or both.`,
        code: `const firstOrderFunc = () =>
  console.log("Hello, I am a First order function");
  
const higherOrder = (ReturnFirstOrderFunc) => ReturnFirstOrderFunc();
higherOrder(firstOrderFunc);

// Array methods are higher-order functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2); // map is higher-order
const evens = numbers.filter(x => x % 2 === 0); // filter is higher-order`,
        tags: ['higher-order', 'functions', 'callbacks']
      },
      {
        id: 14,
        question: 'What is a unary function?',
        answer: `Unary function (i.e. monadic) is a function that accepts exactly one argument. It stands for a single argument accepted by a function.`,
        code: `const unaryFunction = (a) => console.log(a + 10); // Add 10 to the given argument and display the value

// More examples
const square = x => x * x;
const isEven = num => num % 2 === 0;
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

unaryFunction(5); // 15`,
        tags: ['unary', 'functions', 'single-argument']
      },
      {
        id: 15,
        question: 'What is the currying function?',
        answer: `Currying is the process of taking a function with multiple arguments and turning it into a sequence of functions each with only a single argument. Currying is named after a mathematician Haskell Curry. By applying currying, a n-ary function turns it into a unary function.

Curried functions are great to improve code reusability and functional composition.`,
        code: `const multiArgFunction = (a, b, c) => a + b + c;
console.log(multiArgFunction(1, 2, 3)); // 6

const curryUnaryFunction = (a) => (b) => (c) => a + b + c;
curryUnaryFunction(1); // returns a function: b => c =>  1 + b + c
curryUnaryFunction(1)(2); // returns a function: c => 3 + c
curryUnaryFunction(1)(2)(3); // returns the number 6

// Practical example
const multiply = (a) => (b) => a * b;
const multiplyBy2 = multiply(2);
const multiplyBy3 = multiply(3);

console.log(multiplyBy2(5)); // 10
console.log(multiplyBy3(5)); // 15`,
        tags: ['currying', 'functional-programming', 'composition']
      },
      {
        id: 16,
        question: 'What is a pure function?',
        answer: `A Pure function is a function where the return value is only determined by its arguments without any side effects. i.e, If you call a function with the same arguments 'n' number of times and 'n' number of places in the application then it will always return the same value.

Pure functions are important as they simplify unit testing without any side effects and no need for dependency injection. They also avoid tight coupling and make it harder to break your application by not having any side effects. These principles are coming together with Immutability concept of ES6 by giving preference to const over let usage.`,
        code: `//Impure
let numberArray = [];
const impureAddNumber = (number) => numberArray.push(number);

//Pure
const pureAddNumber = (number) => (argNumberArray) =>
  argNumberArray.concat([number]);

//Display the results
console.log(impureAddNumber(6)); // returns 1
console.log(numberArray); // returns [6]
console.log(pureAddNumber(7)(numberArray)); // returns [6, 7]
console.log(numberArray); // returns [6]

// More pure function examples
const add = (a, b) => a + b; // Pure
const multiply = (x, y) => x * y; // Pure`,
        tags: ['pure-functions', 'side-effects', 'functional-programming']
      }
    ]
  },
  {
    id: 'variables-scope',
    title: 'Variables and Scope',
    description: 'Variable declarations, hoisting, and scope concepts',
    icon: '🔧',
    difficulty: 'Beginner',
    estimatedTime: '2-3 hours',
    questions: [
      {
        id: 17,
        question: 'What is the purpose of the let keyword?',
        answer: `The let statement declares a block scope local variable. Hence the variables defined with let keyword are limited in scope to the block, statement, or expression on which it is used. Whereas variables declared with the var keyword used to define a variable globally, or locally to an entire function regardless of block scope.`,
        code: `let counter = 30;
if (counter === 30) {
  let counter = 31;
  console.log(counter); // 31
}
console.log(counter); // 30 (because the variable in if block won't exist here)

// Block scope example
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}`,
        tags: ['let', 'block-scope', 'variables']
      },
      {
        id: 18,
        question: 'What is the difference between let and var?',
        answer: `You can list out the differences in a tabular format:

| var | let |
|-----|-----|
| It is been available from the beginning of JavaScript | Introduced as part of ES6 |
| It has function scope | It has block scope |
| Variables will be hoisted | Hoisted but not initialized |`,
        code: `function userDetails(username) {
  if (username) {
    console.log(salary); // undefined due to hoisting
    console.log(age); // ReferenceError: Cannot access 'age' before initialization
    let age = 30;
    var salary = 10000;
  }
  console.log(salary); //10000 (accessible due to function scope)
  console.log(age); //error: age is not defined(due to block scope)
}
userDetails("John");`,
        tags: ['let', 'var', 'scope', 'hoisting']
      },
      {
        id: 19,
        question: 'What is the reason to choose the name let as a keyword?',
        answer: `let is a mathematical statement that was adopted by early programming languages like Scheme and Basic. It has been borrowed from dozens of other languages that use let already as a traditional keyword as close to var as possible.`,
        code: `// Mathematical context: "let x = 5" means "let x be 5"
let x = 5;
let y = x + 10;

// Similar to mathematical notation
// let f(x) = x² + 2x + 1
let f = x => x * x + 2 * x + 1;`,
        tags: ['let', 'keyword', 'history']
      },
      {
        id: 20,
        question: 'How do you redeclare variables in switch block without an error?',
        answer: `If you try to redeclare variables in a switch block then it will cause errors because there is only one block. To avoid this error, you can create a nested block inside a case clause and create a new block scoped lexical environment.`,
        code: `// This will cause error
let counter = 1;
switch (x) {
  case 0:
    let name;
    break;
  case 1:
    let name; // SyntaxError for redeclaration.
    break;
}

// Solution: Use block scope
let counter = 1;
switch (x) {
  case 0: {
    let name;
    break;
  }
  case 1: {
    let name; // No SyntaxError for redeclaration.
    break;
  }
}`,
        tags: ['switch', 'variables', 'block-scope', 'redeclaration']
      }
    ]
  },
  {
    id: 'async-javascript',
    title: 'Asynchronous JavaScript',
    description: 'Promises, async/await, event loop, and asynchronous patterns',
    icon: '🔄',
    difficulty: 'Advanced',
    estimatedTime: '4-5 hours',
    questions: [
      {
        id: 21,
        question: 'What is the Temporal Dead Zone?',
        answer: `The Temporal Dead Zone is a behavior in JavaScript that occurs when declaring a variable with the let and const keywords, but not with var. In ECMAScript 6, accessing a let or const variable before its declaration (within its scope) causes a ReferenceError. The time span when that happens, between the creation of a variable's binding and its declaration, is called the temporal dead zone.`,
        code: `function somemethod() {
  console.log(counter1); // undefined
  console.log(counter2); // ReferenceError
  var counter1 = 1;
  let counter2 = 2;
}`,
        tags: ['temporal-dead-zone', 'let', 'const', 'hoisting']
      },
      {
        id: 22,
        question: 'What is IIFE(Immediately Invoked Function Expression)?',
        answer: `IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.

The primary reason to use an IIFE is to obtain data privacy because any variables declared within the IIFE cannot be accessed by the outside world.`,
        code: `(function () {
  // logic here
})();

// Example with data privacy
(function () {
  var message = "IIFE";
  console.log(message);
})();
console.log(message); //Error: message is not defined

// IIFE with parameters
(function (name) {
  console.log("Hello " + name);
})("John");

// IIFE with return value
var result = (function () {
  return "IIFE result";
})();`,
        tags: ['iife', 'privacy', 'scope', 'patterns']
      },
      {
        id: 23,
        question: 'What is memoization?',
        answer: `Memoization is a programming technique which attempts to increase a function's performance by caching its previously computed results. Each time a memoized function is called, its parameters are used to index the cache. If the data is present, then it can be returned, without executing the entire function. Otherwise the function is executed and then the result is added to the cache.`,
        code: `const memoizAddition = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value];
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};

// returned function from memoizAddition
const addition = memoizAddition();
console.log(addition(20)); //output: 40 calculated
console.log(addition(20)); //output: 40 cached

// Fibonacci with memoization
const memoFib = (function() {
  const cache = {};
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    return cache[n] = fib(n - 1) + fib(n - 2);
  };
})();`,
        tags: ['memoization', 'caching', 'performance', 'optimization']
      },
      {
        id: 24,
        question: 'What is Hoisting?',
        answer: `Hoisting is a JavaScript mechanism where variables, function declarations and classes are moved to the top of their scope before code execution. Remember that JavaScript only hoists declarations, not initialisation.

This hoisting makes functions to be safely used in code before they are declared.`,
        code: `console.log(message); //output : undefined
var message = "The variable Has been hoisted";

// The above code looks like this to the interpreter:
var message;
console.log(message);
message = "The variable Has been hoisted";

// Function hoisting
message("Good morning"); //Good morning

function message(name) {
  console.log(name);
}

// Let and const hoisting
console.log(a); // ReferenceError
console.log(b); // ReferenceError
let a = 1;
const b = 2;`,
        tags: ['hoisting', 'variables', 'functions', 'scope']
      }
    ]
  },
  {
    id: 'es6-features',
    title: 'ES6+ Features',
    description: 'Modern JavaScript features and syntax',
    icon: '🚀',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    questions: [
      {
        id: 25,
        question: 'What are classes in ES6?',
        answer: `In ES6, Javascript classes are primarily syntactic sugar over JavaScript's existing prototype-based inheritance.`,
        code: `// Prototype based inheritance (ES5)
function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has" + this.color + " color";
};

// ES6 classes
class Bike {
  constructor(color, model) {
    this.color = color;
    this.model = model;
  }

  getDetails() {
    return this.model + " bike has" + this.color + " color";
  }
}

// Class inheritance
class ElectricBike extends Bike {
  constructor(color, model, batteryLife) {
    super(color, model);
    this.batteryLife = batteryLife;
  }
  
  getBatteryInfo() {
    return "Battery life: " + this.batteryLife + " hours";
  }
}`,
        tags: ['classes', 'es6', 'inheritance', 'constructor']
      },
      {
        id: 26,
        question: 'What are closures?',
        answer: `A closure is the combination of a function and the lexical environment within which that function was declared. i.e, It is an inner function that has access to the outer or enclosing function's variables. The closure has three scope chains:

1. Own scope where variables defined between its curly brackets
2. Outer function's variables  
3. Global variables

As per the closure concept, the inner function has access to the variables in the outer function scope even after the outer function has returned.`,
        code: `function Welcome(name) {
  var greetingInfo = function (message) {
    console.log(message + " " + name);
  };
  return greetingInfo;
}
var myFunction = Welcome("John");
myFunction("Welcome "); //Output: Welcome John
myFunction("Hello Mr."); //output: Hello Mr.John

// Counter example with closure
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2`,
        tags: ['closures', 'scope', 'lexical-environment', 'encapsulation']
      },
      {
        id: 27,
        question: 'How do you decode or encode a URL in JavaScript?',
        answer: `encodeURI() function is used to encode an URL. This function requires a URL string as a parameter and return that encoded string.
decodeURI() function is used to decode an URL. This function requires an encoded URL string as parameter and return that decoded string.

Note: If you want to encode characters such as / ? : @ & = + $ # then you need to use encodeURIComponent().`,
        code: `let uri = "employeeDetails?name=john&occupation=manager";
let encoded_uri = encodeURI(uri);
let decoded_uri = decodeURI(encoded_uri);

console.log(encoded_uri); // employeeDetails?name=john&occupation=manager
console.log(decoded_uri); // employeeDetails?name=john&occupation=manager

// For encoding special characters
let component = "name=john doe&city=new york";
let encodedComponent = encodeURIComponent(component);
let decodedComponent = decodeURIComponent(encodedComponent);

console.log(encodedComponent); // name%3Djohn%20doe%26city%3Dnew%20york
console.log(decodedComponent); // name=john doe&city=new york`,
        tags: ['url', 'encoding', 'decoding', 'uri']
      }
    ]
  },
  {
    id: 'web-storage',
    title: 'Web Storage & APIs',
    description: 'Cookies, localStorage, sessionStorage, and web APIs',
    icon: '💾',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    questions: [
      {
        id: 28,
        question: 'What are modules?',
        answer: `Modules refer to small units of independent, reusable code and also act as the foundation of many JavaScript design patterns. Most of the JavaScript modules export an object literal, a function, or a constructor.`,
        code: `// ES6 Module syntax
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add, subtract } from './math.js';
console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6

// CommonJS (Node.js)
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
module.exports = { add, subtract };

// main.js
const { add, subtract } = require('./math');`,
        tags: ['modules', 'import', 'export', 'es6']
      },
      {
        id: 29,
        question: 'Why do you need modules?',
        answer: `Below are the list of benefits using modules in javascript ecosystem:

1. **Maintainability**: Modules help organize code into separate files and logical units
2. **Reusability**: Modules can be imported and used across different parts of an application
3. **Namespacing**: Modules help avoid global namespace pollution`,
        code: `// Without modules - global namespace pollution
var userName = "John";
var userAge = 30;
function getUserInfo() {
  return userName + " is " + userAge + " years old";
}

// With modules - clean namespace
// user.js
export class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  getInfo() {
    return this.name + " is " + this.age + " years old";
  }
}

// main.js
import { User } from './user.js';
const user = new User("John", 30);`,
        tags: ['modules', 'maintainability', 'reusability', 'namespacing']
      },
      {
        id: 30,
        question: 'What is scope in javascript?',
        answer: `Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. In other words, scope determines the visibility of variables and other resources in areas of your code.`,
        code: `// Global scope
var globalVar = "I'm global";

function outerFunction() {
  // Function scope
  var functionScoped = "I'm function scoped";
  
  if (true) {
    // Block scope (let/const)
    let blockScoped = "I'm block scoped";
    const alsoBlockScoped = "Me too";
    
    console.log(globalVar); // Accessible
    console.log(functionScoped); // Accessible
    console.log(blockScoped); // Accessible
  }
  
  console.log(globalVar); // Accessible
  console.log(functionScoped); // Accessible
  // console.log(blockScoped); // Error: not defined
}

// Scope chain example
function outer() {
  let x = 1;
  function inner() {
    let y = 2;
    console.log(x + y); // 3 - inner can access outer's variables
  }
  inner();
}`,
        tags: ['scope', 'global', 'function-scope', 'block-scope']
      },
      {
        id: 31,
        question: 'What is a Cookie?',
        answer: `A cookie is a piece of data that is stored on your computer to be accessed by your browser. Cookies are saved as key/value pairs.`,
        code: `// Creating a cookie
document.cookie = "username=John";

// Cookie with expiry date
document.cookie = "username=John; expires=Sat, 8 Jun 2019 12:00:00 UTC";

// Cookie with path
document.cookie = "username=John; path=/services";

// Reading cookies
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Deleting a cookie
document.cookie = "username=; expires=Fri, 07 Jun 2019 00:00:00 UTC; path=/;";`,
        tags: ['cookies', 'storage', 'browser', 'data']
      },
      {
        id: 32,
        question: 'What is web storage?',
        answer: `Web storage is an API that provides a mechanism by which browsers can store key/value pairs locally within the user's browser, in a much more intuitive fashion than using cookies. The web storage provides two mechanisms for storing data on the client:

1. **Local storage:** It stores data for current origin with no expiration date.
2. **Session storage:** It stores data for one session and the data is lost when the browser tab is closed.`,
        code: `// Local Storage
localStorage.setItem('username', 'John');
localStorage.setItem('preferences', JSON.stringify({theme: 'dark', lang: 'en'}));

let username = localStorage.getItem('username');
let preferences = JSON.parse(localStorage.getItem('preferences'));

localStorage.removeItem('username');
localStorage.clear(); // Remove all items

// Session Storage
sessionStorage.setItem('sessionData', 'temporary');
let sessionData = sessionStorage.getItem('sessionData');
sessionStorage.removeItem('sessionData');
sessionStorage.clear();

// Check storage support
if (typeof(Storage) !== "undefined") {
  // Code for localStorage/sessionStorage
} else {
  // No web storage support
}`,
        tags: ['web-storage', 'localStorage', 'sessionStorage', 'browser']
      },
      {
        id: 33,
        question: 'What are the differences between cookie, local storage and session storage?',
        answer: `Below are some of the differences between cookie, local storage and session storage:

| Feature | Cookie | Local storage | Session storage |
|---------|--------|---------------|-----------------|
| Accessed on client or server side | Both server-side & client-side | client-side only | client-side only |
| Lifetime | As configured using Expires option | until deleted | until tab is closed |
| SSL support | Supported | Not supported | Not supported |
| Maximum data size | 4KB | 5 MB | 5MB |`,
        code: `// Cookie - sent with every HTTP request
document.cookie = "user=john; expires=Fri, 31 Dec 2023 23:59:59 GMT";

// localStorage - persists until manually deleted
localStorage.setItem('user', 'john');
localStorage.setItem('theme', 'dark');

// sessionStorage - cleared when tab closes
sessionStorage.setItem('tempData', 'session-specific');

// Size comparison
try {
  // Test localStorage size limit
  let data = new Array(1024 * 1024).join('a'); // ~1MB string
  localStorage.setItem('test', data);
  console.log('localStorage can handle large data');
} catch(e) {
  console.log('localStorage size limit reached');
}`,
        tags: ['storage-comparison', 'cookies', 'localStorage', 'sessionStorage']
      }
    ]
  },
  {
    id: 'browser-apis',
    title: 'Browser APIs & Advanced Topics',
    description: 'Service workers, IndexedDB, and browser-specific APIs',
    icon: '🌐',
    difficulty: 'Advanced',
    estimatedTime: '4-6 hours',
    questions: [
      {
        id: 34,
        question: 'What is a service worker?',
        answer: `A Service worker is basically a script (JavaScript file) that runs in the background, separate from a web page and provides features that don't need a web page or user interaction. Some of the major features of service workers are Rich offline experiences(offline first web application development), periodic background syncs, push notifications, intercept and handle network requests and programmatically managing a cache of responses.`,
        code: `// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW registered: ', registration);
    })
    .catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
}

// sw.js - Service Worker file
self.addEventListener('install', event => {
  console.log('Service worker installing...');
  // Perform install steps
});

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});`,
        tags: ['service-worker', 'offline', 'caching', 'background']
      },
      {
        id: 35,
        question: 'How do you manipulate DOM using a service worker?',
        answer: `Service worker can't access the DOM directly. But it can communicate with the pages it controls by responding to messages sent via the postMessage interface, and those pages can manipulate the DOM.`,
        code: `// In main thread (webpage)
navigator.serviceWorker.addEventListener('message', event => {
  if (event.data.type === 'UPDATE_DOM') {
    document.getElementById('status').textContent = event.data.message;
  }
});

// Send message to service worker
navigator.serviceWorker.controller.postMessage({
  type: 'GET_DATA',
  payload: 'some data'
});

// In service worker (sw.js)
self.addEventListener('message', event => {
  if (event.data.type === 'GET_DATA') {
    // Process data and send response
    event.ports[0].postMessage({
      type: 'UPDATE_DOM',
      message: 'Data processed successfully'
    });
  }
});`,
        tags: ['service-worker', 'dom', 'postMessage', 'communication']
      },
      {
        id: 36,
        question: 'What is IndexedDB?',
        answer: `IndexedDB is a low-level API for client-side storage of larger amounts of structured data, including files/blobs. This API uses indexes to enable high-performance searches of this data.`,
        code: `// Open IndexedDB
const request = indexedDB.open('MyDatabase', 1);

request.onerror = event => {
  console.log('Database error: ' + event.target.errorCode);
};

request.onsuccess = event => {
  const db = event.target.result;
  console.log('Database opened successfully');
};

request.onupgradeneeded = event => {
  const db = event.target.result;
  
  // Create object store
  const objectStore = db.createObjectStore('customers', { keyPath: 'id' });
  
  // Create indexes
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
};

// Add data
function addCustomer(db, customer) {
  const transaction = db.transaction(['customers'], 'readwrite');
  const objectStore = transaction.objectStore('customers');
  const request = objectStore.add(customer);
  
  request.onsuccess = () => {
    console.log('Customer added successfully');
  };
}`,
        tags: ['indexeddb', 'storage', 'database', 'client-side']
      },
      {
        id: 37,
        question: 'What is a post message?',
        answer: `Post message is a method that enables cross-origin communication between Window objects.(i.e, between a page and a pop-up that it spawned, or between a page and an iframe embedded within it). Generally, scripts on different pages are allowed to access each other if and only if the pages follow same-origin policy(i.e, pages share the same protocol, port number, and host).`,
        code: `// Parent window
const iframe = document.getElementById('myIframe');

// Send message to iframe
iframe.contentWindow.postMessage('Hello from parent', 'https://example.com');

// Listen for messages from iframe
window.addEventListener('message', event => {
  if (event.origin !== 'https://example.com') return;
  
  console.log('Received:', event.data);
  
  // Send response back
  event.source.postMessage('Message received', event.origin);
});

// In iframe (child window)
// Listen for messages from parent
window.addEventListener('message', event => {
  if (event.origin !== 'https://parent.com') return;
  
  console.log('Parent says:', event.data);
  
  // Send message back to parent
  event.source.postMessage('Hello from iframe', event.origin);
});

// Web Worker communication
const worker = new Worker('worker.js');
worker.postMessage('Hello worker');
worker.onmessage = event => {
  console.log('Worker says:', event.data);
};`,
        tags: ['postMessage', 'cross-origin', 'iframe', 'communication']
      }
    ]
  },
  {
    id: 'promises-async',
    title: 'Promises & Async Programming',
    description: 'Promises, callbacks, async/await, and asynchronous patterns',
    icon: '⚡',
    difficulty: 'Advanced',
    estimatedTime: '5-6 hours',
    questions: [
      {
        id: 38,
        question: 'What is the main difference between localStorage and sessionStorage?',
        answer: `LocalStorage is the same as SessionStorage but it persists the data even when the browser is closed and reopened(i.e it has no expiration time) whereas in sessionStorage data gets cleared when the page session ends.`,
        code: `// localStorage - persists until manually deleted
localStorage.setItem('user', 'john');
localStorage.setItem('theme', 'dark');

// sessionStorage - cleared when tab closes
sessionStorage.setItem('tempData', 'session-specific');

// Checking data persistence
console.log(localStorage.getItem('user')); // Available after browser restart
console.log(sessionStorage.getItem('tempData')); // null after tab close`,
        tags: ['localStorage', 'sessionStorage', 'persistence', 'storage']
      },
      {
        id: 39,
        question: 'How do you access web storage?',
        answer: `The Window object implements the WindowLocalStorage and WindowSessionStorage objects which has localStorage(window.localStorage) and sessionStorage(window.sessionStorage) properties respectively. These properties create an instance of the Storage object, through which data items can be set, retrieved and removed for a specific domain and storage type (session or local).`,
        code: `// Setting data
localStorage.setItem("logo", document.getElementById("logo").value);
sessionStorage.setItem("user", "john");

// Getting data
let logo = localStorage.getItem("logo");
let user = sessionStorage.getItem("user");

// Removing data
localStorage.removeItem("logo");
sessionStorage.removeItem("user");

// Clear all data
localStorage.clear();
sessionStorage.clear();

// Check if key exists
if (localStorage.getItem("logo") !== null) {
  console.log("Logo exists in localStorage");
}`,
        tags: ['web-storage', 'localStorage', 'sessionStorage', 'api']
      },
      {
        id: 40,
        question: 'What are the methods available on session storage?',
        answer: `The session storage provided methods for reading, writing and clearing the session data`,
        code: `// Save data to sessionStorage
sessionStorage.setItem("key", "value");

// Get saved data from sessionStorage
let data = sessionStorage.getItem("key");

// Remove saved data from sessionStorage
sessionStorage.removeItem("key");

// Remove all saved data from sessionStorage
sessionStorage.clear();

// Get the number of items
console.log(sessionStorage.length);

// Get key by index
let keyName = sessionStorage.key(0);

// Iterate through all items
for (let i = 0; i < sessionStorage.length; i++) {
  let key = sessionStorage.key(i);
  let value = sessionStorage.getItem(key);
  console.log(key + ': ' + value);
}`,
        tags: ['sessionStorage', 'methods', 'api', 'storage']
      },
      {
        id: 41,
        question: 'What is a storage event and its event handler?',
        answer: `The StorageEvent is an event that fires when a storage area has been changed in the context of another document. Whereas onstorage property is an EventHandler for processing storage events.`,
        code: `// Basic storage event handler
window.onstorage = function (e) {
  console.log(
    "The " +
      e.key +
      " key has been changed from " +
      e.oldValue +
      " to " +
      e.newValue +
      "."
  );
};

// Using addEventListener
window.addEventListener('storage', function(e) {
  console.log('Storage changed:', {
    key: e.key,
    oldValue: e.oldValue,
    newValue: e.newValue,
    url: e.url,
    storageArea: e.storageArea
  });
});

// Example: Sync data across tabs
localStorage.setItem('theme', 'dark'); // This will trigger storage event in other tabs`,
        tags: ['storage-event', 'onstorage', 'cross-tab', 'synchronization']
      },
      {
        id: 42,
        question: 'What is a promise?',
        answer: `A promise is an object that may produce a single value some time in the future with either a resolved value or a reason that it's not resolved(for example, network error). It will be in one of the 3 possible states: fulfilled, rejected, or pending.`,
        code: `// Basic Promise creation
const promise = new Promise(function (resolve, reject) {
  // promise description
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 2000);
});

// Using the promise
promise.then((value) => console.log(value));

// Promise with both resolve and reject
const asyncOperation = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  
  setTimeout(() => {
    if (success) {
      resolve("Operation successful!");
    } else {
      reject(new Error("Operation failed!"));
    }
  }, 1000);
});

asyncOperation
  .then(result => console.log(result))
  .catch(error => console.error(error));`,
        tags: ['promises', 'async', 'resolve', 'reject']
      },
      {
        id: 43,
        question: 'What are the three states of promise?',
        answer: `Promises have three states:

1. **Pending:** This is an initial state of the Promise before an operation begins
2. **Fulfilled:** This state indicates that the specified operation was completed.
3. **Rejected:** This state indicates that the operation did not complete. In this case an error value will be thrown.`,
        code: `// Pending state
const pendingPromise = new Promise((resolve, reject) => {
  // Promise is in pending state here
  console.log('Promise state: pending');
});

// Fulfilled state
const fulfilledPromise = Promise.resolve('Success!');
fulfilledPromise.then(value => {
  console.log('Promise state: fulfilled, value:', value);
});

// Rejected state
const rejectedPromise = Promise.reject(new Error('Failed!'));
rejectedPromise.catch(error => {
  console.log('Promise state: rejected, error:', error.message);
});

// Checking promise state (not directly accessible)
function checkPromiseState(promise) {
  return Promise.race([promise, Promise.resolve('timeout')])
    .then(value => {
      if (value === 'timeout') {
        return 'pending';
      }
      return 'fulfilled';
    })
    .catch(() => 'rejected');
}`,
        tags: ['promise-states', 'pending', 'fulfilled', 'rejected']
      },
      {
        id: 44,
        question: 'What is a callback function?',
        answer: `A callback function is a function passed into another function as an argument. This function is invoked inside the outer function to complete an action.`,
        code: `function callbackFunction(name) {
  console.log("Hello " + name);
}

function outerFunction(callback) {
  let name = prompt("Please enter your name.");
  callback(name);
}

outerFunction(callbackFunction);

// Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];

// map with callback
const doubled = numbers.map(function(num) {
  return num * 2;
});

// filter with callback
const evens = numbers.filter(function(num) {
  return num % 2 === 0;
});

// forEach with callback
numbers.forEach(function(num, index) {
  console.log('Index:', index, 'Value:', num);
});

// setTimeout with callback
setTimeout(function() {
  console.log('This runs after 2 seconds');
}, 2000);`,
        tags: ['callbacks', 'higher-order-functions', 'async', 'functions']
      },
      {
        id: 45,
        question: 'What is callback hell?',
        answer: `Callback Hell is an anti-pattern with multiple nested callbacks which makes code hard to read and debug when dealing with asynchronous logic.`,
        code: `// Callback hell example
async1(function(result1){
    async2(result1, function(result2){
        async3(result2, function(result3){
            async4(result3, function(result4){
                async5(result4, function(result5){
                    // Finally do something with result5
                    console.log(result5);
                });
            });
        });
    });
});

// Solution 1: Named functions
function step1(callback) {
  setTimeout(() => callback(null, 'Step 1 complete'), 100);
}

function step2(result, callback) {
  setTimeout(() => callback(null, result + ' -> Step 2 complete'), 100);
}

function handleStep1(err, result) {
  if (err) return console.error(err);
  step2(result, handleStep2);
}

function handleStep2(err, result) {
  if (err) return console.error(err);
  console.log(result);
}

step1(handleStep1);

// Solution 2: Promises
function promiseStep1() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Step 1 complete'), 100);
  });
}

function promiseStep2(result) {
  return new Promise(resolve => {
    setTimeout(() => resolve(result + ' -> Step 2 complete'), 100);
  });
}

promiseStep1()
  .then(promiseStep2)
  .then(result => console.log(result))
  .catch(err => console.error(err));`,
        tags: ['callback-hell', 'nested-callbacks', 'promises', 'async-patterns']
      },
      {
        id: 46,
        question: 'What is promise chaining?',
        answer: `The process of executing a sequence of asynchronous tasks one after another using promises is known as Promise chaining.`,
        code: `// Basic promise chaining
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 2
    return result * 3;
  })
  .then(function (result) {
    console.log(result); // 6
    return result * 4;
  })
  .then(function (result) {
    console.log(result); // 24
  });

// Promise chaining with error handling
fetch('/api/user')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(user => {
    console.log('User:', user);
    return fetch('/api/posts/' + user.id);
  })
  .then(response => response.json())
  .then(posts => {
    console.log('User posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Returning promises in chain
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Promise.resolve('Start')
  .then(result => {
    console.log(result);
    return delay(1000).then(() => 'After 1 second');
  })
  .then(result => {
    console.log(result);
    return delay(1000).then(() => 'After 2 seconds');
  })
  .then(result => {
    console.log(result);
  });`,
        tags: ['promise-chaining', 'then', 'async-sequence', 'promises']
      },
      {
        id: 47,
        question: 'What is Promise.all?',
        answer: `Promise.all is a promise that takes an array of promises as an input (an iterable), and it gets resolved when all the promises get resolved or any one of them gets rejected.`,
        code: `// Basic Promise.all usage
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [3, 'foo', 42]
  })
  .catch(error => {
    console.log('Error in promises:', error);
  });

// Promise.all with fetch requests
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

Promise.all(urls.map(url => fetch(url)))
  .then(responses => {
    // All requests completed
    return Promise.all(responses.map(response => response.json()));
  })
  .then(data => {
    console.log('All data:', data);
  })
  .catch(error => {
    console.error('One or more requests failed:', error);
  });

// Promise.all fails fast
const fastPromise = Promise.resolve('Fast');
const slowPromise = new Promise(resolve => setTimeout(() => resolve('Slow'), 2000));
const failingPromise = Promise.reject(new Error('Failed'));

Promise.all([fastPromise, slowPromise, failingPromise])
  .then(values => {
    console.log(values); // This won't execute
  })
  .catch(error => {
    console.log('Failed:', error.message); // "Failed" - fails immediately
  });`,
        tags: ['promise-all', 'parallel-execution', 'promises', 'async']
      }
    ]
  },
  {
    id: 'web-workers',
    title: 'Web Workers & Advanced APIs',
    description: 'Web workers, server-sent events, and browser APIs',
    icon: '⚙️',
    difficulty: 'Advanced',
    estimatedTime: '4-5 hours',
    questions: [
      {
        id: 48,
        question: 'How do you check web workers browser support?',
        answer: `You need to check browser support for web workers before using it`,
        code: `if (typeof Worker !== "undefined") {
  // code for Web worker support.
  console.log('Web Workers are supported');
  
  // Create and use web worker
  const worker = new Worker('worker.js');
  worker.postMessage('Hello Worker');
  
  worker.onmessage = function(e) {
    console.log('Message from worker:', e.data);
  };
  
} else {
  // Sorry! No Web Worker support..
  console.log('Web Workers are not supported');
  
  // Fallback to main thread execution
  performTaskOnMainThread();
}

// Feature detection with try-catch
function supportsWebWorkers() {
  try {
    return typeof Worker !== 'undefined';
  } catch (e) {
    return false;
  }
}

if (supportsWebWorkers()) {
  // Use web workers
} else {
  // Use alternative approach
}`,
        tags: ['web-workers', 'feature-detection', 'browser-support', 'workers']
      },
      {
        id: 49,
        question: 'Give an example of a web worker',
        answer: `You need to follow below steps to start using web workers for counting example:

1. Create a Web Worker File
2. Create a Web Worker Object  
3. Terminate a Web Worker
4. Reuse the Web Worker`,
        code: `// counter.js - Web Worker File
let i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()", 500);
}

timedCount();

// main.js - Main thread
let w;

function startWorker() {
  if (typeof Worker !== "undefined") {
    if (typeof w == "undefined") {
      w = new Worker("counter.js");
    }
    
    w.onmessage = function (event) {
      document.getElementById("message").innerHTML = event.data;
    };
    
    w.onerror = function(error) {
      console.log('Worker error:', error);
    };
  } else {
    document.getElementById("message").innerHTML = "Sorry! No Web Worker support.";
  }
}

function stopWorker() {
  if (typeof w !== "undefined") {
    w.terminate();
    w = undefined;
  }
}

// Advanced worker example - data processing
// dataWorker.js
self.onmessage = function(e) {
  const data = e.data;
  
  switch(data.cmd) {
    case 'process':
      const result = processLargeDataset(data.dataset);
      self.postMessage({cmd: 'result', data: result});
      break;
    case 'stop':
      self.close();
      break;
  }
};

function processLargeDataset(dataset) {
  // Simulate heavy computation
  return dataset.map(item => item * 2).filter(item => item > 10);
}

// Using the advanced worker
const dataWorker = new Worker('dataWorker.js');
dataWorker.postMessage({cmd: 'process', dataset: [1,2,3,4,5,6,7,8,9,10]});

dataWorker.onmessage = function(e) {
  if (e.data.cmd === 'result') {
    console.log('Processed data:', e.data.data);
  }
};`,
        tags: ['web-workers', 'background-processing', 'postMessage', 'threading']
      },
      {
        id: 50,
        question: 'What are the restrictions of web workers on DOM?',
        answer: `WebWorkers don't have access to below javascript objects since they are defined in an external files:

1. Window object
2. Document object  
3. Parent object`,
        code: `// worker.js - What you CAN'T do in a web worker
// ❌ These will cause errors:
// console.log(window); // ReferenceError: window is not defined
// document.getElementById('myDiv'); // ReferenceError: document is not defined
// parent.someFunction(); // ReferenceError: parent is not defined
// alert('Hello'); // ReferenceError: alert is not defined

// worker.js - What you CAN do in a web worker
// ✅ These work fine:

// 1. Use console for debugging
console.log('Worker started');

// 2. Perform calculations
function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 3. Use setTimeout/setInterval
setTimeout(() => {
  console.log('Timer in worker');
}, 1000);

// 4. Make HTTP requests
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    self.postMessage({type: 'data', payload: data});
  });

// 5. Use Web APIs available in workers
const request = indexedDB.open('WorkerDB', 1);

// 6. Import other scripts
importScripts('utils.js', 'math.js');

// Communication with main thread
self.onmessage = function(e) {
  const result = fibonacci(e.data.number);
  
  // Send result back to main thread
  self.postMessage({
    type: 'result',
    value: result
  });
};

// main.js - Communicating with worker
const worker = new Worker('worker.js');

worker.postMessage({number: 40});

worker.onmessage = function(e) {
  if (e.data.type === 'result') {
    // Update DOM from main thread
    document.getElementById('result').textContent = e.data.value;
  }
};`,
        tags: ['web-workers', 'dom-restrictions', 'limitations', 'scope']
      },
      {
        id: 51,
        question: 'What are server-sent events?',
        answer: `Server-sent events (SSE) is a server push technology enabling a browser to receive automatic updates from a server via HTTP connection without resorting to polling. These are a one way communications channel - events flow from server to client only. This has been used in Facebook/Twitter updates, stock price updates, news feeds etc.`,
        code: `// Client-side: Receiving server-sent events
if (typeof EventSource !== "undefined") {
  const source = new EventSource("sse_generator.php");
  
  source.onopen = function(event) {
    console.log("Connection to server opened.");
  };
  
  source.onmessage = function(event) {
    document.getElementById("output").innerHTML += event.data + "<br>";
    console.log("Message from server:", event.data);
  };
  
  source.onerror = function(event) {
    console.log("EventSource failed:", event);
  };
  
  // Custom event listeners
  source.addEventListener('userConnected', function(e) {
    console.log('User connected:', e.data);
  });
  
  source.addEventListener('stockPrice', function(e) {
    const data = JSON.parse(e.data);
    updateStockPrice(data.symbol, data.price);
  });
  
} else {
  console.log("Sorry, your browser does not support server-sent events...");
}

// Server-side example (Node.js with Express)
app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  // Send initial message
  res.write('data: Connected to server\\n\\n');

  // Send periodic updates
  const interval = setInterval(() => {
    const data = {
      timestamp: new Date().toISOString(),
      message: 'Server update',
      random: Math.random()
    };
    
    res.write('data: ' + JSON.stringify(data) + '\\n\\n');
  }, 1000);

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

// Advanced SSE with custom events
function sendCustomEvent(res, eventType, data) {
  res.write('event: ' + eventType + '\\n');
  res.write('data: ' + JSON.stringify(data) + '\\n\\n');
}

// Usage
sendCustomEvent(res, 'stockPrice', {symbol: 'AAPL', price: 150.25});`,
        tags: ['server-sent-events', 'sse', 'real-time', 'push-notifications']
      },
      {
        id: 52,
        question: 'What is the purpose of the race method in promise?',
        answer: `Promise.race() method will return the promise instance which is firstly resolved or rejected.`,
        code: `var promise1 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 500, "one");
});
var promise2 = new Promise(function (resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then(function (value) {
  console.log(value); // "two" // Both promises will resolve, but promise2 is faster
});

// Race with rejection
const fastReject = Promise.reject(new Error('Fast rejection'));
const slowResolve = new Promise(resolve => setTimeout(() => resolve('slow'), 1000));

Promise.race([fastReject, slowResolve])
  .then(value => console.log('Resolved:', value))
  .catch(error => console.log('Rejected:', error.message)); // "Fast rejection"

// Timeout pattern using race
function timeout(promise, ms) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeoutPromise]);
}`,
        tags: ['promise-race', 'promises', 'async', 'timeout']
      }
    ]
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Core JavaScript concepts, operators, and language features',
    icon: '🔧',
    difficulty: 'Intermediate',
    estimatedTime: '4-5 hours',
    questions: [
      {
        id: 53,
        question: 'What is a strict mode in javascript?',
        answer: `Strict Mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a "strict" operating context. This way it prevents certain actions from being taken and throws more exceptions. The literal expression "use strict"; instructs the browser to use the javascript code in the Strict mode.`,
        code: `// Global strict mode
"use strict";
x = 3.14; // This will cause an error because x is not declared

// Function-level strict mode
x = 3.14; // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14; // This will cause an error
}

// Strict mode prevents:
// 1. Using undeclared variables
// 2. Deleting variables, functions, or arguments
// 3. Duplicating parameter names
// 4. Using reserved keywords as variable names

function strictExample() {
  "use strict";
  
  // This will throw an error
  // delete x; // SyntaxError
  
  // This will throw an error
  // function test(a, a) {} // SyntaxError
  
  // This will throw an error
  // var let = 5; // SyntaxError
}`,
        tags: ['strict-mode', 'es5', 'security', 'error-handling']
      },
      {
        id: 54,
        question: 'What is the purpose of double exclamation?',
        answer: `The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.`,
        code: `let isIE8 = false;
isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
console.log(isIE8); // returns true or false

// Without double exclamation
console.log(navigator.userAgent.match(/MSIE 8.0/)); // returns either an Array or null

// Double exclamation examples
console.log(!!0); // false
console.log(!!1); // true
console.log(!!""); // false
console.log(!!"hello"); // true
console.log(!!null); // false
console.log(!!undefined); // false
console.log(!![]); // true (empty array is truthy)
console.log(!!{}); // true (empty object is truthy)

// Practical usage
function isValidUser(user) {
  return !!(user && user.name && user.email);
}

// Alternative to Boolean()
console.log(Boolean(0)); // false
console.log(!!0); // false - same result, shorter syntax`,
        tags: ['double-exclamation', 'boolean-conversion', 'truthy-falsy', 'operators']
      },
      {
        id: 55,
        question: 'What is the purpose of the delete operator?',
        answer: `The delete keyword is used to delete the property as well as its value.`,
        code: `var user = { name: "John", age: 20 };
delete user.age;
console.log(user); // {name: "John"}

// Delete array elements
var fruits = ['apple', 'banana', 'orange'];
delete fruits[1];
console.log(fruits); // ['apple', undefined, 'orange']
console.log(fruits.length); // 3 (length doesn't change)

// Delete cannot remove:
// 1. Variables declared with var, let, const
var x = 5;
delete x; // Returns false, x is not deleted

// 2. Function declarations
function myFunc() {}
delete myFunc; // Returns false, function is not deleted

// 3. Built-in properties
delete Math.PI; // Returns false

// Delete returns boolean
const obj = { prop: 'value' };
console.log(delete obj.prop); // true
console.log(delete obj.nonExistent); // true (doesn't exist)
console.log(delete obj); // false (cannot delete variables)

// Configurable properties
Object.defineProperty(obj, 'permanent', {
  value: 'cannot delete',
  configurable: false
});
console.log(delete obj.permanent); // false`,
        tags: ['delete-operator', 'objects', 'properties', 'memory-management']
      },
      {
        id: 56,
        question: 'What is typeof operator?',
        answer: `You can use the JavaScript typeof operator to find the type of a JavaScript variable. It returns the type of a variable or an expression.`,
        code: `typeof "John Abraham"; // Returns "string"
typeof (1 + 2); // Returns "number"

// All possible return values
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (this is a known quirk)
console.log(typeof true); // "boolean"
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof Symbol('id')); // "symbol"
console.log(typeof 123n); // "bigint"
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function(){}); // "function"

// Practical usage
function checkType(value) {
  switch(typeof value) {
    case 'string':
      return 'Text: ' + value;
    case 'number':
      return 'Number: ' + value;
    case 'boolean':
      return 'Boolean: ' + value;
    case 'object':
      if (value === null) return 'Null value';
      if (Array.isArray(value)) return 'Array with ' + value.length + ' items';
      return 'Object';
    case 'function':
      return 'Function: ' + value.name;
    default:
      return 'Unknown type';
  }
}

// Safe property access
if (typeof window !== 'undefined') {
  // Browser environment
  console.log('Running in browser');
}`,
        tags: ['typeof-operator', 'type-checking', 'data-types', 'operators']
      },
      {
        id: 57,
        question: 'What is the difference between null and undefined?',
        answer: `Below are the main differences between null and undefined:

| Null | Undefined |
|------|-----------|
| It is an assignment value which indicates that variable points to no object | It is not an assignment value where a variable has been declared but has not yet been assigned a value |
| Type of null is object | Type of undefined is undefined |
| The null value is a primitive value that represents the null, empty, or non-existent reference | The undefined value is a primitive value used when a variable has not been assigned a value |
| Indicates the absence of a value for a variable | Indicates absence of variable itself |
| Converted to zero (0) while performing primitive operations | Converted to NaN while performing primitive operations |`,
        code: `// Undefined examples
var user; // Value is undefined, type is undefined
console.log(typeof user); // "undefined"
console.log(user); // undefined

// Null examples
var user = null;
console.log(typeof user); // "object"
console.log(user); // null

// Comparison
console.log(null == undefined); // true (loose equality)
console.log(null === undefined); // false (strict equality)

// Type conversion
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN

console.log(String(null)); // "null"
console.log(String(undefined)); // "undefined"

// Practical usage
function getUserData(id) {
  if (!id) {
    return null; // Intentionally no data
  }
  
  const user = database.find(id);
  return user; // Could be undefined if not found
}

// Checking for both
function isEmpty(value) {
  return value == null; // Checks for both null and undefined
}

// JSON behavior
console.log(JSON.stringify({a: null, b: undefined})); // {"a":null}
// undefined properties are omitted in JSON`,
        tags: ['null', 'undefined', 'data-types', 'comparison', 'type-conversion']
      },
      {
        id: 58,
        question: 'What is eval?',
        answer: `The eval() function evaluates JavaScript code represented as a string. The string can be a JavaScript expression, variable, statement, or sequence of statements.`,
        code: `console.log(eval("1 + 2")); // 3

// Evaluating expressions
const x = 10;
const y = 20;
console.log(eval("x + y")); // 30

// Evaluating statements
eval("var z = 30;");
console.log(z); // 30

// Security risks - NEVER do this with user input
const userInput = "alert('XSS Attack!')"; // Malicious code
// eval(userInput); // DON'T DO THIS!

// Better alternatives:
// 1. JSON.parse for data
const jsonString = '{"name": "John", "age": 30}';
const data = JSON.parse(jsonString);

// 2. Function constructor for dynamic functions
const dynamicFunction = new Function('a', 'b', 'return a + b');
console.log(dynamicFunction(5, 3)); // 8

// 3. Template literals for string interpolation
const name = "John";
const greeting = \`Hello, \${name}!\`;

// Why avoid eval:
// 1. Security vulnerabilities (code injection)
// 2. Performance issues (no optimization)
// 3. Debugging difficulties
// 4. Scope pollution

// Safe evaluation (limited scope)
function safeEval(code, context = {}) {
  return new Function(...Object.keys(context), \`return \${code}\`)(...Object.values(context));
}

console.log(safeEval('a + b', {a: 5, b: 3})); // 8`,
        tags: ['eval', 'security', 'code-execution', 'alternatives']
      },
      {
        id: 59,
        question: 'What is the difference between window and document?',
        answer: `Below are the main differences between window and document:

| Window | Document |
|--------|----------|
| It is the root level element in any web page | It is the direct child of the window object. This is also known as Document Object Model(DOM) |
| By default window object is available implicitly in the page | You can access it via window.document or document |
| It has methods like alert(), confirm() and properties like document, location | It provides methods like getElementById, getElementsByTagName, createElement etc |`,
        code: `// Window object examples
console.log(window.innerWidth); // Browser window width
console.log(window.innerHeight); // Browser window height
console.log(window.location.href); // Current URL

window.alert('Hello from window!');
const result = window.confirm('Are you sure?');
const userInput = window.prompt('Enter your name:');

// Window methods
window.open('https://example.com', '_blank');
window.close(); // Close current window
window.focus(); // Focus current window

// Document object examples
console.log(document.title); // Page title
console.log(document.URL); // Current URL
console.log(document.domain); // Domain name

// DOM manipulation
const element = document.getElementById('myId');
const elements = document.getElementsByTagName('div');
const newElement = document.createElement('p');

// Document methods
document.write('Hello World'); // Not recommended
document.writeln('Hello World with newline');

// Event handling
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM is ready');
});

window.addEventListener('load', function() {
  console.log('Page is fully loaded');
});

// Relationship
console.log(window.document === document); // true
console.log(document.defaultView === window); // true

// Global scope
var globalVar = 'I am global';
console.log(window.globalVar); // 'I am global'

// Browser detection
console.log(window.navigator.userAgent);
console.log(window.screen.width);`,
        tags: ['window', 'document', 'dom', 'browser-objects', 'global-scope']
      },
    {
      id: 97,
      question: "Is JavaScript a compiled or interpreted language?",
      answer: "JavaScript is an interpreted language, not a compiled language. An interpreter in the browser reads over the JavaScript code, interprets each line, and runs it. Nowadays modern browsers use a technology known as Just-In-Time (JIT) compilation, which compiles JavaScript to executable bytecode just as it is about to run.",
      code: `// JavaScript is interpreted at runtime
console.log("This code is interpreted line by line");

// Modern browsers use JIT compilation
function optimizedFunction() {
  // This function may be compiled to bytecode
  // for better performance after multiple calls
  return "JIT compilation improves performance";
}`,
      tags: ["language-features", "compilation", "interpretation", "JIT"]
    },
    {
      id: 98,
      question: "Is JavaScript a case-sensitive language?",
      answer: "Yes, JavaScript is a case sensitive language. The language keywords, variables, function & object names, and any other identifiers must always be typed with a consistent capitalization of letters.",
      code: `// JavaScript is case-sensitive
let myVariable = "Hello";
let MyVariable = "World";  // Different variable
let MYVARIABLE = "!";      // Another different variable

console.log(myVariable);   // "Hello"
console.log(MyVariable);   // "World"
console.log(MYVARIABLE);   // "!"`,
      tags: ["language-features", "case-sensitivity", "variables"]
    },
    {
      id: 99,
      question: "Is there any relation between Java and JavaScript?",
      answer: "No, they are entirely two different programming languages and have nothing to do with each other. But both of them are Object Oriented Programming languages and like many other languages, they follow similar syntax for basic features(if, else, for, switch, break, continue etc).",
      code: `// JavaScript and Java are completely different languages
// JavaScript - dynamic, interpreted, prototype-based
let dynamicVariable = "Can change type";
dynamicVariable = 42;  // No problem in JavaScript

// Similar syntax for basic constructs (like Java)
if (true) {
  console.log("Similar if syntax");
}`,
      tags: ["language-comparison", "java", "javascript"]
    },
    {
      id: 100,
      question: "What are events?",
      answer: "Events are \"things\" that happen to HTML elements. When JavaScript is used in HTML pages, JavaScript can react on these events. Some examples include: web page has finished loading, input field was changed, button was clicked.",
      code: `// Modern event handling with addEventListener
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded');
});

const button = document.getElementById('myButton');
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
});`,
      tags: ["events", "DOM", "event-handling"]
    },
    {
      id: 101,
      question: "Who created JavaScript?",
      answer: "JavaScript was created by Brendan Eich in 1995 during his time at Netscape Communications. Initially it was developed under the name 'Mocha', but later the language was officially called 'LiveScript' when it first shipped in beta releases of Netscape.",
      code: `// JavaScript history timeline
const jsHistory = {
  1995: {
    creator: "Brendan Eich",
    company: "Netscape Communications",
    originalName: "Mocha",
    laterName: "LiveScript",
    finalName: "JavaScript"
  },
  development: "Created in just 10 days",
  purpose: "Add interactivity to web pages"
};

console.log("JavaScript was created by:", jsHistory[1995].creator);`,
      tags: ["history", "brendan-eich", "netscape", "javascript-origins"]
    },
    {
      id: 102,
      question: "What is the use of preventDefault method?",
      answer: "The preventDefault() method cancels the event if it is cancelable, meaning that the default action or behaviour that belongs to the event will not occur. For example, prevent form submission when clicking on submit button and prevent opening the page URL when clicking on hyperlink are some common use cases.",
      code: `// Prevent default link behavior
document.getElementById("link").addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Link click prevented");
});

// Prevent form submission
document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("Form submission prevented");
  // Handle form data with JavaScript instead
});`,
      tags: ["events", "preventDefault", "event-handling", "default-behavior"]
    },
    {
      id: 103,
      question: "What is the use of stopPropagation method?",
      answer: "The stopPropagation method is used to stop the event from bubbling up the event chain. For example, nested divs with stopPropagation method prevents default event propagation when clicking on nested div.",
      code: `// JavaScript event handlers
function firstFunc(event) {
  alert("DIV 1");
  event.stopPropagation(); // Stops event from bubbling to DIV 2
}

function secondFunc() {
  alert("DIV 2"); // This won't be called when DIV 1 is clicked
}

// Modern approach with addEventListener
document.getElementById('outer').addEventListener('click', function() {
  console.log('Outer div clicked');
});

document.getElementById('inner').addEventListener('click', function(event) {
  console.log('Inner div clicked');
  event.stopPropagation(); // Prevents outer div handler from firing
});`,
      tags: ["events", "stopPropagation", "event-bubbling", "event-propagation"]
    },
    {
      id: 104,
      question: "What are the steps involved in return false usage?",
      answer: "The return false statement in event handlers performs these steps: 1) First it stops the browser's default action or behaviour, 2) It prevents the event from propagating the DOM, 3) Stops callback execution and returns immediately when called.",
      code: `// return false in event handlers
document.getElementById("myLink").onclick = function(event) {
  console.log("Link clicked");
  return false; // Equivalent to both preventDefault() and stopPropagation()
};

// Equivalent to:
document.getElementById("myLink").addEventListener("click", function(event) {
  console.log("Link clicked");
  event.preventDefault();
  event.stopPropagation();
});`,
      tags: ["events", "return-false", "preventDefault", "stopPropagation"]
    },
    {
      id: 105,
      question: "What is BOM?",
      answer: "The Browser Object Model (BOM) allows JavaScript to \"talk to\" the browser. It consists of the objects navigator, history, screen, location and document which are children of the window. The Browser Object Model is not standardized and can change based on different browsers.",
      code: `// Browser Object Model (BOM) examples
console.log("Window object:", window);

// Navigator object - browser information
console.log("Browser name:", navigator.appName);
console.log("User agent:", navigator.userAgent);
console.log("Platform:", navigator.platform);

// Location object - URL information
console.log("Current URL:", location.href);
console.log("Protocol:", location.protocol);
console.log("Hostname:", location.hostname);

// History object - browser history
history.back();    // Go back one page
history.forward(); // Go forward one page
history.go(-2);    // Go back 2 pages

// Screen object - screen information
console.log("Screen width:", screen.width);
console.log("Screen height:", screen.height);`,
      tags: ["BOM", "browser-object-model", "window", "navigator", "location", "history"]
    },
    {
      id: 106,
      question: "What is the use of setTimeout?",
      answer: "The setTimeout() method is used to call a function or evaluate an expression after a specified number of milliseconds. For example, you can log a message after 2 seconds using setTimeout method.",
      code: `// Basic setTimeout usage
setTimeout(function() {
  console.log("Good morning");
}, 2000); // Execute after 2 seconds

// setTimeout with arrow function
setTimeout(() => {
  console.log("This runs after 1 second");
}, 1000);

// setTimeout with parameters
function greet(name, message) {
  console.log(\`\${message}, \${name}!\`);
}

setTimeout(greet, 3000, "John", "Hello");

// Store timeout ID for clearing
const timeoutId = setTimeout(() => {
  console.log("This might not run");
}, 5000);

// Clear timeout if needed
clearTimeout(timeoutId);`,
      tags: ["setTimeout", "timers", "asynchronous", "callbacks"]
    },
    {
      id: 107,
      question: "What is the use of setInterval?",
      answer: "The setInterval() method is used to call a function or evaluate an expression at specified intervals (in milliseconds). For example, you can log a message every 2 seconds using setInterval method.",
      code: `// Basic setInterval usage
setInterval(function() {
  console.log("Good morning");
}, 2000); // Execute every 2 seconds

// setInterval with arrow function
const intervalId = setInterval(() => {
  console.log("This runs every second");
}, 1000);

// Clear interval after some time
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Interval cleared");
}, 5000);

// Practical example - digital clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  console.log("Current time:", timeString);
}

const clockInterval = setInterval(updateClock, 1000);`,
      tags: ["setInterval", "timers", "intervals", "periodic-execution"]
    },
    {
      id: 108,
      question: "Why is JavaScript treated as Single threaded?",
      answer: "JavaScript is a single-threaded language. Because the language specification does not allow the programmer to write code so that the interpreter can run parts of it in parallel in multiple threads or processes. Whereas languages like java, go, C++ can make multi-threaded and multi-process programs.",
      code: `// JavaScript single-threaded execution
console.log("1. First");

setTimeout(() => {
  console.log("3. Timeout callback");
}, 0);

console.log("2. Second");

// Output: 1. First, 2. Second, 3. Timeout callback
// Even with 0ms delay, setTimeout is asynchronous

// Event loop demonstration
function heavyTask() {
  console.log("Heavy task started");
  let count = 0;
  for (let i = 0; i < 1000000000; i++) {
    count++;
  }
  console.log("Heavy task completed");
}

console.log("Before heavy task");
heavyTask(); // Blocks the main thread
console.log("After heavy task");`,
      tags: ["single-threaded", "event-loop", "concurrency", "web-workers"]
    },
    {
      id: 109,
      question: "What is event delegation?",
      answer: "Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it. This is useful for handling events on dynamically created elements.",
      code: `// Event delegation example
var form = document.querySelector("#registration-form");

// Listen for changes to fields inside the form
form.addEventListener("input", function(event) {
  // Log the field that was changed
  console.log("Field changed:", event.target.name);
  console.log("New value:", event.target.value);
}, false);

// Dynamic list with event delegation
const list = document.getElementById('dynamic-list');

// Delegate click events to the list container
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('List item clicked:', event.target.textContent);
    event.target.style.backgroundColor = 'yellow';
  }
});

// Add new items dynamically - they automatically get the event handler
function addListItem(text) {
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
}`,
      tags: ["event-delegation", "events", "dynamic-elements", "performance"]
    },
    {
      id: 110,
      question: "What is ECMAScript?",
      answer: "ECMAScript is the scripting language that forms the basis of JavaScript. ECMAScript standardized by the ECMA International standards organization in the ECMA-262 and ECMA-402 specifications. The first edition of ECMAScript was released in 1997.",
      code: `// ECMAScript versions and features
const ecmaScriptVersions = {
  ES1: { year: 1997, features: "First edition" },
  ES2: { year: 1998, features: "Minor changes" },
  ES3: { year: 1999, features: "Regular expressions, try/catch" },
  ES5: { year: 2009, features: "Strict mode, JSON, Array methods" },
  ES6: { year: 2015, features: "Classes, modules, arrow functions, let/const" },
  ES2016: { year: 2016, features: "Array.includes(), exponentiation operator" },
  ES2017: { year: 2017, features: "async/await, Object.entries()" },
  ES2018: { year: 2018, features: "Rest/spread for objects, async iteration" },
  ES2019: { year: 2019, features: "Array.flat(), Object.fromEntries()" },
  ES2020: { year: 2020, features: "BigInt, nullish coalescing, optional chaining" }
};

// ES6+ features example
const person = { name: "John", age: 30 };
const { name, age } = person; // Destructuring
const greeting = \`Hello, \${name}!\`; // Template literals
const arrow = () => "Arrow function"; // Arrow functions`,
      tags: ["ECMAScript", "JavaScript", "standards", "ECMA-262", "language-specification"]
    },
    {
      id: 111,
      question: "What is JSON?",
      answer: "JSON (JavaScript Object Notation) is a lightweight format that is used for data interchanging. It is based on a subset of JavaScript language in the way objects are built in JavaScript.",
      code: `// JSON example
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = {
  name: "John",
  age: 30,
  city: "New York"
};

// JSON vs JavaScript object
const jsObject = {
  name: "John",        // No quotes around property names
  age: 30,
  greet: function() {  // Functions allowed
    return "Hello";
  },
  date: new Date()     // Date objects allowed
};

const jsonData = {
  "name": "John",      // Property names must be quoted
  "age": 30            // No functions, dates must be strings
  // "date": "2023-01-01T00:00:00.000Z"
};`,
      tags: ["JSON", "data-format", "serialization", "data-interchange"]
    },
    {
      id: 112,
      question: "What are the syntax rules of JSON?",
      answer: "JSON syntax rules: 1) The data is in name/value pairs, 2) The data is separated by commas, 3) Curly braces hold objects, 4) Square brackets hold arrays.",
      code: `// JSON syntax rules examples
const validJSON = {
  // 1. Data in name/value pairs (property names in quotes)
  "name": "John",
  "age": 30,
  
  // 2. Data separated by commas
  "hobbies": ["reading", "swimming", "coding"],
  
  // 3. Curly braces hold objects
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  
  // 4. Square brackets hold arrays
  "scores": [95, 87, 92, 88]
};

// Valid JSON data types
const jsonDataTypes = {
  "string": "Hello World",
  "number": 42,
  "boolean": true,
  "null": null,
  "object": {"nested": "value"},
  "array": [1, 2, 3, "mixed", true]
};`,
      tags: ["JSON", "syntax", "data-types", "validation"]
    },
    {
      id: 113,
      question: "What is the purpose of JSON stringify?",
      answer: "When sending data to a web server, the data has to be in a string format. You can achieve this by converting JSON object into a string using stringify() method.",
      code: `// JSON.stringify() examples
var userJSON = { name: "John", age: 31 };
var userString = JSON.stringify(userJSON);
console.log(userString); // "{"name":"John","age":31}"

// stringify with replacer function
const data = {
  name: "John",
  password: "secret123",
  age: 30,
  email: "john@example.com"
};

// Filter out sensitive data
const safeString = JSON.stringify(data, (key, value) => {
  if (key === 'password') return undefined;
  return value;
});
console.log(safeString); // {"name":"John","age":30,"email":"john@example.com"}

// stringify with space parameter for formatting
const formatted = JSON.stringify(data, null, 2);`,
      tags: ["JSON", "stringify", "serialization", "data-conversion"]
    },
    {
      id: 114,
      question: "How do you parse JSON string?",
      answer: "When receiving data from a web server, the data is always in a string format. But you can convert this string value to a javascript object using parse() method.",
      code: `// JSON.parse() examples
var userString = '{"name":"John","age":31}';
var userJSON = JSON.parse(userString);
console.log(userJSON); // {name: "John", age: 31}

// parse with reviver function
const jsonString = '{"date":"2023-01-01T00:00:00.000Z","name":"John","age":30}';

const parsed = JSON.parse(jsonString, (key, value) => {
  // Convert date strings back to Date objects
  if (key === 'date') {
    return new Date(value);
  }
  return value;
});

console.log(parsed.date instanceof Date); // true

// Error handling for invalid JSON
function safeJSONParse(str) {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('Invalid JSON:', error.message);
    return null;
  }
}`,
      tags: ["JSON", "parse", "deserialization", "error-handling"]
    },
    {
      id: 115,
      question: "Why do you need JSON?",
      answer: "When exchanging data between a browser and a server, the data can only be text. Since JSON is text only, it can easily be sent to and from a server, and used as a data format by any programming language.",
      code: `// Why JSON is needed - data exchange examples

// 1. AJAX requests
fetch('/api/users')
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    console.log('Users:', data);
  });

// 2. Sending data to server
const userData = {
  name: "John",
  email: "john@example.com",
  age: 30
};

fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData) // Convert to JSON string
});

// 3. Local storage (only stores strings)
const settings = { theme: "dark", language: "en" };
localStorage.setItem('settings', JSON.stringify(settings));

// Retrieve from local storage
const savedSettings = JSON.parse(localStorage.getItem('settings'));`,
      tags: ["JSON", "data-exchange", "APIs", "interoperability", "web-development"]
    },
    {
      id: 116,
      question: "What are PWAs?",
      answer: "Progressive web applications (PWAs) are a type of mobile app delivered through the web, built using common web technologies including HTML, CSS and JavaScript. These PWAs are deployed to servers, accessible through URLs, and indexed by search engines.",
      code: `// PWA features and implementation

// 1. Service Worker for offline functionality
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('SW registered:', registration);
    })
    .catch(error => {
      console.log('SW registration failed:', error);
    });
}

// 2. Web App Manifest (manifest.json)
const manifest = {
  "name": "My PWA App",
  "short_name": "MyPWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
};

// PWA characteristics:
console.log("PWA features: Progressive, Responsive, Offline, App-like, Secure, Discoverable, Re-engageable, Installable");`,
      tags: ["PWA", "progressive-web-apps", "service-worker", "offline", "mobile"]
    },
    {
      id: 117,
      question: "What is the purpose of clearTimeout method?",
      answer: "The clearTimeout() function is used in javascript to clear the timeout which has been set by setTimeout() function before that. The return value of setTimeout() function is stored in a variable and it's passed into the clearTimeout() function to clear the timer.",
      code: `// clearTimeout example
var msg;
function greeting() {
   alert('Good morning');
}
function start() {
  msg = setTimeout(greeting, 3000);
}

function stop() {
    clearTimeout(msg);
}

// Modern approach
let timeoutId;

function startTimer() {
  console.log("Timer started");
  timeoutId = setTimeout(() => {
    console.log("Timer executed!");
  }, 5000);
}

function cancelTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    console.log("Timer cancelled");
    timeoutId = null;
  }
}

// Practical example - auto-save with cancellation
let saveTimeoutId;

function scheduleAutoSave() {
  // Cancel previous auto-save if user is still typing
  if (saveTimeoutId) {
    clearTimeout(saveTimeoutId);
  }
  
  // Schedule new auto-save
  saveTimeoutId = setTimeout(() => {
    console.log("Auto-saving document...");
    // Perform save operation
  }, 2000);
}`,
      tags: ["clearTimeout", "timers", "setTimeout", "timer-management"]
    },
    {
      id: 118,
      question: "What is the purpose of clearInterval method?",
      answer: "The clearInterval() function is used in javascript to clear the interval which has been set by setInterval() function. The return value returned by setInterval() function is stored in a variable and it's passed into the clearInterval() function to clear the interval.",
      code: `// clearInterval example
var msg;
function greeting() {
   alert('Good morning');
}
function start() {
  msg = setInterval(greeting, 3000);
}

function stop() {
    clearInterval(msg);
}

// Modern approach - digital clock
let clockInterval;

function startClock() {
  clockInterval = setInterval(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('clock').textContent = timeString;
  }, 1000);
  console.log("Clock started");
}

function stopClock() {
  if (clockInterval) {
    clearInterval(clockInterval);
    clockInterval = null;
    console.log("Clock stopped");
  }
}

// Auto-refresh data with stop/start capability
let dataRefreshInterval;

function startDataRefresh() {
  dataRefreshInterval = setInterval(async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      updateUI(data);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  }, 30000); // Refresh every 30 seconds
}`,
      tags: ["clearInterval", "timers", "setInterval", "interval-management"]
    },
    {
      id: 119,
      question: "How do you redirect to a new page in JavaScript?",
      answer: "In vanilla javascript, you can redirect to a new page using the location property of window object. The syntax would be as follows: window.location.href = 'newPage.html'",
      code: `// Different ways to redirect in JavaScript

// 1. Using window.location.href (most common)
function redirect() {
  window.location.href = "newPage.html";
}

// 2. Using window.location.assign()
window.location.assign("https://www.example.com");

// 3. Using window.location.replace() (no back button history)
window.location.replace("https://www.example.com");

// 4. Using window.open() for new tab/window
window.open("https://www.example.com", "_blank");

// 5. Conditional redirect
function conditionalRedirect(userRole) {
  if (userRole === 'admin') {
    window.location.href = '/admin-dashboard';
  } else {
    window.location.href = '/user-dashboard';
  }
}

// 6. Redirect after delay
setTimeout(() => {
  window.location.href = '/thank-you';
}, 3000);`,
      tags: ["navigation", "redirect", "window-location", "page-navigation"]
    },
    {
      id: 120,
      question: "How do you check whether a string contains a substring?",
      answer: "There are 3 possible ways to check whether a string contains a substring or not: 1) Using includes (ES6), 2) Using indexOf (ES5), 3) Using RegEx",
      code: `// 1. Using includes (ES6)
var mainString = "hello",
  subString = "hell";
mainString.includes(subString); // true

// 2. Using indexOf (ES5 or older)
var mainString = "hello",
  subString = "hell";
mainString.indexOf(subString) !== -1; // true

// 3. Using RegEx
var mainString = "hello",
  regex = /hell/;
regex.test(mainString); // true

// More examples
const text = "The quick brown fox jumps over the lazy dog";

// Case-sensitive search
console.log(text.includes("fox")); // true
console.log(text.includes("Fox")); // false

// Case-insensitive search
console.log(text.toLowerCase().includes("fox".toLowerCase())); // true

// Using indexOf with position
console.log(text.indexOf("fox")); // 16 (position where "fox" starts)
console.log(text.indexOf("cat")); // -1 (not found)

// Using search() method
console.log(text.search(/fox/i)); // 16 (case-insensitive)`,
      tags: ["strings", "substring", "includes", "indexOf", "search"]
    },
    {
      id: 121,
      question: "How do you validate an email in javascript?",
      answer: "You can validate an email in javascript using regular expressions. It is recommended to do validations on the server side instead of the client side. Because the javascript can be disabled on the client side.",
      code: `function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Usage examples
console.log(validateEmail("user@example.com")); // true
console.log(validateEmail("invalid.email")); // false
console.log(validateEmail("test@domain")); // false
console.log(validateEmail("user@domain.co.uk")); // true

// Alternative simpler regex (less strict)
function simpleEmailValidation(email) {
  const simpleRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return simpleRegex.test(email);
}

// HTML5 input validation
// <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">`,
      tags: ["validation", "email", "regex", "forms", "input-validation"]
    },
    {
      id: 122,
      question: "How do you get the current url with javascript?",
      answer: "You can use window.location.href expression to get the current url path and you can use the same expression for updating the URL too. You can also use document.URL for read-only purposes but this solution has issues in FF.",
      code: `// Get current URL
console.log("location.href", window.location.href); // Returns full URL

// Different URL properties
console.log("Protocol:", window.location.protocol); // http: or https:
console.log("Host:", window.location.host); // domain.com:8080
console.log("Hostname:", window.location.hostname); // domain.com
console.log("Port:", window.location.port); // 8080
console.log("Pathname:", window.location.pathname); // /path/page.html
console.log("Search:", window.location.search); // ?param=value
console.log("Hash:", window.location.hash); // #section

// Alternative methods
console.log("Document URL:", document.URL); // Read-only, similar to location.href
console.log("Document baseURI:", document.baseURI); // Base URI of document

// Constructing URLs
const currentUrl = new URL(window.location.href);
console.log("URL object:", currentUrl);
console.log("Search params:", currentUrl.searchParams.get('param'));`,
      tags: ["URL", "location", "window", "navigation", "web-apis"]
    },
    {
      id: 123,
      question: "What are the various url properties of location object?",
      answer: "The Location object properties can be used to access URL components of the page: href (entire URL), protocol, host, hostname, port, pathname, search (query portion), hash (anchor portion).",
      code: `// URL: https://example.com:8080/path/page.html?param=value&id=123#section

// Location object properties
const locationProps = {
  href: window.location.href,           // "https://example.com:8080/path/page.html?param=value&id=123#section"
  protocol: window.location.protocol,   // "https:"
  host: window.location.host,          // "example.com:8080"
  hostname: window.location.hostname,   // "example.com"
  port: window.location.port,          // "8080"
  pathname: window.location.pathname,   // "/path/page.html"
  search: window.location.search,      // "?param=value&id=123"
  hash: window.location.hash           // "#section"
};

console.table(locationProps);

// Practical usage
function parseCurrentURL() {
  const url = new URL(window.location.href);
  return {
    domain: url.hostname,
    path: url.pathname,
    params: Object.fromEntries(url.searchParams),
    fragment: url.hash.slice(1) // Remove # symbol
  };
}

console.log(parseCurrentURL());`,
      tags: ["location", "URL", "properties", "navigation", "web-apis"]
    },
    {
      id: 124,
      question: "How do get query string values in javascript?",
      answer: "You can use URLSearchParams to get query string values in javascript. Let's see an example to get the client code value from URL query string.",
      code: `// URL: https://example.com/page?clientCode=ABC123&userId=456&active=true

// Using URLSearchParams (modern approach)
const urlParams = new URLSearchParams(window.location.search);
const clientCode = urlParams.get("clientCode"); // "ABC123"
const userId = urlParams.get("userId"); // "456"
const active = urlParams.get("active"); // "true"

console.log("Client Code:", clientCode);
console.log("User ID:", userId);
console.log("Active:", active);

// Get all parameters as an object
const allParams = Object.fromEntries(urlParams);
console.log("All params:", allParams);

// Check if parameter exists
console.log("Has clientCode:", urlParams.has("clientCode")); // true

// Get all values for a parameter (if multiple)
urlParams.getAll("tags"); // Returns array

// Legacy approach (manual parsing)
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Alternative legacy method
function getQueryParamLegacy(name) {
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}`,
      tags: ["query-string", "URLSearchParams", "URL", "parameters", "parsing"]
    },
    {
      id: 125,
      question: "How do you check if a key exists in an object?",
      answer: "You can check whether a key exists in an object or not using three approaches: 1) Using in operator, 2) Using hasOwnProperty method, 3) Using undefined comparison",
      code: `const user = {
  name: "John",
  age: 30
};

// 1. Using 'in' operator
console.log("name" in user); // true
console.log("email" in user); // false

// Check if key doesn't exist
console.log(!("email" in user)); // true

// 2. Using hasOwnProperty method (checks own properties only)
console.log(user.hasOwnProperty("name")); // true
console.log(user.hasOwnProperty("email")); // false

// 3. Using undefined comparison
console.log(user.name !== undefined); // true
console.log(user.email !== undefined); // false

// Difference between 'in' and 'hasOwnProperty'
const child = Object.create(user);
child.hobby = "reading";

console.log("name" in child); // true (inherited)
console.log(child.hasOwnProperty("name")); // false (not own property)
console.log(child.hasOwnProperty("hobby")); // true (own property)

// Modern approach using Object.hasOwn() (ES2022)
if (Object.hasOwn) {
  console.log(Object.hasOwn(user, "name")); // true
  console.log(Object.hasOwn(user, "email")); // false
}

// Safe property access
function safeGet(obj, key, defaultValue = null) {
  return obj.hasOwnProperty(key) ? obj[key] : defaultValue;
}`,
      tags: ["objects", "properties", "hasOwnProperty", "in-operator", "property-checking"]
    },
    {
      id: 126,
      question: "How do you loop through or enumerate javascript object?",
      answer: "You can use the for-in loop to loop through javascript object. You can also make sure that the key you get is an actual property of an object, and doesn't come from the prototype using hasOwnProperty method.",
      code: `const object = { a: 1, b: 2, c: 3 };

// 1. for...in loop
for (const property in object) {
  console.log(\`\${property}: \${object[property]}\`);
}

// 2. for...in with hasOwnProperty check
for (const property in object) {
  if (object.hasOwnProperty(property)) {
    console.log(\`\${property}: \${object[property]}\`);
  }
}

// 3. Object.keys()
Object.keys(object).forEach(key => {
  console.log(\`\${key}: \${object[key]}\`);
});

// 4. Object.entries()
Object.entries(object).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

// 5. Object.values()
Object.values(object).forEach(value => {
  console.log(value);
});

// 6. for...of with Object.entries()
for (const [key, value] of Object.entries(object)) {
  console.log(\`\${key}: \${value}\`);
}`,
      tags: ["objects", "loops", "enumeration", "for-in", "Object.keys", "Object.entries"]
    },
    {
      id: 127,
      question: "How do you test for an empty object?",
      answer: "There are different solutions based on ECMAScript versions: 1) Using Object entries(ECMA 7+), 2) Using Object keys(ECMA 5+), 3) Using for-in with hasOwnProperty(Pre-ECMA 5)",
      code: `const emptyObject = {};
const nonEmptyObject = { name: "John" };

// 1. Using Object.keys() (ES5+)
function isEmpty1(obj) {
  return Object.keys(obj).length === 0;
}

// 2. Using Object.entries() (ES2017+)
function isEmpty2(obj) {
  return Object.entries(obj).length === 0;
}

// 3. Using for...in loop with hasOwnProperty
function isEmpty3(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

// 4. Using JSON.stringify (not recommended for performance)
function isEmpty4(obj) {
  return JSON.stringify(obj) === '{}';
}

// 5. Using Object.getOwnPropertyNames()
function isEmpty5(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
}

// Testing
console.log(isEmpty1(emptyObject)); // true
console.log(isEmpty1(nonEmptyObject)); // false

// Modern approach with Object.keys
const isEmptyObject = obj => Object.keys(obj).length === 0 && obj.constructor === Object;`,
      tags: ["objects", "empty-check", "Object.keys", "Object.entries", "validation"]
    },
    {
      id: 128,
      question: "What is an arguments object?",
      answer: "The arguments object is an Array-like object accessible inside functions that contains the values of the arguments passed to that function. For example, let's see how to use arguments object inside sum function.",
      code: `// Arguments object example
function sum() {
  let total = 0;
  console.log("Arguments length:", arguments.length);
  
  // Loop through arguments
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
    console.log(\`Argument \${i}: \${arguments[i]}\`);
  }
  
  return total;
}

console.log(sum(1, 2, 3, 4)); // 10

// Converting arguments to array
function convertArgsToArray() {
  // Method 1: Array.from()
  const argsArray1 = Array.from(arguments);
  
  // Method 2: Spread operator
  const argsArray2 = [...arguments];
  
  // Method 3: Array.prototype.slice.call()
  const argsArray3 = Array.prototype.slice.call(arguments);
  
  console.log("Array from arguments:", argsArray1);
  return argsArray1;
}

convertArgsToArray(1, 2, 3);

// Note: Arrow functions don't have arguments object
const arrowFunction = () => {
  // console.log(arguments); // ReferenceError
  // Use rest parameters instead
};

// Modern alternative: Rest parameters
function modernSum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(modernSum(1, 2, 3, 4)); // 10`,
      tags: ["functions", "arguments", "parameters", "array-like", "rest-parameters"]
    },
    {
      id: 129,
      question: "How do you make first letter of the string in an uppercase?",
      answer: "You can create a function which uses a chain of string methods such as charAt, toUpperCase and slice methods to generate a string with the first letter in uppercase.",
      code: `// Method 1: Using charAt, toUpperCase, and slice
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Method 2: Using bracket notation
function capitalizeFirstLetter2(string) {
  return string[0].toUpperCase() + string.slice(1);
}

// Method 3: Using substring
function capitalizeFirstLetter3(string) {
  return string.charAt(0).toUpperCase() + string.substring(1);
}

// Method 4: Using replace with regex
function capitalizeFirstLetter4(string) {
  return string.replace(/^./, string[0].toUpperCase());
}

// Method 5: Handle edge cases
function capitalizeFirstLetterSafe(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Examples
console.log(capitalizeFirstLetter("hello world")); // "Hello world"
console.log(capitalizeFirstLetter("HELLO WORLD")); // "HELLO WORLD"
console.log(capitalizeFirstLetterSafe("hello WORLD")); // "Hello world"

// Capitalize each word
function capitalizeWords(string) {
  return string.split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ');
}

console.log(capitalizeWords("hello world javascript")); // "Hello World Javascript"

// Using CSS alternative (for display purposes)
// .capitalize-first { text-transform: capitalize; }`,
      tags: ["strings", "capitalization", "charAt", "toUpperCase", "slice", "text-manipulation"]
    },
    {
      id: 130,
      question: "What are the pros and cons of for loop?",
      answer: "The for-loop is commonly used iteration syntax in javascript. It has both pros and cons: Pros: Works on every environment, You can use break and continue flow control, Cons: Too verbose, Imperative, You might face one-by-off errors",
      code: `// Traditional for loop
const numbers = [1, 2, 3, 4, 5];

// PROS Examples:

// 1. Works in every environment
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// 2. Full control with break and continue
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 3) continue; // Skip 3
  if (numbers[i] === 5) break;    // Stop at 5
  console.log(numbers[i]); // Prints: 1, 2, 4
}

// 3. Flexible iteration (reverse, step by 2, etc.)
for (let i = numbers.length - 1; i >= 0; i--) {
  console.log(numbers[i]); // Reverse iteration
}

for (let i = 0; i < numbers.length; i += 2) {
  console.log(numbers[i]); // Every other element
}

// CONS Examples:

// 1. Verbose syntax
// Traditional for loop (verbose)
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i] * 2);
}

// vs Modern alternatives (concise)
numbers.forEach(num => console.log(num * 2));
numbers.map(num => num * 2);

// 2. Imperative style (how vs what)
// Imperative (how to do)
let doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Declarative (what to do)
const doubledDeclarative = numbers.map(num => num * 2);

// 3. Common off-by-one errors
// Wrong: i <= numbers.length (goes beyond array)
// Correct: i < numbers.length`,
      tags: ["loops", "for-loop", "iteration", "control-flow", "performance", "best-practices"]
    },
    {
      id: 131,
      question: "How do you display the current date in javascript?",
      answer: "You can use new Date() to generate a new Date object containing the current date and time. For example, let's display the current date in mm/dd/yyyy format.",
      code: `// Current date and time
const now = new Date();
console.log("Current date:", now);

// Different date formats
console.log("ISO String:", now.toISOString()); // 2023-12-07T10:30:00.000Z
console.log("Date String:", now.toDateString()); // Thu Dec 07 2023
console.log("Time String:", now.toTimeString()); // 10:30:00 GMT+0000 (UTC)
console.log("Locale String:", now.toLocaleString()); // 12/7/2023, 10:30:00 AM

// Custom format mm/dd/yyyy
function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return \`\${month}/\${day}/\${year}\`;
}

console.log("Custom format:", formatDate(now)); // 12/07/2023

// Different locale formats
console.log("US format:", now.toLocaleDateString('en-US')); // 12/7/2023
console.log("UK format:", now.toLocaleDateString('en-GB')); // 07/12/2023
console.log("German format:", now.toLocaleDateString('de-DE')); // 7.12.2023

// Time only
console.log("Time:", now.toLocaleTimeString()); // 10:30:00 AM`,
      tags: ["date", "time", "formatting", "Date-object", "current-date"]
    },
    {
      id: 132,
      question: "How do you compare two date objects?",
      answer: "You need to use date.getTime() method to compare date values instead of comparison operators (==, !=, ===, and !== operators)",
      code: `const date1 = new Date('2023-12-07');
const date2 = new Date('2023-12-07');
const date3 = new Date('2023-12-08');

// Wrong way - comparing objects
console.log(date1 == date2); // false (different objects)
console.log(date1 === date2); // false (different objects)

// Correct way - comparing time values
console.log(date1.getTime() === date2.getTime()); // true
console.log(date1.getTime() === date3.getTime()); // false

// Alternative methods
console.log(+date1 === +date2); // true (unary + converts to timestamp)
console.log(Number(date1) === Number(date2)); // true

// Date comparison functions
function isSameDate(date1, date2) {
  return date1.getTime() === date2.getTime();
}

function isAfter(date1, date2) {
  return date1.getTime() > date2.getTime();
}

function isBefore(date1, date2) {
  return date1.getTime() < date2.getTime();
}

// Usage examples
console.log(isSameDate(date1, date2)); // true
console.log(isAfter(date3, date1)); // true
console.log(isBefore(date1, date3)); // true

// Comparing only date parts (ignoring time)
function isSameDateOnly(date1, date2) {
  return date1.toDateString() === date2.toDateString();
}`,
      tags: ["date", "comparison", "getTime", "Date-object", "date-comparison"]
    },
    {
      id: 133,
      question: "How do you check if a string starts with another string?",
      answer: "You can use ECMAScript 6's String.prototype.startsWith() method to check if a string starts with another string. But it is not yet supported in all browsers. Let's see an example to see this usage.",
      code: `const text = "Hello, World!";

// Modern approach - startsWith() (ES6+)
console.log(text.startsWith("Hello")); // true
console.log(text.startsWith("World")); // false
console.log(text.startsWith("hello")); // false (case-sensitive)

// Case-insensitive check
console.log(text.toLowerCase().startsWith("hello".toLowerCase())); // true

// Check from specific position
console.log(text.startsWith("World", 7)); // true (starts checking from index 7)

// Legacy approaches for older browsers
function startsWithLegacy(str, searchString, position = 0) {
  return str.substr(position, searchString.length) === searchString;
}

function startsWithIndexOf(str, searchString, position = 0) {
  return str.indexOf(searchString, position) === position;
}

function startsWithSlice(str, searchString, position = 0) {
  return str.slice(position, position + searchString.length) === searchString;
}

// Testing legacy methods
console.log(startsWithLegacy(text, "Hello")); // true
console.log(startsWithIndexOf(text, "Hello")); // true
console.log(startsWithSlice(text, "Hello")); // true

// Polyfill for older browsers
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}`,
      tags: ["strings", "startsWith", "string-methods", "ES6", "polyfill"]
    },
    {
      id: 134,
      question: "How do you trim a string in javascript?",
      answer: "JavaScript provided a trim method on string types to trim any whitespaces present at the beginning or ending of the string.",
      code: `const text = "   Hello, World!   ";

// Basic trim - removes whitespace from both ends
console.log(text.trim()); // "Hello, World!"
console.log(text.trim().length); // 13 (vs original 18)

// Different types of whitespace
const textWithVariousSpaces = "\\t\\n  Hello World  \\r\\n\\t";
console.log(textWithVariousSpaces.trim()); // "Hello World"

// Trim methods (ES2019+)
const textWithSpaces = "   Hello World   ";

console.log(textWithSpaces.trimStart()); // "Hello World   " (removes leading)
console.log(textWithSpaces.trimLeft());  // "Hello World   " (alias for trimStart)

console.log(textWithSpaces.trimEnd());   // "   Hello World" (removes trailing)
console.log(textWithSpaces.trimRight()); // "   Hello World" (alias for trimEnd)

// Custom trim functions for specific characters
function trimChar(str, charToRemove) {
  const regex = new RegExp(\`^[\${charToRemove}]+|[\${charToRemove}]+$\`, 'g');
  return str.replace(regex, '');
}

console.log(trimChar("...Hello World...", ".")); // "Hello World"
console.log(trimChar("###Hello World###", "#")); // "Hello World"

// Legacy trim for older browsers
function trimLegacy(str) {
  return str.replace(/^\\s+|\\s+$/g, '');
}

// Remove all whitespace (not just trim)
function removeAllSpaces(str) {
  return str.replace(/\\s/g, '');
}

console.log(removeAllSpaces("H e l l o   W o r l d")); // "HelloWorld"`,
      tags: ["strings", "trim", "whitespace", "string-methods", "trimStart", "trimEnd"]
    },
    {
      id: 135,
      question: "How do you add a key value pair in javascript?",
      answer: "There are two possible solutions to add new properties to an object. Let's take a simple object to explain these approaches.",
      code: `const person = {
  name: "John",
  age: 30
};

// Method 1: Dot notation
person.city = "New York";
person.country = "USA";

// Method 2: Bracket notation
person["email"] = "john@example.com";
person["phone"] = "123-456-7890";

// Method 3: Object.assign()
Object.assign(person, {
  occupation: "Developer",
  salary: 75000
});

// Method 4: Spread operator (ES6+)
const updatedPerson = {
  ...person,
  hobby: "Reading",
  married: true
};

console.log(person);
console.log(updatedPerson);

// Dynamic key assignment
const key = "dynamicProperty";
const value = "Dynamic Value";

person[key] = value; // Bracket notation for dynamic keys

// Using computed property names (ES6+)
const dynamicKey = "computedProp";
const personWithComputed = {
  ...person,
  [dynamicKey]: "Computed Value",
  [\`prefix_\${dynamicKey}\`]: "Prefixed Value"
};

// Method 5: Object.defineProperty() for advanced control
Object.defineProperty(person, "fullName", {
  get: function() {
    return \`\${this.name} Doe\`;
  },
  enumerable: true,
  configurable: true
});

console.log(person.fullName); // "John Doe"

// Conditional assignment
if (!person.nickname) {
  person.nickname = "Johnny";
}

// Using logical OR for default values
person.title = person.title || "Mr.";`,
      tags: ["objects", "properties", "key-value", "dot-notation", "bracket-notation", "Object.assign"]
    },
    {
      id: 157,
      question: "Is enums feature available in JavaScript?",
      answer: "No, JavaScript does not natively support enums. But there are different kinds of solutions to simulate them even though they may not provide exact equivalents. For example, you can use freeze or seal on object.",
      code: `var DaysEnum = Object.freeze({"monday":1, "tuesday":2, "wednesday":3});
console.log(DaysEnum.monday); // 1`,
      tags: ["enums", "objects", "freeze"]
    },
    {
      id: 158,
      question: "What is an enum?",
      answer: "An enum is a type restricting variables to one value from a predefined set of constants. JavaScript has no enums but TypeScript provides built-in enum support.",
      code: `// TypeScript enum example
enum Color {
  RED, GREEN, BLUE
}
console.log(Color.RED); // 0`,
      tags: ["enums", "typescript", "constants"]
    },
    {
      id: 159,
      question: "How do you list all properties of an object?",
      answer: "You can use the Object.getOwnPropertyNames() method which returns an array of all properties found directly in a given object.",
      code: `const newObject = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.getOwnPropertyNames(newObject));
// ["a", "b", "c"]`,
      tags: ["objects", "properties", "Object.getOwnPropertyNames"]
    },
    {
      id: 160,
      question: "How do you get property descriptors of an object?",
      answer: "You can use the Object.getOwnPropertyDescriptors() method which returns all own property descriptors of a given object.",
      code: `const newObject = {
  a: 1,
  b: 2,
  c: 3,
};
const descriptorsObject = Object.getOwnPropertyDescriptors(newObject);
console.log(descriptorsObject.a.writable); //true
console.log(descriptorsObject.a.configurable); //true
console.log(descriptorsObject.a.enumerable); //true
console.log(descriptorsObject.a.value); // 1`,
      tags: ["objects", "descriptors", "Object.getOwnPropertyDescriptors"]
    },
    {
      id: 161,
      question: "What are the attributes provided by a property descriptor?",
      answer: "A property descriptor is a record which has the following attributes: value, writable, configurable, enumerable, set, and get.",
      code: `// Property descriptor attributes:
// 1. value: The value associated with the property
// 2. writable: Determines whether the value can be changed
// 3. configurable: Returns true if the property can be deleted
// 4. enumerable: Determines whether the property appears during enumeration
// 5. set: A function which serves as a setter
// 6. get: A function which serves as a getter`,
      tags: ["objects", "descriptors", "properties"]
    },
    {
      id: 162,
      question: "How do you extend classes?",
      answer: "The extends keyword is used in class declarations/expressions to create a class which is a child of another class. It can be used to subclass custom classes as well as built-in objects.",
      code: `class Square extends Rectangle {
  constructor(length) {
    super(length, length);
    this.name = "Square";
  }

  get area() {
    return this.width * this.height;
  }

  set area(value) {
    this.area = value;
  }
}`,
      tags: ["classes", "inheritance", "extends", "super"]
    },
    {
      id: 163,
      question: "How do I modify the URL without reloading the page?",
      answer: "The window.location.href property will be helpful to modify the url but it reloads the page. HTML5 introduced the history.pushState() and history.replaceState() methods, which allow you to add and modify history entries, respectively.",
      code: `window.history.pushState("page2", "Title", "/page2.html");
// This changes the URL without reloading the page`,
      tags: ["history", "URL", "pushState", "browser"]
    },
    {
      id: 164,
      question: "How do you check whether an array includes a particular value or not?",
      answer: "The Array#includes() method is used to determine whether an array includes a particular value among its entries by returning either true or false.",
      code: `var numericArray = [1, 2, 3, 4];
console.log(numericArray.includes(3)); // true

var stringArray = ["green", "yellow", "blue"];
console.log(stringArray.includes("blue")); //true`,
      tags: ["arrays", "includes", "search"]
    },
    {
      id: 165,
      question: "How do you compare scalar arrays?",
      answer: "You can use length and every method of arrays to compare two scalar arrays. The combination of these expressions can give the expected result.",
      code: `const arrayFirst = [1, 2, 3, 4, 5];
const arraySecond = [1, 2, 3, 4, 5];
console.log(
  arrayFirst.length === arraySecond.length &&
    arrayFirst.every((value, index) => value === arraySecond[index])
); // true

// For order-independent comparison:
const arrayFirst2 = [2, 3, 1, 4, 5];
const arraySecond2 = [1, 2, 3, 4, 5];
console.log(
  arrayFirst2.length === arraySecond2.length &&
    arrayFirst2.sort().every((value, index) => value === arraySecond2.sort()[index])
); //true`,
      tags: ["arrays", "comparison", "every", "sort"]
    },
    {
      id: 166,
      question: "How to get the value from GET parameters?",
      answer: "The new URL() object accepts the url string and searchParams property of this object can be used to access the get parameters. Remember that you may need to use polyfill or window.location to access the URL in older browsers.",
      code: `let urlString = "http://www.some-domain.com/about.html?x=1&y=2&z=3";
let url = new URL(urlString);
let parameterZ = url.searchParams.get("z");
console.log(parameterZ); // 3`,
      tags: ["URL", "parameters", "searchParams", "query-string"]
    },
    {
      id: 167,
      question: "How do you print numbers with commas as thousand separators?",
      answer: "You can use the Number.prototype.toLocaleString() method which returns a string with a language-sensitive representation such as thousand separator, currency etc of this number.",
      code: `function convertToThousandFormat(x) {
  return x.toLocaleString(); // 12,345.679
}

console.log(convertToThousandFormat(12345.6789));`,
      tags: ["numbers", "formatting", "toLocaleString", "localization"]
    },
    {
      id: 168,
      question: "What is the difference between Java and JavaScript?",
      answer: "Both are totally unrelated programming languages and no relation between them. Java is statically typed, compiled, runs on its own VM. Whereas JavaScript is dynamically typed, interpreted, and runs in a browser and nodejs environments.",
      code: `// Java vs JavaScript comparison:
// Java: Strongly typed, Object oriented, Block scoped, Thread based, Uses more memory
// JavaScript: Dynamic typed, Prototype based, Function-scoped, Event based, Uses less memory`,
      tags: ["comparison", "java", "javascript", "languages"]
    },
    {
      id: 169,
      question: "Does JavaScript support namespace?",
      answer: "JavaScript doesn't support namespace by default. So if you create any element then it becomes global and pollutes the global namespace. Namespace will solve the name collision problem.",
      code: `function func1() {
  console.log("This is a first definition");
}
function func1() {
  console.log("This is a second definition");
}
func1(); // This is a second definition`,
      tags: ["namespace", "global", "collision", "scope"]
    },
    {
      id: 170,
      question: "How do you declare namespace?",
      answer: "Even though JavaScript lacks namespaces, we can use Objects, IIFE to create namespaces.",
      code: `// Using Object Literal Notation:
var namespaceOne = {
  func1: function() {
    console.log("This is a first definition");
  }
};
var namespaceTwo = {
  func1: function() {
    console.log("This is a second definition");
  }
};
namespaceOne.func1(); // This is a first definition
namespaceTwo.func1(); // This is a second definition

// Using IIFE:
(function () {
  function fun1() {
    console.log("This is a first definition");
  }
  fun1();
})();

// Using block and let/const:
{
  let myFunction = function fun1() {
    console.log("This is a first definition");
  };
  myFunction();
}`,
      tags: ["namespace", "IIFE", "objects", "block-scope"]
    },
    {
      id: 171,
      question: "How do you determine two values same or not using object?",
      answer: "The Object.is() method determines whether two values are the same value. For example, Object.is('hello', 'hello') returns true and Object.is(window, window) returns true but Object.is([], []) returns false.",
      code: `console.log(Object.is('hello', 'hello')); // true
console.log(Object.is(window, window)); // true
console.log(Object.is([], [])); // false

// Difference with === operator
console.log(Object.is(0, -0)); // false
console.log(0 === -0); // true

console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN); // false`,
      tags: ["Object.is", "comparison", "equality", "NaN"]
    },
    {
      id: 172,
      question: "What is the purpose of using object is method?",
      answer: "Some of the applications of Object's is method are follows: 1. It is used for comparison of two strings. 2. It is used for comparison of two numbers. 3. It is used for comparing the polarity of two numbers. 4. It is used for comparison of two objects.",
      code: `// String comparison
console.log(Object.is('foo', 'foo')); // true

// Number comparison
console.log(Object.is(42, 42)); // true

// Polarity comparison
console.log(Object.is(+0, -0)); // false

// Object comparison
const obj = {};
console.log(Object.is(obj, obj)); // true`,
      tags: ["Object.is", "comparison", "strings", "numbers", "objects"]
    },
    {
      id: 173,
      question: "How do you copy properties from one object to other?",
      answer: "You can use the Object.assign() method which is used to copy the values and properties from one or more source objects to a target object. It returns the target object which has properties and values copied from the target object.",
      code: `const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 4 }
console.log(returnedTarget); // { a: 1, b: 3, c: 4 }

// Using spread operator (ES6)
const newObj = { ...target, ...source };
console.log(newObj); // { a: 1, b: 3, c: 4 }`,
      tags: ["Object.assign", "copy", "properties", "spread-operator"]
    },
    {
      id: 174,
      question: "What are the applications of assign method?",
      answer: "Some of the main applications of Object.assign method are: 1. It is used for cloning an object. 2. It is used to merge objects with the same properties. 3. It is used to merge objects with different properties.",
      code: `// Cloning an object
const original = { a: 1, b: 2 };
const clone = Object.assign({}, original);
console.log(clone); // { a: 1, b: 2 }

// Merging objects with same properties
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 3, c: 4 }

// Merging objects with different properties
const defaults = { color: 'red', size: 'medium' };
const options = { size: 'large' };
const config = Object.assign({}, defaults, options);
console.log(config); // { color: 'red', size: 'large' }`,
      tags: ["Object.assign", "cloning", "merging", "objects"]
    },
    {
      id: 175,
      question: "What is a proxy object?",
      answer: "The Proxy object is used to define custom behavior for fundamental operations such as property lookup, assignment, enumeration, function invocation, etc. The syntax would be as follows: const p = new Proxy(target, handler);",
      code: `const target = {
  message1: "hello",
  message2: "everyone"
};

const handler = {
  get: function(target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.message1); // hello
console.log(proxy.message2); // world`,
      tags: ["proxy", "handler", "intercept", "meta-programming"]
    },
    {
      id: 176,
      question: "What is the purpose of seal method?",
      answer: "The Object.seal() method seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable.",
      code: `const object = {
  property1: 42
};

Object.seal(object);
object.property1 = 33;
console.log(object.property1); // 33

delete object.property1; // Cannot delete when sealed
console.log(object.property1); // 33

object.property2 = 50; // Cannot add new property when sealed
console.log(object.property2); // undefined`,
      tags: ["Object.seal", "sealing", "properties", "non-configurable"]
    },
    {
      id: 177,
      question: "What are the applications of seal method?",
      answer: "Some of the main applications of Object.seal method are: 1. It is used to make an object immutable. 2. It is used in freeze functionality. 3. It is used to prevent new properties from being added to an object.",
      code: `// Making object immutable (partially)
const config = { apiUrl: 'https://api.example.com' };
Object.seal(config);
config.apiUrl = 'https://newapi.example.com'; // This works
config.newProperty = 'value'; // This doesn't work

// Preventing new properties
const user = { name: 'John', age: 30 };
Object.seal(user);
user.email = 'john@example.com'; // Won't be added
console.log(user.email); // undefined

// Check if object is sealed
console.log(Object.isSealed(user)); // true`,
      tags: ["Object.seal", "immutable", "freeze", "properties"]
    },
    {
      id: 178,
      question: "What are the differences between freeze and seal methods?",
      answer: "If an object is frozen using the Object.freeze() method then its properties become immutable and no changes can be made in them whereas if an object is sealed using the Object.seal() method then the changes can be made in the existing properties of the object.",
      code: `const freezeObj = { name: 'Freeze' };
Object.freeze(freezeObj);
freezeObj.name = 'Updated'; // Won't work
console.log(freezeObj.name); // 'Freeze'

const sealObj = { name: 'Seal' };
Object.seal(sealObj);
sealObj.name = 'Updated'; // Will work
console.log(sealObj.name); // 'Updated'

// Both prevent adding new properties
freezeObj.newProp = 'new'; // Won't work
sealObj.newProp = 'new'; // Won't work

console.log(Object.isFrozen(freezeObj)); // true
console.log(Object.isSealed(sealObj)); // true`,
      tags: ["Object.freeze", "Object.seal", "immutable", "comparison"]
    },
    {
      id: 179,
      question: "How do you determine if an object is sealed or not?",
      answer: "The Object.isSealed() method is used to determine if an object is sealed or not. An object is sealed if all of the below conditions hold true: 1. If it is not extensible. 2. If all of its properties are non-configurable. 3. If it is not frozen.",
      code: `const emptyObject = {};
Object.seal(emptyObject);
console.log(Object.isSealed(emptyObject)); // true

const nonEmptyObject = { a: 1 };
console.log(Object.isSealed(nonEmptyObject)); // false
Object.seal(nonEmptyObject);
console.log(Object.isSealed(nonEmptyObject)); // true

// Frozen objects are also sealed
const frozenObject = { b: 2 };
Object.freeze(frozenObject);
console.log(Object.isSealed(frozenObject)); // true`,
      tags: ["Object.isSealed", "sealed", "extensible", "configurable"]
    },
    {
      id: 180,
      question: "How do you get enumerable key and value pairs?",
      answer: "The Object.entries() method is used to return an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a for...in loop.",
      code: `const object = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.entries(object));
// [['a', 'somestring'], ['b', 42], ['c', false]]

// Iterating through entries
for (const [key, value] of Object.entries(object)) {
  console.log(\`\${key}: \${value}\`);
}
// a: somestring
// b: 42
// c: false`,
      tags: ["Object.entries", "enumerable", "key-value", "iteration"]
    },
    {
      id: 181,
      question: "What is the main difference between Object.values and Object.entries method?",
      answer: "The Object.values() method's behavior is similar to Object.entries() method but it returns an array of values instead [key,value] pairs.",
      code: `const object = {
  a: 'somestring',
  b: 42,
  c: false
};

// Object.values returns only values
console.log(Object.values(object));
// ['somestring', 42, false]

// Object.entries returns [key, value] pairs
console.log(Object.entries(object));
// [['a', 'somestring'], ['b', 42], ['c', false]]

// Object.keys returns only keys
console.log(Object.keys(object));
// ['a', 'b', 'c']`,
      tags: ["Object.values", "Object.entries", "comparison", "arrays"]
    },
    {
      id: 182,
      question: "How can you get the list of keys of any object?",
      answer: "You can use the Object.keys() method which is used to return an array of a given object's own property names, in the same order as we get with a normal loop.",
      code: `const object = {
  a: 'somestring',
  b: 42,
  c: false
};

console.log(Object.keys(object));
// ['a', 'b', 'c']

// With array
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr));
// ['0', '1', '2']

// With string
console.log(Object.keys('hello'));
// ['0', '1', '2', '3', '4']`,
      tags: ["Object.keys", "properties", "enumerable", "arrays"]
    },
    {
      id: 183,
      question: "How do you create an object with prototype?",
      answer: "The Object.create() method is used to create a new object with the specified prototype object and properties.",
      code: `const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(\`My name is \${this.name}. Am I human? \${this.isHuman}\`);
  }
};

const me = Object.create(person);
me.name = 'Matthew';
me.isHuman = true;
me.printIntroduction();
// My name is Matthew. Am I human? true

// Creating object with null prototype
const nullProtoObj = Object.create(null);
console.log(nullProtoObj.toString); // undefined`,
      tags: ["Object.create", "prototype", "inheritance", "objects"]
    },
    {
      id: 184,
      question: "What is a WeakSet?",
      answer: "WeakSet is used to store a collection of weakly(weak references) held objects. The syntax would be as follows: new WeakSet([iterable]);",
      code: `const weakSet = new WeakSet();
const obj1 = {};
const obj2 = {};

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1)); // true
console.log(weakSet.has(obj2)); // true

// WeakSet only accepts objects
// weakSet.add(1); // TypeError: Invalid value used in weak set

weakSet.delete(obj1);
console.log(weakSet.has(obj1)); // false`,
      tags: ["WeakSet", "weak-references", "objects", "collection"]
    },
    {
      id: 185,
      question: "What are the differences between WeakSet and Set?",
      answer: "The main difference is that references to objects in Set are strong while references to objects in WeakSet are weak. i.e, An object in WeakSet can be garbage collected if there is no other reference to it.",
      code: `// Set - strong references
const set = new Set();
let obj1 = { name: 'John' };
set.add(obj1);
obj1 = null; // Object still exists in Set

// WeakSet - weak references  
const weakSet = new WeakSet();
let obj2 = { name: 'Jane' };
weakSet.add(obj2);
obj2 = null; // Object can be garbage collected

// Set is iterable, WeakSet is not
console.log(set.size); // 1
// console.log(weakSet.size); // undefined - no size property

// Set can store primitives, WeakSet cannot
set.add(1);
set.add('hello');
// weakSet.add(1); // TypeError`,
      tags: ["WeakSet", "Set", "garbage-collection", "weak-references"]
    },
    {
      id: 186,
      question: "What is a WeakMap?",
      answer: "The WeakMap object is a collection of key/value pairs in which the keys are weakly referenced. In this case, keys must be objects and the values can be arbitrary values.",
      code: `const weakMap = new WeakMap();
const obj1 = {};
const obj2 = {};

weakMap.set(obj1, 'value1');
weakMap.set(obj2, 'value2');

console.log(weakMap.get(obj1)); // 'value1'
console.log(weakMap.has(obj2)); // true

// Keys must be objects
// weakMap.set('string', 'value'); // TypeError

weakMap.delete(obj1);
console.log(weakMap.has(obj1)); // false`,
      tags: ["WeakMap", "weak-references", "key-value", "objects"]
    },
    {
      id: 187,
      question: "What are the differences between WeakMap and Map?",
      answer: "The main difference is that references to key objects in Map are strong while references to key objects in WeakMap are weak. i.e, A key object in WeakMap can be garbage collected if there is no other reference to it.",
      code: `// Map - strong references
const map = new Map();
let keyObj1 = { id: 1 };
map.set(keyObj1, 'value1');
keyObj1 = null; // Object still exists as key in Map

// WeakMap - weak references
const weakMap = new WeakMap();
let keyObj2 = { id: 2 };
weakMap.set(keyObj2, 'value2');
keyObj2 = null; // Object can be garbage collected

// Map is iterable, WeakMap is not
console.log(map.size); // 1
// console.log(weakMap.size); // undefined

// Map can have primitive keys, WeakMap cannot
map.set('string', 'value');
map.set(1, 'number');
// weakMap.set('string', 'value'); // TypeError`,
      tags: ["WeakMap", "Map", "garbage-collection", "weak-references"]
    },
    {
      id: 188,
      question: "What is the purpose of uneval?",
      answer: "The uneval() is an inbuilt function which is used to create a string representation of the source code of an Object. It is a top-level function and is not associated with any object.",
      code: `// Note: uneval() is deprecated and not available in modern browsers
// This is for educational purposes only

// Example of what uneval would do:
const obj = { a: 1, b: 'hello' };
// uneval(obj) would return: "({a:1, b:'hello'})"

// Modern alternative using JSON.stringify:
console.log(JSON.stringify(obj)); // '{"a":1,"b":"hello"}'

// For functions, you can use toString():
function myFunc() { return 42; }
console.log(myFunc.toString()); // "function myFunc() { return 42; }"`,
      tags: ["uneval", "deprecated", "string-representation", "source-code"]
    },
    {
      id: 189,
      question: "How do you encode an URL?",
      answer: "The encodeURI() function is used to encode complete URI which has special characters except (, / ? : @ & = + $ #) characters.",
      code: `const uri = 'https://mozilla.org/?x=шеллы';
const encoded = encodeURI(uri);
console.log(encoded);
// "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

// For encoding URI components (query parameters)
const component = 'hello world & special chars';
const encodedComponent = encodeURIComponent(component);
console.log(encodedComponent);
// "hello%20world%20%26%20special%20chars"

// Decoding
console.log(decodeURI(encoded));
console.log(decodeURIComponent(encodedComponent));`,
      tags: ["encodeURI", "encodeURIComponent", "URL", "encoding"]
    },
    {
      id: 190,
      question: "How do you decode an URL?",
      answer: "The decodeURI() function is used to decode a Uniform Resource Identifier (URI) previously created by encodeURI().",
      code: `const encodedURI = 'https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B';
const decodedURI = decodeURI(encodedURI);
console.log(decodedURI);
// "https://mozilla.org/?x=шеллы"

// For decoding URI components
const encodedComponent = 'hello%20world%20%26%20special%20chars';
const decodedComponent = decodeURIComponent(encodedComponent);
console.log(decodedComponent);
// "hello world & special chars"

// Error handling
try {
  decodeURI('%E0%A4%A');
} catch (e) {
  console.log(e); // URIError: URI malformed
}`,
      tags: ["decodeURI", "decodeURIComponent", "URL", "decoding"]
    },
    {
      id: 191,
      question: "How do you print the contents of web page?",
      answer: "The window object provided print() method which is used to print the contents of the current window. It opens Print dialog box which lets you choose between various printing options.",
      code: `// Print current page
function printPage() {
  window.print();
}

// Print with custom styles
function printWithStyles() {
  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Print</title>');
  printWindow.document.write('<style>body { font-family: Arial; }</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write('<h1>Custom Print Content</h1>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}`,
      tags: ["window.print", "printing", "browser", "dialog"]
    },
    {
      id: 192,
      question: "What is the difference between uneval and eval?",
      answer: "The uneval function returns the source of a given object; whereas the eval function does the opposite, by evaluating that source code in a different memory area.",
      code: `// eval() - executes string as code
const code = '2 + 3';
console.log(eval(code)); // 5

const objCode = '({name: "John", age: 30})';
const obj = eval(objCode);
console.log(obj); // {name: "John", age: 30}

// uneval() is deprecated, but would do the reverse
// Modern alternative for object serialization:
const myObj = {name: "John", age: 30};
const serialized = JSON.stringify(myObj);
console.log(serialized); // '{"name":"John","age":30}'
const parsed = JSON.parse(serialized);
console.log(parsed); // {name: "John", age: 30}`,
      tags: ["eval", "uneval", "deprecated", "serialization"]
    },
    {
      id: 193,
      question: "What is an anonymous function?",
      answer: "An anonymous function is a function without a name! Anonymous functions are commonly assigned to a variable name or used as a callback function.",
      code: `// Anonymous function assigned to variable
const greet = function() {
  console.log('Hello World!');
};
greet(); // Hello World!

// Anonymous function as callback
setTimeout(function() {
  console.log('This runs after 1 second');
}, 1000);

// Anonymous arrow function
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8

// IIFE (Immediately Invoked Function Expression)
(function() {
  console.log('Anonymous IIFE executed');
})();`,
      tags: ["anonymous-functions", "callbacks", "arrow-functions", "IIFE"]
    },
    {
      id: 194,
      question: "What is the precedence order between local and global variables?",
      answer: "A local variable takes precedence over a global variable with the same name.",
      code: `var message = "Global Variable"; // Global variable

function showMessage() {
  var message = "Local Variable"; // Local variable
  console.log(message); // Local Variable
}

showMessage();
console.log(message); // Global Variable

// Example with function parameters
var x = 10;
function test(x) {
  console.log(x); // Parameter takes precedence
}
test(20); // 20

// Block scope with let/const
let y = 'global';
{
  let y = 'block';
  console.log(y); // 'block'
}
console.log(y); // 'global'`,
      tags: ["scope", "precedence", "local-variables", "global-variables"]
    },
    {
      id: 195,
      question: "What are javascript accessors?",
      answer: "ECMAScript 5 introduced javascript object accessors or computed properties through getters and setters. Getters and setters allow you to define Object Accessors.",
      code: `const person = {
  firstName: "John",
  lastName: "Doe",
  
  // Getter
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
  
  // Setter
  set fullName(value) {
    const parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
};

console.log(person.fullName); // "John Doe"
person.fullName = "Jane Smith";
console.log(person.firstName); // "Jane"
console.log(person.lastName); // "Smith"

// Using Object.defineProperty
const obj = {};
Object.defineProperty(obj, 'value', {
  get() { return this._value; },
  set(val) { this._value = val * 2; }
});

obj.value = 5;
console.log(obj.value); // 10`,
      tags: ["accessors", "getters", "setters", "computed-properties"]
    },
    {
      id: 196,
      question: "How do you define property on Object constructor?",
      answer: "The Object.defineProperty() static method is used to define a new property directly on an object, or modify an existing property on an object, and returns the object.",
      code: `const obj = {};

// Define a simple property
Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: true,
  enumerable: true,
  configurable: true
});

// Define property with getter and setter
Object.defineProperty(obj, 'age', {
  get() {
    return this._age;
  },
  set(value) {
    if (value < 0) {
      throw new Error('Age cannot be negative');
    }
    this._age = value;
  },
  enumerable: true,
  configurable: true
});

obj.age = 25;
console.log(obj.name); // 'John'
console.log(obj.age); // 25

// Define multiple properties
Object.defineProperties(obj, {
  city: {
    value: 'New York',
    writable: true
  },
  country: {
    value: 'USA',
    writable: false
  }
});`,
      tags: ["Object.defineProperty", "property-descriptors", "getters", "setters"]
    },
    {
      id: 197,
      question: "What is the difference between get and defineProperty?",
      answer: "Both have similar results until unless you use classes. If you use get the property will be defined on the prototype of the object whereas using Object.defineProperty() the property will be defined on the instance it is applied to.",
      code: `// Using get in object literal
const obj1 = {
  get name() {
    return this._name;
  }
};

// Using Object.defineProperty
const obj2 = {};
Object.defineProperty(obj2, 'name', {
  get() {
    return this._name;
  }
});

// In classes - get defines on prototype
class Person {
  get name() {
    return this._name;
  }
}

const person = new Person();
console.log(Person.prototype.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('name')); // false

// defineProperty defines on instance
Object.defineProperty(person, 'age', {
  get() { return this._age; }
});
console.log(person.hasOwnProperty('age')); // true`,
      tags: ["get", "Object.defineProperty", "prototype", "instance", "classes"]
    },
    {
      id: 198,
      question: "What are the advantages of Getters and Setters?",
      answer: "Below are the list of benefits of Getters and Setters: 1. They provide simpler syntax 2. They are used for defining computed properties, or accessors in JS. 3. Useful to provide equivalence relation between properties and methods 4. They can provide better data quality 5. Useful for doing things behind the scenes with the encapsulated logic.",
      code: `class Temperature {
  constructor(celsius = 0) {
    this._celsius = celsius;
  }
  
  // Getter for Fahrenheit (computed property)
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }
  
  // Setter for Fahrenheit with validation
  set fahrenheit(value) {
    if (typeof value !== 'number') {
      throw new Error('Temperature must be a number');
    }
    this._celsius = (value - 32) * 5/9;
  }
  
  // Getter with encapsulated logic
  get celsius() {
    console.log('Getting celsius value'); // Behind the scenes
    return this._celsius;
  }
  
  // Setter with data quality validation
  set celsius(value) {
    if (value < -273.15) {
      throw new Error('Temperature cannot be below absolute zero');
    }
    console.log('Setting celsius value'); // Behind the scenes
    this._celsius = value;
  }
}

const temp = new Temperature(25);
console.log(temp.fahrenheit); // 77 (computed)
temp.fahrenheit = 86;
console.log(temp.celsius); // 30 (converted back)`,
      tags: ["getters", "setters", "computed-properties", "validation", "encapsulation"]
    },
    {
      id: 199,
      question: "Can I add getters and setters using defineProperty method?",
      answer: "Yes, You can use the Object.defineProperty() method to add Getters and Setters.",
      code: `const obj = { _value: 0 };

// Adding getter and setter using defineProperty
Object.defineProperty(obj, 'value', {
  get() {
    console.log('Getting value');
    return this._value;
  },
  set(newValue) {
    console.log('Setting value to:', newValue);
    if (newValue < 0) {
      throw new Error('Value cannot be negative');
    }
    this._value = newValue;
  },
  enumerable: true,
  configurable: true
});

obj.value = 42; // Setting value to: 42
console.log(obj.value); // Getting value, then 42

// Adding multiple getters/setters
const person = {};
Object.defineProperties(person, {
  firstName: {
    get() { return this._firstName; },
    set(value) { this._firstName = value; }
  },
  lastName: {
    get() { return this._lastName; },
    set(value) { this._lastName = value; }
  },
  fullName: {
    get() { 
      return \`\${this._firstName} \${this._lastName}\`;
    }
  }
});

person.firstName = 'John';
person.lastName = 'Doe';
console.log(person.fullName); // 'John Doe'`,
      tags: ["Object.defineProperty", "getters", "setters", "defineProperties"]
    },
    {
      id: 200,
      question: "What is the purpose of switch-case?",
      answer: "The switch case statement in JavaScript is used for decision making purposes. In a few cases, using the switch case statement is going to be more convenient than if-else statements.",
      code: `function getDayName(dayNumber) {
  let dayName;
  
  switch (dayNumber) {
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    case 6:
      dayName = 'Saturday';
      break;
    case 7:
      dayName = 'Sunday';
      break;
    default:
      dayName = 'Invalid day';
  }
  
  return dayName;
}

console.log(getDayName(3)); // 'Wednesday'
console.log(getDayName(8)); // 'Invalid day'

// Multiple cases with same result
function getSeasonFromMonth(month) {
  switch (month) {
    case 12:
    case 1:
    case 2:
      return 'Winter';
    case 3:
    case 4:
    case 5:
      return 'Spring';
    case 6:
    case 7:
    case 8:
      return 'Summer';
    case 9:
    case 10:
    case 11:
      return 'Fall';
    default:
      return 'Invalid month';
  }
}`,
      tags: ["switch-case", "control-flow", "decision-making", "break"]
    },
    {
      id: 201,
      question: "What are the conventions to be followed for the usage of switch case?",
      answer: "Below are the list of conventions should be taken care, 1. The expression can be of type either number, string, or boolean. 2. Duplicate values are not allowed for the expression. 3. The default statement is optional. If the expression passed to switch does not match with any case value then the statement under default case will be executed. 4. The break statement is used inside the switch to terminate a statement sequence. 5. The break statement is optional. But if it is omitted, the execution will continue on into the next case.",
      code: `// Good conventions
function processGrade(grade) {
  let result;
  
  switch (grade.toLowerCase()) { // Convert to consistent case
    case 'a':
      result = 'Excellent';
      break; // Always use break
    case 'b':
      result = 'Good';
      break;
    case 'c':
      result = 'Average';
      break;
    case 'd':
      result = 'Below Average';
      break;
    case 'f':
      result = 'Fail';
      break;
    default: // Always include default
      result = 'Invalid grade';
  }
  
  return result;
}

// Fall-through example (intentional)
function getWorkingDays(day) {
  switch (day) {
    case 'monday':
    case 'tuesday':
    case 'wednesday':
    case 'thursday':
    case 'friday':
      return 'Working day';
    case 'saturday':
    case 'sunday':
      return 'Weekend';
    default:
      return 'Invalid day';
  }
}`,
      tags: ["switch-case", "conventions", "break", "default", "fall-through"]
    },
    {
      id: 202,
      question: "What are primitive data types?",
      answer: "A primitive data type is data that has a primitive value (which has no properties or methods). There are 7 types of primitive data types: 1. string 2. number 3. boolean 4. null 5. undefined 6. bigint 7. symbol",
      code: `// String
let name = "John";
let message = 'Hello World';
let template = \`Welcome \${name}\`;

// Number
let age = 25;
let price = 99.99;
let negative = -10;

// Boolean
let isActive = true;
let isComplete = false;

// Null
let data = null;

// Undefined
let value;
console.log(value); // undefined

// BigInt (ES2020)
let bigNumber = 123456789012345678901234567890n;
let anotherBig = BigInt("123456789012345678901234567890");

// Symbol (ES6)
let sym1 = Symbol();
let sym2 = Symbol('description');
let sym3 = Symbol('description');
console.log(sym2 === sym3); // false - symbols are always unique

// Checking types
console.log(typeof name); // "string"
console.log(typeof age); // "number"
console.log(typeof isActive); // "boolean"
console.log(typeof data); // "object" (this is a known quirk)
console.log(typeof value); // "undefined"
console.log(typeof bigNumber); // "bigint"
console.log(typeof sym1); // "symbol"`,
      tags: ["primitives", "data-types", "string", "number", "boolean", "null", "undefined", "bigint", "symbol"]
    },
    {
      id: 203,
      question: "What are the different ways to access object properties?",
      answer: "There are only two ways to access properties of an object: 1. Dot notation: It uses dot for accessing the properties 2. Square brackets notation: It uses square brackets for property access",
      code: `const person = {
  name: 'John',
  age: 30,
  'full-name': 'John Doe',
  123: 'numeric key'
};

// Dot notation
console.log(person.name); // 'John'
console.log(person.age); // 30

// Square bracket notation
console.log(person['name']); // 'John'
console.log(person['age']); // 30

// Square brackets required for:
// 1. Properties with special characters
console.log(person['full-name']); // 'John Doe'

// 2. Numeric keys
console.log(person[123]); // 'numeric key'
console.log(person['123']); // 'numeric key'

// 3. Dynamic property access
const property = 'name';
console.log(person[property]); // 'John'

// 4. Properties with spaces
const obj = {
  'first name': 'Jane'
};
console.log(obj['first name']); // 'Jane'

// Computed property names
const key = 'dynamic';
const dynamicObj = {
  [key]: 'value'
};
console.log(dynamicObj.dynamic); // 'value'`,
      tags: ["object-properties", "dot-notation", "bracket-notation", "dynamic-access"]
    },
    {
      id: 204,
      question: "What are the function parameter rules?",
      answer: "JavaScript functions follow these rules for the parameters: 1. Function definitions do not specify data types for parameters. 2. Functions do not perform type checking on the passed arguments. 3. Functions do not check the number of arguments received.",
      code: `// No type checking
function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8
console.log(add('5', '3')); // '53' (string concatenation)
console.log(add(5, '3')); // '53' (coercion)

// No argument count checking
function greet(name, age, city) {
  console.log(\`Name: \${name}, Age: \${age}, City: \${city}\`);
}

greet('John'); // Name: John, Age: undefined, City: undefined
greet('John', 25); // Name: John, Age: 25, City: undefined
greet('John', 25, 'NYC', 'extra'); // Name: John, Age: 25, City: NYC (extra ignored)

// Default parameters (ES6)
function greetWithDefaults(name = 'Anonymous', age = 0) {
  console.log(\`Hello \${name}, you are \${age} years old\`);
}

greetWithDefaults(); // Hello Anonymous, you are 0 years old
greetWithDefaults('Alice'); // Hello Alice, you are 0 years old

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// Arguments object (legacy)
function oldWay() {
  console.log(arguments.length);
  console.log(Array.from(arguments));
}

oldWay(1, 2, 3); // 3, [1, 2, 3]`,
      tags: ["function-parameters", "type-checking", "arguments", "default-parameters", "rest-parameters"]
    },
    {
      id: 205,
      question: "What is an error object?",
      answer: "An error object is a built in error object that provides error information when an error occurs. It has two properties: name and message.",
      code: `// Basic Error object
const error = new Error('Something went wrong');
console.log(error.name); // 'Error'
console.log(error.message); // 'Something went wrong'
console.log(error.stack); // Stack trace

// Different types of errors
try {
  // ReferenceError
  console.log(nonExistentVariable);
} catch (e) {
  console.log(e.name); // 'ReferenceError'
  console.log(e.message); // 'nonExistentVariable is not defined'
}

try {
  // TypeError
  null.someMethod();
} catch (e) {
  console.log(e.name); // 'TypeError'
  console.log(e.message); // 'Cannot read property 'someMethod' of null'
}

try {
  // SyntaxError (would be caught at parse time)
  eval('var 123abc = 5');
} catch (e) {
  console.log(e.name); // 'SyntaxError'
}

// Custom errors
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

function riskyOperation() {
  throw new CustomError('Custom error occurred');
}

try {
  riskyOperation();
} catch (e) {
  console.log(e.name); // 'CustomError'
  console.log(e.message); // 'Custom error occurred'
  console.log(e instanceof CustomError); // true
  console.log(e instanceof Error); // true
}`,
      tags: ["error-object", "error-handling", "try-catch", "custom-errors", "error-types"]
    },
    {
      id: 206,
      question: "When you get a syntax error?",
      answer: "A SyntaxError is thrown when the JavaScript engine encounters tokens or token order that doesn't conform to the syntax of the language when parsing code.",
      code: `// Common syntax errors:

// 1. Missing closing bracket
// function test() {
//   console.log('Hello');
// // SyntaxError: Unexpected end of input

// 2. Invalid variable names
// var 123abc = 5; // SyntaxError: Unexpected number

// 3. Missing quotes
// console.log(Hello World); // SyntaxError: Unexpected identifier

// 4. Invalid object syntax
// const obj = {
//   name: 'John',
//   age: 30,
// }; // This is actually valid in modern JS

// 5. Missing commas in object/array
// const arr = [1 2 3]; // SyntaxError: Unexpected number

// 6. Invalid function syntax
// function () { // SyntaxError: Unexpected token '('
//   console.log('test');
// }

// 7. Invalid arrow function
// const func = => console.log('test'); // SyntaxError: Unexpected token '=>'

// Catching syntax errors with eval
try {
  eval('var 123invalid = 5');
} catch (e) {
  console.log(e.name); // 'SyntaxError'
  console.log(e.message); // 'Unexpected number'
}

// Valid syntax examples
const validObj = {
  name: 'John',
  age: 30
};

const validArr = [1, 2, 3];

function validFunction() {
  console.log('This is valid');
}

const validArrow = () => console.log('This is valid');`,
      tags: ["syntax-error", "parsing", "invalid-syntax", "error-handling"]
    },
    {
      id: 207,
      question: "What are the different error names from error object?",
      answer: "There are 6 different types of error names returned from error object: 1. EvalError: An error has occurred in the eval() function 2. RangeError: An error has occurred with a number out of range 3. ReferenceError: An error due to an illegal reference 4. SyntaxError: An error due to a syntax error 5. TypeError: An error due to a type error 6. URIError: An error due to encodeURI()",
      code: `// 1. EvalError (deprecated in modern JS)
// try {
//   throw new EvalError('Eval error occurred');
// } catch (e) {
//   console.log(e.name); // 'EvalError'
// }

// 2. RangeError
try {
  const arr = new Array(-1); // Invalid array length
} catch (e) {
  console.log(e.name); // 'RangeError'
  console.log(e.message); // 'Invalid array length'
}

try {
  (10).toString(37); // Invalid radix
} catch (e) {
  console.log(e.name); // 'RangeError'
}

// 3. ReferenceError
try {
  console.log(undefinedVariable);
} catch (e) {
  console.log(e.name); // 'ReferenceError'
  console.log(e.message); // 'undefinedVariable is not defined'
}

// 4. SyntaxError
try {
  eval('var 123abc = 5');
} catch (e) {
  console.log(e.name); // 'SyntaxError'
  console.log(e.message); // 'Unexpected number'
}

// 5. TypeError
try {
  null.someMethod();
} catch (e) {
  console.log(e.name); // 'TypeError'
  console.log(e.message); // 'Cannot read property 'someMethod' of null'
}

try {
  const num = 123;
  num(); // Trying to call a number as function
} catch (e) {
  console.log(e.name); // 'TypeError'
}

// 6. URIError
try {
  decodeURI('%E0%A4%A'); // Malformed URI
} catch (e) {
  console.log(e.name); // 'URIError'
  console.log(e.message); // 'URI malformed'
}`,
      tags: ["error-types", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]
    },
    {
      id: 208,
      question: "What are the various statements in error handling?",
      answer: "Below are the list of statements used in an error handling: 1. try: This statement is used to test a block of code for errors 2. catch: This statement is used to handle the error 3. throw: This statement is used to create custom errors. 4. finally: This statement is used to execute code after try and catch regardless of the result.",
      code: `// Basic try-catch
try {
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  console.log('Error caught:', error.message);
}

// try-catch-finally
try {
  console.log('Executing try block');
  throw new Error('Something went wrong');
} catch (error) {
  console.log('Executing catch block:', error.message);
} finally {
  console.log('Executing finally block - always runs');
}

// Custom throw
function validateAge(age) {
  if (age < 0) {
    throw new Error('Age cannot be negative');
  }
  if (age > 150) {
    throw new Error('Age seems unrealistic');
  }
  return age;
}

try {
  validateAge(-5);
} catch (error) {
  console.log('Validation error:', error.message);
}

// Multiple catch scenarios (different error types)
function processData(data) {
  try {
    if (!data) {
      throw new ReferenceError('Data is required');
    }
    if (typeof data !== 'object') {
      throw new TypeError('Data must be an object');
    }
    if (Object.keys(data).length === 0) {
      throw new RangeError('Data cannot be empty');
    }
    return data;
  } catch (error) {
    if (error instanceof ReferenceError) {
      console.log('Reference issue:', error.message);
    } else if (error instanceof TypeError) {
      console.log('Type issue:', error.message);
    } else if (error instanceof RangeError) {
      console.log('Range issue:', error.message);
    } else {
      console.log('Unknown error:', error.message);
    }
    throw error; // Re-throw if needed
  } finally {
    console.log('Cleanup operations');
  }
}

// Async error handling
async function asyncOperation() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Async error:', error.message);
    throw error;
  } finally {
    console.log('Async operation completed');
  }
}`,
      tags: ["error-handling", "try-catch", "throw", "finally", "custom-errors", "async-errors"]
    },
    {
      id: 209,
      question: "What are the two types of loops in javascript?",
      answer: "1. Entry Controlled loops: In this kind of loop type, the test condition is tested before entering the loop body. For Loop and While Loop are entry controlled loops. 2. Exit Controlled Loops: In this kind of loop type, the test condition is tested or evaluated at the end of the loop body. Do While loop is exit controlled loop.",
      code: `// Entry Controlled Loops

// 1. For Loop
console.log('For Loop:');
for (let i = 0; i < 3; i++) {
  console.log(\`Iteration \${i}\`);
}

// 2. While Loop
console.log('While Loop:');
let count = 0;
while (count < 3) {
  console.log(\`Count: \${count}\`);
  count++;
}

// 3. For...in Loop
console.log('For...in Loop:');
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(\`\${key}: \${obj[key]}\`);
}

// 4. For...of Loop
console.log('For...of Loop:');
const arr = ['apple', 'banana', 'cherry'];
for (let item of arr) {
  console.log(item);
}

// Exit Controlled Loop

// Do...While Loop
console.log('Do...While Loop:');
let num = 0;
do {
  console.log(\`Number: \${num}\`);
  num++;
} while (num < 3);

// Example showing the difference
console.log('Entry vs Exit Control Example:');

// Entry controlled - condition checked first
let x = 5;
while (x < 3) {
  console.log('This will not execute');
  x++;
}

// Exit controlled - condition checked after execution
let y = 5;
do {
  console.log('This will execute once even though condition is false');
  y++;
} while (y < 3);`,
      tags: ["loops", "entry-controlled", "exit-controlled", "for-loop", "while-loop", "do-while"]
    },
    {
      id: 210,
      question: "What is nodejs?",
      answer: "Node.js is a server-side platform built on Google Chrome's JavaScript V8 Engine. It was developed by Ryan Dahl in 2009 and its latest version is v0.10.36. The definition of Node.js as supplied by its official documentation is as follows: Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.",
      code: `// Node.js example - server creation
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello from Node.js Server!</h1>');
  } else if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello from API', timestamp: Date.now() }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// File system operations
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// Event-driven example
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
  console.log('An event occurred!');
});

myEmitter.emit('event');

// Non-blocking I/O example
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
setImmediate(() => console.log('Immediate'));
process.nextTick(() => console.log('Next tick'));
console.log('End');

// Output order: Start, End, Next tick, Immediate, Timeout`,
      tags: ["nodejs", "server-side", "v8-engine", "event-driven", "non-blocking", "runtime"]
    },
    {
      id: 211,
      question: "What is an Intl object?",
      answer: "The Intl object is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting.",
      code: `// Number formatting
const number = 123456.789;
console.log(new Intl.NumberFormat('en-US').format(number)); // 123,456.789
console.log(new Intl.NumberFormat('de-DE').format(number)); // 123.456,789
console.log(new Intl.NumberFormat('ar-EG').format(number)); // ١٢٣٬٤٥٦٫٧٨٩

// Currency formatting
const price = 123456.789;
console.log(new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(price)); // $123,456.79

// Date formatting
const date = new Date('2023-12-25');
console.log(new Intl.DateTimeFormat('en-US').format(date)); // 12/25/2023
console.log(new Intl.DateTimeFormat('en-GB').format(date)); // 25/12/2023
console.log(new Intl.DateTimeFormat('de-DE').format(date)); // 25.12.2023

// Relative time formatting
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day')); // yesterday
console.log(rtf.format(1, 'day')); // tomorrow
console.log(rtf.format(-2, 'hour')); // 2 hours ago

// Collation (string comparison)
const collator = new Intl.Collator('en', { sensitivity: 'base' });
console.log(collator.compare('a', 'A')); // 0 (equal)`,
      tags: ["Intl", "internationalization", "formatting", "localization", "i18n"]
    },
    {
      id: 212,
      question: "How do you perform language specific date and time formatting?",
      answer: "You can use Intl.DateTimeFormat object which is a constructor for objects that enable language-sensitive date and time formatting.",
      code: `const date = new Date('2023-12-25T10:30:00');

// Basic formatting for different locales
console.log(new Intl.DateTimeFormat('en-US').format(date)); // 12/25/2023
console.log(new Intl.DateTimeFormat('en-GB').format(date)); // 25/12/2023
console.log(new Intl.DateTimeFormat('de-DE').format(date)); // 25.12.2023
console.log(new Intl.DateTimeFormat('ja-JP').format(date)); // 2023/12/25

// Custom formatting options
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
};

console.log(new Intl.DateTimeFormat('en-US', options).format(date));
// Monday, December 25, 2023 at 10:30 AM GMT+5:30

console.log(new Intl.DateTimeFormat('fr-FR', options).format(date));
// lundi 25 décembre 2023 à 10:30 GMT+5:30

// Format parts
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

const parts = formatter.formatToParts(date);
console.log(parts);
// [
//   { type: 'month', value: 'Dec' },
//   { type: 'literal', value: ' ' },
//   { type: 'day', value: '25' },
//   { type: 'literal', value: ', ' },
//   { type: 'year', value: '2023' }
// ]`,
      tags: ["Intl.DateTimeFormat", "date-formatting", "localization", "time-zones"]
    },
    {
      id: 213,
      question: "What is an Iterator?",
      answer: "An iterator is an object which defines a sequence and potentially a return value upon its termination. It implements the Iterator protocol with a next() method which returns an object with two properties: value (the next value) and done (true if the iterator is finished).",
      code: `// Creating a custom iterator
function createIterator(array) {
  let index = 0;
  
  return {
    next() {
      if (index < array.length) {
        return { value: array[index++], done: false };
      } else {
        return { done: true };
      }
    }
  };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }

// Built-in iterators
const arr = ['a', 'b', 'c'];
const arrIterator = arr[Symbol.iterator]();
console.log(arrIterator.next()); // { value: 'a', done: false }
console.log(arrIterator.next()); // { value: 'b', done: false }

// String iterator
const str = 'hello';
const strIterator = str[Symbol.iterator]();
console.log(strIterator.next()); // { value: 'h', done: false }

// Map iterator
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
const mapIterator = map[Symbol.iterator]();
console.log(mapIterator.next()); // { value: ['key1', 'value1'], done: false }

// Using for...of with iterators
for (const item of arr) {
  console.log(item); // a, b, c
}`,
      tags: ["iterator", "iterator-protocol", "Symbol.iterator", "next-method"]
    },
    {
      id: 214,
      question: "How does synchronous iteration work?",
      answer: "Synchronous iteration was introduced in ES6 and it works with iterable protocol and iterator protocol. The iterable protocol allows objects to define their iteration behavior.",
      code: `// Making an object iterable
const range = {
  start: 1,
  end: 5,
  
  // Implement Symbol.iterator
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// Using for...of
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Manual iteration
const iterator = range[Symbol.iterator]();
let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}

// Spread operator uses iteration
console.log([...range]); // [1, 2, 3, 4, 5]

// Array.from uses iteration
console.log(Array.from(range)); // [1, 2, 3, 4, 5]

// Destructuring uses iteration
const [first, second, ...rest] = range;
console.log(first, second, rest); // 1, 2, [3, 4, 5]

// Built-in iterables
console.log([...new Set([1, 2, 3])]); // [1, 2, 3]
console.log([...new Map([['a', 1], ['b', 2]])]); // [['a', 1], ['b', 2]]
console.log([...'hello']); // ['h', 'e', 'l', 'l', 'o']`,
      tags: ["synchronous-iteration", "iterable-protocol", "for-of", "spread-operator"]
    },
    {
      id: 215,
      question: "What is an event loop?",
      answer: "The Event Loop is a queue of callback functions. When an async function executes, the callback function is pushed into the queue. The JavaScript engine doesn't start processing the event loop until the code after an async function has executed.",
      code: `// Event loop demonstration
console.log('1'); // Synchronous

setTimeout(() => {
  console.log('2'); // Macro task
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // Micro task
});

console.log('4'); // Synchronous

// Output: 1, 4, 3, 2

// More complex example
console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  return Promise.resolve();
}).then(() => {
  console.log('Promise 2');
});

Promise.resolve().then(() => {
  console.log('Promise 3');
});

console.log('End');

// Output: Start, End, Promise 1, Promise 3, Promise 2, Timeout 1, Timeout 2

// Event loop phases:
// 1. Call Stack - executes synchronous code
// 2. Micro task Queue - Promise callbacks, queueMicrotask
// 3. Macro task Queue - setTimeout, setInterval, I/O operations

// Process.nextTick (Node.js) has highest priority
if (typeof process !== 'undefined') {
  process.nextTick(() => console.log('Next tick'));
}`,
      tags: ["event-loop", "asynchronous", "callback-queue", "micro-tasks", "macro-tasks"]
    },
    {
      id: 216,
      question: "What is call stack?",
      answer: "Call Stack is a data structure for javascript interpreters to keep track of function calls in the program. It has two major actions: 1. Whenever you call a function for its execution, you are pushing it to the stack. 2. Whenever the execution is completed, the function is popped out of the stack.",
      code: `// Call stack example
function first() {
  console.log('First function start');
  second();
  console.log('First function end');
}

function second() {
  console.log('Second function start');
  third();
  console.log('Second function end');
}

function third() {
  console.log('Third function');
  // Stack trace at this point:
  // third() <- currently executing
  // second() <- waiting
  // first() <- waiting
  // global() <- waiting
}

first();

// Call stack visualization:
// Step 1: global execution context
// Step 2: first() pushed to stack
// Step 3: second() pushed to stack
// Step 4: third() pushed to stack
// Step 5: third() completes, popped from stack
// Step 6: second() completes, popped from stack
// Step 7: first() completes, popped from stack
// Step 8: back to global context

// Stack overflow example
function recursiveFunction() {
  recursiveFunction(); // This will cause stack overflow
}

// Uncomment to see stack overflow:
// recursiveFunction(); // RangeError: Maximum call stack size exceeded

// Proper recursive function with base case
function countdown(n) {
  if (n <= 0) {
    console.log('Done!');
    return;
  }
  console.log(n);
  countdown(n - 1);
}

countdown(3); // 3, 2, 1, Done!`,
      tags: ["call-stack", "execution-context", "function-calls", "stack-overflow", "recursion"]
    },
    {
      id: 217,
      question: "What is an event queue?",
      answer: "The event queue follows the queue data structure. It stores async callbacks to be added to the call stack. It is also known as the Callback Queue or Macrotask Queue.",
      code: `// Event queue demonstration
console.log('Synchronous 1');

// These go to the event queue (macrotask queue)
setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 100);
setTimeout(() => console.log('Timeout 3'), 0);

// These go to the microtask queue (higher priority)
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));

console.log('Synchronous 2');

// Output order:
// Synchronous 1
// Synchronous 2
// Promise 1
// Promise 2
// Timeout 1
// Timeout 3
// Timeout 2 (after 100ms)

// Event queue types:
// 1. Macrotask Queue: setTimeout, setInterval, I/O, UI events
// 2. Microtask Queue: Promise callbacks, queueMicrotask, MutationObserver

// Example with different queue types
function demonstrateQueues() {
  console.log('1: Sync');
  
  setTimeout(() => console.log('2: Macro task'), 0);
  
  Promise.resolve().then(() => {
    console.log('3: Micro task');
    // Microtasks can schedule more microtasks
    Promise.resolve().then(() => console.log('4: Nested micro task'));
  });
  
  queueMicrotask(() => console.log('5: Queue microtask'));
  
  console.log('6: Sync');
}

demonstrateQueues();
// Output: 1, 6, 3, 5, 4, 2`,
      tags: ["event-queue", "callback-queue", "macrotask-queue", "microtask-queue", "asynchronous"]
    },
    {
      id: 218,
      question: "What is a decorator?",
      answer: "A decorator is an expression that evaluates to a function and that takes the target, name, and decorator descriptor as arguments. Also, it optionally returns a decorator descriptor to install on the target object.",
      code: `// Decorator example (Stage 3 proposal, requires Babel or TypeScript)
// Note: This is future JavaScript syntax

// Method decorator
function log(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args) {
    console.log(\`Calling \${propertyKey} with args: \${JSON.stringify(args)}\`);
    const result = originalMethod.apply(this, args);
    console.log(\`Result: \${result}\`);
    return result;
  };
  
  return descriptor;
}

// Class decorator
function sealed(constructor) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Usage (hypothetical syntax)
// @sealed
// class Calculator {
//   @log
//   add(a, b) {
//     return a + b;
//   }
// }

// Current JavaScript alternative - Higher-order functions
function withLogging(fn) {
  return function(...args) {
    console.log(\`Calling function with args: \${JSON.stringify(args)}\`);
    const result = fn.apply(this, args);
    console.log(\`Result: \${result}\`);
    return result;
  };
}

// Usage
const add = withLogging((a, b) => a + b);
add(2, 3); // Logs: Calling function with args: [2,3], Result: 5

// Property decorator alternative
function createProperty(obj, key, descriptor) {
  Object.defineProperty(obj, key, descriptor);
}

const person = {};
createProperty(person, 'name', {
  get() { return this._name; },
  set(value) { 
    console.log(\`Setting name to: \${value}\`);
    this._name = value; 
  }
});

person.name = 'John'; // Logs: Setting name to: John`,
      tags: ["decorator", "metadata", "higher-order-functions", "stage-3-proposal"]
    },
    {
      id: 219,
      question: "What are the properties of Intl object?",
      answer: "Below are the list of properties available on Intl object: 1. Collator: These are the objects that enable language-sensitive string comparison. 2. DateTimeFormat: These are the objects that enable language-sensitive date and time formatting. 3. ListFormat: These are the objects that enable language-sensitive list formatting. 4. NumberFormat: Objects that enable language-sensitive number formatting. 5. PluralRules: Objects that provide locale-sensitive plural rule information. 6. RelativeTimeFormat: Objects that enable language-sensitive relative time formatting.",
      code: `// 1. Intl.Collator - String comparison
const collator = new Intl.Collator('en', { sensitivity: 'base' });
console.log(collator.compare('a', 'A')); // 0 (equal)
console.log(['Z', 'a', 'z', 'ä'].sort(collator.compare)); // ['a', 'ä', 'z', 'Z']

// 2. Intl.DateTimeFormat - Date formatting
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
console.log(dateFormatter.format(new Date())); // December 25, 2023

// 3. Intl.ListFormat - List formatting
const listFormatter = new Intl.ListFormat('en', { 
  style: 'long', 
  type: 'conjunction' 
});
console.log(listFormatter.format(['Apple', 'Banana', 'Orange'])); 
// Apple, Banana, and Orange

// 4. Intl.NumberFormat - Number formatting
const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
console.log(numberFormatter.format(1234.56)); // $1,234.56

// 5. Intl.PluralRules - Plural rules
const pluralRules = new Intl.PluralRules('en-US');
console.log(pluralRules.select(0)); // 'other'
console.log(pluralRules.select(1)); // 'one'
console.log(pluralRules.select(2)); // 'other'

// 6. Intl.RelativeTimeFormat - Relative time
const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto'
});
console.log(relativeTimeFormatter.format(-1, 'day')); // yesterday
console.log(relativeTimeFormatter.format(1, 'day')); // tomorrow
console.log(relativeTimeFormatter.format(-2, 'hour')); // 2 hours ago

// Additional properties (newer)
// 7. Intl.DisplayNames - Language/region/currency names
if (Intl.DisplayNames) {
  const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
  console.log(displayNames.of('US')); // United States
}

// 8. Intl.Locale - Locale information
if (Intl.Locale) {
  const locale = new Intl.Locale('en-US');
  console.log(locale.language); // en
  console.log(locale.region); // US
}`,
      tags: ["Intl", "Collator", "DateTimeFormat", "ListFormat", "NumberFormat", "PluralRules", "RelativeTimeFormat"]
    },
    {
      id: 220,
      question: "What is an Unary operator?",
      answer: "The unary(+) operator is used to convert a variable to a number. If the variable cannot be converted, it will still become a number but with the value NaN.",
      code: `// Unary plus operator (+)
console.log(+true); // 1
console.log(+false); // 0
console.log(+null); // 0
console.log(+undefined); // NaN
console.log(+''); // 0
console.log(+'123'); // 123
console.log(+'123abc'); // NaN
console.log(+[]); // 0
console.log(+[1]); // 1
console.log(+[1,2]); // NaN
console.log(+{}); // NaN

// Other unary operators
let x = 5;

// Unary minus (-)
console.log(-x); // -5

// Logical NOT (!)
console.log(!true); // false
console.log(!false); // true
console.log(!'hello'); // false (truthy value)
console.log(!''); // true (falsy value)

// Bitwise NOT (~)
console.log(~5); // -6 (inverts all bits)

// Typeof operator
console.log(typeof 42); // 'number'
console.log(typeof 'hello'); // 'string'
console.log(typeof true); // 'boolean'

// Void operator
console.log(void 0); // undefined
console.log(void(1 + 2)); // undefined

// Delete operator
const obj = { prop: 'value' };
console.log(delete obj.prop); // true
console.log(obj.prop); // undefined

// Increment/Decrement (also unary)
let y = 5;
console.log(++y); // 6 (pre-increment)
console.log(y++); // 6 (post-increment, returns old value)
console.log(y); // 7

let z = 5;
console.log(--z); // 4 (pre-decrement)
console.log(z--); // 4 (post-decrement, returns old value)
console.log(z); // 3`,
      tags: ["unary-operator", "type-conversion", "plus-operator", "typeof", "increment", "decrement"]
    },
    {
      id: 221,
      question: "What is the difference between for...of and for...in statements?",
      answer: "Both for...in and for...of statements iterate over js data structures. The only difference is over what they iterate: 1. for..in iterates over all enumerable property keys of an object 2. for..of iterates over the values of an iterable object.",
      code: `let arr = ["a", "b", "c"];
arr.newProp = "newValue";

// key are the property keys
for (let key in arr) {
  console.log(key); // 0, 1, 2 & newProp
}

// value are the property values
for (let value of arr) {
  console.log(value); // a, b, c
}

// Object iteration
const obj = { name: 'John', age: 30, city: 'NYC' };

for (let key in obj) {
  console.log(key); // name, age, city
  console.log(obj[key]); // John, 30, NYC
}

// for...of doesn't work with plain objects
// for (let value of obj) { // TypeError: obj is not iterable
//   console.log(value);
// }

// But works with Object.entries, Object.keys, Object.values
for (let [key, value] of Object.entries(obj)) {
  console.log(\`\${key}: \${value}\`); // name: John, age: 30, city: NYC
}

// String iteration
const str = "hello";
for (let char of str) {
  console.log(char); // h, e, l, l, o
}

for (let index in str) {
  console.log(index); // 0, 1, 2, 3, 4
}`,
      tags: ["for-in", "for-of", "iteration", "enumerable", "iterable"]
    },
    {
      id: 222,
      question: "How do you define instance and non-instance properties?",
      answer: "The Instance properties must be defined inside of class methods. For example, name and age properties defined inside constructor. But Static(class) and prototype data properties must be defined outside of the ClassBody declaration.",
      code: `class Person {
  constructor(name, age) {
    // Instance properties
    this.name = name;
    this.age = age;
  }
  
  // Instance method
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
  
  // Static method
  static getSpecies() {
    return 'Homo sapiens';
  }
}

// Static (class) properties - defined outside class body
Person.staticAge = 30;
Person.prototype.prototypeAge = 40;

const person1 = new Person('John', 25);
const person2 = new Person('Jane', 28);

// Instance properties are unique to each instance
console.log(person1.name); // 'John'
console.log(person2.name); // 'Jane'

// Static properties belong to the class
console.log(Person.staticAge); // 30
console.log(Person.getSpecies()); // 'Homo sapiens'

// Prototype properties are shared by all instances
console.log(person1.prototypeAge); // 40
console.log(person2.prototypeAge); // 40

// Modern class field syntax (ES2022)
class ModernPerson {
  // Public instance fields
  name = 'Default Name';
  age = 0;
  
  // Private instance fields
  #id = Math.random();
  
  // Static fields
  static species = 'Homo sapiens';
  
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  getId() {
    return this.#id;
  }
}`,
      tags: ["instance-properties", "static-properties", "prototype-properties", "class-fields"]
    },
    {
      id: 223,
      question: "What is the difference between isNaN and Number.isNaN?",
      answer: "1. isNaN: The global function isNaN converts the argument to a Number and returns true if the resulting value is NaN. 2. Number.isNaN: This method does not convert the argument. But it returns true when the type is a Number and value is NaN.",
      code: `// Global isNaN - converts argument to number first
console.log(isNaN('hello')); // true (converts 'hello' to NaN)
console.log(isNaN('123')); // false (converts '123' to 123)
console.log(isNaN(true)); // false (converts true to 1)
console.log(isNaN(false)); // false (converts false to 0)
console.log(isNaN(null)); // false (converts null to 0)
console.log(isNaN(undefined)); // true (converts undefined to NaN)
console.log(isNaN({})); // true (converts {} to NaN)
console.log(isNaN([])); // false (converts [] to 0)

// Number.isNaN - no conversion, strict check
console.log(Number.isNaN('hello')); // false (not a number type)
console.log(Number.isNaN('123')); // false (not a number type)
console.log(Number.isNaN(true)); // false (not a number type)
console.log(Number.isNaN(NaN)); // true (is NaN)
console.log(Number.isNaN(Number.NaN)); // true (is NaN)
console.log(Number.isNaN(0/0)); // true (is NaN)

// Practical examples
const userInput = 'abc123';
console.log(isNaN(userInput)); // true
console.log(Number.isNaN(userInput)); // false
console.log(Number.isNaN(Number(userInput))); // true

// Best practice: use Number.isNaN for strict NaN checking
function isActuallyNaN(value) {
  return Number.isNaN(value);
}

// Or use Object.is for NaN checking
function checkNaN(value) {
  return Object.is(value, NaN);
}`,
      tags: ["isNaN", "Number.isNaN", "type-conversion", "NaN", "comparison"]
    },
    {
      id: 224,
      question: "How to invoke an IIFE without any extra brackets?",
      answer: "Immediately Invoked Function Expressions(IIFE) requires a pair of parenthesis to wrap the function which contains set of statements. Since both IIFE and void operator discard the result of an expression, you can avoid the extra brackets using void operator for IIFE.",
      code: `// Traditional IIFE with brackets
(function (dt) {
  console.log(dt.toLocaleTimeString());
})(new Date());

// IIFE with void operator - no extra brackets needed
void function (dt) {
  console.log(dt.toLocaleTimeString());
}(new Date());

// Other operators that can be used instead of void
+function() {
  console.log('Plus operator IIFE');
}();

-function() {
  console.log('Minus operator IIFE');
}();

!function() {
  console.log('NOT operator IIFE');
}();

~function() {
  console.log('Bitwise NOT operator IIFE');
}();

// Arrow function IIFE
(() => {
  console.log('Arrow function IIFE');
})();

// With void operator
void (() => {
  console.log('Arrow function IIFE with void');
})();

// IIFE with parameters
void function(name, age) {
  console.log(\`Hello \${name}, you are \${age} years old\`);
}('John', 30);

// IIFE returning a value (traditional way)
const result = (function(a, b) {
  return a + b;
})(5, 3);
console.log(result); // 8`,
      tags: ["IIFE", "void-operator", "immediately-invoked", "function-expressions"]
    },
    {
      id: 225,
      question: "Is that possible to use expressions in switch cases?",
      answer: "You might have seen expressions used in switch condition but it is also possible to use for switch cases by assigning true value for the switch condition.",
      code: `// Using expressions in switch cases
const weather = (function getWeather(temp) {
  switch (true) {
    case temp < 0:
      return "freezing";
    case temp < 10:
      return "cold";
    case temp < 24:
      return "cool";
    case temp < 30:
      return "warm";
    case temp >= 30:
      return "hot";
    default:
      return "unknown";
  }
})(10);

console.log(weather); // "cold"

// Grade calculation using expressions
function getGrade(score) {
  switch (true) {
    case score >= 90:
      return 'A';
    case score >= 80:
      return 'B';
    case score >= 70:
      return 'C';
    case score >= 60:
      return 'D';
    default:
      return 'F';
  }
}

console.log(getGrade(85)); // 'B'

// Complex expressions in switch
function categorizeUser(user) {
  switch (true) {
    case user.age < 18:
      return 'Minor';
    case user.age >= 18 && user.age < 65:
      return 'Adult';
    case user.age >= 65:
      return 'Senior';
    case user.isVIP && user.purchases > 1000:
      return 'VIP Customer';
    default:
      return 'Unknown';
  }
}

// Time-based logic
function getTimeOfDay() {
  const hour = new Date().getHours();
  
  switch (true) {
    case hour >= 5 && hour < 12:
      return 'Morning';
    case hour >= 12 && hour < 17:
      return 'Afternoon';
    case hour >= 17 && hour < 21:
      return 'Evening';
    default:
      return 'Night';
  }
}`,
      tags: ["switch-expressions", "conditional-logic", "switch-true", "complex-conditions"]
    },
    {
      id: 226,
      question: "What is the easiest way to ignore promise errors?",
      answer: "The easiest and safest way to ignore promise errors is void that error. This approach is ESLint friendly too.",
      code: `// Ignoring promise errors with void
async function ignoreErrors() {
  await promise.catch((e) => void e);
}

// Example with fetch
async function fetchDataIgnoreErrors() {
  await fetch('/api/data').catch((e) => void e);
  console.log('This will run regardless of fetch success/failure');
}

// Multiple promises with error ignoring
async function multipleOperations() {
  await Promise.all([
    fetch('/api/users').catch(e => void e),
    fetch('/api/posts').catch(e => void e),
    fetch('/api/comments').catch(e => void e)
  ]);
}

// Alternative approaches (less preferred)

// Using empty catch
async function emptycatch() {
  await promise.catch(() => {});
}

// Using try-catch with empty catch
async function tryCatchEmpty() {
  try {
    await promise;
  } catch (e) {
    // Ignore error
  }
}

// Conditional error handling
async function conditionalErrorHandling() {
  await promise.catch((e) => {
    if (e.name === 'NetworkError') {
      void e; // Ignore network errors
    } else {
      throw e; // Re-throw other errors
    }
  });
}

// Promise chain with error ignoring
function promiseChainIgnoreErrors() {
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => void e); // Ignore any errors in the chain
}

// Utility function for ignoring errors
const ignoreError = (e) => void e;

async function useUtility() {
  await fetch('/api/data').catch(ignoreError);
}`,
      tags: ["promise-errors", "error-handling", "void-operator", "async-await", "catch"]
    },
    {
      id: 227,
      question: "How do style the console output using CSS?",
      answer: "You can add CSS styling to the console output using the CSS format content specifier %c. The console string message can be appended after the specifier and CSS style in another argument.",
      code: `// Basic console styling
console.log("%cThis is a red text", "color:red");

// Multiple styles
console.log(
  "%cThis is a red text with bigger font",
  "color:red; font-size:20px"
);

// Multiple styled sections
console.log(
  "%cRed %cBlue %cGreen",
  "color:red",
  "color:blue", 
  "color:green"
);

// Complex styling
console.log(
  "%cStyled Console Output",
  \`
    color: white;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  \`
);

// Warning style
console.log(
  "%c⚠️ Warning: This is important!",
  \`
    color: #ff9800;
    background: #fff3cd;
    padding: 8px 12px;
    border: 1px solid #ffeaa7;
    border-radius: 4px;
    font-weight: bold;
  \`
);

// Success style
console.log(
  "%c✅ Success: Operation completed!",
  \`
    color: #27ae60;
    background: #d4edda;
    padding: 8px 12px;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    font-weight: bold;
  \`
);

// Error style
console.log(
  "%c❌ Error: Something went wrong!",
  \`
    color: #e74c3c;
    background: #f8d7da;
    padding: 8px 12px;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    font-weight: bold;
  \`
);

// Custom logger function
function styledLog(message, type = 'info') {
  const styles = {
    info: 'color: #3498db; background: #ebf3fd; padding: 4px 8px; border-radius: 3px;',
    warn: 'color: #f39c12; background: #fef9e7; padding: 4px 8px; border-radius: 3px;',
    error: 'color: #e74c3c; background: #fdedec; padding: 4px 8px; border-radius: 3px;',
    success: 'color: #27ae60; background: #eafaf1; padding: 4px 8px; border-radius: 3px;'
  };
  
  console.log(\`%c\${message}\`, styles[type]);
}

styledLog('This is an info message', 'info');
styledLog('This is a warning message', 'warn');
styledLog('This is an error message', 'error');
styledLog('This is a success message', 'success');`,
      tags: ["console-styling", "CSS", "console.log", "debugging", "formatting"]
    },
    {
      id: 228,
      question: "What is nullish coalescing operator (??)?",
      answer: "It is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand. This can be contrasted with the logical OR (||) operator, which returns the right-hand side operand if the left operand is any falsy value, not only null or undefined.",
      code: `// Nullish coalescing operator (??)
console.log(null ?? true); // true
console.log(false ?? true); // false
console.log(undefined ?? true); // true
console.log(0 ?? true); // 0
console.log('' ?? true); // ''

// Comparison with logical OR (||)
console.log(null || 'default'); // 'default'
console.log(false || 'default'); // 'default'
console.log(0 || 'default'); // 'default'
console.log('' || 'default'); // 'default'

console.log(null ?? 'default'); // 'default'
console.log(false ?? 'default'); // false
console.log(0 ?? 'default'); // 0
console.log('' ?? 'default'); // ''

// Practical examples
function getUserName(user) {
  // Only use 'Anonymous' if name is null or undefined
  return user.name ?? 'Anonymous';
}

console.log(getUserName({ name: 'John' })); // 'John'
console.log(getUserName({ name: '' })); // '' (empty string is kept)
console.log(getUserName({ name: null })); // 'Anonymous'
console.log(getUserName({})); // 'Anonymous'

// Configuration with defaults
const config = {
  timeout: 0, // 0 is a valid timeout value
  retries: null,
  debug: false
};

const finalConfig = {
  timeout: config.timeout ?? 5000, // 0 (keeps the 0 value)
  retries: config.retries ?? 3, // 3 (null becomes 3)
  debug: config.debug ?? false // false (keeps the false value)
};

console.log(finalConfig); // { timeout: 0, retries: 3, debug: false }

// Chaining nullish coalescing
const value = null ?? undefined ?? 'fallback';
console.log(value); // 'fallback'

// With optional chaining
const user = { profile: { settings: null } };
const theme = user?.profile?.settings?.theme ?? 'light';
console.log(theme); // 'light'`,
      tags: ["nullish-coalescing", "null", "undefined", "default-values", "logical-operators"]
    },
    {
      id: 229,
      question: "How do you group and nest console output?",
      answer: "The console.group() can be used to group related log messages to be able to easily read the logs and use console.groupEnd() to close the group. Along with this, you can also nest groups which allows to output message in hierarchical manner.",
      code: `// Basic grouping
console.group("User Details");
console.log("name: Sudheer Jonna");
console.log("job: Software Developer");
console.groupEnd();

// Nested grouping
console.group("User Details");
console.log("name: Sudheer Jonna");
console.log("job: Software Developer");

// Nested Group
console.group("Address");
console.log("Street: Commonwealth");
console.log("City: Los Angeles");
console.log("State: California");

// Close nested group
console.groupEnd();

// Close outer group
console.groupEnd();

// Collapsed groups
console.groupCollapsed("Collapsed Group");
console.log("This group is collapsed by default");
console.log("You need to expand it to see these messages");
console.groupEnd();

// Complex nested example
console.group("🚀 Application Startup");
  console.log("✅ Environment: Development");
  console.log("✅ Port: 3000");
  
  console.group("📦 Dependencies");
    console.log("✅ React: 18.2.0");
    console.log("✅ Node.js: 18.16.0");
    
    console.groupCollapsed("🔧 Dev Dependencies");
      console.log("Webpack: 5.88.0");
      console.log("Babel: 7.22.0");
      console.log("ESLint: 8.44.0");
    console.groupEnd();
  console.groupEnd();
  
  console.group("🌐 API Connections");
    console.log("✅ Database: Connected");
    console.log("✅ Redis: Connected");
    console.log("❌ External API: Failed");
  console.groupEnd();
console.groupEnd();

// Utility function for better logging
function logWithGroup(groupName, logs, collapsed = false) {
  const groupMethod = collapsed ? console.groupCollapsed : console.group;
  groupMethod(groupName);
  logs.forEach(log => {
    if (typeof log === 'string') {
      console.log(log);
    } else if (log.group) {
      logWithGroup(log.group, log.logs, log.collapsed);
    }
  });
  console.groupEnd();
}

// Usage
logWithGroup("📊 Performance Metrics", [
  "⏱️ Load Time: 1.2s",
  "💾 Memory Usage: 45MB",
  {
    group: "🔍 Detailed Breakdown",
    collapsed: true,
    logs: [
      "HTML Parse: 200ms",
      "CSS Parse: 150ms",
      "JS Execution: 850ms"
    ]
  }
]);`,
      tags: ["console.group", "console.groupEnd", "console.groupCollapsed", "logging", "debugging"]
    },
    {
      id: 230,
      question: "What is the difference between dense and sparse arrays?",
      answer: "An array contains items at each index starting from first(0) to last(array.length - 1) is called as Dense array. Whereas if at least one item is missing at any index, the array is called as sparse.",
      code: `// Dense array - all indices have values
const avengers = ["Ironman", "Hulk", "CaptainAmerica"];
console.log(avengers[0]); // 'Ironman'
console.log(avengers[1]); // 'Hulk'
console.log(avengers[2]); // 'CaptainAmerica'
console.log(avengers.length); // 3

// Sparse array - missing values at some indices
const justiceLeague = ["Superman", "Aquaman", , "Batman"];
console.log(justiceLeague[0]); // 'Superman'
console.log(justiceLeague[1]); // 'Aquaman'
console.log(justiceLeague[2]); // undefined
console.log(justiceLeague[3]); // 'Batman'
console.log(justiceLeague.length); // 4

// Checking for sparse arrays
console.log(0 in avengers); // true
console.log(1 in avengers); // true
console.log(2 in avengers); // true

console.log(0 in justiceLeague); // true
console.log(1 in justiceLeague); // true
console.log(2 in justiceLeague); // false (sparse!)
console.log(3 in justiceLeague); // true

// Methods behave differently with sparse arrays
const sparse = [1, , , 4];

// forEach skips empty slots
sparse.forEach((value, index) => {
  console.log(\`Index \${index}: \${value}\`);
});
// Output: Index 0: 1, Index 3: 4

// map skips empty slots
const mapped = sparse.map(x => x * 2);
console.log(mapped); // [2, empty × 2, 8]

// filter removes empty slots
const filtered = sparse.filter(x => true);
console.log(filtered); // [1, 4]

// reduce skips empty slots
const sum = sparse.reduce((acc, val) => acc + val, 0);
console.log(sum); // 5

// Converting sparse to dense
const dense = Array.from(sparse, x => x ?? 0);
console.log(dense); // [1, 0, 0, 4]

// Or using spread with fill
const dense2 = [...sparse].map(x => x ?? 0);
console.log(dense2); // [1, undefined, undefined, 4]

// Better approach for conversion
const dense3 = Array.from({length: sparse.length}, (_, i) => sparse[i] ?? 0);
console.log(dense3); // [1, 0, 0, 4]`,
      tags: ["dense-arrays", "sparse-arrays", "array-holes", "empty-slots", "array-methods"]
    },
    {
      id: 231,
      question: "What is the output of delete operator on arrays?",
      answer: "The delete operator will delete the object property but it will not reindex the array or change its length. So the number or elements or length of the array won't be changed. If you try to print myChars then you can observe that it doesn't set an undefined value, rather the property is removed from the array.",
      code: `var myChars = ["a", "b", "c", "d"];
delete myChars[0];
console.log(myChars); // [empty, 'b', 'c', 'd']
console.log(myChars[0]); // undefined
console.log(myChars.length); // 4

// The newer versions of Chrome use 'empty' instead of 'undefined'
// to make the difference clearer

// Checking if property exists
console.log(0 in myChars); // false
console.log(1 in myChars); // true

// Alternative ways to remove elements
const fruits = ['apple', 'banana', 'cherry'];

// Using splice (changes length)
fruits.splice(1, 1); // removes 'banana'
console.log(fruits); // ['apple', 'cherry']
console.log(fruits.length); // 2

// Using filter (creates new array)
const numbers = [1, 2, 3, 4, 5];
const filtered = numbers.filter((_, index) => index !== 2);
console.log(filtered); // [1, 2, 4, 5]

// Setting to undefined (keeps length)
const colors = ['red', 'green', 'blue'];
colors[1] = undefined;
console.log(colors); // ['red', undefined, 'blue']
console.log(colors.length); // 3`,
      tags: ["delete-operator", "arrays", "sparse-arrays", "array-length", "array-methods"]
    },
    {
      id: 232,
      question: "What is the output of sparse arrays in latest Chrome?",
      answer: "The latest chrome versions display sparse array (they are filled with holes) using this empty x n notation. Whereas the older versions have undefined x n notation. The latest version of FF displays n empty slots notation.",
      code: `var array1 = new Array(3);
console.log(array1); // [empty × 3]

var array2 = [];
array2[2] = 100;
console.log(array2); // [empty × 2, 100]

var array3 = [, , ,];
console.log(array3); // [empty × 3]

// Checking sparse array behavior
console.log(array1.length); // 3
console.log(array1[0]); // undefined
console.log(0 in array1); // false

// Methods behavior with sparse arrays
const sparse = [1, , , 4];

// forEach skips holes
sparse.forEach((val, i) => console.log(\`\${i}: \${val}\`));
// Output: 0: 1, 3: 4

// map preserves holes
const mapped = sparse.map(x => x * 2);
console.log(mapped); // [2, empty × 2, 8]

// for...in iterates over existing indices only
for (let i in sparse) {
  console.log(\`\${i}: \${sparse[i]}\`);
}
// Output: 0: 1, 3: 4

// for...of includes holes as undefined
for (let val of sparse) {
  console.log(val);
}
// Output: 1, undefined, undefined, 4`,
      tags: ["sparse-arrays", "array-holes", "chrome-devtools", "array-methods", "empty-slots"]
    },
    {
      id: 233,
      question: "What is the output of object method definitions?",
      answer: "ES6 provides method definitions and property shorthands for objects. So both prop2 and prop3 are treated as regular function values.",
      code: `const obj = {
  prop1: function () {
    return 0;
  },
  prop2() {
    return 1;
  },
  ["prop" + 3]() {
    return 2;
  },
};

console.log(obj.prop1()); // 0
console.log(obj.prop2()); // 1
console.log(obj.prop3()); // 2

// Different method definition styles
const calculator = {
  // Traditional function property
  add: function(a, b) {
    return a + b;
  },
  
  // ES6 method shorthand
  subtract(a, b) {
    return a - b;
  },
  
  // Computed property name
  ["multi" + "ply"](a, b) {
    return a * b;
  },
  
  // Arrow function property (not a method)
  divide: (a, b) => a / b,
  
  // Getter method
  get pi() {
    return 3.14159;
  },
  
  // Setter method
  set value(val) {
    this._value = val;
  }
};

console.log(calculator.add(5, 3)); // 8
console.log(calculator.subtract(5, 3)); // 2
console.log(calculator.multiply(5, 3)); // 15
console.log(calculator.divide(6, 2)); // 3
console.log(calculator.pi); // 3.14159

calculator.value = 42;
console.log(calculator._value); // 42`,
      tags: ["object-methods", "ES6", "method-shorthand", "computed-properties", "getters-setters"]
    },
    {
      id: 234,
      question: "What is the output of chained comparison operators?",
      answer: "The important point is that if the statement contains the same operators (e.g, < or >) then it can be evaluated from left to right. The first statement: 1 < 2 < 3 becomes true < 3, then 1 < 3 (true converted as 1), which is true. The second statement: 3 > 2 > 1 becomes true > 1, then 1 > 1 (true converted as 1), which is false.",
      code: `console.log(1 < 2 < 3); // true
console.log(3 > 2 > 1); // false

// Step by step evaluation:
// 1 < 2 < 3
// (1 < 2) < 3
// true < 3
// 1 < 3  (true converts to 1)
// true

// 3 > 2 > 1
// (3 > 2) > 1
// true > 1
// 1 > 1  (true converts to 1)
// false

// More examples
console.log(5 > 4 > 3); // false (true > 3 → 1 > 3 → false)
console.log(1 < 2 < 3 < 4); // true
console.log(4 > 3 > 2 > 1); // false

// Boolean to number conversion
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(+true); // 1
console.log(+false); // 0

// Correct way to chain comparisons
console.log(1 < 2 && 2 < 3); // true
console.log(3 > 2 && 2 > 1); // true

// Using parentheses for clarity
console.log((1 < 2) && (2 < 3)); // true
console.log((3 > 2) && (2 > 1)); // true`,
      tags: ["comparison-operators", "operator-precedence", "boolean-conversion", "chained-comparisons"]
    },
    {
      id: 235,
      question: "What is the output of duplicate parameters in non-strict mode?",
      answer: "In non-strict mode, the regular JavaScript functions allow duplicate named parameters. The value of the first parameter is mapped to the third argument which is passed to the function. Hence, the 3rd argument overrides the first parameter. In strict mode, duplicate parameters will throw a Syntax Error.",
      code: `function printNumbers(first, second, first) {
  console.log(first, second, first);
}
printNumbers(1, 2, 3); // 3, 2, 3

// The last parameter with the same name wins
function example(a, b, a) {
  console.log('a:', a, 'b:', b);
}
example(1, 2, 3); // a: 3 b: 2

// In strict mode, this would throw SyntaxError
// 'use strict';
// function strictExample(x, y, x) { // SyntaxError: Duplicate parameter name not allowed
//   console.log(x, y);
// }

// Arguments object behavior
function showArgs(param, param) {
  console.log('param:', param);
  console.log('arguments[0]:', arguments[0]);
  console.log('arguments[1]:', arguments[1]);
}
showArgs('first', 'second');
// param: second
// arguments[0]: first
// arguments[1]: second

// Modern alternative using rest parameters
function modernFunction(...args) {
  console.log(args);
}
modernFunction(1, 2, 3); // [1, 2, 3]

// Object destructuring for named parameters
function betterFunction({first, second, third}) {
  console.log(first, second, third);
}
betterFunction({first: 1, second: 2, third: 3}); // 1 2 3`,
      tags: ["duplicate-parameters", "non-strict-mode", "strict-mode", "function-parameters", "arguments-object"]
    },
    {
      id: 236,
      question: "What is the output of duplicate parameters in arrow functions?",
      answer: "Unlike regular functions, the arrow functions do not allow duplicate parameters in either strict or non-strict mode. So you will see SyntaxError in the console.",
      code: `// This will throw SyntaxError
// const printNumbersArrow = (first, second, first) => {
//   console.log(first, second, first);
// };
// SyntaxError: Duplicate parameter name not allowed in this context

// Arrow functions are always strict
const validArrow = (first, second, third) => {
  console.log(first, second, third);
};
validArrow(1, 2, 3); // 1 2 3

// Regular function in non-strict mode allows duplicates
function regularFunc(a, b, a) {
  console.log(a, b, a);
}
regularFunc(1, 2, 3); // 3 2 3

// But in strict mode, regular functions also throw error
// 'use strict';
// function strictFunc(a, b, a) { // SyntaxError
//   console.log(a, b, a);
// }

// Arrow functions don't have arguments object
const arrowWithoutArgs = () => {
  // console.log(arguments); // ReferenceError: arguments is not defined
};

// Use rest parameters instead
const arrowWithRest = (...args) => {
  console.log(args);
};
arrowWithRest(1, 2, 3); // [1, 2, 3]

// Arrow functions inherit this from enclosing scope
const obj = {
  name: 'Test',
  regularMethod: function() {
    console.log('Regular:', this.name);
  },
  arrowMethod: () => {
    console.log('Arrow:', this.name); // undefined (global this)
  }
};

obj.regularMethod(); // Regular: Test
obj.arrowMethod(); // Arrow: undefined`,
      tags: ["arrow-functions", "duplicate-parameters", "strict-mode", "syntax-error", "rest-parameters"]
    },
    {
      id: 237,
      question: "What is the output of arguments in arrow functions?",
      answer: "Arrow functions do not have an arguments, super, this, or new.target bindings. So any reference to arguments variable tries to resolve to a binding in a lexically enclosing environment. In this case, the arguments variable is not defined outside of the arrow function. Hence, you will receive a reference error.",
      code: `// This will throw ReferenceError
// const arrowFunc = () => arguments.length;
// console.log(arrowFunc(1, 2, 3)); // ReferenceError: arguments is not defined

// Regular function has arguments object
const func = function () {
  return arguments.length;
};
console.log(func(1, 2, 3)); // 3

// Arrow function with rest parameters
const arrowFunc = (...args) => args.length;
console.log(arrowFunc(1, 2, 3)); // 3

// Arrow function accessing arguments from outer scope
function outerFunction() {
  console.log('Outer arguments:', arguments.length);
  
  const innerArrow = () => {
    console.log('Inner arrow accessing outer arguments:', arguments.length);
  };
  
  innerArrow();
}
outerFunction(1, 2, 3); // Outer: 3, Inner: 3

// Practical example: event handlers
const button = {
  name: 'Click me',
  
  // Regular function - has its own arguments
  handleClickRegular: function() {
    console.log('Regular handler arguments:', arguments.length);
    console.log('Button name:', this.name);
  },
  
  // Arrow function - no arguments, inherits this
  handleClickArrow: () => {
    // console.log(arguments); // ReferenceError
    console.log('Arrow handler, this.name:', this.name); // undefined
  },
  
  // Arrow function with rest parameters
  handleClickArrowRest: (...args) => {
    console.log('Arrow handler args:', args.length);
  }
};`,
      tags: ["arrow-functions", "arguments-object", "rest-parameters", "lexical-scope", "this-binding"]
    },
    {
      id: 238,
      question: "What is the output of String.prototype.trimLeft.name?",
      answer: "In order to be consistent with functions like String.prototype.padStart, the standard method name for trimming the whitespaces is considered as trimStart. Due to web compatibility reasons, the old method name 'trimLeft' still acts as an alias for 'trimStart'. Hence, the prototype for 'trimLeft' is always 'trimStart'.",
      code: `console.log(String.prototype.trimLeft.name === "trimLeft"); // false
console.log(String.prototype.trimLeft.name === "trimStart"); // true

// trimLeft is an alias for trimStart
console.log(String.prototype.trimLeft === String.prototype.trimStart); // true

// Similarly for trimRight
console.log(String.prototype.trimRight.name === "trimEnd"); // true
console.log(String.prototype.trimRight === String.prototype.trimEnd); // true

// Practical usage
const text = "   Hello World   ";

console.log(text.trimLeft()); // "Hello World   "
console.log(text.trimStart()); // "Hello World   " (same result)

console.log(text.trimRight()); // "   Hello World"
console.log(text.trimEnd()); // "   Hello World" (same result)

console.log(text.trim()); // "Hello World"

// Method names for consistency
const methods = [
  'padStart', 'padEnd',
  'trimStart', 'trimEnd',
  'startsWith', 'endsWith'
];

methods.forEach(method => {
  console.log(\`\${method} exists:\`, typeof String.prototype[method] === 'function');
});

// Legacy aliases still work
const legacyMethods = ['trimLeft', 'trimRight'];
legacyMethods.forEach(method => {
  console.log(\`\${method} exists:\`, typeof String.prototype[method] === 'function');
  console.log(\`\${method} name:\`, String.prototype[method].name);
});`,
      tags: ["String.prototype", "trimLeft", "trimStart", "method-aliases", "web-compatibility"]
    },
    {
      id: 239,
      question: "What is the output of Math.max() with no arguments?",
      answer: "-Infinity is the initial comparant because almost every other value is bigger. So when no arguments are provided, -Infinity is going to be returned. Zero number of arguments is a valid case.",
      code: `console.log(Math.max()); // -Infinity
console.log(Math.min()); // Infinity

// Explanation: Math.max needs to find the maximum value
// Starting with -Infinity ensures any number will be larger
console.log(Math.max(1, 2, 3)); // 3
console.log(Math.max(-1, -2, -3)); // -1
console.log(Math.max(-Infinity, 5)); // 5

// Similarly, Math.min starts with Infinity
console.log(Math.min(1, 2, 3)); // 1
console.log(Math.min(-1, -2, -3)); // -3
console.log(Math.min(Infinity, 5)); // 5

// With arrays, use spread operator
const numbers = [1, 5, 3, 9, 2];
console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers)); // 1

// Edge cases
console.log(Math.max(NaN, 5)); // NaN
console.log(Math.min(NaN, 5)); // NaN
console.log(Math.max(undefined, 5)); // NaN (undefined converts to NaN)
console.log(Math.max(null, 5)); // 5 (null converts to 0)
console.log(Math.max("10", 5)); // 10 (string converts to number)
console.log(Math.max("hello", 5)); // NaN (invalid number conversion)

// Alternative approaches for finding max/min
const findMax = (arr) => arr.reduce((max, current) => current > max ? current : max, -Infinity);
const findMin = (arr) => arr.reduce((min, current) => current < min ? current : min, Infinity);

console.log(findMax([1, 5, 3])); // 5
console.log(findMin([1, 5, 3])); // 1`,
      tags: ["Math.max", "Math.min", "Infinity", "no-arguments", "edge-cases"]
    },
    {
      id: 240,
      question: "What is the output of array comparison with numbers?",
      answer: "As per the comparison algorithm in the ECMAScript specification (ECMA-262), the expression is converted: 10 === Number([10].valueOf().toString()). So it doesn't matter about number brackets([]) around the number, it is always converted to a number in the expression.",
      code: `console.log(10 == [10]); // true
console.log(10 == [[[[[[[10]]]]]]]); // true

// Step by step conversion:
// 10 == [10]
// 10 == [10].valueOf().toString()
// 10 == "10"
// 10 == Number("10")
// 10 == 10
// true

// More examples
console.log(5 == [5]); // true
console.log(0 == []); // true (empty array converts to empty string, then to 0)
console.log(1 == [1]); // true
console.log("5" == [5]); // true

// Array valueOf and toString behavior
const arr = [10];
console.log(arr.valueOf()); // [10] (returns the array itself)
console.log(arr.toString()); // "10"
console.log(Number(arr.toString())); // 10

// Multiple elements
console.log([1, 2].toString()); // "1,2"
console.log(Number([1, 2].toString())); // NaN
console.log(5 == [1, 2]); // false

// Edge cases
console.log(0 == []); // true
console.log(0 == [0]); // true
console.log(1 == [1]); // true
console.log(NaN == [NaN]); // false (NaN != NaN)

// Strict equality is different
console.log(10 === [10]); // false (different types)
console.log(10 === Number([10].toString())); // true

// Boolean context vs comparison
if ([]) {
  console.log("Empty array is truthy"); // This runs
}
console.log([] == false); // true (in comparison context)`,
      tags: ["array-comparison", "type-coercion", "valueOf", "toString", "equality-operators"]
    },
    {
      id: 241,
      question: "What is the output of string and number addition vs subtraction?",
      answer: "The concatenation operator(+) is applicable for both number and string types. So if any operand is string type then both operands concatenated as strings. Whereas subtract(-) operator tries to convert the operands as number type.",
      code: `console.log(10 + "10"); // "1010"
console.log(10 - "10"); // 0

// Addition with strings always concatenates
console.log(5 + "5"); // "55"
console.log("Hello" + " World"); // "Hello World"
console.log(1 + 2 + "3"); // "33" (1+2=3, then 3+"3"="33")
console.log("1" + 2 + 3); // "123" ("1"+2="12", then "12"+3="123")

// Subtraction always converts to numbers
console.log("20" - "10"); // 10
console.log("20" - 10); // 10
console.log(20 - "10"); // 10
console.log("hello" - 5); // NaN

// Other arithmetic operators also convert to numbers
console.log("10" * "5"); // 50
console.log("20" / "4"); // 5
console.log("10" % "3"); // 1
console.log("2" ** "3"); // 8

// Unary plus converts to number
console.log(+"10"); // 10
console.log(+"hello"); // NaN
console.log(+true); // 1
console.log(+false); // 0
console.log(+null); // 0
console.log(+undefined); // NaN

// Mixed operations
console.log("5" - 3 + "2"); // "22" (5-3=2, then 2+"2"="22")
console.log("5" + 3 - "2"); // 51 ("5"+3="53", then 53-"2"=51)

// Practical examples
const userInput1 = "25";
const userInput2 = "15";
console.log(userInput1 + userInput2); // "2515" (concatenation)
console.log(+userInput1 + +userInput2); // 40 (addition)
console.log(Number(userInput1) + Number(userInput2)); // 40 (addition)`,
      tags: ["string-concatenation", "type-coercion", "arithmetic-operators", "addition", "subtraction"]
    },
    {
      id: 242,
      question: "What is the output of array comparison with false?",
      answer: "In comparison operators, the expression [0] converted to Number([0].valueOf().toString()) which is resolved to false. Whereas [0] just becomes a truthy value without any conversion because there is no comparison operator.",
      code: `console.log([0] == false); // true
if ([0]) {
  console.log("I'm True"); // This runs
} else {
  console.log("I'm False");
}

// Step by step for [0] == false:
// [0].valueOf() → [0]
// [0].toString() → "0"
// Number("0") → 0
// 0 == false → 0 == 0 → true

// In boolean context, arrays are always truthy
console.log(Boolean([])); // true
console.log(Boolean([0])); // true
console.log(Boolean([false])); // true
console.log(Boolean([null])); // true

// More comparison examples
console.log([] == false); // true
console.log([1] == true); // true
console.log([2] == true); // false (2 != 1)
console.log([1, 2] == true); // false ([1,2].toString() = "1,2", Number("1,2") = NaN)

// Strict equality is different
console.log([0] === false); // false (different types)
console.log([] === false); // false (different types)

// Practical gotcha
const items = [];
if (items == false) {
  console.log("Empty array equals false"); // This runs
}
if (items) {
  console.log("But empty array is truthy"); // This also runs!
}

// Best practices
const hasItems = items.length > 0;
if (hasItems) {
  console.log("Array has items");
}

// Or use explicit boolean conversion
if (Boolean(items.length)) {
  console.log("Array has items");
}`,
      tags: ["array-comparison", "boolean-context", "type-coercion", "truthy-falsy", "comparison-operators"]
    },
    {
      id: 243,
      question: "What is the output of array addition?",
      answer: "The + operator is not meant or defined for arrays. So it converts arrays into strings and concatenates them.",
      code: `console.log([1, 2] + [3, 4]); // "1,23,4"

// Step by step conversion:
// [1, 2].toString() → "1,2"
// [3, 4].toString() → "3,4"
// "1,2" + "3,4" → "1,23,4"

// More examples
console.log([1] + [2]); // "12"
console.log([] + []); // "" (empty string)
console.log([1, 2, 3] + [4, 5]); // "1,2,34,5"

// Single element arrays
console.log([5] + [10]); // "510"
console.log(["hello"] + ["world"]); // "helloworld"

// Mixed types in arrays
console.log([1, "a"] + [2, "b"]); // "1,a2,b"
console.log([true, false] + [null, undefined]); // "true,falsenull,"

// Array with objects
console.log([{a: 1}] + [{b: 2}]); // "[object Object][object Object]"

// Proper array concatenation methods
const arr1 = [1, 2];
const arr2 = [3, 4];

// Using concat()
console.log(arr1.concat(arr2)); // [1, 2, 3, 4]

// Using spread operator
console.log([...arr1, ...arr2]); // [1, 2, 3, 4]

// Using push.apply (modifies original)
const combined = [...arr1];
combined.push(...arr2);
console.log(combined); // [1, 2, 3, 4]

// For numbers specifically
const nums1 = [1, 2];
const nums2 = [3, 4];
const sum = [...nums1, ...nums2].reduce((a, b) => a + b, 0);
console.log(sum); // 10`,
      tags: ["array-addition", "string-concatenation", "toString", "array-methods", "spread-operator"]
    },
    {
      id: 244,
      question: "What is the output of Set with duplicate values?",
      answer: "Since Set object is a collection of unique values, it won't allow duplicate values in the collection. At the same time, it is case sensitive data structure.",
      code: `const numbers = new Set([1, 1, 2, 3, 4]);
console.log(numbers); // Set(4) {1, 2, 3, 4}

const browser = new Set("Firefox");
console.log(browser); // Set(6) {"F", "i", "r", "e", "f", "o", "x"}

// Set removes duplicates but keeps case sensitivity
const mixedSet = new Set(['a', 'A', 'a', 'B', 'b']);
console.log(mixedSet); // Set(4) {"a", "A", "B", "b"}

// Working with Set methods
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(1); // Duplicate, won't be added
console.log(mySet.size); // 2
console.log(mySet.has(1)); // true
console.log(mySet.has(3)); // false

// Iterating over Set
for (const value of mySet) {
  console.log(value); // 1, 2
}

// Converting Set to Array
const uniqueArray = [...mySet];
console.log(uniqueArray); // [1, 2]

// Removing duplicates from array using Set
const arrayWithDuplicates = [1, 2, 2, 3, 3, 4];
const uniqueValues = [...new Set(arrayWithDuplicates)];
console.log(uniqueValues); // [1, 2, 3, 4]

// Set with objects (reference equality)
const obj1 = {a: 1};
const obj2 = {a: 1};
const objectSet = new Set([obj1, obj2, obj1]);
console.log(objectSet.size); // 2 (obj1 and obj2 are different references)

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// Union
const union = new Set([...setA, ...setB]);
console.log(union); // Set(5) {1, 2, 3, 4, 5}

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log(intersection); // Set(1) {3}`,
      tags: ["Set", "unique-values", "duplicates", "case-sensitive", "set-operations"]
    },
    {
      id: 245,
      question: "What is the output of NaN comparison?",
      answer: "JavaScript follows IEEE 754 spec standards. As per this spec, NaNs are never equal for floating-point numbers.",
      code: `console.log(NaN === NaN); // false

// NaN is the only value that is not equal to itself
console.log(NaN == NaN); // false
console.log(NaN !== NaN); // true
console.log(NaN != NaN); // true

// Checking for NaN
console.log(isNaN(NaN)); // true
console.log(Number.isNaN(NaN)); // true

// Difference between isNaN and Number.isNaN
console.log(isNaN("hello")); // true (converts to NaN first)
console.log(Number.isNaN("hello")); // false (no conversion)

// Object.is can detect NaN
console.log(Object.is(NaN, NaN)); // true

// Finding NaN in arrays
let numbers = [1, 2, 3, 4, NaN];
console.log(numbers.indexOf(NaN)); // -1 (can't find NaN)
console.log(numbers.findIndex(Number.isNaN)); // 4
console.log(numbers.includes(NaN)); // true

// NaN in arithmetic operations
console.log(NaN + 5); // NaN
console.log(NaN * 2); // NaN
console.log(NaN / 0); // NaN
console.log(0 / 0); // NaN

// Creating NaN
console.log(Number("abc")); // NaN
console.log(parseInt("abc")); // NaN
console.log(Math.sqrt(-1)); // NaN
console.log(undefined + 1); // NaN

// Practical NaN checking function
function isActuallyNaN(value) {
  return value !== value; // Only NaN fails this test
}

console.log(isActuallyNaN(NaN)); // true
console.log(isActuallyNaN(5)); // false
console.log(isActuallyNaN("hello")); // false

// Safe comparison utility
function safeEquals(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }
  return a === b;
}

console.log(safeEquals(NaN, NaN)); // true
console.log(safeEquals(5, 5)); // true`,
      tags: ["NaN", "IEEE-754", "comparison", "equality", "Number.isNaN"]
    },
    {
      id: 246,
      question: "What is the output of rest parameters with trailing comma?",
      answer: "When using rest parameters, trailing commas are not allowed and will throw a SyntaxError. The rest element should not have a trailing comma. You should always consider using a rest operator as the last element.",
      code: `// This will throw SyntaxError
// let [a, ...b,] = [1, 2, 3, 4, 5];
// SyntaxError: Rest element must be last element

// Correct usage without trailing comma
let [a, ...b] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // [2, 3, 4, 5]

// Rest parameters in functions
function myFunction(first, ...rest) {
  console.log('First:', first);
  console.log('Rest:', rest);
}
myFunction(1, 2, 3, 4); // First: 1, Rest: [2, 3, 4]

// This would be a SyntaxError
// function badFunction(first, ...rest,) {} // SyntaxError

// Object destructuring with rest
const obj = {a: 1, b: 2, c: 3, d: 4};
const {a, ...others} = obj;
console.log(a); // 1
console.log(others); // {b: 2, c: 3, d: 4}

// Rest must be last in object destructuring too
// const {a, ...others, b} = obj; // SyntaxError

// Valid trailing commas in other contexts
const array = [1, 2, 3,]; // Valid
const object = {a: 1, b: 2,}; // Valid
function func(a, b,) {} // Valid in function parameters

// Multiple rest patterns (not allowed)
// let [a, ...b, ...c] = [1, 2, 3]; // SyntaxError

// Rest in nested destructuring
const nested = [[1, 2, 3], [4, 5, 6]];
const [[first, ...restFirst], [second, ...restSecond]] = nested;
console.log(first); // 1
console.log(restFirst); // [2, 3]
console.log(second); // 4
console.log(restSecond); // [5, 6]`,
      tags: ["rest-parameters", "destructuring", "trailing-comma", "syntax-error", "spread-operator"]
    },
    {
      id: 247,
      question: "What is the output of async function return values?",
      answer: "Async functions always return a promise. But even if the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise.",
      code: `async function func() {
  return 10;
}
console.log(func()); // Promise {<fulfilled>: 10}

// Equivalent to:
function func2() {
  return Promise.resolve(10);
}
console.log(func2()); // Promise {<fulfilled>: 10}

// Async function with await but no return
async function func3() {
  await 10;
}
console.log(func3()); // Promise {<resolved>: undefined}

// The await expression returns value 10 with promise resolution
// but there's no return statement, so undefined is returned
// Equivalent to:
function func4() {
  return Promise.resolve(10).then(() => undefined);
}

// Consuming async function results
async function example() {
  const result = await func();
  console.log(result); // 10
}
example();

// Or using .then()
func().then(result => {
  console.log(result); // 10
});

// Async function with explicit promise
async function promiseFunc() {
  return Promise.resolve(42);
}
console.log(promiseFunc()); // Promise {<fulfilled>: 42}

// Async function with rejection
async function errorFunc() {
  throw new Error('Something went wrong');
}
console.log(errorFunc()); // Promise {<rejected>: Error: Something went wrong}

// Multiple return types
async function multiReturn(type) {
  switch(type) {
    case 'number': return 42;
    case 'string': return 'hello';
    case 'promise': return Promise.resolve('resolved');
    case 'error': throw new Error('error');
    default: return undefined;
  }
}

// All return promises
multiReturn('number').then(console.log); // 42
multiReturn('string').then(console.log); // 'hello'
multiReturn('promise').then(console.log); // 'resolved'
multiReturn('error').catch(console.log); // Error: error`,
      tags: ["async-functions", "promises", "return-values", "await", "promise-wrapping"]
    },
    {
      id: 248,
      question: "What is the output of forEach with async/await syntax error?",
      answer: "Even though 'processArray' is an async function, the anonymous function that we use for forEach is synchronous. If you use await inside a synchronous function then it throws a syntax error.",
      code: `function delay() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

async function delayedLog(item) {
  await delay();
  console.log(item);
}

// This will throw SyntaxError
// async function processArray(array) {
//   array.forEach(item => {
//     await delayedLog(item); // SyntaxError: await is only valid in async functions
//   })
// }

// Correct approaches:

// 1. Make forEach callback async (but won't wait for completion)
async function processArrayAsync(array) {
  array.forEach(async (item) => {
    await delayedLog(item);
  });
  console.log("Process completed!"); // Runs immediately
}

// 2. Use for...of loop (sequential execution)
async function processArraySequential(array) {
  for (const item of array) {
    await delayedLog(item);
  }
  console.log("Process completed!"); // Runs after all items
}

// 3. Use Promise.all for parallel execution
async function processArrayParallel(array) {
  await Promise.all(array.map(item => delayedLog(item)));
  console.log("Process completed!"); // Runs after all items
}

// 4. Use for loop
async function processArrayForLoop(array) {
  for (let i = 0; i < array.length; i++) {
    await delayedLog(array[i]);
  }
  console.log("Process completed!");
}

// 5. Use reduce for sequential processing
async function processArrayReduce(array) {
  await array.reduce(async (promise, item) => {
    await promise;
    await delayedLog(item);
  }, Promise.resolve());
  console.log("Process completed!");
}

// Testing the approaches
// processArrayAsync([1, 2, 3]); // "Process completed!" then 1, 2, 3
// processArraySequential([1, 2, 3]); // 1, 2, 3, then "Process completed!"
// processArrayParallel([1, 2, 3]); // 1, 2, 3 (parallel), then "Process completed!"`,
      tags: ["async-await", "forEach", "syntax-error", "promises", "array-iteration"]
    },
    {
      id: 249,
      question: "What is the output of Set with special values?",
      answer: "Set has few exceptions from equality check: 1. All NaN values are equal 2. Both +0 and -0 considered as different values",
      code: `var set = new Set();
set.add("+0").add("-0").add(NaN).add(undefined).add(NaN);
console.log(set); // Set(4) {"+0", "-0", NaN, undefined}

// NaN equality in Set
const nanSet = new Set();
nanSet.add(NaN);
nanSet.add(NaN);
nanSet.add(Number.NaN);
console.log(nanSet.size); // 1 (all NaN values are treated as equal)

// +0 and -0 are different in Set
const zeroSet = new Set();
zeroSet.add(+0);
zeroSet.add(-0);
zeroSet.add(0);
console.log(zeroSet.size); // 2 (+0 and -0 are different, 0 is same as +0)
console.log(zeroSet); // Set(2) {0, -0}

// Checking values
console.log(+0 === -0); // true (in regular comparison)
console.log(Object.is(+0, -0)); // false (Object.is can distinguish)

// Set uses SameValueZero algorithm
console.log(set.has(NaN)); // true
console.log(set.has(undefined)); // true
console.log(set.has("+0")); // true
console.log(set.has("-0")); // true

// More special values
const specialSet = new Set();
specialSet.add(null);
specialSet.add(undefined);
specialSet.add(false);
specialSet.add(0);
specialSet.add("");
specialSet.add(NaN);
console.log(specialSet.size); // 6 (all are different)

// Object references
const obj1 = {};
const obj2 = {};
const objSet = new Set();
objSet.add(obj1);
objSet.add(obj2);
objSet.add(obj1); // Duplicate reference
console.log(objSet.size); // 2

// Practical use case: removing duplicates with special values
const arrayWithSpecialValues = [1, NaN, 2, NaN, +0, -0, undefined, null, undefined];
const uniqueValues = [...new Set(arrayWithSpecialValues)];
console.log(uniqueValues); // [1, NaN, 2, 0, -0, undefined, null]`,
      tags: ["Set", "NaN", "zero", "special-values", "SameValueZero", "equality"]
    },
    {
      id: 250,
      question: "What is the output of Symbol comparison?",
      answer: "Symbol follows below conventions: 1. Every symbol value returned from Symbol() is unique irrespective of the optional string. 2. Symbol.for() function creates a symbol in a global symbol registry list. But it doesn't necessarily create a new symbol on every call, it checks first if a symbol with the given key is already present in the registry and returns the symbol if it is found. Otherwise a new symbol created in the registry.",
      code: `const sym1 = Symbol("one");
const sym2 = Symbol("one");

const sym3 = Symbol.for("two");
const sym4 = Symbol.for("two");

console.log(sym1 === sym2); // false
console.log(sym3 === sym4); // true

// Symbol() always creates unique symbols
const a = Symbol("description");
const b = Symbol("description");
console.log(a === b); // false
console.log(a == b); // false

// Symbol.for() uses global registry
const global1 = Symbol.for("global");
const global2 = Symbol.for("global");
console.log(global1 === global2); // true

// Getting key from symbol
console.log(Symbol.keyFor(global1)); // "global"
console.log(Symbol.keyFor(sym1)); // undefined (not in global registry)

// Symbol properties
const obj = {};
const symProp = Symbol("property");
obj[symProp] = "value";
console.log(obj[symProp]); // "value"

// Symbols are not enumerable in for...in
for (let key in obj) {
  console.log(key); // Nothing logged
}

// But can be accessed with Object.getOwnPropertySymbols
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(property)]

// Well-known symbols
console.log(Symbol.iterator); // Symbol(Symbol.iterator)
console.log(Symbol.toStringTag); // Symbol(Symbol.toStringTag)

// Symbol as object key
const mySymbol = Symbol("myKey");
const symbolObj = {
  [mySymbol]: "symbol value",
  regularKey: "regular value"
};

console.log(symbolObj[mySymbol]); // "symbol value"
console.log(Object.keys(symbolObj)); // ["regularKey"]
console.log(Object.getOwnPropertySymbols(symbolObj)); // [Symbol(myKey)]

// Symbol description
const described = Symbol("my description");
console.log(described.description); // "my description"
console.log(described.toString()); // "Symbol(my description)"

// Symbols in JSON
console.log(JSON.stringify({[Symbol("key")]: "value", normal: "value"})); // {"normal":"value"}`,
      tags: ["Symbol", "unique-values", "global-registry", "Symbol.for", "well-known-symbols"]
    },
    {
      id: 251,
      question: "What is the output of Symbol constructor with new operator?",
      answer: "Symbol is a just a standard function and not an object constructor (unlike other primitives new Boolean, new String and new Number). So if you try to call it with the new operator will result in a TypeError.",
      code: `// This will throw TypeError
// const sym1 = new Symbol("one");
// TypeError: Symbol is not a constructor

// Correct usage
const sym1 = Symbol("one");
console.log(sym1); // Symbol(one)
console.log(typeof sym1); // "symbol"

// Other primitives can use new operator
const bool = new Boolean(true);
console.log(bool); // Boolean {true}
console.log(typeof bool); // "object"

const str = new String("hello");
console.log(str); // String {"hello"}
console.log(typeof str); // "object"

const num = new Number(42);
console.log(num); // Number {42}
console.log(typeof num); // "object"

// But Symbol is different
const sym2 = Symbol("two");
console.log(sym2); // Symbol(two)
console.log(typeof sym2); // "symbol"`,
      tags: ["Symbol", "constructor", "TypeError", "new-operator", "primitives"]
    },
    {
      id: 252,
      question: "What is the output of below code with octal literal?",
      answer: "The code `const num = 0o38; console.log(num);` will throw a SyntaxError. If you use an invalid number (outside of 0-7 range) in the octal literal, JavaScript will throw a SyntaxError. In ES5, it treats the octal literal as a decimal number.",
      code: `const num = 0o38;
console.log(num); // SyntaxError`,
      tags: ["syntax", "literals", "octal", "error-handling"]
    },
    {
      id: 253,
      question: "What is the output of below code with class hoisting?",
      answer: "The code will throw a ReferenceError. Unlike function declarations, class declarations are not hoisted. You need to declare your class first and then access it, otherwise it will throw a ReferenceError 'Uncaught ReferenceError: Square is not defined'. Class expressions also apply to the same hoisting restrictions of class declarations.",
      code: `const squareObj = new Square(10);
console.log(squareObj.area); // ReferenceError

class Square {
  constructor(length) {
    this.length = length;
  }
  get area() {
    return this.length * this.length;
  }
  set area(value) {
    this.area = value;
  }
}`,
      tags: ["classes", "hoisting", "error-handling", "es6"]
    },
    {
      id: 254,
      question: "What is the output of below code with prototype and static methods?",
      answer: "The output will be 'Window, Window'. When a regular or prototype method is called without a value for this, the methods return an initial this value if the value is not undefined. Otherwise global window object will be returned. In our case, the initial this value is undefined so both methods return window objects.",
      code: `function Person() {}

Person.prototype.walk = function () {
  return this;
};

Person.run = function () {
  return this;
};

let user = new Person();
let walk = user.walk;
console.log(walk()); // Window

let run = Person.run;
console.log(run()); // Window`,
      tags: ["prototype", "this-binding", "static-methods", "context"]
    },
    {
      id: 255,
      question: "What is the output of below code with class inheritance and super?",
      answer: "The output will be 'BMW car started, BMW vehicle started'. The super keyword is used to call methods of a superclass. Unlike other languages the super invocation doesn't need to be a first statement. The statements will be executed in the same order of code.",
      code: `class Vehicle {
  constructor(name) {
    this.name = name;
  }
  start() {
    console.log(\`\${this.name} vehicle started\`);
  }
}

class Car extends Vehicle {
  start() {
    console.log(\`\${this.name} car started\`);
    super.start();
  }
}

const car = new Car("BMW");
console.log(car.start()); // BMW car started, BMW vehicle started`,
      tags: ["classes", "inheritance", "super", "es6"]
    },
    {
      id: 256,
      question: "What is the output of below code with const object mutation?",
      answer: "The output will be 25. Even though we used constant variables, the content of it is an object and the object's contents (e.g properties) can be altered. Hence, the change is going to be valid in this case.",
      code: `const USER = { age: 30 };
USER.age = 25;
console.log(USER.age); // 25`,
      tags: ["const", "objects", "mutation", "variables"]
    },
    {
      id: 257,
      question: "What is the output of below code with emoji comparison?",
      answer: "The output will be true. Emojis are unicodes and the unicode for smile symbol is 'U+1F642'. The unicode comparison of same emojis is equivalent to string comparison. Hence, the output is always true.",
      code: `console.log("🙂" === "🙂"); // true`,
      tags: ["unicode", "comparison", "emojis", "strings"]
    },
    {
      id: 258,
      question: "What is the output of below code with nested typeof?",
      answer: "The output will be 'string'. The typeof operator on any primitive returns a string value. So even if you apply the chain of typeof operators on the return value, it is always string.",
      code: `console.log(typeof typeof typeof true); // string`,
      tags: ["typeof", "primitives", "operators", "type-checking"]
    },
    {
      id: 259,
      question: "What is the output of below code with Number constructor?",
      answer: "The output will be 'If'. The type of operator on new Number always returns object. Objects are always truthy in if block. Hence the above code block always goes to if section.",
      code: `let zero = new Number(0);

if (zero) {
  console.log("If"); // This will execute
} else {
  console.log("Else");
}`,
      tags: ["constructors", "type-coercion", "truthy-falsy", "objects"]
    },
    {
      id: 260,
      question: "What is the output of below code with string property assignment in non-strict mode?",
      answer: "It returns undefined for non-strict mode and returns Error for strict mode. In non-strict mode, the wrapper object is going to be created and get the mentioned property. But the object gets disappeared after accessing the property in next line.",
      code: `let msg = "Good morning!!";
msg.name = "John";
console.log(msg.name); // undefined`,
      tags: ["strings", "properties", "strict-mode", "wrapper-objects"]
    },
    {
      id: 261,
      question: "What is the output of below code with closure and variable shadowing?",
      answer: "11 and 10 is logged to the console. The innerFunc is a closure which captures the count variable from the outer scope (10). But the conditional has another local variable count which overwrites the outer count variable. So the first console.log displays value 11. Whereas the second console.log logs 10 by capturing the count variable from outer scope.",
      code: `let count = 10;

(function innerFunc() {
  if (count === 10) {
    let count = 11;
    console.log(count); // 11
  }
  console.log(count); // 10
})();`,
      tags: ["closures", "variable-shadowing", "scope", "let"]
    },
    {
      id: 262,
      question: "What is the output of below code with logical AND operator?",
      answer: "The outputs are: 'hi', 1, ''. The operator returns the value of the first falsy operand encountered when evaluating from left to right, or the value of the last operand if they are all truthy. Falsy values include: 0, '', null, undefined, NaN.",
      code: `console.log(true && 'hi'); // hi
console.log(true && 'hi' && 1); // 1
console.log(true && '' && 0); // ''`,
      tags: ["logical-operators", "truthy-falsy", "short-circuiting", "operators"]
    },
    {
      id: 263,
      question: "What is the output of below code with array comparison?",
      answer: "The output will be true. Arrays have their own implementation of toString method that returns a comma-separated list of elements. So the above code snippet returns true. In order to avoid conversion of array type, we should use === for comparison.",
      code: `let arr = [1, 2, 3];
let str = "1,2,3";
console.log(arr == str); // true`,
      tags: ["arrays", "comparison", "type-coercion", "toString"]
    },
    {
      id: 264,
      question: "What is the output of below code with arrow function hoisting?",
      answer: "The output will be 'getMessage is not a function'. Hoisting will move variables and functions to be the top of scope. Even though getMessage is an arrow function the above function will considered as a variable due to its variable declaration or assignment. So the variables will have undefined value in memory phase and throws an error 'getMessage is not a function' at the code execution phase.",
      code: `getMessage(); // TypeError: getMessage is not a function

var getMessage = () => {
  console.log("Good morning");
};`,
      tags: ["arrow-functions", "hoisting", "variables", "error-handling"]
    },
    {
      id: 265,
      question: "What is the output of below code with Promise execution order?",
      answer: "The output will be 'program finished, promise finished'. Even though a promise is resolved immediately, it won't be executed immediately because its .then/catch/finally handlers or callbacks (aka task) are pushed into the queue. Whenever the JavaScript engine becomes free from the current program, it pulls a task from the queue and executes it. This is the reason why last statement is printed first before the log of promise handler. We call the above queue as 'MicroTask Queue'.",
      code: `let quickPromise = Promise.resolve();

quickPromise.then(() => console.log("promise finished"));
console.log("program finished");
// Output: program finished, promise finished`,
      tags: ["promises", "event-loop", "microtasks", "async"]
    },
    {
      id: 266,
      question: "What is the output of below code with automatic semicolon insertion?",
      answer: "The output will be 'Cannot read properties of undefined'. When JavaScript encounters a line break without a semicolon, the JavaScript parser will automatically add a semicolon based on a set of rules called Automatic Semicolon Insertion. But it does not assume a semicolon before square brackets [...]. So the first two lines considered as a single statement, hence there will be cannot read properties of undefined error while applying the array square bracket on log function.",
      code: `console.log('First line')
['a', 'b', 'c'].forEach((element) => console.log(element))
console.log('Third line')
// Error: Cannot read properties of undefined`,
      tags: ["semicolons", "asi", "syntax", "error-handling"]
    },
    {
      id: 267,
      question: "Write a function that returns a random HEX color",
      answer: "Here are two solutions to generate random HEX colors. The first uses iterative generation with an alphabet array, and the second is a one-liner using Math.random() and toString().",
      code: `// Solution 1: Iterative generation
const HEX_ALPHABET = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
const HEX_PREFIX = "#";
const HEX_LENGTH = 6;

function generateRandomHex() {
  let randomHex = "";
  for(let i = 0; i < HEX_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * HEX_ALPHABET.length);
    randomHex += HEX_ALPHABET[randomIndex];
  }
  return HEX_PREFIX + randomHex;
}

// Solution 2: One-liner
function generateRandomHex() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
}`,
      tags: ["functions", "random", "hex-colors", "math", "strings"]
    },
    {
      id: 268,
      question: "What is the output of below code with 'of' keyword?",
      answer: "The output will be 'of'. In JavaScript, 'of' is not considered as a reserved keyword. So the variable declaration with 'of' is accepted and prints the array value 'of' using for..of loop. But if you use reserved keyword such as 'in' then there will be a syntax error.",
      code: `var of = ['of'];
for(var of of of) {
  console.log(of); // of
}`,
      tags: ["keywords", "for-of", "variables", "syntax"]
    },
    {
      id: 269,
      question: "What is the output of below code with array sort?",
      answer: "The output will be [11, 18, 200, 23, 25, 31, 33]. By default, the sort method sorts elements alphabetically. This is because elements are converted to strings and strings compared in UTF-16 code units order. Hence, you will see the above numbers not sorted as expected. In order to sort numerically just supply a comparator function which handles numeric sorts. Note: Sort() method changes the original array.",
      code: `const numbers = [11, 25, 31, 23, 33, 18, 200];
numbers.sort();
console.log(numbers); // [11, 18, 200, 23, 25, 31, 33]

// To sort numerically:
numbers.sort((a, b) => a - b);`,
      tags: ["arrays", "sorting", "string-conversion", "methods"]
    },
    {
      id: 270,
      question: "What is the output order of below code with setTimeout and Promise?",
      answer: "The output order will be 3, 2, 1. When the JavaScript engine parses the code, the first two statements are asynchronous which will be executed later and third statement is synchronous which will be moved to callstack, executed and prints the number 3 in the console. Next, Promise is native in ES6 and it will be moved to Job queue which has high priority than callback queue in the execution order. At last, since setTimeout is part of WebAPI the callback function moved to callback queue and executed.",
      code: `setTimeout(() => {console.log('1')}, 0);
Promise.resolve('hello').then(() => console.log('2'));
console.log('3');
// Output: 3, 2, 1`,
      tags: ["event-loop", "promises", "settimeout", "async", "execution-order"]
    },
    {
      id: 271,
      question: "What is the output of below code with IIFE and hoisting?",
      answer: "The output will be 'undefined, Reference error: message is not defined'. IIFE (Immediately Invoked Function Expression) is just like any other function expression which won't be hoisted. Hence, there will be a reference error for message call. The behavior would be the same with function expression.",
      code: `console.log(name); // undefined
console.log(message()); // ReferenceError: message is not defined
var name = 'John';
(function message() {
   console.log('Hello John: Welcome');
});`,
      tags: ["iife", "hoisting", "function-expressions", "error-handling"]
    },
    {
      id: 272,
      question: "What is the output of below code with function redeclaration?",
      answer: "The output will be 'Bye'. As part of hoisting, initially JavaScript Engine or compiler will store first function in heap memory but later rewrite or replaces with redefined function content.",
      code: `message(); // Bye

function message() {
  console.log("Hello");
}
function message() {
  console.log("Bye");
}`,
      tags: ["functions", "hoisting", "redeclaration", "function-declarations"]
    },
    {
      id: 273,
      question: "What is the output of below code with variable hoisting and shadowing?",
      answer: "The output will be 'undefined, Singapore'. Due to hoisting feature, the variables declared with var will have undefined value in the creation phase so the outer variable currentCity will get same undefined value. But after few lines of code JavaScript engine found a new function call to update the current city with var re-declaration. Since each function call will create a new execution context, the same variable will have undefined value before the declaration and new value (Singapore) after the declaration.",
      code: `var currentCity = "NewYork";

var changeCurrentCity = function() {
  console.log('Current City:', currentCity); // undefined
  var currentCity = "Singapore";
  console.log('Current City:', currentCity); // Singapore
}

changeCurrentCity();`,
      tags: ["hoisting", "var", "variable-shadowing", "execution-context"]
    },
    {
      id: 274,
      question: "What is the output of below code with execution context and scope?",
      answer: "The output will be 'undefined, first, default'. Each context (global or functional) has its own variable environment and the callstack of variables in a LIFO order. So you can see the message variable value from second, first functions in an order followed by global context message variable value at the end.",
      code: `function second() {
  var message;
  console.log(message); // undefined
}

function first() {
  var message="first";
  second();
  console.log(message); // first
}

var message = "default";
first();
console.log(message); // default`,
      tags: ["execution-context", "scope", "variables", "function-calls"]
    },
    {
      id: 275,
      question: "What is the output of below code with function expression scope?",
      answer: "The output will be 'functionOne is not defined'. The function call functionOne is not going to be part of scope chain and it has its own execution context with the enclosed variable environment. It won't be accessed from global context. Hence, there will be an error while invoking the function as 'functionOne is not defined'.",
      code: `var expressionOne = function functionOne() {
  console.log("functionOne");
}
functionOne(); // ReferenceError: functionOne is not defined`,
      tags: ["function-expressions", "scope", "named-functions", "error-handling"]
    },
    {
      id: 276,
      question: "What is the output of below code with 'this' binding in nested functions?",
      answer: "The output will be '{name: \"John\", eat: f}, Window {...}'. The 'this' keyword is dynamic scoped but not lexically scoped. In other words, it doesn't matter where 'this' has been written but how it has been invoked really matters. In the above code snippet, the user object invokes eat function so 'this' keyword refers to user object but eatFruit has been invoked by eat function and 'this' will have default Window object.",
      code: `const user = {
  name: 'John',
  eat() {
    console.log(this); // {name: "John", eat: f}
    var eatFruit = function() {
      console.log(this); // Window {...}
    }
    eatFruit()
  }
}
user.eat();

// Fix with arrow function:
// var eatFruit = () => { console.log(this); } // user object`,
      tags: ["this-binding", "scope", "arrow-functions", "objects", "context"]
    },
    {
      id: 277,
      question: "What is the type of below function?",
      answer: "The function is an Impure function. Even though the above function returns the same result for the same arguments (input) that are passed in the function, the console.log() statement causes a function to have side effects because it affects the state of an external code. The console object's state and depends on it to perform the job. Hence, the above function considered as impure function.",
      code: `function add(a, b) {
  console.log("The input arguments are: ", a, b);
  return a + b;
}`,
      tags: ["functions", "pure-functions", "side-effects", "functional-programming"]
    },
    {
      id: 278,
      question: "What is the output of below code with Promise.all?",
      answer: "The output will be '[{status: \"fulfilled\", value: undefined}, Uncaught(in promise)]'. The above promises settled at the same time but one of them resolved and other one rejected. When you use .all method on these promises, the result will be short circuited by throwing an error due to rejection in second promise. But If you use .allSettled method then result of both the promises will be returned irrespective of resolved or rejected promise status without throwing any error.",
      code: `const promiseOne = new Promise((resolve, reject) => setTimeout(resolve, 4000));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject, 4000));

Promise.all([promiseOne, promiseTwo]).then(data => console.log(data));
// Output: Uncaught (in promise)

// Use allSettled instead:
Promise.allSettled([promiseOne, promiseTwo]).then(data => console.log(data));`,
      tags: ["promises", "promise-all", "promise-allsettled", "async", "error-handling"]
    },
    {
      id: 279,
      question: "What is the output of below code with try-catch and setTimeout?",
      answer: "The output will be 'try block, Uncaught Error: Exception is thrown'. If you put setTimeout and setInterval methods inside the try clause and an exception is thrown, the catch clause will not catch any of them. This is because the try...catch statement works synchronously, and the function in the above code is executed asynchronously after a certain period of time. Hence, you will see runtime exception without catching the error. To resolve this issue, you have to put the try...catch block inside the function.",
      code: `try {
  setTimeout(() => {
    console.log('try block');
    throw new Error(\`An exception is thrown\`)
  }, 1000);
} catch(err) {
  console.log('Error: ', err);
}
// Output: try block, Uncaught Error: Exception is thrown

// Correct approach:
setTimeout(() => {
  try {
    console.log('try block');
    throw new Error(\`An exception is thrown\`)
  } catch(err) {
    console.log('Error: ', err);
  }
}, 1000);`,
      tags: ["try-catch", "settimeout", "async", "error-handling", "synchronous-vs-asynchronous"]
    }
  ],
}
];

 const studyPlan = {
  beginner: [
    {
      categoryId: 'core-concepts',
      order: 1,
      focus: 'Master the fundamentals of JavaScript'
    },
    {
      categoryId: 'arrays-methods',
      order: 2,
      focus: 'Learn array manipulation and methods'
    }
  ],
  intermediate: [
    {
      categoryId: 'core-concepts',
      order: 1,
      focus: 'Deepen your understanding of core concepts'
    },
    {
      categoryId: 'functions-scope',
      order: 2,
      focus: 'Master functions, closures, and scope'
    }
  ],
  advanced: [
    {
      categoryId: 'functions-scope',
      order: 1,
      focus: 'Advanced function patterns and scope'
    },
    {
      categoryId: 'core-concepts',
      order: 2,
      focus: 'Complex JavaScript concepts and patterns'
    },
    {
      categoryId: 'arrays-methods',
      order: 3,
      focus: 'Advanced array operations and performance'
    }
  ]
};

export { studyCategories, studyPlan };
