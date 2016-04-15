angular.module('boardsApp')
	.directive('boardsList', ['$log', 'BordsService', function($log, BordsService) {
		return {
			restrict: 'EA',
			templateUrl: 'app/boards/boards.html',
			controller: function() {

				var vm = this;

				vm.boards = [];

				vm.newBoard = {
					id: '',
					title: '',
					description: '',
					isPublic: false,
					notes: []
				};
				
				vm.addBoard = function(board) {
					var url = BordsService.boadrsUrl;
					BordsService.addItem(board, vm.boards, url);
					vm.newBoard = {};
				}

				vm.removeBoard = function(id) {
					var url = BordsService.mainUrl + id + '.json';
					BordsService.removeItem(id, vm.boards, url);
				}

				vm.editBoard = function(id, board) {
					var url = BordsService.mainUrl + id + '.json';
					BordsService.editItem(id, board, vm.boards, url);
				}

				vm.getBoards = function() {
					var url = BordsService.boadrsUrl;
					BordsService.getItems(vm.boards, url);
				}

				vm.getBoards();

			},
			controllerAs: 'boardCtrl'
		}



	}]);
	