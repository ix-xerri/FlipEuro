define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers
        addCoin = function(){
            this.coins.push({currency: this.currency(), symbol: this.symbol()});
            app.showMessage("A new coin has been added");
        },

        // Lifecycle

        activate = function () {
        },

        deactivate = function () {
        };

    return {
        // Place your public properties here
        currency: ko.observable(""),
        symbol: ko.observable(""),
        coins: ko.observableArray([
            {currency: "USD", symbol: "$"},
        ]),
        
        addCoin: addCoin,
        
        activate: activate,
        deactivate: deactivate
    };
});
