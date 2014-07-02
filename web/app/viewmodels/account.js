define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers
    
        validateCreditCard = function(value){
            // accept only digits, dashes or spaces
	       if (/[^0-9-\s]+/.test(value)) return false;
 
	       // The Luhn Algorithm. Source: https://gist.github.com/DiegoSalazar/4075533
	       var nCheck = 0, nDigit = 0, bEven = false;
	       value = value.replace(/\D/g, "");
 
	       for (var n = value.length - 1; n >= 0; n--) {
		      var cDigit = value.charAt(n),
			      nDigit = parseInt(cDigit, 10);
 
		      if (bEven) {
			     if ((nDigit *= 2) > 9) nDigit -= 9;
		      }
 
		      nCheck += nDigit;
		      bEven = !bEven;
	       }
 
	       return (nCheck % 10) == 0;
        },
        
        addCreditCard = function(){
            var creditCards = this.creditCards(),
                creditCard = {
                    id: Date.now(),
                    cardNumber: this.cardNumber(),
                    nameOnCard: this.nameOnCard(),
                    expirationDate: this.expirationDate()
                };
            
            // validation
            if(!validateCreditCard(this.cardNumber())){
                app.showMessage('Please enter a valid credit card number.')
                return;
            };
            
            if(this.nameOnCard().length === 0) {
                app.showMessage('Please enter the name shown on the credit card.');
                return;
            };
            
            if(parseDate(this.expirationDate()).getTime() < Date.now()){
                app.showMessage('Please enter a valid expiration date');
                return;
            }
            
            for(var item in this.creditCards()){
                for(var prop in this.creditCards()[item]) {
                    if(this.creditCards()[item].hasOwnProperty(prop)) {
                        if(this.creditCards()[item][prop] === this.cardNumber()) {
                            app.showMessage('Credit card already exists');
                            return;
                        }
                    }
                }
            }
            
            this.creditCards.push(creditCard);
            
            //todo: needs to be saved to the database but not necessary here since items are saved in memeory
            
            return;
        },
        
        deposit = function(){
            var accountId = session.accountId,
                selectedCreditCard = appDb.accounts[accountId]['creditCards'][this.depositFromCard()];
            
            if(!this.depositFromCard()){
                app.showMessage('Please add/select a credit card.');
                return;
            }
            
//            $.post("/api/creditcard/" + depositFromCard() + "/validate/", selectedCreditCard, function(response) {
                appDb.accounts[accountId].balance.amount = parseFloat(this.currentAmount()) + parseFloat(this.depositAmount());
//            }
        },
        
        parseDate = function(date) {
            var parts = date.split('-');
            return new Date(parts[0], parts[1]-1, parts[2]);
        },
        
        activate = function(){
            if(typeof session.account !== 'object'){
                router.navigate('login');
                return;
            }
            
            this.creditCards(session.account['creditCards']);
            this.currentCurrency(session.account.balance.currency);
            this.currentAmount(session.account.balance.amount)
        }

    return {
        // Place your public properties here
        creditCards: ko.observableArray(),
        
        // add card
        cardNumber: ko.observable(),
        nameOnCard: ko.observable(),
        expirationDate: ko.observable(),
        
        addCreditCard: addCreditCard,
        
        // deposit
        depositFromCard: ko.observable(),
        depositAmount: ko.observable(),
        currentCurrency: ko.observable(),
        currentAmount: ko.observable(),
        
        deposit: deposit,
        
        activate: activate
    };
});
