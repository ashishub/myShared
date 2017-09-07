$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered

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

  });