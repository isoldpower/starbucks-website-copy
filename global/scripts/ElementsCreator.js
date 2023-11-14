class ElementsCreator {
    constructor(template) {
        this.template = template;
    }

    async displayElements(parent, amount) {
        const elements = [];
        for (let i = 0; i < amount; i++) {
            const currentElement = await this.showElement(parent);
            elements.push(currentElement);
        }

        return elements;
    }

    async showElement(parent) {
        const htmlElement = await this.createElement();
        parent.appendChild(htmlElement);
        return htmlElement;
    }

    async createElement() {
        return await this.createBasicElement();
    }

    async createBasicElement() {
        const contentBlockInner = document.createElement("div");
        contentBlockInner.classList.add(this.#getOuterClass());
        contentBlockInner.innerHTML = this.#cutOuterClass();

        return contentBlockInner;
    }

    #getOuterClass = () => {
        const begin = 'class="';
        const cutStart = this.template.substring(this.template.indexOf(begin) + begin.length);
        return cutStart.substring(0, cutStart.indexOf('"'));
    }

    #cutOuterClass = () => {
        const beginIndex = this.template.indexOf('\n');
        const endIndex = this.template.lastIndexOf('\n');
        return this.template.substring(beginIndex, endIndex);
    }
}

export default ElementsCreator;