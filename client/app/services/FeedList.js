/**
* rssApp.FeedList Module
*
* Description
*/
angular.module('rssApp.FeedList', ['rssApp.LocalObjectStorage'])
	.service('FeedList', function ($rootScope, LocalObjectStorage) {
		this.add = function (url, title) {
			var list = this.get();
			var id = localStorage.getItem('FeedListId') ? localStorage.getItem('FeedListId') : 1;

			list.push({
				url:    url,
				title:  title,
				id: id
			});

			LocalObjectStorage.setObject('FeedList',  list);
			localStorage.setItem('FeedListId', ++id);
			$rootScope.$broadcast('FeedList', list);
		};

		this.delete = function (id) {
			var list = this.get();

			for (var i = list.length - 1; i >= 0; i--) {
				if (list[i].id == id) {
					list.splice(i, 1);
				}
			}

			LocalObjectStorage.setObject('FeedList', list);
			$rootScope.$broadcast('FeedList', list);
		};

		this.get = function () {
			if (LocalObjectStorage.contains('FeedList')) {
				return LocalObjectStorage.getObject('FeedList');
			}

			return new Array(
				{
					url: 'http://feeds2.feedburner.com/Mashable',
					title: 'Mashable',
					id: 0
				}
			);
		};

		this.getById = function(id) {
			var list = this.get();

			for (var i = list.length - 1; i >= 0; i--) {
				if (list[i].id == id) {
					return list[i];
				}
			}

			return null;
		};

		this.getMinId = function () {
			var list = this.get();
			var minId = Number.MAX_VALUE;

			for (var i = list.length - 1; i >= 0; i--) {
				minId = Math.min(minId, list[i].id);
			}

			return minId;
		};
	});
