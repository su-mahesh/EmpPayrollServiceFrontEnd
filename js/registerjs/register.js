$(document).on('change', '#imgurl' , function() {
  console.log(this.html());
});


function register(event){
  event.preventDefault(); 
  var imgData;
  var myImageUrl = document.querySelector('input[name="profileImg"]:checked').value;
   // Select the image
 const img = document.querySelector('input[name="profileImg"]:checked');
 var myImage = new Image();
 myImage.src = myImageUrl;
 imgData = getDataUrl(myImage);
    console.log(imgData);

  var date = document.getElementById("start-date-year").value+'/'
  +document.getElementById("start-date-month").value+'/'
  +document.getElementById("start-date-day").value;
  var salary = document.getElementById("salary").value;
  var sal = parseFloat(salary).toFixed(3);
  var startDate = new Date(date);


let reqData = {
    "employeeName": document.getElementById("fullname").value,
    "profileImage" : imgData,
    "gender":document.querySelector('input[name="gender"]:checked').value,
    "salary":parseFloat(sal),
    "startDate":startDate,
    "department":[...document.querySelectorAll('input[name=department]:checked')].map(e => e.value),
    "notes":document.getElementById("notes").value
}
  let rdata = JSON.stringify(reqData);
  var x = document.getElementById("snackbar");
x.className = "show";
  $.ajax({
      url: 'http://localhost:4000/EmployeePayroll/Register',
      type: "POST",
      data: rdata,
      dataType: "json",
     
      contentType:'application/json',
      success: function (data) {
          console.log(data);
          x.innerHTML = "registration successfull";
          x.style.color = "green";           
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      },
      error: function (error) {
          console.log(error);
          x.innerHTML = "registration unsuccessfull";
          x.style.color = "red";  
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);        
      }
  });
  x.innerHTML = "registering employee..";
  x.style.color = "";  
  
}
  

$(document).ready(function(){
   
    AddDateField();
    
  function AddDateField() {
    var d = new Date();
  var n = d.getFullYear();
    var x = document.getElementById("start-date-year");
    var i;
    for (i = n; i > 1990; i--) {
    var option = document.createElement("option");
    option.text = i.toString();
    option.value = i;
    x.add(option);
    }
    var x = document.getElementById("start-date-month");
    
    for (i = 1; i <= 12; i++) {
        var option = document.createElement("option");
        option.text = i.toString();
        option.value = i;
        x.add(option);
        }

    var x = document.getElementById("start-date-day");

    for (i = 1; i <= 31; i++) {
        var option = document.createElement("option");
        option.text = i.toString();
        option.value = i;
        x.add(option);
        }
        var x = document.getElementById("salary");
        for (i = 1; i <= 20; i++) {
            var option = document.createElement("option");
            option.text = (i*10000).toString();
            option.value = i*10000;
            x.add(option);
            }
  }
  function resetFields(){
    document.getElementById("registerform").reset();
  }

  });

  var getDataUrl = function (img) {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
  
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL();
  }