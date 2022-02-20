import * as React from "react";
import * as ReactDOM from "react-dom";
import { Ball } from "../inventory/ball/ball";
import { Hat } from "../inventory/hat/hat";
import { AddToCart } from "./AddToCart/AddToCart";

function renderAddToCart(container: Element, pubSub: any) {
    ReactDOM.render(
        <AddToCart items={[<Ball />, <Hat />]} pubSub={pubSub} />,
        container
    )
}

const Components = {
    renderAddToCart: function (container: Element, pubSub: any) { renderAddToCart(container, pubSub);}
}

export default Components;