const cartElement = document.getElementById("footer-cart");
const cartTextElement = document.getElementById("cart-button-text");

function setCartAmount(amount){
    cartElement.setAttribute("data-count", amount.toString());
    cartTextElement.innerHTML = amount.toString();
}

setCartAmount(1);