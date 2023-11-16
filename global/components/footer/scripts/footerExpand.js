import URLParser from "../../../scripts/URLParser.js";

const expandableList = document.querySelectorAll(".footer__small-row");
const EXPANDABLE_CLASSNAME = "footer__small-row";
const OVERFLOW_CLASSNAME = "footer__expander--overflow";
const CONTENT_CLASSNAME = "expander__content";
const HIDE_CLASSNAME = "hidden";
const BUTTON_CLASSNAME = "footer__expand-button";
const ARROW_ID = "expandable-arrow";

let currentExpandable = null;
let previousExpandable = null;

const getButton = (expandable) => expandable.querySelector("." + BUTTON_CLASSNAME);
const getArrow = (expandable) => URLParser.getElementByID(expandable, ARROW_ID);
const getCaret = (expandable) => URLParser.getElementByID(expandable, getButton(expandable).getAttribute("aria-controls"));
const getContent = (expandable) => getCaret(expandable).firstElementChild;

const expandableClicked = (e) => {
    previousExpandable = currentExpandable;
    const interactedExpandable = e.target.closest("." + EXPANDABLE_CLASSNAME);
    currentExpandable = previousExpandable === interactedExpandable
        ? null
        : interactedExpandable;

    disableExpandable(previousExpandable);
    enableExpandable(currentExpandable);
}

const enableExpandable = () => {
    if (currentExpandable !== null) {
        startEnabling();
        const duration = getDuration(currentExpandable);
        setTimeout(endEnabling, duration);
    }
}
const startEnabling = () => {
    getButton(currentExpandable).setAttribute("aria-expanded", "true");
    getArrow(currentExpandable).setAttribute("aria-hidden", "false");
    getContent(currentExpandable).classList.remove("hidden");
    getCaret(currentExpandable).style.height = getContent(currentExpandable).clientHeight + "px";
}
const endEnabling = () => {
    getCaret(currentExpandable).classList.remove(OVERFLOW_CLASSNAME);
    getContent(currentExpandable).classList.remove(CONTENT_CLASSNAME);
}

const disableExpandable = () => {
    if (previousExpandable !== null) {
        startDisabling();
        const duration = getDuration(previousExpandable);
        setTimeout(endDisabling, duration);
    }
}
const startDisabling = () => {
    getButton(previousExpandable).setAttribute("aria-expanded", "false");
    getArrow(previousExpandable).setAttribute("aria-hidden", "true");
    getCaret(previousExpandable).style.height = "0px";
    getCaret(previousExpandable).classList.add(OVERFLOW_CLASSNAME);
    getContent(previousExpandable).classList.add(CONTENT_CLASSNAME);
}
const endDisabling = () => {
    getContent(previousExpandable).classList.add(HIDE_CLASSNAME);
}

const getDuration = (element) => {
    const styles = getComputedStyle(getCaret(element));
    const durationSeconds = styles.transitionDuration.replace("s", "");
    return parseFloat(durationSeconds) * 1000;
}

for(let i = 0; i < expandableList.length; i++){
    expandableList[i].addEventListener("click", expandableClicked);
}