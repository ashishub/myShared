(function($){
  $(function(){

    console.log("Loaded the Reports page");
    $('#detailedLeadTbl').DataTable( {
        "pagingType": "simple_numbers",
        "autoWidth": false,
        "language": {
                        "emptyTable": "No assigned Leads in your region."
                    },
         "columns": [
                        null,
                        null,
                        null,
                        { "width": "140px" },
                        { "width": "150px" },
                        null,
                        null,
                        null,
                        { "orderable": false },
                        { "orderable": false, "visible": false }
                    ]
    } );

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
                var isMobileView = $('#mobileTable').is(':visible');
                if(isMobileView)
                {
                    addOrUpdateTableRows(startRowNo, endRowNo);
                }
                else
                {
                    loadDesktopTable();
                }
            }
            else
            {
                // when there are no assigned leads.
                // TODO
            }
        });
    }

    function loadDesktopTable()
    {
        var lead;
        var searchTerms, tableRow;
        for(var i = 0; i < leadResponse.length; i++)
        {
            lead = leadResponse[i];
            if(isEmptyOrBlank(lead.PartNumber) && $.trim(lead.PartNumber) != "")
            {
                searchTerms = $.trim(lead.PartNumber);
            }
            else
            {
                searchTerms = $.trim(lead.SearchedKeyword);
            }

            tableRow = 
            // '<tr>' +
            //         '<td>'+ searchTerms+'</td>' +
            //         '<td>$'+ lead.ListPrice +'</td>' +
            //         '<td>' + lead.PPSE_or_PRolink + '</td>' +
            //         '<td>' + lead.PartNumber + ' - ' + lead.Partdescription+ '</td>' +
            //         '<td>' + lead.NapaStoreNumber + ' - ' + lead.StoreName+ '</td>' +
            //         '<td>$'+ lead.CustomerName +'</td>' +
            //         '<td>$'+ lead.CustomerNumber +'</td>' +
            //         '<td>' + lead.DCName + ' / ' + lead.DCDivision+ '</td>' +
            //         '<td>' +
            //             '<a class="secondary-content btn-floating waves-effect waves-light editLead">' +
            //                 '<i class="tiny material-icons napaActionButton">mode_edit</i>' +
            //             '</a>' +
            //         '</td>' +
            // '</tr>';
            // $("#detailedLeadTbl > tbody").append(tableRow);
            $('#detailedLeadTbl').DataTable().row.add([
                searchTerms, 
                '$' + lead.ListPrice,
                // lead.PPSE_or_PRolink,
                'Response Received',
                lead.PartNumber + ' - ' + lead.Partdescription,
                lead.NapaStoreNumber + ' - ' + lead.StoreName,
                lead.CustomerName,
                lead.CustomerNumber,
                lead.DCName + ' / ' + lead.DCDivision,
                '<a class="secondary-content btn-floating waves-effect waves-light editLead">' +
                            '<i class="tiny material-icons napaActionButton">mode_edit</i>' +
                        '</a>',
                lead
                ]).draw( false );
        }

    }

    var table = $('#detailedLeadTbl').DataTable();

    $('#detailedLeadTbl tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    function addOrUpdateTableRows(startRow, endRow) 
    {
        var lead;
        var title, listPrice, storeQty, dcQty, storeName, tbRow, partDesc, customerName, applicationName;
        if(startRow <= leadResponse.length && leadResponse.length < endRow)
        {
            endRow = leadResponse.length;
        }
        else if (startRow > leadResponse.length || startRow <= 0)
        {
            // no rows to display.
            // TODO disable the next button.
            console.log("no rows to display");
            return;
        }
        startRowNo = startRow;
        endRowNo = endRow;
        $('ul#mobileTableContents').empty();
        for (var i = startRow - 1; i < endRow; i ++)
        {
            lead = leadResponse[i];
            title = "";
            listPrice = "";
            storeQty = "";
            dcQty = "";
            storeName = "";
            partDesc = "";
            customerName = "";
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
            if(!isEmptyOrBlank(lead.StoreName))
            {
                storeName = $.trim(lead.StoreName);
            }
            if(!isEmptyOrBlank(lead.CustomerName))
            {
                customerName = $.trim(lead.CustomerName);
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
                        
                        // 'Quantity - Store: ' + storeQty + ' | Dc: ' + dcQty + '<br>' +
                        'Qty - Store: <span class="greenBadge">' + storeQty + '</span> DC: <span class="yellowBadge">' + dcQty + '</span><br>' +
                        'Customer: ' + customerName + '<br>' +
                        'Store #: ' + storeName +
                        
                    '</p>' +
                    '<a class=" secondary-content btn-floating btn-small waves-effect waves-light editLeadMobile">' +
                        '<i class="napaActionButton material-icons">mode_edit</i>' +
                    '</a>' +
                '</li>';
            // $(tbRow).data("lead", lead);
            // console.log("lead.data() == "+$(tbRow).data("lead"));
            $('ul#mobileTableContents').append(tbRow);
            $( "ul#mobileTableContents li:last-child" ).data("lead", lead);
            console.log("from table li.data() == "+$( "ul#mobileTableContents li:last-child" ).data());
            
            if(i == endRow - 1)
            {
                // last recored reached. Stop.
                $('.tooltipped').tooltip({delay: 50});
                resetPaginationLabel();
            }

        }
    }
    
    $('#main-content').on('click', 'a.editLead', function() {
        table.$('tr.selected').removeClass('selected');
        $(this).closest("tr").addClass('selected');
        load_LeadsViewPage();
    });

    $('#main-content').on('click', 'a.editLeadMobile', function() {
        $('ul#mobileTableContents li.selected').removeClass('selected');
        $(this).closest("li").addClass('selected');
        load_LeadsViewPage();
    });

    function load_LeadsViewPage() {
        // clearContents();
        // $("#menuNavBar").removeClass("hiddendiv");
        // $("#main-content").load("pages/leadInfo/leadInfo.html");

        // $("#main-content").load("pages/leadInfo/leadModal.html");
        var leadsInfoModal = $("#leadsViewModal");
        if(null == leadsInfoModal || !leadsInfoModal.is("div"))
        {
            $.get("pages/leadInfo/leadModal.html", function(data){
                $("#main-content").append(data);
            });
        }
        else
        {
            loadLeadsModel();
        }
        // $(".modal").modal('open');
    }

    $(".paginationBtns").click(function() {
        console.log("id is " +$(this).attr('id'));
        var btnName = $(this).attr('id');
        var displayedNoOfRows = parseInt($('#rowsPerPageSelect').val());
        if(btnName == "forwardPage" && endRowNo != leadResponse.length)
        {
            startRowNo = endRowNo + 1;
            endRowNo = (endRowNo + displayedNoOfRows) > leadResponse.length ? leadResponse.length : (endRowNo + displayedNoOfRows);
            addOrUpdateTableRows(startRowNo, endRowNo);
        }
        else if(btnName == "backPage" && startRowNo != 1)
        {
            if((startRowNo - displayedNoOfRows) < 1) //21-30 = -9
            {
                startRowNo = 1;
                endRowNo = displayedNoOfRows;
            }
            else
            {
                endRowNo = startRowNo - 1; //subtract 1 from previous page start value (ex:- 21 - 1 = 20)
                startRowNo = startRowNo - displayedNoOfRows; //subtract 10 or no. of rows from previous page start value (ex:- 21 - 10 = 11)
            }
            addOrUpdateTableRows(startRowNo, endRowNo);
        }
    });

    function resetPaginationLabel() {
        $('#paginationText').text(startRowNo + "-" + endRowNo + " of " + leadResponse.length);
    }

    $('#rowsPerPageSelect').change(function() {
        var i;
        var requestedNoOfRows = $(this).val();
        noOfRowsDisplayed = $('ul#mobileTableContents li').length;
        var tableRow;
        if(requestedNoOfRows < noOfRowsDisplayed)
        {
            i = noOfRowsDisplayed - requestedNoOfRows;
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
            i = requestedNoOfRows - noOfRowsDisplayed;
            endRowNo = endRowNo + i;
            addOrUpdateTableRows(startRowNo, endRowNo );
        }
        noOfRowsDisplayed = requestedNoOfRows;
     
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