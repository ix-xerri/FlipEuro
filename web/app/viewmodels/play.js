define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers
        placeBet = function(){
            var coinFlip = Math.floor((Math.random() * 2) + 1);
            
            $('div.coin').addClass('flip-animation'); // todo: the animation is only loading once
//            $('div.coin').removeClass('flip-animation');
            
            if(coinFlip === this.selectedSide()){
                app.showMessage("You Won!");
            }else{
                app.showMessage("Bad Luck. Try Again!");
            }
            
            appDb.bets.push({
                id: Date.now(),
                coin: this.selectedCoin(),
                amount: this.bet(),
                selectedSide: this.selectedSide(),
                result: coinFlip
            });
            
            console.log(appDb.bets);
        },

        // Lifecycle

        activate = function () {
        },

        deactivate = function () {
        };

    return {
        // Place your public properties here
        coins: ko.observableArray(appDb.coins),
        selectedCoin: ko.observable("$"),
        selectedSide: ko.observable(),
        bet: ko.observable(),
        
        placeBet: placeBet
    };
});
