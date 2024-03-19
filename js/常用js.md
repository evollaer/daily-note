### 1、三元代替 if/多重三元

```js
//总结：
//for in相当于object.keys()，返回的是key，for of相当于object.values()，返回的是value
//for in循环返回的是key，for of循环返回的是value
//for in循环返回的是任意数据类型的数据，for of循环返回的是字符串
//for in用来遍历数组、对象、字符串
//for of用来遍历数组、字符串
const obj = {
  a: "111",
  b: 222,
  c: 333,
};
const arr = [1, 2, 3];
const str = "你好你好呀";
for (const key in arr) {
  console.log(key); // 0,1,2
}
for (const item of str) {
  console.log(item); // 你,好,你,好,呀
}
```
