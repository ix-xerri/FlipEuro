define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        activate: function () {
            router.map([
                {"route":"","moduleId":"viewmodels/login","title":"Login"},
                {"route":"login","moduleId":"viewmodels/login","title":"Login","nav":true},
                {"route":"register","moduleId":"viewmodels/register","title":"Register","nav":true},
                {"route":"account","moduleId":"viewmodels/account","title":"Account","nav":true},
                {"route":"admin","moduleId":"viewmodels/admin","title":"Admin","nav":true},
                {"route":"play","moduleId":"viewmodels/play","title":"Play","nav":true},
                {"route":"register-analyst","moduleId":"viewmodels/register-analyst","title":"Register Security Analyst","nav":true},
                /*{durandal:routes}*/
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});