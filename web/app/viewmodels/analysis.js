define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers

        // Lifecycle

        activate = function () {
            var flips = appDb.bets,
                analysis = {},
                koObservable = [],
                currentCurrency;
            
            // count the occurrance of coins
            for(var item in flips){
                currentCurrency = flips[item]['coin'];
                
                if(analysis[currentCurrency]){
                    analysis[currentCurrency]++;
                }else{
                    analysis[currentCurrency] = 1;   
                }
            }
            
            for(var item in analysis){
                koObservable.push({
                    currency: item,
                    occurrence: analysis[item]
                })
            }
            
            this.coinAnalysis(koObservable);
        },

        deactivate = function () {
        };

    return {
        // Place your public properties here
        coinAnalysis: ko.observable(),
        
        activate: activate,
        deactivate: deactivate
    };
});
