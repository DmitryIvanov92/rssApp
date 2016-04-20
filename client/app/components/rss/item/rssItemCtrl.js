/**
* rssApp Module
*
* Description
*/
angular.module('rssApp')
	.controller('rssItemCtrl', function ($scope, $routeParams, $routeSegment, FeedList, FeedLoad, HashString) {
		$scope.$routeSegment = $routeSegment;

		function getFrequency(string) {
			var lowcase = string.toLowerCase();
			var prepros = lowcase.replace(/[^a-z]/g, "");

		    var freq = {};
		    for (var i=0; i<prepros.length;i++) {
		        var character = prepros.charAt(i);
		        if (freq[character]) {
		           freq[character]++;
		        } else {
		           freq[character] = 1;
		        }
		    }
		    return freq;
		};

		var feed = FeedList.getById($routeParams.id)

		FeedLoad.fetch({q: feed.url, num: 50}, {}, function (data) {
			$scope.feed = data.responseData.feed;
			$scope.id = $routeParams.id;
			var entries = data.responseData.feed.entries;

			for (var i = entries.length - 1; i >= 0; i--) {
				if (HashString.perform(entries[i].title) == $routeParams.hashKey) {
					$scope.item = entries[i];

					var frequency = getFrequency($scope.item.content);
					var arrLetters = [];
					var arrFreq = [];
					for(var item in frequency) {
						arrLetters.push(item);
						arrFreq.push(frequency[item]);
					}
					var arrColors = ['#4d4d4d','#5da5da','#faa43a','#60bd68','#f17cb0','#008080','#b2912f','#2e8b57','#b276b2','#decf3f','#4682b4','#f15854','#dc143c','#b8860b','#8a2be2','#32cd32','#708090','#9400d3','#808000','#800000','#cd5c5c','#5f9ea0','#008000','#8b4513','#696969','#b0c4de'];
					var arrObjects = [];
					for(var j=0;j<arrLetters.length;j++) {
						arrObjects[j] = {
							value: arrFreq[j],
							color: arrColors[j],
							label: arrLetters[j],
							labelColor: 'white',
							labelFontSize: '16'
						}
					}

					var ctx = document.getElementById("lettChart").getContext("2d");
					var newChart = new Chart(ctx).Pie(arrObjects, { animateScale: true });
				}
			}
		});
	});
