define(["jquery", "knockout", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, app, system, router) {
    var
        // Properties

        // Handlers

        // Lifecycle

        activate = function () {
        },

        deactivate = function () {
        };

    return {
        // Place your public properties here
        firstName: ko.observable(),
        lastName: ko.observable(),
        dob: ko.observable(),
        initBalance: ko.observable(),
        email: ko.observable(),
        password: ko.observable(),
        confirmPassword: ko.observable(),
        
        activate: activate,
        deactivate: deactivate
    };
});
