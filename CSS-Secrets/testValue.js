/*检测某个具体的属性值是否被支持，就需要把它赋给对应的属性，然后检查浏览器是不是还保存着这个值*/

function testValue(id, value, property) {
    var root = document.documentElement;
    var dummy = document.createElement('p');
    dummy.style[property] = value;

    if (dummy.style[property]) {
        root.classList.add(id);
        return true;
    }
    root.classList.add('no-' + id);
    return false;
}