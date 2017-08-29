(function($){
  $(function(){

    console.log("Loaded the Reports page");

    var noOfRowsDisplayed = 10;
    var startRowNo = 1;
    var endRowNo = 10;

    $('select').material_select();

    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

  $('#rowsPerPageSelect').change(function() {
    var requestedNoOfRows = $(this).val();
    noOfRowsDisplayed = $('#mobileTable ul li').length;
    if(requestedNoOfRows < noOfRowsDisplayed)
    {
        var i = noOfRowsDisplayed - requestedNoOfRows;
        while (i > 1)
        {
            $('#mobileTable ul li:last-child').remove();
            i--;
        }
    }
    else
    {
        // add 
    }
     
});

// $('.datepicker').pickadate({
//     selectMonths: true, // Creates a dropdown to control month
//     selectYears: 15 // Creates a dropdown of 15 years to control year
//   });

//   $('.datepicker').pickadate({
//       selectMonths: true, // Creates a dropdown to control month
//     selectYears: 15, // Creates a dropdown of 15 years to control year,
//   labelMonthNext: 'Next month',
//   labelMonthPrev: 'Previous month',
//   labelMonthSelect: 'Select a month',
//   labelYearSelect: 'Select a year',
//   monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
//   monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
//   weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
//   weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
//   weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
//   today: 'Today',
//   clear: 'Clear',
//   close: 'Ok',
//   closeOnSelect: false // Close upon selecting a date,
// });

  }); // end of document ready
})(jQuery); // end of jQuery name space