/**
* rssApp Module
*
* Description
*/
angular.module('rssApp')
	.filter('hash', function (HashString) {
		return function (value) {
			return HashString.perform(value);
		}
	});