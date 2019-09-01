angular.module('Visualization')
    .controller('indexController',['$location','$http','localStorageModel','service','$rootScope','$scope' ,function ($location,$http,localStorageModel,service,$rootScope,$scope) {


        self = this;
         $rootScope.homePath= "#/";
        //  $rootScope.dataSetLoaded = false;
        //  $rootScope.test = false;
        //  $rootScope.loginPressed = false
        // $rootScope.loglbl = "login"
        $rootScope.entities = [];

    // self.goHome = function () {
    //     $location.path('/')
    // }


    self.changeLocation = function (location) {
        switch(location) {
            case 'Files':
                    $location.path('/');
                    $rootScope.location = location;
                    break;
            case 'upload':
                $rootScope.editMode = false;
                $location.path('/upload');
                $rootScope.location = location;
                break;
            case 'Analysis':
                if ($rootScope.selcetedDataSet.raw_data_file_name != 'File does not exist')
                {
                    $location.path('/analysis');
                    $rootScope.location = location;
                }
                else
                {
                    alert('No raw data file exists for the selected dataSet');
                    $rootScope.location = location;
                }
                break;
            case 'states':
                if ($rootScope.selcetedDataSet.states_file_name != 'File does not exist')
                {
                    $location.path('/states')
                    $rootScope.location = location;
                }
                else
                {
                    alert('No state file exists for the selected dataSet');
                }
                break;
            case 'entities':
                if ($rootScope.selcetedDataSet.entities_file_name != 'File does not exist')
                {
                    $location.path('/entities')
                    $rootScope.location = location;
                    
                }
                else
                {
                    alert('No entities file exists for the selected dataSet');
                }
                break;
            case 'TIRPs':
                if ($rootScope.selcetedDataSet.output_file_name != 'File does not exist' & $rootScope.selcetedDataSet.states_file_name != 'File does not exist' & $rootScope.selcetedDataSet.entities_file_name != 'File does not exist')
                {
                    $location.path('/tirps')
                    $rootScope.location = location;
                }
                else
                {
                    alert('You are missing files! Please check if the selected data has the following files -KL output, entities and states');
                }
                break;
            case 'TIRP entities':
                if ($rootScope.selcetedTirp != undefined)
                {
                    $location.path('/tirpEntities')
                    $rootScope.location = location;
                }
                else
                {
                    alert('No TIRP was selected from the TIRPs tab');
                }
                break;
            case 'search':
                if ($rootScope.selcetedDataSet.output_file_name != 'File does not exist' & $rootScope.selcetedDataSet.states_file_name != 'File does not exist' & $rootScope.selcetedDataSet.entities_file_name != 'File does not exist')
                {
                    $location.path('/search')
                    $rootScope.location = location;
                }
                else
                {
                    alert('You are missing files! Please check if the selected data has the following files -KL output, entities and states');
                }
                break;
            case 'predictive TIRPs':
                if ($rootScope.selcetedDataSet.output_file_name != 'File does not exist' & $rootScope.selcetedDataSet.second_class_output_file_name != 'File does not exist' & $rootScope.selcetedDataSet.states_file_name != 'File does not exist' & $rootScope.selcetedDataSet.entities_file_name != 'File does not exist' & $rootScope.selcetedDataSet.class_name != "" & $rootScope.selcetedDataSet.second_class_name != "")
                {
                    $location.path('/predictive')
                    $rootScope.location = location;
                }
                else
                {
                    alert('You are missing data! Please check if the selected data has the names of both classes and the following files -KL output forn both classes, entities and states');
                }
                break;
            default:
                $location.path('/');
                $rootScope.location = 'Files';
          }
    }

    $scope.is_highlight = function(location) {
        if ($rootScope.location == location)
        {
            return true;
        }
        else
        {
              return false;
        }
    
      };

      self.goHome = function()
      {
        $rootScope.location = 'Files';
      }


    }]);
