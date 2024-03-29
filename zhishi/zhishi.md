### 1、从输入url到页面显示出来发生了什么
```js
// 1.DNS解析
// 2.TCP连接
// 3.发送HTTP请求
// 4.服务器处理请求并返回需要的数据
// 5.浏览器解析渲染页面
// 解析HTML，生成DOM树，解析CSS，生成CSSOM树
// 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
// Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
// Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
// Display:将像素发送给GPU，展示在页面上
```
