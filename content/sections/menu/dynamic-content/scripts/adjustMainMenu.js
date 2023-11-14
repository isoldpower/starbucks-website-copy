import URLParser from "../../../../../global/scripts/URLParser.js";
import ElementsCreatorMenuWrapper from "../../../../../global/scripts/ElementsCreatorMenuWrapper.js";

const jsonURL = "dynamic-content/menu-list.json";
const sectionCallback = (...args) => adjustSection(...args);
const sectionDTO = {
    "templateURL": "dynamic-content/templates/section-template.txt",
    "parentId": "menu-content",
    "adjustCallback": sectionCallback
}
const itemCallback = (...args) => adjustItem(...args);
const itemDTO = {
    "templateURL": "dynamic-content/templates/item-template.txt",
    "parentId": "menu-section-items",
    "adjustCallback": itemCallback
}

async function placeMainMenu() {
    const elementsCreator = new ElementsCreatorMenuWrapper(jsonURL, sectionDTO, itemDTO);
    return await elementsCreator.displayElements();
}

const adjustSection = (section, json) => {
    const element = URLParser.getElementByID(section, "menu-section-title");
    element.innerHTML = json.title;
}

const adjustItem = (element, json) => {
    adjustText(element, json);
    adjustImage(element, json);
    adjustLink(element, json);
}

const adjustText = (element, json) => {
    const text = URLParser.getElementByID(element, "menu-item-title");
    text.innerHTML = json.name;
}

const adjustImage = (element, json) => {
    const image = URLParser.getElementByID(element, "menu-item-image");
    image.setAttribute("src", json.image);
    image.setAttribute("alt", json.name);
}

const adjustLink = (element, json) => {
    const link = URLParser.getElementByID(element, "menu-item-link");
    link.setAttribute("href", json.link);
}

export default placeMainMenu;