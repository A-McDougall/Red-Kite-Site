function openSelectionAreaTab(evt, inputName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-dr-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(inputName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

$('document').ready(function() {
    /* validation */
    $("#request_point_data").validate({
        rules:
        {
        },
        messages:
        {
        },
        submitHandler: fetch_point_dr
    });
    /* validation */

    /* get point data submit */
    function fetch_point_dr() {
        var sdata = $("#request_point_data").serializeArray();
        var data = {};
        var sdatao = [];
        for (var i=0; i<sdata.length; i++){
            sdatao[sdata[i].name] = sdata[i].value;
        }
        data = {lng: sdatao.p_lon, lat: sdatao.p_lat, col:"point_"};
        console.log(data);

        $.ajax({
            type: 'POST',
            url: 'php/get_point_mongo.php',
            data: data,
            beforeSend: function () {
                $("#error").fadeOut();
            },
            success: function (response) {
                console.log("Returned OK");
                console.log(response);

                if ( Object.keys(JSON.parse(response)).length === 0){
                    console.log('nothing here');
                    return;
                } else {
                    var returned = JSON.parse(response);
                    response = "ok";
                }

                if (response == "ok") {
                    // Prompt user to download data.
                    console.log('have data');
                    console.log(returned);
                    returned = JSON.stringify(returned);
                    download(returned, 'tmp.json', 'text/plain');
                }
                else {
                    console.log('Not OK response');
                    $("#error").fadeIn(1000, function () {
                        console.log(response);
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ' + response + '</div>');
                    });
                }
            },
            error: function (response) {
                console.log('Code error, failed to make data request for point');
                console.log(response);
                $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span>&nbsp; Log In');
            }
        });
        return false;
    }


    /* validation */
    $("#request_rectangle_data").validate({
        rules:
        {
        },
        messages:
        {
        },
        submitHandler: fetch_rectangle_dr
    });
    /* validation */

    /* get rectangle of data*/
    function fetch_rectangle_dr() {
        var sdata = $("#request_rectangle_data").serializeArray();
        var data = {};
        var sdatao = [];
        for (var i=0; i<sdata.length; i++){
            sdatao[sdata[i].name] = parseFloat(sdata[i].value);
        }
        var area = [[[sdatao.NW_lon, sdatao.NW_lat],
            [sdatao.NW_lon, sdatao.SE_lat],
            [sdatao.SE_lon, sdatao.SE_lat],
            [sdatao.SE_lon, sdatao.NW_lat],
            [sdatao.NW_lon, sdatao.NW_lat]]]
        data = {'area': area, col:"point_split"};
        console.log(data);

        $.ajax({
            type: 'POST',
            url: 'php/get_polygon_points_mongo.php',
            data: data,
            beforeSend: function () {
                $("#error").fadeOut();
            },
            success: function (response) {
                console.log("Returned OK");
                console.log(response);

                if ( Object.keys(JSON.parse(response)).length === 0){
                    console.log('nothing here');
                    return;
                } else {
                    var returned = JSON.parse(response);
                    response = "ok";
                }

                if (response == "ok") {
                    // Prompt user to download data.
                    console.log('have data');
                    console.log(returned);
                    returned = JSON.stringify(returned);
                    download(returned, 'tmp.json', 'text/plain');
                }
                else {
                    console.log('Not OK response');
                    $("#error").fadeIn(1000, function () {
                        console.log(response);
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ' + response + '</div>');
                    });
                }
            },
            error: function (response) {
                console.log('Code error, failed to make data request for point');
                console.log(response);
                $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span>&nbsp; Log In');
            }
        });
        return false;
    }


    /* validation */
    $("#request_circle_data").validate({
        rules:
        {
        },
        messages:
        {
        },
        submitHandler: fetch_circle_dr
    });
    /* validation */

    /* get rectangle of data*/
    function fetch_circle_dr() {
        var sdata = $("#request_circle_data").serializeArray();
        var data = {};
        var sdatao = [];
        for (var i=0; i<sdata.length; i++){
            sdatao[sdata[i].name] = sdata[i].value;
        }
        var centre = [sdatao.c_lon, sdatao.c_lat];
        data = {'centre': centre, 'rad': sdatao.c_rad, 'col': 'point_split'};
        console.log(data);

        $.ajax({
            type: 'POST',
            url: 'php/get_circle_points_mongo.php',
            data: data,
            beforeSend: function () {
                $("#error").fadeOut();
            },
            success: function (response) {
                console.log("Returned OK");
                console.log(response);

                if ( Object.keys(JSON.parse(response)).length === 0){
                    console.log('nothing here');
                    return;
                } else {
                    var returned = JSON.parse(response);
                    response = "ok";
                }

                if (response == "ok") {
                    // Prompt user to download data.
                    console.log('have data');
                    console.log(returned);
                    returned = JSON.stringify(returned);
                    download(returned, 'tmp.json', 'text/plain');
                }
                else {
                    console.log('Not OK response');
                    $("#error").fadeIn(1000, function () {
                        console.log(response);
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ' + response + '</div>');
                    });
                }
            },
            error: function (response) {
                console.log('Code error, failed to make data request for point');
                console.log(response);
                $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span>&nbsp; Log In');
            }
        });
        return false;
    }

});