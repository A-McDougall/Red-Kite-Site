// Set up tileserver urls to background layers
var sat_img = L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}', {
    type: 'xyz',
    apikey: 'pk.eyJ1IjoiYW1jZG91Z2FsbCIsImEiOiJjaW0zYTA3M2YwMHE0dWptNGM4ZG03cTdxIn0.8BVJcWpCkF99sDCR7JWf5Q',
    mapid: 'mapbox.satellite',
    attribution: 'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
});

var map_img = L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}', {
    url: 'https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
    type: 'xyz',
    apikey: 'pk.eyJ1IjoiYW1jZG91Z2FsbCIsImEiOiJjaW0zYTA3M2YwMHE0dWptNGM4ZG03cTdxIn0.8BVJcWpCkF99sDCR7JWf5Q',
    mapid: 'mapbox.streets',
    attribution: 'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
});




// Set the layers as object to put into the layer selector
var baseMaps = {
    "Satellite": sat_img,
    "Map": map_img
};

var dataLayers = {

};


// Initialise map with the defauly layers chosen  .setView([51.505, -0.09], 13);
var mymap = L.map('mapid',{
    center: [51.505, -0.09],
    zoom: 13,
    layers: [sat_img]
})

// Attach the layer selector to the map
L.control.layers(baseMaps, dataLayers).addTo(mymap);