$(document).ready(function(){
  
  console.log(moment('11/11/1111').format('MM/DD/YYYY'));
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
  //      console.log(employees[i]["profileImage"]);
             var row = table.insertRow();
             
       
             if (employees[i]["profileImage"] != null)
             {
            //  console.log(employees[i]["profileImage"]);  
              row.insertCell().innerHTML =
              '<img src="'+employees[i]["profileImage"]
             +'" class="dash-img" ></img>';
             }        
             else
             row.insertCell().innerHTML ="";
             
             row.insertCell().innerHTML = employees[i]['employeeName'];
             row.insertCell().innerHTML = employees[i]['gender'].toUpperCase();

              var s =  departmentStr(employees[i]['department']);
             row.insertCell().innerHTML = s;
             
             row.insertCell().innerHTML ='₹ '+ employees[i]['salary'];  
             row.insertCell().innerHTML = moment(employees[i]['startDate']).format('DD MMM YYYY')
             row.insertCell().innerHTML = 
             '<button class="edit-btn" id="editEmp" value='+employees[i]["employeeID"]+'><i class="fa fa-pencil"></i></button>'+
             '<button class="tr-btn" id="delEmp" value='+employees[i]["employeeID"]+'><i class="fa fa-trash"></i></button>';
             
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
 
