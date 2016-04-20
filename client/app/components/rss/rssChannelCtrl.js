/**
* rssApp Module
*
* Description
*/
angular.module('rssApp')
	.controller('rssChannelCtrl', function ($scope, $routeParams, $routeSegment, FeedList, FeedLoad) {
		$scope.$routeSegment = $routeSegment;
		
        var feed = FeedList.getById($routeParams.id || FeedList.getMinId())

        FeedLoad.fetch({q: feed.url, num: 50}, {}, function (data) {
            $scope.feed = data.responseData.feed;
            $scope.feed.id = feed.id;
        });
    });