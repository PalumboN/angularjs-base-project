class LoginCtrl {
  constructor($window, $http) {
    this.window = $window
    this.http = $http
    this.credentials = {}
  }

  login() {
    return this.http
    .post("/login", {}, {headers: {Authorization: `Basic aG9sYTpjaGF1`}})
  }
}
angular.module('appLogin', []).controller("LoginCtrl", LoginCtrl)
