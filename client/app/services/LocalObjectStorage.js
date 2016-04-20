/**
* rssApp.LocalObjectStorage Module
*
* Description
*/

angular.module('rssApp.LocalObjectStorage', [])
	.service('LocalObjectStorage', function ($http) {

		this.getObject = function (key) {
			return JSON.parse(localStorage.getItem(key));
		};

		this.setObject = function (key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		};

		this.removeObject = function (key) {
			localStorage.removeItem(key);
		};

		this.contains = function (key) {
			return localStorage.getItem(key) ? true : false;
		};
	});
