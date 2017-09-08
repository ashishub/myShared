$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered

    var lead;
    loadLeadsModel();
    $('.collapsible').collapsible();
    $('select').material_select();

    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );

    assignValues();
    function assignValues()
    {
        var searchTerms;
        var isMobileView = $('#mobileTable').is(':visible');
        if(isMobileView)
        {
            lead = $('ul#mobileTableContents li.selected').data('lead');
        }
        else
        {
            lead = $('#detailedLeadTbl').DataTable().row( '.selected' ).data()[9];
        }
        if(isEmptyOrBlank(lead.PartNumber) && $.trim(lead.PartNumber) != "")
        {
            searchTerms = $.trim(lead.PartNumber);
            // $(".partInfo").show();
            // console.log("showing partinfo")
        }
        else
        {
            searchTerms = $.trim(lead.SearchedKeyword);
            // $(".partInfo").hide();
        }
        console.log("Search term is::"+searchTerms);
        $("#searchLbl").text(searchTerms);
        $("#partDesc").text(lead.Partdescription);
        $("#AppTxtInp").val(lead.PPSE_or_PRolink);
        $("#partNo").text(lead.PartNumber);
        $("#ListPriceTxtInp").val('$' + lead.ListPrice);
        $("#storeNoTxtInp").val(lead.NapaStoreNumber);
        $("#custNameInputTxt").val(lead.CustomerName);
        $("#custNoTxtInp").val(lead.CustomerNumber);
        $("#storeNameTxtInp").val(lead.StoreName);
        $("#storeQtyTxt").val(lead.Store_Quantity);
        $("#dcQtyTxt").val(lead.DC_Quantity);
        $("#dcNameInputTxt").val(lead.DCName);
        $("#dcDivTxtInp").val(lead.DCDivision);
        $("#prodLine").text(lead.LineCode);

        if(lead.PartNumber)

        console.log("selected value ::" +lead);
        Materialize.updateTextFields();
    }

    function loadLeadsModel()
    {
        $('.modal').modal({
            dismissible: false,
            inDuration: 400, // Transition in duration
            outDuration: 400, // Transition out duration
        });
        console.log("opening modal");
        $(".modal").modal('open');
    }

    $('.modal').focus(function() {
        loadLeadsModel();
    });

    $(".modal-close").click(function()
    {
        console.log("removing the modal!!");
        $("#leadsViewModal").remove();
    });

    Materialize.updateTextFields();

    function isEmptyOrBlank(checkObject)
    {
        if(undefined != checkObject && null != checkObject)
        {
            return false;
        }
        return true;
    }

  });