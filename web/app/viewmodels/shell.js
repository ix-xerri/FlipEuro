define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        activate: function () {
            router.map([
                {"route":"","moduleId":"viewmodels/login","title":"Login","nav":true},
                {"route":"register","moduleId":"viewmodels/register","title":"Register","nav":true},
                /*{durandal:routes}*/
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});