import URLParser from "../../../../global/scripts/URLParser.js";

const CARDGROUP_ITEMTYPE = "cards-group";
const CAROUSEL_ITEMTYPE = "carousel";
const ITEM_ITEMTYPE = "carousel-item";
const EXPAND_ITEMTYPE = "see-all";

const getRawWidth = (element) => {
    const clientWidth = element.clientWidth;
    const styles = getComputedStyle(element);
    const inlinePadding = parseFloat(styles.paddingInline);
    return clientWidth - inlinePadding;
}
const resetGroup = (group) => {
    const carousel = URLParser.getElementByAttribute(group, "itemtype", CAROUSEL_ITEMTYPE);
    const cards = URLParser.getElementsByAttribute(group, "itemtype", ITEM_ITEMTYPE);
    const expandButton = URLParser.getElementByAttribute(group, "itemtype", EXPAND_ITEMTYPE);

    const capacity = Math.floor(getRawWidth(carousel) / cards[0].clientWidth);
    if (cards.length <= capacity) expandButton.setAttribute("aria-disabled", "true");
}

const cardsGroups = URLParser.getElementsByAttribute(document, "itemtype", CARDGROUP_ITEMTYPE);
for(let i = 0; i < cardsGroups.length; i++) {
    resetGroup(cardsGroups[i]);
}