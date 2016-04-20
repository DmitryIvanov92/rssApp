/**
* rssApp Module
*
* Description
*/
angular.module('rssApp')
	.controller('mainCtrl', function($scope, $routeSegment, loader) {

	$scope.$routeSegment = $routeSegment;
	$scope.loader = loader;

	$scope.$on('routeSegmentChange', function() {
		loader.show = false;
	})
});