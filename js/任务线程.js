// 微任务：(通常与JavaScript代码执行相关)
//        Promise.prototype.then catch finally
//        process.nextTick
//        MutationObserver
//        Object.observe
// 宏任务：（通常与浏览器渲染相关，包括整体代码script、setTimeout、setInterval、I/O操作、UI渲染等）
//        setTimeout
//        setInterval
//        requestAnimationFrame
//        setImmediate（Node.js 独有）
//        DOM事件
//        IO事件
// 执行顺序：执行顺序上，微任务优先于宏任务执行。这意味着在当前宏任务执行完毕后，所有微任务都会被立即执行，而宏任务只有在所有微任务执行完毕后才会执行