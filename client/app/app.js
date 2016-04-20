(function() {
	'use strict';

var rssApp = angular.module('rssApp', ['rssApp.FeedList', 'rssApp.googleapis.feed', 'ngRoute', 'ngAnimate', 'ngSanitize', 'route-segment', 'view-segment', 'appTemplates']);

rssApp.config(function($routeSegmentProvider, $routeProvider) {

	$routeSegmentProvider.options.autoLoadcomponents = true;

	$routeSegmentProvider

		.when('/rss',          'rss')
		.when('/rss/settings', 'rss.settings')
		.when('/rss/settings/add', 'rss.settings.add')
		.when('/rss/settings/edit', 'rss.settings.edit')
		.when('/rss/:id',      'rss.channel')
		.when('/rss/:id/item',      'rss.channel.item')
		.when('/rss/:id/item/:hashKey',      'rss.channel.item')

		.when('/about',          'about')

		.segment('rss', {
			templateUrl: 'app/components/rss.html',
			controller: 'mainCtrl'})

			.within()
				.segment('channel', {
					'default': true,
					templateUrl: 'app/components/rss/channel.html',
					controller: 'rssChannelCtrl',
					dependencies: ['id']})

					.within()
						.segment('item', {
							templateUrl: 'app/components/rss/item/item.html',
							controller: 'rssItemCtrl',
							dependencies: ['hashKey']})
					.up()
				.segment('settings', {
					templateUrl: 'app/components/rss/settings.html'})

					.within()
						.segment('add', {
							'default': true,
							templateUrl: 'app/components/rss/settings/add.html',
							controller: 'rssManageCtrl'})
						.segment('edit', {
							templateUrl: 'app/components/rss/settings/edit.html',
							controller: 'rssManageCtrl'})
					.up()
			.up()
		.segment('about', {
			templateUrl: 'app/components/about.html'})

	$routeProvider.otherwise({redirectTo: '/rss/0'});
}) ;

rssApp.value('loader', {show: false});

})();
