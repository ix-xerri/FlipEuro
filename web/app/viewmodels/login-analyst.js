define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router", "validator"], function ($, ko, app, system, router, validator) {
    var
        // Properties

        // Handlers
        
        login = function(){
            var fields = {
                email: this.email(),
                password: this.password(),
                rememberMe: this.rememberMe(),
                expired: false // this would usually be a default value when adding the object to db
            }
            
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
            
            // nested loop is only temporary since otherwise a database would be used.
            for(var item in appDb.accounts){
                for(var prop in appDb.accounts[item]) {
                    if(appDb.accounts[item]['email'] === fields.email) {
                        if(appDb.accounts[item]['analyst'] === false){
                            app.showMessage('Incorrect username or password');
                            return;
                        }
                        
                        if(appDb.accounts[item]['password'] === fields.password){
                            // a temp global object that stores the user's session. 
                            // NOT FOR PRODUCTION
                            session = {
                                id: Date.now(),
                                accountId: appDb.accounts[item]['id']
                            }
                            
                            // save the session to the database
                            appDb.sessions.push(session);
                            // navigate to the login screen
                            router.navigate('play');
                            return;
                        }
                    }
                }
            }
            
            app.showMessage('Incorrect username or password');
            return;
        },
    
        validateFields = function(fields){
            var errors =  {};
            
            errors.email = validator.isEmail(fields.email);
            errors.password = validator.isLength(fields.password, 9, 72);
            
            return errors;
        },
    
        // Lifecycle

        activate = function () {
            if(typeof session === 'object'){
                router.navigate('play');
                return;
            }
            
            // using above session check for now
            $.getJSON("/api/sessionl", function(data) { 
                // an api request here would be sent to the server to check if the user is already authnticated. 
                // for the purposes of this excercise a server is not available and a solutions with cookies was not
                // implemented as cookies should always have 'secure' and 'httpOnly' set to true
            });
        }

    return {
        // Place your public properties here
        email: ko.observable(),
        password: ko.observable(),
        rememberMe:ko.observable(),
            
        login: login,
        
        activate: activate
    };
});
