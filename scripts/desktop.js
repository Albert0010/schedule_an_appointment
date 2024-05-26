const imageElement = selectById('girl-image-wrapper');
const mainElement = selectById('main');

const liElements = selectByClass('category-btn');

//constants
const SRC = 'src';
const DIV = 'div';
const ALT = 'alt';
const CATEGORY_TEXT = 'category-text';
const MAIN_CATEGORY_BLOCK = 'main-category-block';
const LAYER = 'layer';

const removeAllAfterLayers = (layer) => {
    const mainCategoryElements = selectByClass(MAIN_CATEGORY_BLOCK);
    for (let i = 0; i < mainCategoryElements.length; i++) {
        if (parseInt(getAttribute(mainCategoryElements[i], LAYER)) > layer) {
            mainElement.removeChild(mainCategoryElements[i]);
            i--;
        }
    }
}

const handleAddNewCategory = (event,parentUl,position) => {
    const newCreatedDiv = createElement(DIV);
    const arrowImg = createElement('img');
    setCustomAttribute(arrowImg, SRC, '../styles/assets/arrow-right.svg');
    setCustomAttribute(arrowImg, ALT, 'arrow-right');
    setCustomAttribute(arrowImg, SRC, '../styles/assets/arrow-right.svg');
    arrowImg.classList.add('arrow-right');
    newCreatedDiv.classList.add('clicked-sub-category-arrow');
    appendChild(newCreatedDiv, event.target);
    appendChild(newCreatedDiv, arrowImg);
    insertAtPosition(position, Array.from(parentUl.children), newCreatedDiv);
}

const modifyLiElements = (event,liElements,layer) => {
    for (let i = 0; i < liElements.length; i++) {
        const li = liElements[i];
        if (li === event.target) {
            li.classList.add(CATEGORY_TEXT);
            li.classList.remove('non-clicked');
            continue;
        }
        const isNextSiblingImage = li.nextSibling && li.nextSibling.nodeName === "IMG"
        const currentLiLayer = isNextSiblingImage ? +getAttribute(li.parentNode.parentNode.parentNode,LAYER) : +getAttribute(li.parentNode.parentNode,LAYER);
        if(currentLiLayer === layer){
            isNextSiblingImage && li.nextSibling.remove();
            li.classList.add('non-clicked');
            li.classList.remove(CATEGORY_TEXT);
        }
    }
}

const handleCategoryClick = (event) => {
    event.stopPropagation();

    const isAlreadyClicked = event.target?.parentNode?.classList.contains('clicked-sub-category-arrow');

    const modificledLi = isAlreadyClicked ? event.target.parentNode : event.target;

    const parentUl = modificledLi?.parentNode;
    const parentNode = parentUl?.parentNode;
    const layer = +parentNode?.getAttribute(LAYER)
    const arrayOfNodes = Array.from(parentUl.children);
    const position = arrayOfNodes.indexOf(modificledLi);

    parentUl.removeChild(modificledLi);

    handleAddNewCategory(event,parentUl,position)

    parentNode?.getAttribute(LAYER) && removeAllAfterLayers(layer);

    const activeElement = selectByClass('active')[0];

    imageElement.style.display = 'none';


    const parsedData = getDataSub(event.target);
    let newDiv = createElement(DIV);
    const mainCategoryElements = selectByClass(MAIN_CATEGORY_BLOCK);

    newDiv.classList.add(MAIN_CATEGORY_BLOCK,'active');

    const lastMainCategoryElement = mainCategoryElements[mainCategoryElements.length - 1];
    const mainCategoryElementLayer = getAttribute(lastMainCategoryElement, LAYER);
    modifyLiElements(event,liElements,layer);

    setCustomAttribute(newDiv, LAYER, +mainCategoryElementLayer + 1);

    activeElement?.classList?.remove('active');

    appendChild(newDiv, displayData(parsedData));

    mainElement.insertBefore(newDiv, mainElement.lastChild);
}

for (let i = 0; i < liElements.length; i++) {
    addListener(liElements[i], 'click', handleCategoryClick);
}


function displayData(data) {
    const ulElement = createElement('ul');

    for (let i = 0; i < data.length; i++) {
        const hasName = data[i].hasOwnProperty('name');
        const dataSub = hasName ? [] : Object.values(data[i])[0];
        let liElement = createElement('li');

        liElement.classList.add('category-btn',CATEGORY_TEXT);
        const name = hasName ? data[i].name : Object.keys(data[i])[0]
        setCustomAttribute(liElement, 'data-sub', JSON.stringify(dataSub));
        setCustomAttribute(liElement, 'data-name', name);

        liElement.innerHTML = name;

        !hasName && addListener(liElement, 'click',handleCategoryClick);

        appendChild(ulElement, liElement);
    }

    return ulElement;
}

