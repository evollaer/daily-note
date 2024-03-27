// 去除字符串两边空格trim
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

// 获取url后面的参数
function getQuery() {
    var loc = decodeURI(location.href); //URL里的汉字出现乱码使用decodeURI方法解码
    let urlStr = loc.split("?")[1];
    if (!urlStr) {
        return;
    }
    let object = {};
    let paramsArr = urlStr.split("&");
    for (let i = 0, len = paramsArr.length; i < len; i++) {
        let arr = paramsArr[i].split("=");
        object[arr[0]] = arr[1];
    }
    return object;
}

// 时间戳转换-》2024-01-01 00:00:00
export function formatDate(value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = (date.getMonth() + 1).toString().padStart(2, '0');
    let d = date.getDate().toString().padStart(2, '0');
    let h = date.getHours().toString().padStart(2, '0');
    let m = date.getMinutes().toString().padStart(2, '0');
    let s = date.getSeconds().toString().padStart(2, '0');
    return `${y}-${MM}-${d} ${h}:${m}:${s}`;
}
