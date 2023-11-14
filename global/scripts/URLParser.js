class URLParser{
    static async getJSON(url) {
        const response = await fetch(url);
        return await response.json();
    };

    static async getText(url){
        const response = await fetch(url);
        return await response.text();
    };

    static getElementByID(element, id){
        return element.querySelector("#" + id);
    }
}

export default URLParser;