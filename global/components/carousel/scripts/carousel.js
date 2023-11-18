import URLParser from "../../../scripts/URLParser.js";

const CAROUSEL_ITEMTYPE = "carousel";
const CARDGROUP_ITEMTYPE = "cards-group";
const ITEM_ITEMTYPE = "carousel-item";
const PREVIOUS_ITEMTYPE = "arrow-back";
const NEXT_ITEMTYPE = "arrow-forward";
const CONTENT_ITEMTYPE = "carousel-content";

const getCardOrder = (card, allCards) => {
    let cardOrder;
    Array.from(allCards).find((element, index) => {
        if (element === card)  cardOrder = index + 1;
    });

    return cardOrder;
}
const getRawWidth = (element) => {
    const clientWidth = element.clientWidth;
    const styles = getComputedStyle(element);
    const inlinePadding = parseFloat(styles.paddingInline);
    return clientWidth - inlinePadding;
}
const resetCarousel = (carousel) => {
    const cards = URLParser.getElementsByAttribute(carousel, "itemtype", ITEM_ITEMTYPE);
    const arrowForward = URLParser.getElementByAttribute(carousel, "itemtype", NEXT_ITEMTYPE);
    const capacity = Math.floor(getRawWidth(carousel) / cards[0].clientWidth);

    for(let j = 0; j < capacity; j++) {
        cards[j].setAttribute("aria-hidden", "false");
    }
    if(cards.length <= capacity) arrowForward.setAttribute("aria-disabled", "true");
}

const carousels = URLParser.getElementsByAttribute(document, "itemtype", CAROUSEL_ITEMTYPE);
for(let i = 0; i < carousels.length; i++){
    resetCarousel(carousels[i]);
}

const arrowsForward = URLParser.getElementsByAttribute(document, "itemtype", NEXT_ITEMTYPE);
const arrowsBack = URLParser.getElementsByAttribute(document, "itemtype", PREVIOUS_ITEMTYPE);
for(let i = 0; i < arrowsForward.length; i++) {
    arrowsForward[i].addEventListener("click", swapCarouselForward);
    arrowsBack[i].addEventListener("click", swapCarouselBack)
}

function swapCarouselForward(e) {
    const groupObject = initializeGroupObject(e);
    const previousCards = groupObject.activeCards;

    disableCards(groupObject);
    setNewCards(groupObject, previousCards, true);
    enableCards(groupObject);
    moveContent(groupObject);
    changeArrows(groupObject);
}
function swapCarouselBack(e) {
    const groupObject = initializeGroupObject(e);
    const previousCards = groupObject.activeCards;

    disableCards(groupObject);
    setNewCards(groupObject, previousCards, false);
    enableCards(groupObject);
    moveContent(groupObject);
    changeArrows(groupObject);
}

const initializeGroupObject = (sender) => {
    const groupObject = {};
    const cardGroup = sender.target.closest("[itemtype='" + CARDGROUP_ITEMTYPE + "'");

    groupObject.group = cardGroup;
    groupObject.forwardArrow = URLParser.getElementByAttribute(cardGroup, "itemtype", NEXT_ITEMTYPE);
    groupObject.backArrow = URLParser.getElementByAttribute(cardGroup, "itemtype", PREVIOUS_ITEMTYPE);
    groupObject.carousel = URLParser.getElementByAttribute(cardGroup, "itemtype", CAROUSEL_ITEMTYPE);
    groupObject.cards = URLParser.getElementsByAttribute(cardGroup, "itemtype", ITEM_ITEMTYPE);
    groupObject.activeCards = URLParser.getElementsByAttribute(groupObject.carousel, "aria-hidden", "false");
    groupObject.carouselContent = URLParser.getElementByAttribute(cardGroup, "itemtype", CONTENT_ITEMTYPE);
    groupObject.pageCapacity = Math.floor(getRawWidth(groupObject.carousel) / groupObject.cards[0].clientWidth);

    return groupObject;
}
const disableCards = (groupObject) => {
    for (let i = 0; i < groupObject.activeCards.length; i++){
        groupObject.activeCards[i].setAttribute("aria-hidden", "true");
    }
    groupObject.activeCards = [];
}
const setNewCards = (groupObject, previousCards, isForward) => {
    const cards = groupObject.cards;
    const previousLastOrder = getCardOrder(previousCards[previousCards.length - 1], groupObject.cards);
    const newLastOrder = isForward
        ? Math.min(previousLastOrder + groupObject.pageCapacity, groupObject.cards.length)
        : Math.max(groupObject.pageCapacity, previousLastOrder - groupObject.pageCapacity);

    const newFirstOrder = Math.max(0, newLastOrder - groupObject.pageCapacity);
    groupObject.activeCards =  Array.from(cards).slice(newFirstOrder, newLastOrder);
}
const enableCards = (groupObject) => {
    for (let i = 0; i < groupObject.activeCards.length; i++){
        groupObject.activeCards[i].setAttribute("aria-hidden", "false");
    }
}
const moveContent = (groupObject) => {
    const carouselContent = groupObject.carouselContent;
    const firstOrder = getCardOrder(groupObject.activeCards[0], groupObject.cards) - 1;
    let contentOffset = firstOrder * groupObject.activeCards[0].clientWidth;
    if(firstOrder === groupObject.cards.length - groupObject.pageCapacity)
        contentOffset = carouselContent.scrollWidth - getRawWidth(carouselContent);

    carouselContent.style.transform = "translateX(-" + contentOffset + "px" ;
}
const changeArrows = (groupObject) => {
    const firstOrder = getCardOrder(groupObject.activeCards[0], groupObject.cards);
    if(firstOrder === 1) groupObject.backArrow.setAttribute("aria-disabled", "true");
    else groupObject.backArrow.setAttribute("aria-disabled", "false");

    const lastOrder = getCardOrder(groupObject.activeCards[groupObject.activeCards.length - 1], groupObject.cards);
    if(lastOrder === groupObject.cards.length) groupObject.forwardArrow.setAttribute("aria-disabled", "true");
    else groupObject.forwardArrow.setAttribute("aria-disabled", "false");
}