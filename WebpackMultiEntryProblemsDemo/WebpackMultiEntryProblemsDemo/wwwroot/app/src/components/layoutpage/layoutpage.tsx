import * as React from "react";
import * as ReactDOM from "react-dom";
import { CartCountDisplay } from "./cartCountDisplay/cartCountDisplay";

function renderCartCountDisplay(container: Element, pubSub: any) {
    ReactDOM.render(
        <CartCountDisplay pubSub={pubSub} />,
        container
    )
}

const Components = {
    renderCartCountDisplay: function (container: Element, pubSub: any) { renderCartCountDisplay(container, pubSub);}
}

export default Components;