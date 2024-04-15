### 1.babel-plugin-import

babel-plugin-import 不是直接减少 import 的数量，而是通过优化 import 语句来减少打包体积，提高项目的加载性能。这对于使用了大型第三方库的项目来说是一个非常有价值的优化手段。
以 arco-design 为例：

```js
// .bablerc配置
{
  "plugins": [
    ["import", {
      "libraryName": "@arco-design/web-react",
      "libraryDirectory": "es", // 或者 "lib"，依赖于具体使用的模块系统
      "style": true // 加载 CSS
    }, "@arco-design/web-react"]
  ]
}
// 这个配置告诉 babel-plugin-import 自动将类似 import { Button } from '@arco-design/web-react'; 的导入语句转换为按需导入的形式，并且加载对应的 CSS 文件。
```

```js
// 业务中使用
import { Button } from "@arco-design/web-react";
// 将被bable编译成
import Button from "@arco-design/web-react/es/button";
import "@arco-design/web-react/es/button/style/css.js"; // 如果 style 配置为 true
```
