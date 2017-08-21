// logout process from the app back to the frontpage

$('#login_header').click(function() {
    console.log(document.getElementById('login_header'));
    if (document.getElementById('login_header').innerHTML=="LOG IN") {
        isOpenCheck = 0;
        $('#login-modal').dialog('open');
    }else{
        $.ajax({
            url: 'php/logout.php',
            async: false,
            success: function(data) {
                console.log('Goodbye: logged out');
                userUnready();
                setTimeout(function(){window.location.href = "./";},1000);
            }
        });
    }

});