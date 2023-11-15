import switchScroll from "./blockScroll.js";
import animateIcon from "./animateIcon.js";

const maskElement = document.getElementById("hamburger-menu-mask");
const menuElement = document.getElementById("hamburger-menu");
const iconElement = document.getElementById("hamburger-icon");

function switchHamburgerMenu(){
    scrollTop();
    const isOpening = menuElement.getAttribute("aria-disabled") === "true";
    switchScroll(!isOpening);
    setAttributes(isOpening);
    animateIcon(isOpening);
}

const scrollTop = () => {
    window.scrollTo(0, 0);
}

const setAttributes = (isMenuActive) => {
    switchAttribute(menuElement, "aria-disabled", isMenuActive);
    switchAttribute(maskElement, "aria-disabled", isMenuActive);
    switchAttribute(iconElement, "aria-hidden", isMenuActive);
}

const switchAttribute = (element, attribute, value) => {
    element.setAttribute(attribute, (!value).toString());
}

const headerHamburger = document.getElementById("header-hamburger");
headerHamburger.addEventListener("click", switchHamburgerMenu);