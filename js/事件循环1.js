// Promise.resolve().then(()=>{
//     console.log(0);
//     return Promise.resolve(4)
// }).then(res=>{
//     console.log(res);
// })

// 解析
// 上面的函数相当于：
Promise.resolve().then(()=>{
    console.log(0);
}).then(()=>{
    return 4
}).then(res=>{
    // console.log(res);
    return res
}).then(res2=>{
    console.log(res2);
    
})
Promise.resolve().then(()=>{
    console.log(1);
}).then(()=>{
    console.log(2);
}).then(()=>{
    console.log(3);
}).then(()=>{
    console.log(5);
})
// 0 1 2 3 4 5