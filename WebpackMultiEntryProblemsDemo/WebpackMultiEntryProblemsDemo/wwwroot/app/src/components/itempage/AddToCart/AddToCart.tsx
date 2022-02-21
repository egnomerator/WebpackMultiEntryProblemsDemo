import * as React from "react";
import cartCount from "../../../shared/cartTracker/cartCount";
import { AddToCartProps } from "./props";
import { AddToCartState } from "./state";

export class AddToCart extends React.Component<AddToCartProps, AddToCartState> {
    constructor(props: AddToCartProps) {
        super(props)

        this.updateCartCount = this.updateCartCount.bind(this);
        this.state = {
            cartCount: 0
        };
    }

    componentDidUpdate() {
        const cartCountIncrementedEvent = this.props.pubSub.eventRegister.cartCountIncremented;
        this.props.pubSub.publish(cartCountIncrementedEvent);
    }

    updateCartCount() {
        cartCount.cartCounter.increment();
        const newCount = cartCount.cartCounter.get();
        this.setState({ cartCount: newCount });
    }

    render() {
        return <div>
            {
                this.props.items.length < 1
                    ? <div><span>no items</span></div>
                    : this.props.items.map((item, i) =>
                        <div key={ i }>
                            {item}{" "}
                            <button onClick={this.updateCartCount}>Add To Cart</button>
                        </div>)
            }
            <p></p>
            <div>Cart: {this.state.cartCount}</div>
        </div>
    }
}