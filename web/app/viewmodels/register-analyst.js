define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router", "validator"], function ($, ko, app, system, router, validator) {
    var
        // Properties

        // Handlers
        addUser = function(){
            var fields = {
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
                password: this.password(), // todo: once moved to server side, encryption must be added: bcrypt
                confirmPassword: this.confirmPassword(),
                analyst: true
            }
            
            // todo: password checks using zxcvbn should be carried out.
            
            // remove validation errors
            $('.has-error').removeClass('has-error');
            
            // validate fields
            var errors = validateFields(fields);
            
            for(var field in errors){
                if(!errors[field]){
                    $("#" + field).parent().addClass("has-error");
                    app.showMessage('Please make sure you enter accurate information.<br/>Error: ' + field);
                    return;
                }
            }
            
            // check if email already exists
            for(var item in appDb.accounts){
                if(appDb.accounts[item]['email'] === this.email()) {
                    app.showMessage('Email is already in use.'); // todo: this error should be avoided and just tell the user to check their mailbox. This avoids attackers gathering information on which accounts exits.
                    return;
                }
            }
            
            // check that passwords match
            if(errors.matchPassword === false){
                app.showMessage('Passwords Do Not Match');
                return;
            }
            
            delete(fields.confirmPassword);
            
            // save account
            appDb.accounts.push(fields);
            
            app.showMessage('Your account has been created. Please check your inbox (not implemented) and activated your account.');
            
            // navigate to the login screen
            router.navigate('login');
            
            return;
        },
        
        validateFields = function(fields){
            var errors =  {};
            
            errors.firstName = validator.isAlpha(fields.firstName);
            errors.lastName = validator.isAlpha(fields.lastName);
            errors.dob = parseDate(fields.dob).getTime() < Date.now();
            errors.address1 = !validator.isNull(fields.address1);
            errors.city = !validator.isNull(fields.city);
            errors.country = !validator.isNull(fields.country);
            errors.initBalance = validator.isFloat(fields.initBalance);
            errors.email = validator.isEmail(fields.email);
            errors.password = validator.isLength(fields.password, 9, 72);
            errors.confirmPassword = validator.isLength(fields.confirmPassword, 9, 72);
            errors.matchPassword = validator.equals(fields.password, fields.confirmPassword);
            
            return errors;
        },
    
        parseDate = function(input) {
            var parts = input.split('-');
            return new Date(parts[0], parts[1]-1, parts[2]);
        }

    return {
        // Place your public properties here
        firstName: ko.observable(),
        lastName: ko.observable(),
        dob: ko.observable(''),
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
        
        addUser: addUser
    };
});
