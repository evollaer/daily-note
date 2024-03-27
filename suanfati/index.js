//1、冒泡排序
let arr = [16, 31, 12, 1, 9, 12, 10];
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}
bubbleSort(arr)

// 旅程最优化-贪心算法
const spots = [
    { name: '故宫', time: 1, score: 7 },
    { name: '颐和园', time: 2, score: 8 },
    { name: '长城', time: 3, score: 9 },
    { name: '天坛', time: 1, score: 6 }
];

function getMaxValueSpots(maxTime, spots) {
    // 计算每个景点的单位时间价值
    const valueSpots = spots.map(spot => ({
        name: spot.name,
        value: spot.score / spot.time
    }));

    // 按照单位时间价值从大到小排序
    valueSpots.sort((a, b) => b.value - a.value);

    let totalTime = 0;
    const maxValueSpots = [];
    for (let i = 0; i < valueSpots.length; i++) {
        const spot = spots.find(item => item.name === valueSpots[i].name);
        if (totalTime + spot.time <= maxTime) {
            // 如果还有时间，加入当前景点
            totalTime += spot.time;
            maxValueSpots.push(spot.name);
        } else {
            // 没有时间了，退出循环
            break;
        }
    }

    return maxValueSpots;
}

const maxTime = 4;
const result = getMaxValueSpots(maxTime, spots);
console.log(result); // ["长城", "颐和园"]