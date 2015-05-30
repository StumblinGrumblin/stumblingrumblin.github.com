var app = angular.module('historyWalk', ['ui.bootstrap', 'ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url:'/',
        templateUrl: '_home.html',
        controller: 'MainCtrl'
      })
      .state('walks', {
        url: '/walks/{id}',
        templateUrl: '_walks.html',
        controller: 'WalksCtrl'
      })
      .state('mediaSelect', {
        url: "/mediaSelect",
        templateUrl: '_mediaSelect.html',
        controller: 'MediaCtrl'
      });
}]);

app.factory('walks', [function () {
  var o = {
    walks: [
      {title: "Gary's House", walk: [
        {location: 'Computer Room', text: 'This is where Gary Hacks on things.'},
        {location: 'Bedroom', text: 'This is where Gary sleeps.'},
        {location: 'Living Room', text: 'This is where Gary kicks it with Pippa and peeps.'},
        {location: 'Kitchen', text: 'This is where Gary cooks up stuff.'},
        {location: 'Backyard', text: 'This is where Gary throws balls for his puggle overlord.'}
      ]},
      {title: "Park Blvd", walk: [
        {location: 'Twiggs Coffee', text: 'Latte, latte.'},
        {location: 'Parks & Rec', text: 'Swanky, swanky.'},
        {location: 'Small Bar', text: 'Drinky, drinky.'},
        {location: 'Plumeria', text: 'Veggie, veggie.'},
        {location: 'Lancers', text: 'Divey, divey.'}
      ]},
      {title: "Your Mom's House", walk: [
        {location: 'Twiggs Coffee', text: 'Latte, latte.'},
        {location: 'Parks & Rec', text: 'Swanky, swanky.'},
        {location: 'Small Bar', text: 'Drinky, drinky.'},
        {location: 'Plumeria', text: 'Veggie, veggie.'},
        {location: 'Lancers', text: 'Divey, divey.'}
      ]}
    ]
  };
  return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'walks',
  '$stateParams',
  function ($scope, walks, $stateParams) {
    $scope.walks = walks.walks;
    $scope.walk = walks.walks[$stateParams.id];
  }
]);

app.controller('WalksCtrl', [
  '$scope',
  '$stateParams',
  'walks',
  function ($scope, $stateParams, walks) {
    $scope.walk = walks.walks[$stateParams.id];
    var self = this;
    self.selection = '';
    self.updateSelection = function(num) {
      self.selection += num;
    };
    self.reqMedia = function() {
      var item = parseInt(self.selection),
          walkLength = $scope.walk.walk.length;
      if (parseInt(self.selection) >= walkLength) {
        self.error = "Please make a selection less than " + walkLength;
        self.selection = '';
        self.selected = '';
      } else {
        self.error = '';
        self.selected = $scope.walk.walk[item];
        self.selection = '';
      }

    };
}]);
app.controller('MediaCtrl', [
  '$scope',
  '$stateParams',
  'walks',
  function ($scope, $stateParams, walks) {

}]);
