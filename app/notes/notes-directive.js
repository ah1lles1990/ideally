angular.module('boardsApp')
	.directive('notesList', ['$routeParams', '$log', 'BordsService', function($routeParams, $log, BordsService) {
		return {
			restrict: 'EA',
			templateUrl: 'app/notes/notes.html',
			controller: function() {

				var vm = this;

				vm.newNote = {
					id: '',
					title: '',
					content: ''
				};

				vm.noteUrl = '';

				vm.notes = [];

				vm.addNote = function(note) {
					var url = vm.noteUrl + '.json';
					BordsService.addItem(note, vm.notes, url);
					vm.newNote = {};
				}

				vm.removeNote = function(id) {
					var url = vm.noteUrl + '/' + id + '.json';
					BordsService.removeItem(id, vm.notes, url);
				}

				vm.editNote = function(id, note) {
					var url = vm.noteUrl + '/' + id + '.json';
					BordsService.editItem(id, note, vm.notes, url);
				}

				vm.getNotes = function() {
					var url = vm.noteUrl + '.json';
					BordsService.getItems(vm.notes, url);
				}

				if ($routeParams.id) {

					vm.noteUrl = BordsService.mainUrl + $routeParams.id + '/notes';
					
					vm.getNotes();
				}

			},
			controllerAs: 'noteCtrl'
		}


		
		
		
	}]);
	