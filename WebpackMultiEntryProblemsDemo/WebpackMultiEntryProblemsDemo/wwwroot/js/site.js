// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    var cartCountContainer = document.getElementById("cart-count-container");
    ClientAppLayout.Components.renderCartCountDisplay(cartCountContainer, pubSub);
});

var pubSub = (function () {
    var eventRegister = {
        cartCountIncremented: "CART_COUNT_INCREMENTED"
    };

    var messageBroker = {
        findEvent: function (eventName) {
            return this.events.filter(function (e) { return e.eventName === eventName })[0];
        },
        events: [
            {
                eventName: eventRegister.cartCountIncremented,
                eventHandlers: []
            },
            {
                eventName: eventRegister.devEditedByReact,
                eventHandlers: []
            }
        ],
        subscribe: function (eventName, handler) {
            var event = this.findEvent(eventName);

            var eventHandler = {
                id: generateUUID(),
                callBack: handler
            }
            event.eventHandlers.push(eventHandler);

            var unsubscriber = function () {
                event.eventHandlers = event.eventHandlers.filter(function (h) {
                    return h.id !== eventHandler.id;
                });
            }
            return unsubscriber;
        },
        publish: function (eventName, data) {
            var event = this.findEvent(eventName);
            event.eventHandlers.map(function (handler, i) { handler.callBack(data); });
        }
    };

    return {
        eventRegister: eventRegister,
        subscribe: function (eventName, subscriber) { return messageBroker.subscribe(eventName, subscriber); },
        publish: function (eventName, data) { messageBroker.publish(eventName, data); }
    }
})();

// ripped this function straight off of SO
// https://stackoverflow.com/a/8809472/9533368
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

