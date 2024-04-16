// 问：多次改变dom会渲染几次？
let app = document.getElementById('app')
app.style.width = (app.offsetWidth+1)+'px'//使用offset属性读取清空渲染队列
// 但是此时渲染队列为空，就没有渲染操作，然后是修改app宽度操作被压入渲染队列
app.style.width = 10+'px'// 被压入渲染队列
app.style.width = (app.offsetWidth+1)+'px'// 清空渲染队列一次渲染，同时新的回流操作被压入渲染队列
app.style.width = 10+'px'// 被压入渲染队列
app.style.width = (app.offsetWidth+1)+'px'// 清空渲染队列，同时压入一个回流操作
// 最后代码结束，渲染队列还有值，清空渲染队列，总共是三次渲染
