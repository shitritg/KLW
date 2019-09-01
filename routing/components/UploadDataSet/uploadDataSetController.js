angular.module('Visualization')
    .controller('uploadDataSetController', ['$scope', '$rootScope', '$location', '$http', 'service','localStorageModel','$timeout', function ($scope, $rootScope, $location, $http, service,localStorageModel,$timeout) {
 

        let self = this;
        let serverUrl = service.serverUrl;
        self.editMode = $rootScope.editMode;

        self.initForm = function(){
            if ($rootScope.editMode == false)
            {
                $scope.dataSetName = "";
                document.getElementsByName("dataSetName")[0].value = "";
                $scope.className = "";
                document.getElementsByName("className")[0].value = "";
                $scope.secclassName = "";
                document.getElementsByName("secclassName")[0].value = "";
                $scope.userName = "";
                document.getElementsByName("userName")[0].value = "";
                $scope.Comments = ""
                document.getElementsByName("Comments")[0].value = "";
                $scope.file1 = undefined
                $scope.file2 = undefined
                $scope.file3 = undefined
                $scope.file4 = undefined
                $scope.file5 = undefined
              $("input[type='file']").val('');
            }
            else
            {
                dataSet = $rootScope.selcetedDataSet; 
                $scope.file1 = undefined
                $scope.file2 = undefined
                $scope.file3 = undefined
                $scope.file4 = undefined
                $scope.file5 = undefined
                //insert old values to te edit form
                document.getElementById("dataSetName").value = dataSet.data_set_name;
                $scope.dataSetName = dataSet.data_set_name;
                document.getElementById("className").value = dataSet.class_name;
                $scope.className = dataSet.class_name;
                document.getElementById("userName").value = dataSet.username;
                $scope.userName = dataSet.username;
                document.getElementById("secclassName").value = dataSet.second_class_name;
                $scope.secclassName = dataSet.second_class_name;
                document.getElementById("Comments").value = dataSet.comments;
                $scope.Comments =  dataSet.comments;
                $("input[type='file']").val('');
            }
        }
        $('.custom-file input').change(function (e) {
            if(e.target.files[0] != undefined)
            {
                $(this).next('.custom-file-label').html(e.target.files[0].name);
            }
            else
            {
                switch(e.target.id) {
                    case 'file1':
                            $(this).next('.custom-file-label').html('KL output file');
                            break;
                    case 'file2':
                            $(this).next('.custom-file-label').html('states file');
                        break;
                    case 'file3':
                        $(this).next('.custom-file-label').html('entities file');
                        break;
                    case 'file4':
                        $(this).next('.custom-file-label').html('raw data file');
                        break;
                    case 'file5':
                        $(this).next('.custom-file-label').html('Second class Name');
                        break;
                  }



            }

        });

        self.submit = function (mode,validation) {
            if (validation)
            {
            $rootScope.uploadedDataSetName = $scope.dataSetName;
            let form = new FormData();
            form.append('data_set_name', $scope.dataSetName)
            form.append('className', $scope.className)
            form.append('secondclassName', $scope.secclassName)
            form.append('username', $scope.userName)
            form.append('comments', $scope.Comments)
            form.append('output', $scope.file1)
            form.append('states', $scope.file2)
            form.append('entities', $scope.file3)
            form.append('rawData', $scope.file4)
            form.append('secondClassOutput', $scope.file5)
            if(mode == 'edit')
            {
                form.append('old_data_set_name',$rootScope.selcetedDataSet.data_set_name)
            }
        
            var url = serverUrl + `upload`;
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
                    alert("Upload completed");
                    $timeout(function(){
                        $location.path('/'); 
                     })
                    
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
            // $http.post(serverUrl + "upload", form)
            //     .then(function (response) {
            //         //self.reg.content = response.data;
            //         if (response.data.status == 'OK')
            //         {
            //             window.alert("uploaded successfully")
            //             $location.path('/tirps')
            //         }
            //         else 
            //         window.alert("uploaded failed - DataSet already Exist!")
        
            //     }, function (response) {
            //  //       self.reg.content = response.data
            //         //Second function handles error
            //         // self.reg.content = "Something went wrong";
            //         window.alert("something went wrong")
            //     });
        }
}]);