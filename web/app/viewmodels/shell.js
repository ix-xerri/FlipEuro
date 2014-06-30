define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        activate: function () {
            router.map([
                {"route":"","moduleId":"viewmodels/login","title":"Login","nav":true},
                {"route":"login","moduleId":"viewmodels/login","title":"Login","nav":true},
                {"route":"register","moduleId":"viewmodels/register","title":"Register","nav":true},
                {"route":"account","moduleId":"viewmodels/account","title":"Account","nav":false},
                {"route":"admin","moduleId":"viewmodels/admin","title":"Admin","nav":true},
                {"route":"play","moduleId":"viewmodels/play","title":"Play","nav":true},
                /*{durandal:routes}*/
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});