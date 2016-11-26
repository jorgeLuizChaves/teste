/**
 * Created by jorge on 18/11/16.
 */

var app = angular.module("mundogato", ['ui.router', 'firebase']);

app.service("CatService", function ($q) {

    var self = {
        "cat": null,
        "cats": [],
        "loadCats": function () {
            var d = $q.defer();
            firebase.database().ref("/cats").once("value", function(snapshot){
                console.log(snapshot.val());
                var cats = snapshot.val();
                d.resolve(cats);
            });
            return d.promise;
        },
        "save": function(){
            var ref = firebase.database().ref('/cats');
            var newChildRef = ref.push();
            newChildRef.set(self.cat);
        }
    };

    self.loadCats().then(function (data) {
        self.cats = data;
    });

    return self;
});

app.controller("HomeController", function($scope, $window){
    var user = firebase.auth().currentUser;
    if(!user){
        console.log("user not logged.");
        $window.location.href = "/mundogato-backoffice/app/login.html";

    }
});

app.controller("CatsListController", function ($scope, $firebaseObject, $q, CatService) {
    $scope.title = "Felinos";
    $scope.catService = CatService;
});

app.controller("CatSaveController", function ($scope, CatService) {
    $scope.cat = {};
    $scope.catService = CatService;

    $scope.save = function () {
        console.log($scope.cat);
        $scope.catService = $scope.cat;
        CatService.save();
    }
});

app.controller("LoginController", function ($window, $scope, $q, $state) {

    $scope.formLogin = {};

    $scope.login = function() {
        // var d = $q.defer();
         firebase.auth().signInWithEmailAndPassword($scope.formLogin.username, $scope.formLogin.password)
            .then(function (response) {
                // d.resolve(response);
                // return d.promise;
                $state.go("home");
            }, function (error) {
                    // d.resolve(error);
                    // return d.promise;
            });

        // response.then(function (response) {
        //     console.log(firebase.auth().currentUser);
        //     $state.go("home");
        // });

    }
});