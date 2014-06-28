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
        email: ko.observable(),
        password: ko.observable(),
        
        activate: activate,
        deactivate: deactivate
    };
});
