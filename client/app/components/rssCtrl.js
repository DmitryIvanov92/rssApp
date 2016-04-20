/**
* rssApp Module
*
* Description
*/
angular.module('rssApp')
	.controller('rssCtrl', function ($scope, $window, FeedList, $routeSegment) {
		$scope.$routeSegment = $routeSegment;

		$scope.feeds = FeedList.get();

		$scope.$on('FeedList', function (event, data) {
			$scope.feeds = data;
		});

		$scope.$watch(function(){
		    return $window.innerHeight;
		}, function(winHeight) {
		    $scope.scHeight = winHeight-40;
		});

	});