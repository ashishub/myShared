(function($){
  $(function(){

    console.log("Loaded the Reports page");

    var noOfRowsDisplayed = 10;
    var startRowNo = 1;
    var endRowNo = 10;
    var leadResponse = null;

    /** initialize dropdown for MaterializeCSS */
    $('select').material_select();
    $('.tooltipped').tooltip({delay: 50});

    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

    function isEmptyOrBlank(checkObject)
    {
        if(undefined != checkObject && null != checkObject)
        {
            return false;
        }
        return true;
    }

    loadLeads();


    // TODO
    function nextClicked() 
    {

    }

    /** Call webservice and get the data from back end */
    function loadLeads() 
    {
        $.get('data/SLG_Mock.json', function(data) 
        {
            console.log("data:: "+ data );
            console.log("message is::"+ data.response[0]);
            if(undefined != data && null != data && undefined != data.response && null != data.response && data.response.length > 0)
            {
                leadResponse = data.response;
                if(data.response.length < noOfRowsDisplayed)
                {
                    noOfRowsDisplayed = data.response.length;
                    startRowNo = 1;
                    endRowNo = noOfRowsDisplayed;
                }
                else
                {
                    startRowNo = 1;
                    endRowNo = noOfRowsDisplayed;
                }
                loadTable(startRowNo, endRowNo);
            }
            else
            {
                // when there are no assigned leads.
                // TODO
            }
        });
    }

    function loadTable(startRow, endRow) 
    {
        var lead;
        var title, listPrice, storeQty, dcQty, storeNum, tbRow, partDesc;
        if(startRow < leadResponse.length && leadResponse.length < endRow)
        {
            endRow = leadResponse.length;
        }
        else if (startRow > leadResponse.length)
        {
            // no rows to display.
            // TODO disable the next button.
            console.log("no rows to display");
            return;
        }
        startRowNo = startRow;
        endRowNo = endRow;
        for (var i = startRow - 1; i < endRow; i ++)
        {
            lead = leadResponse[i];
            title = "";
            listPrice = "";
            storeQty = "";
            dcQty = "";
            storeNum = "";
            if(isEmptyOrBlank(lead.PartNumber) && $.trim(lead.PartNumber) != "")
            {
                title = $.trim(lead.PartNumber);
            }
            else
            {
                title = $.trim(lead.SearchedKeyword);
            }
            if(!isEmptyOrBlank(lead.ListPrice))
            {
                listPrice = $.trim(lead.ListPrice);
            }
            if(!isEmptyOrBlank(lead.Partdescription))
            {
                partDesc = $.trim(lead.Partdescription);
            }
            if(!isEmptyOrBlank(lead.Store_Quantity))
            {
                storeQty = $.trim(lead.Store_Quantity);
            }
            if(!isEmptyOrBlank(lead.DC_Quantity))
            {
                dcQty = $.trim(lead.DC_Quantity);
            }
            if(!isEmptyOrBlank(lead.NapaStoreNumber))
            {
                storeNum = $.trim(lead.NapaStoreNumber);
            }

            tbRow = '<li class="collection-item avatar">' +
                    '<img src="images/header_logo.png" alt="" class="circle">';
            if($.trim(partDesc) == "")
            {
                tbRow = tbRow + '<span class="title"><strong>'+ title +'</strong></span>'; 
            }
            else
            {
                tbRow = tbRow + '<span class="title tooltipped" data-position="top" data-delay="50" data-tooltip="'+ partDesc +'"><strong>'+ title +'</strong><i class="tiny material-icons napaBlue">info</i></span>'; 
            }
            if(storeQty == "")
            {
                storeQty = "N/A";
            }
            if(dcQty == "")
            {
                dcQty = "N/A";
            }
            tbRow = tbRow +     
                    '<p>' +
                        'List Price: $' +listPrice+ ' <br> ' +
                        'Store #: ' + storeNum + '<br>' +
                        
                        // 'Quantity - Store: ' + storeQty + ' | Dc: ' + dcQty + '<br>' +
                        'Quantity - Store: <span class="greenBadge">' + storeQty + '</span> DC: <span class="yellowBadge">' + dcQty + '</span><br>' +
                        
                    '</p>' +
                    '<a class=" secondary-content btn-floating btn-small waves-effect waves-light napaActionButton">' +
                        '<i class="small material-icons">mode_edit</i>' +
                    '</a>' +
                '</li>'; 
            $('ul#mobileTableContents').append(tbRow);
            if(i == endRow - 1)
            {
                // last recored reached. Stop.
                $('.tooltipped').tooltip({delay: 50});
                resetPaginationLabel();
            }

        }
    } 

    function resetPaginationLabel() {
        $('#paginationText').text(startRowNo + "-" + endRowNo + " of " + leadResponse.length);
    }

  $('#rowsPerPageSelect').change(function() {
    //   loadLeads();

    var requestedNoOfRows = $(this).val();
    noOfRowsDisplayed = $('ul#mobileTableContents li').length;
    var tableRow;
    if(requestedNoOfRows < noOfRowsDisplayed)
    {
        var i = noOfRowsDisplayed - requestedNoOfRows;
        endRowNo = endRowNo - i;
        while (i > 0)
        {
            tableRow = $('ul#mobileTableContents li:last-child');
            $('ul#mobileTableContents li:last-child').remove();
            i--;
        }
        resetPaginationLabel();
    }
    else
    {
        // add 
        // TODO
    }
     
});

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