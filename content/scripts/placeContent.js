import placePosts from "./modules/adjustPosts.js";
import placeText from "./modules/adjustUnderscores.js";

async function asyncCall(){
    await placePosts();
    await placeText();
}

asyncCall();