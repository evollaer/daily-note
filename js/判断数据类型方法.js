// 1. Object.prototype.toString.call()
const arr = [1, 2, 3]
const obj = { a: 1 }
Object.prototype.toString.call(arr);  // [object Array]
Object.prototype.toString.call(obj);  // [object Object]

console.log(Object.prototype.toString.call(42)); // "[object Number]"
console.log(Object.prototype.toString.call("string")); // "[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call(function () {})); // "[object Function]"

// 2. typeof 
console.log(typeof 42); // "number"
console.log(typeof "string"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof null); // "object" （注意！）
console.log(typeof []); // "object"
console.log(typeof function () {}); // "function"

// 3.instanceof
let arr = [];
console.log(arr instanceof Array); // true

let date = new Date();
console.log(date instanceof Date); // true

class Person {}
let person = new Person();
console.log(person instanceof Person); // true

// 4.constructor
let num = 42;
console.log(num.constructor === Number); // true

let str = "hello";
console.log(str.constructor === String); // true

let arr = [];
console.log(arr.constructor === Array); // true