// lodash 按需加载，压缩js包
// lodash.lib.js文件

// import "./lodash.lib.js"; 引入main.js中
import isArray from 'lodash/isArray';
import indexOf from 'lodash/indexOf';
import cloneDeep from 'lodash/cloneDeep';
import trim from 'lodash/cloneDeep';

window._ = {
    isArray: isArray,
    indexOf: indexOf,
    cloneDeep: cloneDeep,
    trim: trim
};
