/**
 * Created by earamc on 18/07/2017.
 */

if (typeof api_key === "undefined"){
    var users_api_key = '';
}
if (typeof users_max_zoom === "undefined") {
    var users_max_zoom = 14;
}
if (typeof users_centre === "undefined") {
    var users_centre = [-0.12598, 51.506789];
}

function get_api(){
    return $.ajax({
        url: 'php/get_users_api.php',
        // async: false,
        success: function(data) {
            users_api_key = data;
            localStorage.users_api_key = users_api_key;
            if (!localStorage.users_api_key) {console.log('No localStorage api key'); window.location.href = "./"; }
        },
        error: function(xhr, desc, err) {
            localStorage.removeItem(users_api_key);
            console.log('No apikey');
        }
    });
}

function get_zoom(){
    return $.ajax({
        url: 'php/get_users_max_zoom.php',
        // async: false,
        success: function(data) {
            users_max_zoom = data;
            localStorage.users_max_zoom = users_max_zoom;
        },
        error: function(xhr, desc, err) {
            localStorage.removeItem(users_max_zoom);
            console.log('Not logged in');
        }
    });
}

function get_location(setCentre){
    return $.ajax({
        url: 'php/get_users_location.php',
        success: function(data) {
            if (data == ""){
                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        users_centre = [position.coords.longitude, position.coords.latitude];
                        localStorage.users_centre = users_centre;

                        if (typeof setCentre === 'function'){setCentre(users_centre);}

                    });
                }

                function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
                }
            }
            else{
                users_centre = JSON.parse(data);
            }
            localStorage.users_centre = users_centre;
            console.log('ajax centre: '+users_centre);
        },
        error: function(xhr, desc, err) {
            users_centre = [0, 0];
            localStorage.removeItem(users_centre);
            console.log('Not logged in');
        }
    });
}

function storedAPI(){
    api_key = localStorage.users_api_key;
    console.log('storedAPI key: '+api_key);
    return api_key;
}
function storedZoom(){
    max_zoom = localStorage.users_max_zoom;
    console.log('stored users_max_zoom: '+max_zoom);
    return max_zoom;
}
function storedLocation(){
    location = localStorage.users_centre;
    console.log('stored users_centre: '+location);
    arr = [parseFloat(location.split(",")[0],10), parseFloat(location.split(",")[1],10)];

    return arr;
}


function userReady(){
    return $.when(get_api(), get_zoom(), get_location())
}