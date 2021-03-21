$(document).ready(function(){
  var table = document.getElementById("emp-table");
  $(document).on('click','#delEmp',function(){   

    $.ajax({
      url: 'http://localhost:4000/EmployeePayroll/Delete/'+this.value,
      type: "DELETE",
      success: function (data) {
        
        console.log(data['success']);
        getData();

      },
      error: function (error) {
          console.log(error);
     
      }
  });
  });

 

    getData();
    function getData(){
      $.ajax({
          url: 'http://localhost:4000/EmployeePayroll',
          type: "GET",
          success: function (data) {
            
            console.log(data);
            setEmpoyees(data['employees']);

          },
          error: function (error) {
              console.log(error);
         
          }
      });
     
      
    }
    function setEmpoyees(employees){
      $("#emp-table").find("tr:gt(0)").remove();

      
      var i;
      for (i = 0; i < employees.length; i++) {
             var row = table.insertRow();
             row.value=employees[i]["employeeID"];
             row.insertCell().innerHTML = employees[i]["employeeID"];
             row.insertCell().innerHTML = employees[i]['employeeName'];
             row.insertCell().innerHTML = employees[i]['gender'];

           var s =  departmentStr(employees[i]['department']);
             row.insertCell().innerHTML = s;
             
             row.insertCell().innerHTML ='₹ '+ employees[i]['salary'];  
             row.insertCell().innerHTML = employees[i]['startDate'];
             row.insertCell().innerHTML = 
             '<button class="tr-btn" id="delEmp" value='+employees[i]["employeeID"]+'><i class="fa fa-trash"></i></button>'+
             '<button class="edit-btn" id="editEmp" value='+employees[i]["employeeID"]+'><i class="fa fa-pencil"></i></button>';
             
      }
    }
    function departmentStr(dept){
      if(dept != null)
      {
        var s = "";
        for(var i = 0; i < dept.length; i++)
        {
          s += "<span class=\"dot\">"+dept[i]+"</span>&nbsp;&nbsp;"
        }
        return s;
      }
      
      return '';
    }
  });
 
