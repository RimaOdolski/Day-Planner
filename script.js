var currentTime = moment(). format('H'); //get the current time from moments.js
var currentRow;

$(window).on("load",function (){ //when the window loads, maintain session storage and local storage
    var today = $('#currentDay');
    var now = moment().format('dddd D MMMM YYYY ');
    today.text(now); // show the date in the currentDay ID field 
    
  function getLocalStorageItems() {
    storedAppointments = JSON.parse(localStorage.getItem("calendar"));
    if (storedAppointments !== null) {
        for (i = 0; i < storedAppointments.length; i++) {
            returnedAppointments = storedAppointments[i];
            details = returnedAppointments.details;
            timeIndex = returnedAppointments.time;
            //console.log(timeIndex);
            if (details !== null) {
                $("#" + timeIndex).children('div').children('input').val(details);
                //console.log("Details: " + details);
                }
            }
        }
    }

  getLocalStorageItems();

 // color code the time blocks 
  for (i = 0; i <= 23; i++) {
    CurrentRow = i;
    //console.log(currentTime);
    //console.log(i);
    if (currentTime == i) {
        $('#' + CurrentRow).children('div').children('input').addClass("present");
    }
    else if (currentTime > i) {
        $('#' + CurrentRow).children('div').children('input').addClass("past");
    }
    else {
        $('#' + CurrentRow).children('div').children('input').addClass("future");
    }
    
    
}


})
// On click saveBtn, save the input into local storage
  $(".saveBtn").click(function () {
    //console.log(this); //this is what you are clicking...
    //console.log($(this).parent('div')); //this is the parent of the clicked element
    //console.log($(this).parent('div').children('div')); //this is the parent's children of the clicked element       
    var inputText = $(this).parent('div').children('div').children('input').val();
    var inputId = $(this).parent('div').children("div.time-block").attr("id"); 
    //console.log(inputText);
    //console.log(inputId);

    let schedule = {
      time: inputId,
      details: inputText
    }

    let tempArray = JSON.parse(localStorage.getItem("calendar"));
   // console.log( tempArray);

    if (tempArray === null) { //checking if local storage is created, if null - create new local storage
      localStorage.setItem("calendar", JSON.stringify([{ time: inputId, details: inputText }]));
    }
    else {
      tempArray.push(schedule);
      localStorage.setItem("calendar", JSON.stringify(tempArray));
    }
    //console.log(schedule);
  })
  