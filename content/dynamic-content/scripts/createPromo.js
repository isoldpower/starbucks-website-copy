import placePosts from "./adjustPosts.js";
import placeUnderscores from "./adjustUnderscores.js";

async function asyncCall(){
    await placePosts();
    await placeUnderscores();
}

asyncCall();