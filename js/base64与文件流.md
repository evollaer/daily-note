### 1、base64格式转换为文件流：
```js
    npm install js-base64 --save-dev
    import { Base64 as Base64Converter } from 'js-base64';
    let base64String = 'xxx'
    // 转换为文件流
    const data = Base64Converter.toUint8Array(base64String).buffer
```