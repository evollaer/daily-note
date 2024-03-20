/**
 *  给一个页面元素添加水印背景
 * @param text 文字内容
 * @param textColor 文字颜色
 * @param backgroundColor 背景色
 * @param sourceBody 挂载元素
 */
function setWatermark({ text, text2, textColor, backgroundColor }, sourceBody) {
    let can = document.createElement("canvas");
    can.width = 260;
    can.height = 130;
    let cans = can.getContext("2d");
    cans.rotate((-32 * Math.PI) / 180);
    cans.font = "11px Vedana";
    cans.fillStyle = textColor;
    cans.textAlign = "left";
    cans.textBaseline = "Middle";
    cans.fillText(text, can.width / 20, can.height);
    cans.fillText(text2, can.width / 20, can.height + 25);
    // sourceBody.style.background =
    //   "url(" + can.toDataURL("image/png") + ") left top repeat";
    // sourceBody.style.backgroundColor = backgroundColor;
}
export default setWatermark;