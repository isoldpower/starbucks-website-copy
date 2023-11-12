import PostsCreator from "./postsCreator.js";

const textJsonURL = "text-contents.json";
const textTemplateURL = "text-template.txt";

const adjustTextElement = (template, text) => {
    const textJson = text.text;
    for(let i = 0; i < textJson.length; i++){
        const currentJson = textJson[i];
        currentJson.isLink
            ? tryAddLink(template, currentJson)
            : tryAddParagraph(template, currentJson);
    }

    return template;
};

const tryAddParagraph = (template, jsonElement) => {
    if(jsonElement.isLink) {
        console.warn("Link element to non-link convert attempt");
        return tryAddLink(template, jsonElement);
    }

    return addParagraph(template, jsonElement);
};

const addParagraph = (template, jsonElement) => {
    const parent = template.querySelector("#text-wrapper");
    parent.innerHTML += "\n" + jsonElement.content;
};

const tryAddLink = (template, jsonElement) => {
    if(!jsonElement.isLink) {
        console.warn("Non-link element to link convert attempt");
        return tryAddParagraph(template, jsonElement);
    }

    return addLink(template, jsonElement);
};

const addLink = (template, jsonElement) => {
    const parent = template.querySelector("#text-wrapper");
    const linkElement = createLinkElement(parent);
    adjustLink(linkElement, jsonElement);
};

const createLinkElement = (parent) => {
    const linkElement = document.createElement("a");
    linkElement.classList.add("text-block__link")
    parent.appendChild(linkElement);

    return linkElement;
};

const adjustLink = (linkElement, jsonElement) => {
    linkElement.setAttribute("href", jsonElement.link);
    setText(linkElement, jsonElement);
};

const setText = (element, jsonElement) => {
    element.innerHTML = jsonElement.content;
    return element;
};

export default async function placeText () {
    const contentParser = new PostsCreator(textJsonURL, textTemplateURL, adjustTextElement);
    return contentParser.displayElements();
}
