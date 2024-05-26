window.selectById = function(id) {
    return document.getElementById(id);
}

window.selectByClass = function(className) {
    return document.getElementsByClassName(className);
}

window.addListener = function(element, event, handler) {
    element.addEventListener(event, handler);
}

window.removeListener = function(element, event, handler) {
    element.removeEventListener(event, handler);
}

window.createElement = function(tagName) {
    return document.createElement(tagName);
}

window.appendChild = function(parent, child) {
    parent.appendChild(child);
}

window.preAppend = function(parent, child) {
    parent.prepend(child);
}
window.insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
window.insertAtPosition = function(position, nodesArray, element) {
    if (position < 0 || position > nodesArray.length) {
        console.error('Invalid position');
        return;
    }

    let referenceNode = null;
    if (position < nodesArray.length) {
        referenceNode = nodesArray[position];
    }

    if (referenceNode) {
        referenceNode.parentNode.insertBefore(element, referenceNode);
    } else {
        nodesArray[0].parentNode.appendChild(element);
    }
}

window.removeChild = function(parent, child) {
    parent.removeChild(child);
}

window.setCustomAttribute = function(element, attrName, attrValue) {
    element.setAttribute(attrName, attrValue);
}

window.selectByTag = function(tagName) {
    return document.getElementsByTagName(tagName);
}

window.getAttribute = function(element, attrName) {
    return element.getAttribute(attrName);
}

window.getDataSub = function(target) {
    let dataSub = target.getAttribute('data-sub');

    return JSON.parse(dataSub.replace(/'/g, '"'));
}