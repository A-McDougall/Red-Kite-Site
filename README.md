## Synopsis

A live interactive visualisation tool of the red-kite data products. Build using leaflet-angular, and bootstrap. It uses D3 to do the graphing, and requires the tilesever behind the scenes, which fetchs data from a mongoDB database.

The live site is all inside the Proof of Concept (PoC) branch. This has some very deep file trees, that may hit the structure limit of some operating systems (file path name too long). The problem files/directories came from installing node modules using "npm". The in development re-design of the website (master branch), should remove this problem.

In the original live site, all the main work for the interactive map exists in the "js/map_viewer.js" file. This has a section where you instruct the application where to get the data from (tileLayers). This performs a url request to the tileserver.

## Code Example

To add new data layers to the map, add a object value to the "overlays" key, following the same format as the current layers:

    acceleration: {
        name: 'Acceleration',
        url: 'https://red-kite-dev.leeds.ac.uk/tiles/insar_mapnik_mongo_red_kite_accel_test/{z}/{x}/{y}.png?access_token={user_api}&{cache_min_max}',
        type: 'xyz',
        visible: false,
        doRefreash: false,
        layerParams: {
            showOnSelector: true // hides the toggle box in the layers menu
        },
        layerOptions: {
            cache_min_max: function(){ return ""+scale_min+scale_max;},
            user_api: storedAPI(),
            maxZoom: users_max_zoom
        }
    },

This will also require the addition of the relevent python handlers in the tileserver so that it knows what data to fetch from the database in response to this "url" request. The key part to change in the url to vary the data retrieval is "insar_mapnik_mongo_red_kite_accel_test".
## Motivation

To visualise the output results of the red-kite processing in an interactive and intuative way.

## Installation

Clone the entire repository to the public facing directory of the web host. Ensure the "php/dbConfig.php" file has the correct database settings in to be able to talk to the database.

Create an account on mapbox and get your own "apikey" which needs to be inserted into the baselayers:layerOptions:apikey property in the app.controller.

The webhost will need to be able to support PHP, and have network access to the database servers. I suggest setting up Apache.

## Tests

Do all updates and tests on a local dev version, or at least only push changes to the red-kite-dev-test website that is only visible on the internal network before pushing and changes to the live system.