(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        // $("#main-content").load("pages/slgTable.html");
        $("#main-content").load("pages/leadsList.html");
        // document.getElementById("main-content").innerHTML='<object type="text/html" data="pages/leadsList.html" ></object>';

        $("#profileLink").click(function() {
            $("#main-content").load("pages/slgReport.html");
        });

        $("#logoutLink").click(function() {
            $("#main-content").load("pages/slgTable.html");
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space