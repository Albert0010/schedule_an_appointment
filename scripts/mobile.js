const arrowDownMobile = selectByClass('arrow-down-mobile');
const arrowUpMobile = selectByClass('arrow-up-mobile');

let clickedArray = [];
const addClickEvent = (layer,isMount) => {
    const liElementsMobile = document.querySelectorAll('.li-mobile');
    const arrowDownMobile = selectByClass('arrow-down-mobile');
    const arrowUpMobile = selectByClass('arrow-up-mobile');
    for (let i = 0; i < liElementsMobile.length; i++) {
        const element = liElementsMobile[i];
        const child = element.children[0];

        const hasDataSub = child.hasAttribute('data-sub');

        const currentLayer = +getAttribute(element.parentNode,'layer');
        if (hasDataSub && (isMount || currentLayer > layer)) {
            addListener(element, 'click', (event)=>{

                event.stopPropagation();
                const isClicked = clickedArray.includes(element);
                clickedArray = clickedArray.filter((item)=> item !== element);
                !isClicked && clickedArray.push(element);
                const parentDivElement = element?.parentNode;
                const parentLayer = +getAttribute(parentDivElement,'layer');
                arrowDownMobile[i]?.classList.toggle('active-mobile-arrow');
                arrowUpMobile[i]?.classList.toggle('arrow-up-mobile-active');

                if(!isClicked){
                    parentDivElement.classList.add('active-mobile')
                    const divElement = createElement('div');
                    divElement.classList.add('sub-category-mobile');
                    setCustomAttribute(divElement, 'layer', parentLayer + 1);
                    const parsedData = getDataSub( element.children[0]);
                    for (let j = 0; j < parsedData.length; j++) {
                        const element = parsedData[j];
                        const hasName = element.hasOwnProperty('name');
                        const dataSub = hasName ? [] : Object.values(element)[0];
                        const innerDivElement = createElement('div');
                        innerDivElement.classList.add('category-btn-mobile','inner-sub-category-mobile','li-mobile');
                        const innerLiElement = createElement('li');
                        innerLiElement.innerHTML = hasName ? element.name : Object.keys(element)[0];
                        const innerImgDownElement = createElement('img');
                        const innerImgUpElement = createElement('img');
                        appendChild(innerDivElement, innerLiElement);

                        if(!hasName){
                            setCustomAttribute(innerImgDownElement, 'src', 'styles/assets/arrow-down-black.svg');
                            setCustomAttribute(innerImgDownElement, 'alt', 'arrow-down');
                            setCustomAttribute(innerImgDownElement, 'class', 'arrow-down-mobile');
                            setCustomAttribute(innerImgUpElement, 'src', 'styles/assets/arrow-up-black.svg');
                            setCustomAttribute(innerImgUpElement, 'alt', 'arrow-up');
                            setCustomAttribute(innerImgUpElement, 'class', 'arrow-up-mobile');
                            setCustomAttribute(innerLiElement, 'data-sub', JSON.stringify(dataSub));
                            appendChild(innerDivElement, innerImgDownElement);
                            appendChild(innerDivElement, innerImgUpElement);
                        }

                        appendChild(divElement, innerDivElement);

                    }
                    if(!(parentLayer === 0)){
                        parentDivElement.insertBefore(divElement, liElementsMobile[i + 1])
                    }else{
                        appendChild(parentDivElement, divElement);
                    }
                }else{
                    element.nextElementSibling.remove();
                    element.parentNode.classList.remove('active-mobile');
                }

                addClickEvent(
                    parentLayer,
                    false
                );
            });
        }

    }
}

addClickEvent(0, true);