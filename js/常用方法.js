// 去除字符串两边空格trim
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}