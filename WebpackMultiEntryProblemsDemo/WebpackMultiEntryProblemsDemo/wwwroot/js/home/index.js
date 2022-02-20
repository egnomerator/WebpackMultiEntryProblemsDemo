$(document).ready(function () {
    var itemContainer = document.getElementById("item-container");
    ClientAppItem.Components.renderAddToCart(itemContainer, pubSub);
});
