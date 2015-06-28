var app = angular.module('app', []);

app.controller('searchCtrl', function($scope, $http) {
		// Simple GET request example :
		$http.get('https://gist.githubusercontent.com/tony1223/098e45623c73274f7ae3/raw').
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.updated_at = data['lastmodify'];
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
		// Simple GET request example :
		$scope.handleSearch =  function() {
			if($scope.username == undefined || $scope.username.length < 2 || $scope.username.length > 4) {
				$scope.validate = true;
				return;
			} else {
				$scope.validate = false;
			}

			$scope.fuzzName = $scope.username.replace($scope.username[1], "○");
			$scope.sex = ($scope.sex == 0) ? '男' : '女';
			$http.get('https://gist.githubusercontent.com/tony1223/098e45623c73274f7ae3/raw').
			  success(function(data, status, headers, config) {
			    // this callback will be called asynchronously
			    // when the response is available
			    $scope.patients = data;
			    var data = data['data']
				var matchFound = false;

				for (var i = 0, len = data.length; i < len; i++)
				{
				    if(data[i]["姓名"] == $scope.fuzzName && data[i]["性別"] == $scope.sex) {
				    	$scope.match = true;
				    	$scope.patient = data[i];
				    	$scope.patientList = true;
				    	$scope.notFound = false;
				    	$scope.sex = 0;
				    	break;
				    }
				    if(i == len-1) {
				    	$scope.patientList = false;
				    	$scope.notFound = true;
				    	$scope.sex = 0;
				    }
				}  
			  }).
			  error(function(data, status, headers, config) {
				    	$scope.patientList = false;
				    	$scope.notFound = true;	
				    	$scope.sex = 0;
			  });
		}
});