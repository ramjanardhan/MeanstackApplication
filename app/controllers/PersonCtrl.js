'use strict';
(function () {
    var addressBookApp = angular.module("addressBookApp");

    var PersonCtrl = function ($scope, $http)
    {
    	$scope.working = 'Angular is Working';
        //common error function
    	var onError = function (error) {
            $scope.error = error.data;
        };
        //end error function

        //get all persone
    	var onPersonGetCompleted = function(response){
    		$scope.persons = response.data;
            console.log($scope.persons);
    	}
    	

        var refresh = function(){
        	$http.get('/persons')
        		.then(onPersonGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();
    	//end get all persons

        //get persons by Id
        var onGetByIdCompleted = function(response){
            $scope.person = response.data;
            console.log(response.data);
        };

        $scope.searchPerson = function(id){
            $http.get('/person/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
        };
        //end get person by Id

        //add new person
        var onAddPersonCompleted = function(response){
            $scope.person = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addPerson = function(person){
            $http.post('/addPerson', person)
                    .then(onAddPersonCompleted, onError);
            console.log(person);
        };
        //end add new person

        //delete person
        $scope.deletePerson = function(id){
            $http.delete('/deletePerson/' + id)
                .then(onPersonDeleteCompleted,  onError);
            console.log(id);
        };

        var onPersonDeleteCompleted = function(response){
            $scope.person = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete person

        //update person
        $scope.updatePerson = function(person){
            $http.put("/updatePerson", person)
                .then(onUpdatePersonCompleted, onError);
                    console.log(person);
        };

        var onUpdatePersonCompleted = function(response){
            $scope.person = null;//response.data;
            console.log(response.data);
            refresh();
        };
        //end update person
    }
    addressBookApp.controller('PersonCtrl', PersonCtrl);
}());