requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout.debug',
        'jquery': '../bower_components/jquery/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'modernizr': '../bower_components/modernizr/modernizr',
        'zxcvbn': '../bower_components/zxcvbn/zxcvbn-async',
        'validator': '../bower_components/validator-js/validator'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        modernizr: {
            exports: 'Modernizr'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "FlipEuro";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});

// database
// using Date.now() as an identifier
appDb = {
    accounts: [{
        id: 1404151752300,
        firstName: "Matthew",
        lastName: "Xerri",
        dob: 1987-08-30,
        balance: {
            currency: '$',
            amount: 25.50
        },
        email: "matt.xerri@gmail.com",
        password: "test123", //passwords need to be encrypted (bcrypt) when moved to the server
        creditCards:[
            {id: 1404151752363, cardNumber: "4716839212897076", nameOnCard: "Matthew Xerri", expirationDate: "2016-09"},
            {id: 1404151762236, cardNumber: "4506106136972912", nameOnCard: "Matthew Xerri", expirationDate: "2016-09"}
        ],
        activated: true // active or disabled account
    }],
    coins:[
        {denomination: "$", currency: "USD", name: "United States Dollars"},
        {denomination: "£", currency: "GBP", name: "Euro"}
    ],
    // side: 0 = heads, 1 = tails
    bets:[
        {id: 1404151777910, accountId: 0, amount: 2.20, coin: '$', selectedSide: 0, result: 0}
    ]
};