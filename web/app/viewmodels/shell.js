define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        activate: function () {
            router.map([
                {"route":"","moduleId":"viewmodels/login","title":"Login","nav":true},
                {"route":"login","moduleId":"viewmodels/login","title":"Login","nav":true},
                {"route":"register","moduleId":"viewmodels/register","title":"Register","nav":true},
                {"route":"account","moduleId":"viewmodels/account","title":"Account","nav":false},
                /*{durandal:routes}*/
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});