$(document).ready(function(){
    getData();
  });
  function getData(){
    $.ajax({
        url: 'http://localhost:4000/EmployeePayroll',
        type: "GET",
        success: function (data) {
            var i=1;
            console.log(data);   
            for (var index in data) {
                // Show value in alert dialog:
                console.log( data[index]);
            //    setData(data[index]);

              }
            // var d = JSON.parse(data);

            // $.each(d, function(index, el) {
            //     //console.log("element at " + index['employeeID'] + ": " + el['employeeID']); // will alert each value
            //     console.log('i'+el);
            // });  
               
        },
        error: function (error) {
            console.log(error);
       
        }
    });
    function setData(data){
        var table = document.getElementById("myTable");
        for(var i = 0; data.length; i++)
        {
            
        }
    }
    
  }
