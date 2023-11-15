import URLParser from "../../../scripts/URLParser.js";

const hamburgerIcon = document.getElementById("hamburger-icon");
const upperLine = URLParser.getElementByID(hamburgerIcon, "upper-line");
const middleLine = URLParser.getElementByID(hamburgerIcon, "middle-line");
const bottomLine = URLParser.getElementByID(hamburgerIcon, "bottom-line");

let isCrossed;

function animateIcon(isActivated){
    isCrossed = isActivated;
    switchLine(upperLine);
    switchLine(middleLine);
    switchLine(bottomLine);

    setTimeout(finalizeAnimation, 200);
}

const switchLine = (line) => {
    line.classList.replace("OPENED", "TRANSITION");
    line.classList.replace("CLOSED", "TRANSITION");
}

const finalizeAnimation = () => {
    finalizeLine(upperLine);
    finalizeLine(middleLine);
    finalizeLine(bottomLine);
}

const finalizeLine = (line) => {
    if(isCrossed) line.classList.replace("TRANSITION", "OPENED");
    else line.classList.replace("TRANSITION", "CLOSED");
}

export default animateIcon;