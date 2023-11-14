import URLParser from "../../../global/scripts/URLParser.js";
import ElementsCreatorPromoWrapper from "../../../global/scripts/ElementsCreatorPromoWrapper.js";

const postsJsonURL = "dynamic-content/promo-contents.json";
const postTemplateURL = "dynamic-content/templates/post-template.txt";
const postsParentId = "posts-parent";

async function placePosts(){
    const elementsCreator = new ElementsCreatorPromoWrapper(postsJsonURL, postTemplateURL, adjustPostElement);
    return await elementsCreator.displayElements(postsParentId);
}

const adjustPostElement = (element, post) => {
    adjustWrapper(element, post);
    adjustImage(element, post);
    adjustText(element, post);

    return element;
};

const adjustWrapper = (element, post) => {
    const promo = URLParser.getElementByID(element, "post-wrapper");
    promo.classList.add(post.backgroundColor);
    if(post.isReversed) promo.classList.add("reversed");
};

const adjustImage = (element, post) => {
    const image = URLParser.getElementByID(element, "post-image");
    image.setAttribute("src", post.image);
};

const adjustText = (element, post) => {
    const textWrapper = URLParser.getElementByID(element, "post-text");
    if(post.lightText) textWrapper.classList.add("white-text");
    if(post.isSmall) textWrapper.classList.add("small");

    const textHeader = URLParser.getElementByID(textWrapper, "post-header");
    textHeader.innerHTML = post.title;

    const textBody = URLParser.getElementByID(textWrapper, "post-body");
    textBody.innerHTML = post.text;

    const button = URLParser.getElementByID(textWrapper, "post-button");
    button.innerHTML = post.button;

    button.setAttribute("href", post.buttonLink);
};

export default placePosts;