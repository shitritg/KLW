

angular.module('Visualization')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
    }])
    // .service('myService', function () { this.set = function() {return "hello"} })
    .service('service',['localStorageModel', '$rootScope', '$location', '$http', function (localStorageModel, $rootScope,$location, $http) {


        let self = this;

        // let poiDet = ""
        // let token = ""
        
        // self.questions = ["What is your pet's name?","What is your school's name?","What is your teacher's name?","What is your mother last name befor marriage?"]
        self.serverUrl = 'http://127.0.0.1:5000/'
        // self.userName='guest'
        // self.loginPressed = false
        // self.registerPressed = false



        


    }]);
