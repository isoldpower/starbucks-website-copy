import PostsCreator from "./postsCreator.js";

const postsJsonURL = "promo-contents.json";
const postTemplateURL = "post-template.txt";

const adjustPostElement = (template, post) => {
    adjustWrapper(template, post);
    adjustImage(template, post);
    adjustText(template, post);

    return template;
};

const adjustWrapper = (template, post) => {
    const promo = template.querySelector("#post-wrapper");
    promo.classList += " " + post.backgroundColor;
    if(post.isReversed) promo.classList.add("reversed");
};

const adjustImage = (template, post) => {
    const image = template.querySelector("#post-image");
    image.setAttribute("src", post.image);
};

const adjustText = (template, post) => {
    const textWrapper = template.querySelector("#post-text");
    if(post.lightText) textWrapper.classList.add("white-text");
    if(post.isSmall) textWrapper.classList.add("small");

    const textHeader = textWrapper.querySelector("#post-header");
    textHeader.innerHTML = post.title;

    const textBody = textWrapper.querySelector("#post-body");
    textBody.innerHTML = post.text;

    const button = textWrapper.querySelector("#post-button");
    button.innerHTML = post.button;

    button.setAttribute("href", post.buttonLink);
};

export default async function placePosts() {
    const contentParser = new PostsCreator(postsJsonURL, postTemplateURL, adjustPostElement);
    return await contentParser.displayElements();
}