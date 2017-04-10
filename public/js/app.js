console.log('Ready.');

angular.module('ToastMaestro', [])
      
	.controller('MainController', ['$scope', function ($scope) {
    	
    	$scope.status = 'Let\'s do this.';

    }]);