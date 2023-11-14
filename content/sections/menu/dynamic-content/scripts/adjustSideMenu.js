import URLParser from "../../../../../global/scripts/URLParser.js";
import ElementsCreatorMenuWrapper from "../../../../../global/scripts/ElementsCreatorMenuWrapper.js";

const jsonURL = "dynamic-content/menu-list.json";
const sectionCallback = (...args) => adjustSection(...args);
const sectionDTO = {
    "templateURL": "dynamic-content/templates/side-section-template.txt",
    "parentId": "side-menu",
    "adjustCallback": sectionCallback
}
const itemCallback = (...args) => adjustItem(...args);
const itemDTO = {
    "templateURL": "dynamic-content/templates/side-item-template.txt",
    "parentId": "side-menu-items",
    "adjustCallback": itemCallback
}

async function placeSideMenu() {
    const elementsCreator = new ElementsCreatorMenuWrapper(jsonURL, sectionDTO, itemDTO);
    return await elementsCreator.displayElements();
}

const adjustSection = (section, json) => {
    const title = URLParser.getElementByID(section, "side-section-title");
    title.innerHTML = json.title;
}

const adjustItem = (item, json) => {
    adjustLink(item, json);
}

const adjustLink = (element, json) => {
    const text = URLParser.getElementByID(element, "side-item-name");
    text.innerHTML = json.name;
    text.setAttribute("href", json.link);
}

export default placeSideMenu;