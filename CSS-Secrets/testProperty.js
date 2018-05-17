/* 检测某个样式属性是否被支持，核心思路就是在任一元素的element.style对象上检查该属性是否存在 */

function testProperty(property) {
    var root = document.documentElement;
    if (property in root.style) {
        return true;
    }
    return false;
}