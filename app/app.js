const app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router', 'pascalprecht.translate', 'ngStorage'])


app.config(($translateProvider) => {
  const {es, en, br} = lang
  $translateProvider
    .translations('es', es)
    .translations('en', en)
    .translations('br', br)
    .preferredLanguage('es')
    .useSanitizeValueStrategy('escape')
})

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])

app.filter("international", function ($translate) {
  return (obj, opt) => _.isEmpty(obj) ? opt : obj[$translate.proposedLanguage()] || obj[$translate.preferredLanguage()] || opt
})
