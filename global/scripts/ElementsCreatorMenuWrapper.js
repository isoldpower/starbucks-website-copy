import URLParser from "./URLParser.js";
import ElementsCreator from "./ElementsCreator.js";


class ElementsCreatorMenuWrapper{
    #jsonURL;
    #sectionDTO;
    #itemDTO

    constructor(jsonURL, sectionDTO, itemDTO) {
        this.#jsonURL = jsonURL;
        this.#sectionDTO = sectionDTO;
        this.#itemDTO = itemDTO;
    }

    async displayElements() {
        const json = await URLParser.getJSON(this.#jsonURL);
        const sections = await this.#createElements(json, this.#sectionDTO.parentId);
        return await this.#adjustSections(sections, json);
    }

    async #createElements(json, parentId){
        const template = await URLParser.getText(this.#sectionDTO.templateURL);
        const sectionsCreator = new ElementsCreator(template);
        const parent = document.getElementById(parentId);
        return await sectionsCreator.displayElements(parent, json.length);
    }

    async #adjustSections(sections, json){
        for(let i = 0; i < sections.length; i++){
            this.#sectionDTO.adjustCallback(sections[i], json[i]);
            await this.#setSectionItems(sections[i], json[i]);
        }
    }

    async #setSectionItems(section, json) {
        const itemsJSON = json.items;
        const itemElements = await this.#placeItems(section, itemsJSON);
        return this.#adjustItems(itemElements, itemsJSON);
    }

    async #placeItems(section, items){
        const template = await URLParser.getText(this.#itemDTO.templateURL);
        const itemsCreator = new ElementsCreator(template);

        const parent = URLParser.getElementByID(section, this.#itemDTO.parentId);
        return await itemsCreator.displayElements(parent, items.length);
    }

    #adjustItems = (items, json) => {
        for(let i = 0; i < items.length; i++){
            this.#itemDTO.adjustCallback(items[i], json[i]);
        }
    }
}

export default ElementsCreatorMenuWrapper;