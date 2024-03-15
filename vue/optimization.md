### 1.不需要响应式的数据

```js
// 不需要响应式的数据，也就是死数据，建议不要放在对象里，放在对象里他会进行响应式处理，浪费性能
 data() {
    // 放在这
    this.selects = [
      {label: '选项一', value: 1},
      {label: '选项二', value: 2},
      {label: '选项三', value: 3}
    ]
    return { };
  }
```

### 2、文本框加防抖

```js
<el-input @input="fn" />

import { debounce } from "@tools";
fn: debounce(function () {
        // 做相应的事
    }, 300)


// tools
/**
 * 防抖函数
 * @param {Function} fn 回调函数
 * @param {Number} delay 时长
 */
export const debounce = (fn, delay) => {
    var timer;
    return function () {
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args); // this 指向vue
        }, delay);
    };

}
```
