// 第一题
let a;
let b = new Promise(resolve => {
    console.log(1); // 1
    setTimeout(() => {
        resolve()
    }, 1000);

}).then(() => {
    console.log(2); // 4
})

a = new Promise(async (resolve) => {
    console.log(a); // 2 - undefined
    await b
    console.log(a); // 5 - Promise{<pending>}
    console.log(3);
    await a

    resolve(true)
    console.log(4);

})
console.log(5); // 3-然后等待一秒


// 第二题
const promiseA = Promise.resolve('1')
promiseA.then(res => {
    console.log('a', res); // 1
}).then(res => {
    console.log('a', res); //4-undefined
})
const promiseB = Promise.resolve('2')
promiseB.then(res => {
    console.log('b', res); // 2
})
promiseB.then(res => {
    console.log('b', res);  //3
})
// 第三题
console.log(1);
Promise.resolve().then(() => {
    console.log(2);
    setTimeout(() => {
        console.log(3);
    }, 0);
})
setTimeout(() => {
    console.log(4);
    new Promise((resolve) => {
        console.log(5);
        resolve();
    }).then(() => {
        console.log(6);
    })

}, 0);
console.log(7);

// 1724563

// 第四题
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4)
}).then(res => {
    console.log(res);
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
})
// 012345
// 第一个相当于：
Promise.resolve().then(()=>{
    console.log(0);
    return Promise.resolve().then(()=>{
        return 4
    }).then(res=>{
        console.log(res)
    })
})
// 相当于
// [
Promise.resolve().then(()=>{
    console.log(0); // 1  -0
    (()=>{
        return 4  // 3
    }).then(x=>{
        return x  // 5
    }).then(res=>{
        console.log(res)  //  7 - 4
    })
})

Promise.resolve().then(() => {
    console.log(1);  // 2  -  1
}).then(() => {
    console.log(2);  //4  - 2
}).then(() => {
    console.log(3);  // 6  -  3
}).then(() => {
    console.log(5);
})
// ]