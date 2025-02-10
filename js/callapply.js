// call的用法

function Person(name) {
    this.name = name; // 这里的 this 实际指向 Student 的实例
}

function Student(name, grade) {
    Person.call(this, name); // 调用父类构造函数，绑定 this 到当前 Student 实例
    this.grade = grade;
}

const bob = new Student("Bob", 10);
console.log(bob.name); // "Bob"（来自父类构造函数）
console.log(bob.grade); // 10（来自子类构造函数）

// apply的用法，apply和call的用法基本一致，只是接收参数的形式不同，apply 接受的是属猪形式
Person.apply(this, [name]); // 功能与 call 相同，但参数以数组形式传递

// Object.create() 是 JavaScript 中一个非常实用的方法，它用于创建一个新对象，并允许你指定新对象的原型（[[Prototype]]）
let base = {
    sayHello() {
        return "Hello";
    }
};

let obj = Object.create(base, {
    name: {
        value: "Alice",
        writable: true,
        enumerable: true,
        configurable: true
    },
    age: {
        value: 25,
        writable: false,
        enumerable: false,
        configurable: false
    }
});

console.log(obj.name); // 输出：Alice
console.log(obj.age); // 输出：25
console.log(obj.sayHello()); // 输出：Hello