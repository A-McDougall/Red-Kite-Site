// Login process for a use from the front page.

$('document').ready(function()
{
    /* validation */
    $("#login-form").validate({
        rules:
        {
            password: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
        },
        messages:
        {
            password:{
                required: "please enter your password"
            },
            email: "please enter your e-mail address",
        },
        submitHandler: submitForm
    });
    /* validation */

    /* login submit */
    function submitForm()
    {
        var data = $("#login-form").serialize();

        $.ajax({
            type : 'POST',
            url  : 'php/loginProcess.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
            },
            success :  function(response)
            {
                if(response=="ok"){

                    $("#btn-login").html('<img src="img/btn-ajax-loader-sml.gif" /> &nbsp; Signing In ...');
                    userReady().done(
                        function(){setTimeout(function(){window.location.href = "./app.html";}, 2500);}
                    );
                }
                else{
                    $("#error").fadeIn(1000, function(){
                        console.log(response);
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+'</div>');
                        $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span>&nbsp; Log In');
                    });
                }
            },
            error : function(response)
            {
                console.log('Code error, failed to make login request to server');
                console.log(response);
                $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span>&nbsp; Log In');
            }
        });
        return false;
    }
});