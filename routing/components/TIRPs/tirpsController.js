angular.module('Visualization')
 .controller('tirpsController', ['$scope', '$rootScope', '$location', '$http', 'service','localStorageModel','$timeout', function ($scope, $rootScope, $location, $http, service,localStorageModel,$timeout) {
 

    let self = this;
    let serverUrl = service.serverUrl;
    self.loaded = false;

    self.initiateTirps = function () {

        let form = new FormData();
        form.append('data_set_name', $rootScope.selcetedDataSet.data_set_name)
    
        var url = serverUrl + `initiateTirps`;
        var request = new Request(url, {
            method: 'POST',
            mode: "cors",
            // headers: {'Content-Type': 'application/json'},
            body: form,
        });
        fetch(request)
        .then(async function (response) {
            if(!response.ok)
            {
                throw response;
            }
            else
            {
                let jsonString=await response.text().then(s=>s);
                let res=JSON.parse(jsonString); 
                let arr  = res['Root'];
                let jsons = [];
                for(let i=0; i<arr.length; i++)
                {
                    jsons.push(JSON.parse(arr[i]));
                }
                $rootScope.currentLevel = jsons;
                self.loaded = true;
                $rootScope.$apply();

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
        $timeout(function() {
            $('#tirpsTbl').DataTable({
                "scrollY": "55%",
                "scrollX": true,
                "scrollCollapse": true,
                retrieve: true,
                paging: false
                });
                $('.dataTables_length').addClass('bs-select'); }, 0); 
    }

    self.getSubTree = function(tirp) {
            console.log('guy');
    }

    self.getRel = function(tirp) {
        if (tirp == undefined)
            return ""; 
        if (tirp._TIRP__rel.length == 0)
        {
            return 'No Relation'
        }
        return tirp._TIRP__rel[tirp._TIRP__rel.length -1];
    }

    self.getSymbol = function(tirp) {
        if (tirp == undefined)
        return ""; 
        return tirp._TIRP__symbols[tirp._TIRP__symbols.length -1];
    }



}]);