
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

if (this.observer) this.observer.disconnect();