let app = angular.module('Visualization', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        //template: '<h1>This is the default route</h1>'
        templateUrl: 'components/Home/home.html',
        controller : 'homeController as homeCtrl'
    })
        .when('/tirps', {
            templateUrl: 'components/TIRPs/tirps.html',
            controller : 'tirpsController as tirpCtrl'
        })
        .when('/upload', {
            templateUrl: 'components/UploadDataSet/uploadDataSet.html',
            controller : 'uploadDataSetController as uploadCtrl'
        })
        .when('/search', {
            templateUrl: 'components/SearchTool/searchTool.html',
            controller : 'searchToolController as srchCtrl'
        })
        .when('/service', {
            templateUrl: 'components/Services/service.html',
            controller : 'serviceController as srvCtrl'
        })
        .when('/analysis', {
            templateUrl: 'components/Analysis/analysis.html',
            controller : 'analysisController as analCtrl'
        })
        .when('/states', {
            templateUrl: 'components/States/states.html',
            controller : 'statesController as statCtrl'
        })
        .when('/entities', {
            templateUrl: 'components/Entities/entities.html',
            controller : 'entitiesController as entCtrl'
        })
        .when('/tirpEntities', {
            templateUrl: 'components/TIRPEntities/TIRPEntities.html',
            controller : 'TIRPEntitiesController as tirpentCtrl'
        })
        .when('/predictive', {
            templateUrl: 'components/PredictiveTIRPs/predictiveTIRPs.html',
            controller : 'predictiveTIRPsController as predCtrl'
        })
        .otherwise({ redirectTo: '/' });
}]);










