let  a;
let b = new Promise(resolve=>{
    console.log(1);
    setTimeout(() => {
        resolve()
    }, 1000);
    
}).then(()=>{
    console.log(2);
})

a=new Promise(async (resolve)=>{
    console.log(a);
    await b
    console.log(a);
    console.log(3);
    await a
    
    resolve(true)
    console.log(4);
    
})
console.log(5);
