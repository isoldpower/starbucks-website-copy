import placePosts from "./posts.js";
import placeText from "./text.js";

async function asyncCall(){
    await placePosts();
    await placeText();
}

asyncCall();