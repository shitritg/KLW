angular.module('Visualization')
 .controller('entitiesController', ['$scope', '$rootScope', '$location', '$http', 'service','localStorageModel','$rootScope', function ($scope, $rootScope, $location, $http, service,localStorageModel,$rootScope) {
    // 'ui.bootstrap','ui.utils',, '$modalInstance'
    let self = this;
    let serverUrl = service.serverUrl;
    self.loaded = false;

    self.getEntities = function ()
     {
       // if ( $rootScope.currentDatasetloded != $rootScope.selcetedDataSet.data_set_name) 
        {
            $rootScope.currentDatasetloded = $rootScope.selcetedDataSet.data_set_name;
            let formForEntities = new FormData();
            formForEntities.append('data_set_name', $rootScope.selcetedDataSet.data_set_name)
            var url = serverUrl + `getEntities`;
            var request = new Request(url, {
                method: 'POST',
                mode: "cors",
                // headers: {'Content-Type': 'application/json'},
                body: formForEntities,
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
                    $rootScope.entities = res['Entities'];
                    // $scope.entities = res['Entities'];
                    // $rootScope.workstations = $rootScope.entities[0].workstation; 
                    $rootScope.$apply();
                    $('#dtVerticalScrollExample').DataTable({
                        "scrollY": "55%",
                        "scrollX": true,
                        "scrollCollapse": true,
                        });
                        $('.dataTables_length').addClass('bs-select');
                    //console.trace()
                    // var table = document.getElementById("entitiesTbl");
                    // var table2 = document.getElementById("entities2Tbl");
                    // $('#entities1Tbl').DataTable().ajax.reload();
                    // $('#entities2Tbl').DataTable().ajax.reload();
                    // $( "#loader" ).load(window.location.href + " #loader" );
                    // $( "#entitiesTbl1" ).load(window.location.href + " #entitiesTbl1" );
                    // $( "#entitiesTbl2" ).load(window.location.href + " #entitiesTbl2" );
                    // $location.path('/entities')
                    // $("#loader").load(" #loader > *");
                    // $("#entitiesTbl1").load(" #entitiesTbl1 > *");
                    // $("#entitiesTbl2").load(" #entitiesTbl2 > *");
                    // table.refresh ();
                    // table2.refresh ();
                    // $( "#entities1Tbl" ).load();
                    // $( "#entities2Tbl" ).load();
                    // table.contentWindow.location.reload();
                    // table2.contentWindow.location.reload();
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
        // else
        // {
        //     self.loaded = true;
        //     //$rootScope.$apply();
        //     $('#dtVerticalScrollExample').DataTable({
        //         "scrollY": "200px",
        //         "scrollX": "200px",
        //         "scrollCollapse": true,
        //         });
        //         $('.dataTables_length').addClass('bs-select');
        //     //console.trace()
        //     // return;
        // }
    }

    // $(document).ready(function () {
    //     $('#dtVerticalScrollExample').DataTable({
    //     "scrollY": "200px",
    //     "scrollCollapse": true,
    //     });
    //     $('.dataTables_length').addClass('bs-select');
    // });





}]);