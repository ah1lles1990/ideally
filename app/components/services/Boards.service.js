angular.module('boardsApp')
	.factory('BordsService', ['$http', '$q', '$log', function($http, $q, $log) {

		var BordsService = {};

		BordsService.mainUrl = 'https://noterius-app.firebaseio.com/';

		BordsService.boadrsUrl = BordsService.mainUrl + '.json';

		BordsService.check = false;

		BordsService.doRequest = function(method, url, data, cb) {
			$http({
				method: method,
				url: url,
				data: data
			}).then(function success(data) {
				cb(data);
			}, function error(error) {
				cb(error);
			});
		}

		BordsService.addItem = function(obj, array, url) {
			if (BordsService.check) return;
			BordsService.check = true;
			BordsService.doRequest('POST', url, obj, function(data) {
				if (data.status === 200) {
					obj.id = data.data.name;
					array.push(obj);
				}
				BordsService.check = false;
			});
		}

		BordsService.removeItem = function(id, array, url) {
			if (BordsService.check) return;
			BordsService.check = true;
			BordsService.doRequest('DELETE', url, null, function(data) {
				if (data.status === 200) {
					for (var i = 0; i < array.length; i++) {
						if (array[i].id === id) {
							array.splice(i, 1);
						}
					}
				}
				BordsService.check = false;
			});
		}

		BordsService.getItems = function(array, url) {
			BordsService.doRequest('GET', url, null, function(data) {
				if (!data.data) return;
				for (var key in data.data) {
					data.data[key].id = key;
					array.push(data.data[key]);
				}
			});
		}

		BordsService.editItem = function(id, obj, array, url) {
			if (BordsService.check) return;
			BordsService.check = true;
			BordsService.doRequest('PUT', url, obj, function(data) {
				$log.debug(data, id);
				BordsService.check = false;
			});
		}

		return BordsService;


	}]);
