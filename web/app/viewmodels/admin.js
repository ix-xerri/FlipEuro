define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers
        addCoin = function(){
            var newCoin = {currency: this.currency(), denomination: this.symbol(), name: this.name()};
            
            this.coins.push(newCoin);
            
            app.showMessage("A new coin has been added");
        },

        // Lifecycle

        activate = function(){
            if(typeof session.account !== 'object'){
                router.navigate('login');
                return;
            }
        
            this.coins(appDb.coins);
        };

    return {
        // Place your public properties here
        currency: ko.observable(""),
        symbol: ko.observable(""),
        name: ko.observable(""),
        
        coins: ko.observableArray(),
        
        addCoin: addCoin,
        
        activate: activate
    };
});
