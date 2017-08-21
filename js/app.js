// Default layer selection
var active_overlay = 'velocity';
var legend_value = 'Average Velocity';
var displacement_units = "mm/year";


// Colour scale min and max default values.
var scale_min = 0;
var scale_max = 1;

// Set up tileserver urls to background layers
var sat_img = L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}', {
    type: 'xyz',
    apikey: 'pk.eyJ1IjoiYW1jZG91Z2FsbCIsImEiOiJjaW0zYTA3M2YwMHE0dWptNGM4ZG03cTdxIn0.8BVJcWpCkF99sDCR7JWf5Q',
    mapid: 'mapbox.satellite',
    attribution: 'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: storedZoom()
});

var map_img = L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}', {
    url: 'https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    type: 'xyz',
    apikey: 'pk.eyJ1IjoiYW1jZG91Z2FsbCIsImEiOiJjaW0zYTA3M2YwMHE0dWptNGM4ZG03cTdxIn0.8BVJcWpCkF99sDCR7JWf5Q',
    mapid: 'mapbox.streets',
    attribution: 'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: storedZoom()
});

var vel_img = L.tileLayer('https://red-kite-dev.leeds.ac.uk/tiles/insar_mapnik_mongo_red_kite_vel_test/{z}/{x}/{y}.png?access_token={user_api}&{cache_min_max}', {
    type: 'xyz',
    user_api: storedAPI(),
    cache_min_max: function(){ return ""+scale_min+scale_max;},
    showOnSelection: true,
    max_zoom: storedZoom()
});

var accel_img = L.tileLayer('https://red-kite-dev.leeds.ac.uk/tiles/insar_mapnik_mongo_red_kite_accel_test/{z}/{x}/{y}.png?access_token={user_api}&{cache_min_max}', {
    type: 'xyz',
    user_api: storedAPI(),
    cache_min_max: function(){ return ""+scale_min+scale_max;},
    showOnSelection: true,
    max_zoom: storedZoom()
});

var amp_img = L.tileLayer('https://red-kite-dev.leeds.ac.uk/tiles/insar_mapnik_mongo_red_kite_amp_test/{z}/{x}/{y}.png?access_token={user_api}&{cache_min_max}', {
    type: 'xyz',
    user_api: storedAPI(),
    cache_min_max: function(){ return ""+scale_min+scale_max;},
    showOnSelection: true,
    max_zoom: storedZoom()
});



// Set the layers as object to put into the layer selector
var baseMaps = {
    "Satellite": sat_img,
    "Map": map_img
};

var dataLayers = L.layerGroup();
dataLayers = {
    "Velocity": vel_img,
    "Acceleration": accel_img,
    "Amplitude": amp_img
};


// Initialise map with the defauly layers chosen  .setView([51.505, -0.09], 13);
var mymap = L.map('mapid',{
    center: [51.505, -0.09],
    zoom: 13,
    layers: [sat_img, vel_img]
});

// Attach the layer selector to the map
L.control.layers(baseMaps, dataLayers).addTo(mymap);



