function curry (...args){
    let params = args
    const addFn=(...args2)=>{
        params = [...params,...args2]
    }
}