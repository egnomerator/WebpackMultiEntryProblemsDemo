let cartCount = 0;

const cartCounter = {
    increment: function () { cartCount++; },
    get: function () { return cartCount; }
}

export default { cartCounter }
