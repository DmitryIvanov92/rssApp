/**
* rssApp Module
*
* Description
*/
angular.module('rssApp')
	.filter('rssDate', function () {
		return function (value) {
			return new Date(value).toLocaleString();
		}
	});