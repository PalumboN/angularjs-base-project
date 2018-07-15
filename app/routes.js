app.config(($stateProvider, $urlRouterProvider) => {
  const partials = "app/partials/"

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: partials + "home.html"
    })
    // .state('company', {
    //   url: "/company",
    //   templateUrl: partials + "company.html",
    //   controller: "CompanyCtrl as ctrl"
    // })

  $urlRouterProvider.otherwise("/")
})

