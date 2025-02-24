// 深拷贝
let deepClone = function (obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Object.prototype, toString.call(obj) == '[object Array]') {
        let arrCopy = []
        for (let i of obj) {
            arrCopy.push(deepClone(i))
        }
        return arrCopy
    }
    let cloneObject = {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObject[key] = deepClone(obj[key])
        }
    }
    return cloneObject
}
let list = [1, { a: 2, b: { c: 1 } }, [2, 3, [4]]]
let newlist = deepClone(list)
list.push(77)
list[1].a = 6
console.log(list, newlist, 777)

// for in——遍历label， for of——遍历value
// const arr = [1, 2, 3];
// const str = "你好你好呀";
// for (const key in arr) {
//     console.log(key); // 0,1,2
// }
// for (const item of str) {
//     console.log(item); // 你,好,你,好,呀
// }
// for (const item in str) {
//     console.log(item); // 0,1,2,3,4
// }

// 防抖
function fangdou(fn, time = 1000) {
    let timer
    return function (...args) {
        console.log(args, 777);

        clearTimeout(timer)
        const context = this;
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, time);
    }
}
function fn(a, b) {
    console.log(a, b);
}
let fnnn = fangdou(fn, 1000)
fnnn(1, 2)
// 节流
function jieliu(fn, time) {
    let timer = null
    let previous = 0
    return function (...args) {
        const context = this;
        const now = Date.now()
        const remaining = delay - (now - previous);
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            previous = now;
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args);
                previous = Date.now();
            }, remaining);
        }
    }
}


// 示例使用
const onResize = () => console.log("窗口大小调整");
const debouncedResize = debounce(onResize, 300);
window.addEventListener("resize", debouncedResize);

const onScroll = () => console.log("滚动事件触发");
const throttledScroll = throttle(onScroll, 200);
window.addEventListener("scroll", throttledScroll);
