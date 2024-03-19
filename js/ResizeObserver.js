// 监听元素resize
function initObserver() {
    const config = {
        attributes: true,
    };
    const element = document.getElementById("multipleTable");

    const observer = new ResizeObserver((entries) => {
        if (element.clientHeight && this.tableHeight != element.clientHeight) {
            this.tableHeight = element.clientHeight;
        }
    });

    observer.observe(element, config);
    this.observer = observer;
}
// 使用完毕后进程中记得关闭observe
if (this.observer) this.observer.disconnect();