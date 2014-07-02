define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers
        placeBet = function(){
            if(this.bet() <= 0){
                app.showMessage('You have placed an invalid bet');
                return;
            }
            
            // check if there are enough finds
            if(session.account.balance.amount < this.bet()){
                app.showMessage('You do not have enough funds in your account');
                return;
            }
            
            var coinFlip = Math.floor((Math.random() * 2) + 1);
            
            $('div.coin').addClass('flip-animation'); // todo: the animation is only loading once
//            $('div.coin').removeClass('flip-animation');
            
            if(coinFlip === this.selectedSide()){
                app.showMessage("You Won!");
                session.account.balance.amount += (this.bet() * 2);
            }else{
                app.showMessage("Bad Luck. Try Again!");
                session.account.balance.amount -= this.bet()
            }
            
            appDb.bets.push({
                id: Date.now(),
                coin: this.selectedCoin(),
                amount: this.bet(),
                selectedSide: this.selectedSide(),
                result: coinFlip
            });
        },

        // Lifecycle

        activate = function(){
            if(typeof session.account !== 'object'){
                router.navigate('login');
                return;
            }
        };

    return {
        // Place your public properties here
        coins: ko.observableArray(appDb.coins),
        selectedCoin: ko.observable("$"),
        selectedSide: ko.observable(),
        bet: ko.observable(),
        
        placeBet: placeBet,
        
        activate: activate
    };
});
