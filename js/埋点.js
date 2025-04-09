/**
 * 发送埋点数据到后端
 * @param {string} eventName - 事件名称，例如 'button_click'
 * @param {object} data - 额外的数据，例如 { buttonId: 'btn-1' }
 */
function trackEvent(eventName, data = {}) {
    // 这里假设后端的埋点接口地址为 /api/track
    const apiUrl = '/api/track';
    const payload = {
        eventName,
        data,
        timestamp: new Date().toISOString()
    };

    // 使用 fetch API 发送 POST 请求
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
   .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
   .then(data => {
        console.log('埋点数据发送成功:', data);
    })
   .catch(error => {
        console.error('埋点数据发送失败:', error);
    });
}

// 使用示例
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    trackEvent('button_click', { buttonId: 'myButton' });
});