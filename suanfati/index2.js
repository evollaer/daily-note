// 1.一只青蛙一次可以跳上一级台阶，也可以跳上2级台阶，求跳上n阶台阶总共有多少种跳法
function jumpFloor(n) {
    if (n < 2) {
        return 1
    }
    if (n === 2) {
        return 2
    }
    return jumpFloor(n - 1) + jumpFloor(n - 2)
}
console.log(jumpFloor(3));
