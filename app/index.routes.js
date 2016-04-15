angular.module('boardsApp')
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/boards/index.html'
			})
			.when('/boards', {
				templateUrl: 'app/boards/index.html'
			})
			.when('/boards/:id/notes', {
				templateUrl: 'app/notes/index.html'
			})
			.when('/calculator', {
				templateUrl: 'app/calculator/index.html'
			})
			.otherwise({
	            redirectTo: '/'
	        });
	}]);
