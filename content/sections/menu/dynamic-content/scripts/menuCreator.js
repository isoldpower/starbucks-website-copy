import placeMainMenu from "./adjustMainMenu.js";
import placeSideMenu from "./adjustSideMenu.js";

async function asyncCall(){
    await placeSideMenu();
    await placeMainMenu();
}

asyncCall();