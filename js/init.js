(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        // $("#main-content").load("pages/slgTable.html");

        // $("#menuNavBar").removeClass("hiddendiv");
        // $("#main-content").load("pages/leadsList.html");
        // document.getElementById("main-content").innerHTML='<object type="text/html" data="pages/leadsList.html" ></object>';

        load_loginPage();

        $("#profileLink").click(function() {
            $("#main-content").load("pages/slgReport.html");
        });

        $(".brand-logo, .logoutLink").click(function() {
            load_loginPage();
        });

        // $(".logoutLink").click(function() {
        //     load_loginPage();
        // });

        // $('#main-content').on('click', 'a.editLead', function() {
        //     load_LeadsViewPage();
        // });

        function load_loginPage() {
            clearContents();
            $("#menuNavBar").addClass("hiddendiv");
            $("#main-content").load("pages/login.html", function() {
                onLoginLoad();
            });
            //On clicking logout the side nav doesn;t close, this workaround.
            $('#sidenav-overlay').trigger( "click" );
        }

        // function load_LeadsViewPage() {
        //     // clearContents();
        //     // $("#menuNavBar").removeClass("hiddendiv");
        //     // $("#main-content").load("pages/leadInfo/leadInfo.html");

        //     // $("#main-content").load("pages/leadInfo/leadModal.html");
        //     var leadsInfoModal = $("#leadsViewModal");
        //     if(null == leadsInfoModal || !leadsInfoModal.is("div"))
        //     {
        //         $.get("pages/leadInfo/leadModal.html", function(data){
        //             $("#main-content").append(data);
        //         });
        //     }
        //     else
        //     {
        //         loadLeadsModel();
        //     }
        //     // $(".modal").modal('open');
        // }

        function clearContents() {
            /** Reset the Style : height has to be removed which was set while loading login page. */
            $('.tooltipped').tooltip('remove');
            $('.material-tooltip').remove();
            $('#main-content').removeAttr("style");
            $('#main-content').empty();
        }

        function onLoginLoad() {

            /** Set Height to window height so that the login form can be center aligned */
            var footerHeight = $('.page-footer').height();
            var newHeight = $(window).height() - footerHeight;
            var oldHeight = $('#main-content').height();

            if (newHeight > oldHeight) {
                $('#main-content').height(newHeight);
            }
            $('#main-content').addClass("valign-wrapper");

            /** On login buttin action */
            $("#logInBtn").click(function() {
                clearContents();
                $("#menuNavBar").removeClass("hiddendiv");
                // $("#main-content").load("pages/leadsList.html");
                $("#main-content").load("pages/report/slgMobileReport.html");
            });

        }

    }); // end of document ready
})(jQuery); // end of jQuery name space