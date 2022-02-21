import * as React from "react";
import cartCount from "../../../shared/cartTracker/cartCount";
import { CartCountDisplayProps } from "./props";
import { CartCountDisplayState } from "./state";

export class CartCountDisplay extends React.Component<CartCountDisplayProps, CartCountDisplayState> {
    constructor(props: CartCountDisplayProps) {
        super(props)

        this.getNewCartCount = this.getNewCartCount.bind(this);
        this.state = {
            count: 0
        }

        this.unsubscribers = [];
    }

    unsubscribers;

    componentDidMount() {
        const cartCountIncrementedEvent = this.props.pubSub.eventRegister.cartCountIncremented;
        const unsubscriber = this.props.pubSub.subscribe(cartCountIncrementedEvent, this.getNewCartCount);
        this.unsubscribers.push(unsubscriber);
    }

    componentWillUnmount() {
        this.unsubscribers.map((unsubscribe, i) => { unsubscribe(); });
    }

    getNewCartCount() {
        const newCount = cartCount.cartCounter.get();
        this.setState({ count: newCount });
    }

    render() {
        return <span>Cart: {this.state.count}</span>
    }
}