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
            var creditCards = this.creditCards();
            // validation
            if(!validateCreditCard(this.cardNumber())){
                alert('Please enter a valid credit card number.')
                return;
            };
            if(this.nameOnCard().length === 0) {
                alert('Please enter the name shown on the credit card.');
                return;
            };
            if(Date.parse(this.expirationDate()) < Date.now()){
                alert('Please enter a valid expiration date');
                return;
            }
            
            for(var item in this.creditCards()){
                for(var prop in this.creditCards()[item]) {
                    if(this.creditCards()[item].hasOwnProperty(prop)) {
                        if(this.creditCards()[item][prop] === this.cardNumber()) {
                            alert('found');
                            return;
                        }
                    }
                }
            }
            
            this.creditCards.push({
                id: Date.now(),
                cardNumber: this.cardNumber(),
                nameOnCard: this.nameOnCard(),
                expirationDate: this.expirationDate()
            });
            return;
        },

        // Lifecycle

        activate = function () {
        },

        deactivate = function () {
        };

    return {
        // Place your public properties here
        creditCards: ko.observableArray([
            {id: 0, cardNumber: "4716839212897076", nameOnCard: "Matthew Xerri", expirationDate: "2016-09"},
            {id: 1, cardNumber: "4506106136972912", nameOnCard: "Matthew Xerri", expirationDate: "2016-09"}
        ]),
        cardNumber: ko.observable(""),
        nameOnCard: ko.observable(""),
        expirationDate: ko.observable(""),
        
        addCreditCard: addCreditCard,
        
        activate: activate,
        deactivate: deactivate
    };
});
