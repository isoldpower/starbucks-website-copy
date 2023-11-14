import URLParser from "./URLParser.js";
import ElementsCreator from "./ElementsCreator.js";

class ElementsCreatorPromoWrapper {
    #jsonURL;
    #templateURL;
    #adjustCallback;

    constructor(jsonURL, templateURL, adjustCallback) {
        this.#jsonURL = jsonURL;
        this.#templateURL = templateURL;
        this.#adjustCallback = adjustCallback;
    }

    async displayElements(parentId) {
        const json = await URLParser.getJSON(this.#jsonURL);
        const elements = await this.#createElements(json, parentId);
        return this.#adjustElements(elements, json);
    }

    async #createElements(json, parentId){
        const template = await URLParser.getText(this.#templateURL);
        const sectionsCreator = new ElementsCreator(template);
        const parent = document.getElementById(parentId);
        return await sectionsCreator.displayElements(parent, json.length);
    }

    #adjustElements = (elements, json) => {
        for(let i = 0; i < elements.length; i++){
            this.#adjustCallback(elements[i], json[i]);
        }
    }
}

export default ElementsCreatorPromoWrapper;