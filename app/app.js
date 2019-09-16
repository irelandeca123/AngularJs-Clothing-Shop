var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

$locationProvider.html5Mode(true);

  $routeProvider
  .when('/home',{
    templateUrl:  'views/home.html',
    controller: 'Controller'
  })
  .when('/contact',{
    templateUrl:  'views/contact.html',
    controller: 'ContactController'
  })
  .when('/contact-success',{
    templateUrl:  'views/contact-success.html',
    controller: 'ContactController'
  })
  .when('/directory',{
    templateUrl: 'views/directory.html',
    controller: 'Controller'
  }).otherwise({
    redirectTo: '/home'
  });

}]);

myApp.directive('randomItem', [function(){

  return {
      restrict: 'E',
      scope: {
        items: '=',
        title: '='
      },
      templateUrl: 'views/random.html',
      transclude: true,
      replace: true,
      controller: function($scope){
        $scope.random = Math.floor(Math.random() * 4);
      }
  };

}]);

myApp.controller('Controller', ['$scope', '$http', function($scope, $http){

$scope.removeItem = function(item){
  var removeItem = $scope.items.indexOf(item);
  $scope.items.splice(removeItem,1);
};

$scope.addItem = function(){
$scope.items.push({
  name: $scope.newitem.name,
  colour: $scope.newitem.colour,
  rate: parseInt($scope.newitem.rate),
  available: true
});

  $scope.newitem.name = "";
  $scope.newitem.colour = "";
  $scope.newitem.rate = "";

};

$scope.removeAll = function (){
  $scope.items = [];
};

$http.get('data/items.json').then(function(data){
  //console.log(data.data);
  $scope.items = data.data;
});

}]);

myApp.controller('ContactController', ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
    $location.path('/contact-success');
  }
}]);
