### 1、三元代替 if/多重三元

```js
// 普通写法
let name = "evollaer";
if (condition1) {
  if (condition2) {
    name = "科比";
  } else {
    name = "詹姆斯";
  }
}

// 多重三元表达式
let name = condition1 ? "evollaer" : condition2 ? "科比" : "詹姆斯";
```

### 2、优化多 if

```js
// 利用Map，Map的key可以是任意类型
const map = new Map([
  [1, "一心一意"],
  [2, "双龙戏珠"],
  [3, "三心二意"],
  [4, "四面楚歌"],
  ["curry", "库里"],
  ["durant", "杜兰特"],
]);
console.log(map);
// Map {
//   1 => '一心一意',
//   2 => '双龙戏珠',
//   3 => '三心二意',
//   4 => '四面楚歌',
//   'curry' => '库里',
//   'durant' => '杜兰特'
// }

// 通过Map查找对应的值
name = map.get(code);
```

### 3、多条件判断

```js
// 普通操作
const name = XXXXXXX;
if (name === "evollaer" || name === "詹姆斯" || name === "科比" || name === "杜兰特") {
  // 进行对应的操作
}
```

```js
// 优化后：
const name = XXXXXXX;
if (["evollaer", "詹姆斯", "科比", "杜兰特"].includes(name)) {
  // 进行对应的操作
}
```
