angular.module('Visualization')
 .controller('homeController', ['$scope', '$rootScope', '$location', '$http', 'service','$timeout', function ($scope, $rootScope, $location, $http, service,$timeout) {
 

    self = this;
    let serverUrl = service.serverUrl
    self.dataSets = [];
    self.loaded = false;
    


    $scope.initialToolTip = function(){
        $('.tooltip23').tooltipster({
            theme: 'tooltipster-punk',
            side: 'left',
            distance: 30,
            maxWidth: 350 
        });
    }


    self.getDatasets = function () {
        $http.get(serverUrl + "getDataSets", )
            .then(function (response) {
                self.dataSets = response.data['DataSets'];
                if($rootScope.uploadedDataSetName != undefined)
                {
                    for(var i=0; i<self.dataSets.length; i++)
                        {
                            if (self.dataSets[i].data_set_name == $rootScope.uploadedDataSetName)
                            {
                                $rootScope.selcetedDataSet = self.dataSets[i]
                                break;
                            }
                        }
                }
                //self.load();
                // $('#dataSetsTbl').DataTable({
                //     "scrollY": "310px",
                //     "scrollCollapse": true,
                //     });
                //     $('.dataTables_length').addClass('bs-select');

            }, function (response) {
                
            //    self.reg.content = response.data
                //Second function handles error
                // self.reg.content = "Something went wrong";
            });
}


self.load = function() {
    $timeout(function () {
       var table = $('#dataSetsTbl').DataTable({
       "scrollY": "55%",
       "scrollCollapse": true,
       "autoWidth": true,
    "bAutoWidth": true,
       retrieve: true,
       paging: false
       });
       table.columns.adjust().draw();
       $('.dataTables_length').addClass('bs-select');
       self.loaded = true;
        },0); 

}




// // Get the modal
// var modal = document.getElementById("myModal");
// var editModal = document.getElementById("editModal");

// // Get the button that opens the modal
// var uploadbtn = document.getElementById("uploadFormbtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
// var span2 = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
// uploadbtn.onclick = function() {
//   modal.style.display = "block";
//   $scope.dataSetName = "";
//   document.getElementsByName("dataSetName")[0].value = "";
//   $scope.className = "";
//   document.getElementsByName("className")[0].value = "";
//   $scope.secclassName = "";
//   document.getElementsByName("secclassName")[0].value = "";
//   $scope.userName = "";
//   document.getElementsByName("userName")[0].value = "";
//   $scope.Comments = ""
//   document.getElementsByName("Comments")[0].value = "";
//   $scope.file1 = undefined
//   $scope.file2 = undefined
//   $scope.file3 = undefined
//   $scope.file4 = undefined
//   $scope.file5 = undefined
// $("input[type='file']").val('');

// // }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// span2.onclick = function() {
//     editModal.style.display = "none";
//   }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal || event.target == editModal) {
//     modal.style.display = "none";
//     editModal.style.display = "none";
//   }
// }
// window.onclick = function(event) {
//     if (event.target == editModal) {
//         editModal.style.display = "none";

//     }
//   }
  


self.edit = function (dataSet, raw) {
    $rootScope.selcetedDataSet = dataSet;
    $rootScope.uploadedDataSetName = undefined;
    $rootScope.editMode = true;
    $location.path('/upload');
    //reset all models
    // $scope.file1 = undefined
    // $scope.file2 = undefined
    // $scope.file3 = undefined
    // $scope.file4 = undefined
    // $scope.file5 = undefined
    // //insert old values to te edit form
    // document.getElementById("dataSetName").value = dataSet.data_set_name;
    // $scope.dataSetName = dataSet.data_set_name;
    // document.getElementById("className").value = dataSet.class_name;
    // $scope.className = dataSet.class_name;
    // document.getElementById("userName").value = dataSet.username;
    // $scope.userName = dataSet.username;
    // document.getElementById("secclassName").value = dataSet.second_class_name;
    // $scope.secclassName = dataSet.second_class_name;
    // document.getElementById("Comments").value = dataSet.comments;
    // $scope.Comments =  dataSet.comments;
    // $("input[type='file']").val('');
    // editModal.style.display = "block";
   }
     

self.rowSelected = function(dataSet)
{
    $rootScope.selcetedDataSet = dataSet;
    $rootScope.uploadedDataSetName = undefined;
}



$scope.is_highlight = function(dataSet) {
    if ($rootScope.selcetedDataSet == undefined)
    return false;
    else
    {
        if (dataSet.data_set_name == $rootScope.selcetedDataSet.data_set_name) {
            return true;
          }
          return false;
    }

  };


 }]);
