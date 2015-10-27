var sharecycle0_angularfire = angular.module("sharecycle0_angularfire", ["firebase"]);

sharecycle0_angularfire.service("baseHttp", function($http, $q){

  this.getFire = function(){
    var deferred = $q.defer();

    $http({
      method: 'GET',
      url: "https://boiling-inferno-5502.firebaseio.com/Cat"
    }).then(function(response){
      deferred.resolve(response);
    },function(response){
      deferred.reject(resposne);
    });

    return deferred.promise;
  };
});

sharecycle0_angularfire.controller("angularfirecontroller", function($scope, $firebaseObject, $firebaseArray, baseHttp, $window){

  // var dataRef = new Firebase('https://boiling-inferno-5502.firebaseio.com');
  //
  // var syncObject = $firebaseObject(dataRef);
  //
  // syncObject.$bindTo($scope, "data");

  var dataRefMessages = new Firebase('https://boiling-inferno-5502.firebaseio.com/messages');

  //var firebaseArray = $firebaseArray(dataRefMessages);

  // firebaseArray.$add({
  //   user: "Becky",
  //   password: "lee"
  // });

  $scope.messages = $firebaseArray(dataRefMessages);

  $scope.fireClick = function(){

      baseHttp.getFire()
      .then(
          function(response)
          {
              $("<div/>").text(response.data).appendTo($("#successData"));
          },
          function(response)
          {
              $window.alert("error: "+response.data);
          }
      );

  };

});
