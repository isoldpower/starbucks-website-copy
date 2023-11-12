class PostsCreator {
    constructor(jsonURL, templateURL, adjustCallback) {
        this.jsonURL = jsonURL;
        this.templateURL = templateURL;
        this.adjustCallback = adjustCallback;
    }

    async displayElements() {
        const JSON = await this.getJSON(this.jsonURL);

        for (let i = 0; i < JSON.length; i++) {
            const current = JSON[i];
            await this.showElement(current);
        }
    }

    async getJSON(url) {
        const response = await fetch(url);
        return await response.json();
    }

    async showElement(jsonElement) {
        const parent = document.getElementById("posts-parent");
        const htmlElement = await this.createElement(jsonElement);
        parent.appendChild(htmlElement);
    }

    async createElement(jsonElement) {
        const template = await this.createBasicElement(this.templateURL);
        this.adjustCallback(template, jsonElement);
        return template;
    }

    async createBasicElement(url) {
        const contentBlockInner = document.createElement("div");
        contentBlockInner.className = "content-block__wrapper-margin";
        const response = await fetch(url);
        contentBlockInner.innerHTML = await response.text();

        return contentBlockInner;
    }
}

export default PostsCreator;