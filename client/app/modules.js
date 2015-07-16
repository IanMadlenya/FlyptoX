/* exported FlyptoX */
var FlyptoX = angular.module('FlyptoX', ['angular-chartist']);

FlyptoX.controller('orderbookCtrl', ['$scope', function($scope) {
	$scope.data = {
  		orderSize: 10,
  		price: 50,
  		filled: "yes"
  	};

  	/*jshint multistr: true */
  	var holdData = JSON.parse('{"sequence":151031658,"bids":[["294.16","0.25",1], \
  		["294.14","0.06775937",1],["294.13","0.07391931",1], \
  		["294.03","0.08623626",1],["294.02","0.108",1],["293.99","0.1108752",1],["293.98","0.544",1], \
  		["293.85","1",1],["293.84","5.78809904",1],["293.83","0.16017484",1], \
  		["293.82","1.108",2],["293.81","0.53396365",1],["293.8","0.02",2],["293.79","0.551",1], \
  		["293.78","0.523",2],["293.77","4.74",1],["293.76","1.89413893",1],["293.75","0.77774397",2], \
  		["293.71","0.01",1],["293.7","0.129",1],["293.69","0.523",2], \
  		["293.67","0.01",1],["293.65","0.01",1],["293.64" \
  		,"0.548",1],["293.63","0.561",1],["293.62","0.01",1],["293.61","0.01",1], \
  		["293.59","0.01",1],["293.58","0.01",1],["293.57","0.576",2],["293.56","0.02",2], \
  		["293.55","0.01",1],["293.53","1.6943",2],["293.52","0.567",1],["293.51","0.01",1], \
  		["293.49","0.593",1],["293.48","0.01",1],["293.47","0.02",2], \
  		["293.46","0.035",2],["293.45","3.07848426",1],["293.44","0.01",1],["293.43","0.01",1], \
  		["293.42","0.01",1],["293.39","3.35165",1],["293.38","0.02",2],["293.36","0.02",2], \
  		["293.35","0.03",3],["293.33","0.01",1],["293.32","5.80298089",2],["293.31","0.45067201",2]], \
  		"asks":[["294.17","4",1],["294.18","5.4107",1], \
  		["294.19","6.06996",3],["294.21","0.06377891",1],["294.22","2.12057699",2], \
  		["294.24","0.08117316",1],["294.25","2.043",1],["294.26","0.10436549",1], \
  		["294.27","0.01",1],["294.28","2.028",1],["294.3","0.01",1],["294.31","1.946",1], \
  		["294.32","0.01",1],["294.34","1.86851947",3],["294.35","6.591",1], \
  		["294.36","0.01",1],["294.37","1.9",1],["294.39","0.01",1],["294.4","2.039",1], \
  		["294.42","0.01",1],["294.43","2.05",1],["294.44","0.02",2],["294.45","0.44620962",2], \
  		["294.46","0.01",1],["294.47","0.02",2],["294.48","3.86228181",2],["294.49","0.01",1], \
  		["294.5","0.01",1],["294.51","0.01",1],["294.52","6.846",1], \
  		["294.53","0.02",2],["294.57","0.03",3],["294.6","0.03",3],["294.61","0.1863",3], \
  		["294.62","0.0567",5],["294.63","0.01",1],["294.64","0.01",1],["294.66","0.02",2],["294.67","0.01",1] \
  		,["294.68","0.02",2],["294.69","6.975",4],["294.7","0.05",5],["294.71","0.02",2], \
  		["294.72","0.02",2],["294.73","0.03",3],["294.74","0.91",2], \
  		["294.75","11.1859",1],["294.76","10.2159",1],["294.78","0.01",1],["294.8","0.04",4]]}');
  	$scope.testData = holdData;
  	console.log(holdData);
  	console.log($scope.testData);
}]);

FlyptoX.controller('executionCtrl', ['$scope', 
  '$interval', function($scope, $interval, AccountsService){
    // hold order data
    $scope.order = {};
    
    $scope.wallets = [];    
    $scope.ordersList = [];

    $scope.cancel = function(id){
      console.log('canceling order: ', id);
      AccountsService.cancel(id, function(result){
        console.log(result); 
      });
    };
      
    $scope.buy = function(){
      AccountsService.buy($scope.order.price, $scope.order.size);
    };
    
    $scope.sell = function(){
      AccountsService.sell($scope.order.price, $scope.order.size);
    };

  }]);


FlyptoX.controller('chartCtrl', ['$scope', '$interval', '$timeout', 
  function($scope, $interval, $timeout){

    this.barData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
        [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
      ]
    };

    this.barOptions = {
      seriesBarDistance: 15
    };

    this.barResponsiveOptions = [
      ['screen and (min-width: 641px) and (max-width: 1024px)', {
        seriesBarDistance: 10,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value;
          }
        }
      }],
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }]
    ];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function pushLimit(arr, elem, limit) {
      arr.push(elem);
      if (arr.length > limit) {
        arr.splice(0, 1);
      }
    }

    var barUpdatePromise = $interval(function() {
      var time = new Date();

      pushLimit(this.barData.labels, [
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      ].join(':'), 12);

      this.barData.series.forEach(function(series) {
        pushLimit(series, getRandomInt(0, 10), 12);
      });
    }.bind(this), 1000);

    $scope.$on('$destroy', function() {
      $interval.cancel(barUpdatePromise);
    });


}]);

