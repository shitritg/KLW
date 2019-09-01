angular.module('Visualization')
 .controller('statesController', ['$scope', '$rootScope', '$location', '$http', 'service','localStorageModel','$timeout', function ($scope, $rootScope, $location, $http, service,localStorageModel,$timeout) {

    let self = this;
    let serverUrl = service.serverUrl;
    self.loaded = false;
    self.states = [];

    self.getStates = function ()
     {
            //$rootScope.currentDatasetloded = $rootScope.selcetedDataSet.data_set_name;
            let formForStates = new FormData();
            formForStates.append('data_set_name', $rootScope.selcetedDataSet.data_set_name)
            var url = serverUrl + `getStates`;
            var request = new Request(url, {
                method: 'POST',
                mode: "cors",
                // headers: {'Content-Type': 'application/json'},
                body: formForStates,
            });
            fetch(request)
            .then(async function (response) {
                if(!response.ok)
                {
                    throw response;
                }
                else
                {
                    self.loaded = true;
                    let jsonString=await response.text().then(s=>s);
                    let res=JSON.parse(jsonString); 
                    self.states = res['States'];
                    // $scope.entities = res['Entities'];
                    // $rootScope.workstations = $rootScope.entities[0].workstation; 
                    $rootScope.$apply();
                    // $('#dtVerticalScrollExample2').DataTable({
                    //     "scrollY": "310px",
                    //     "scrollCollapse": true,
                    //     });
                    //     $('.dataTables_length').addClass('bs-select');
                }
            })
            .catch(async (response)=> {
                //error   
                try{
                msg= await response.json()
                } catch(e){
                    msg={errMsg:'Internal Error'};
                }
                alert("Something went wrong.\n"+ msg.errMsg+ "\nPlease Try Again") 
                $scope.$apply(function () { $location.path('/')} );
                return;
            });    
    
    }

    self.load = function() {
        $timeout(function () {
            $('#dtVerticalScrollExample2').DataTable({
           "scrollY": "55%",
           "scrollCollapse": true,
           "scrollX": true,
           retrieve: true,
           paging: false
           });
           $('.dataTables_length').addClass('bs-select'); }, 0); 
    }

}]);