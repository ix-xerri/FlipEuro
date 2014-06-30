define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers
        addUser = function(){
            appDb.accounts.push({
                firstName: this.firstName(),
                lastName: this.lastName(),
                dob: this.dob(),
                address1: this.address1(),
                address2: this.address2(),
                city: this.city(),
                state: this.state(),
                zip: this.state(),
                country: this.country(),
                initBalance: this.initBalance(),
                email: this.email(),
                password: this.password() // todo: once moved to server side, encryption must be added: bcrypt
            })
        }

    return {
        // Place your public properties here
        firstName: ko.observable(),
        lastName: ko.observable(),
        dob: ko.observable(),
        address1: ko.observable(),
        address2: ko.observable(),
        city: ko.observable(),
        state: ko.observable(),
        zip: ko.observable(),
        country: ko.observable(),
        initBalance: ko.observable(),
        email: ko.observable(),
        password: ko.observable(),
        confirmPassword: ko.observable(),
    };
});
