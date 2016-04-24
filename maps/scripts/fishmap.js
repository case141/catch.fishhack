
var map = L.map('map').setView([25.761869,-79.926825], 10);    
//var lat = [25.761869, 25.764526, 25.785711, 25.782727, 25.755866, 25.743880, 25.858651,25.780767,25.688140,25.575893];
//var lon = [-79.926825, -79.929378, -79.941587, -79.958336, -79.892407, -79.949519, -79.869221, -79.758152, -79.601453, -79.855329];

var gearPoints = [];   

/*
[25.761869,-79.926825,100],
[25.764526,-79.929378,100],
[25.785711, -79.941587,100],
[25.755866,-79.892407,100],
[25.743880, -79.949519,100],
[25.858651, -79.869221,100],
[25.780767, -79.758152,100],
[25.688140, -79.601453,100],
[25.575893, -79.855329,100]
*/

var ref = new Firebase("https://sithack123.firebaseio.com/records");
ref.orderByChild("Date").on("child_added", function(snapshot) {
    var records = snapshot.val();
    var gearPoint = [];
    gearPoint.push(records.Latitude, records.Longitude, records.Intensity);
    gearPoints.push(gearPoint);
});

//var gearPoint = gearPoints[0];
//var lat = gearPoint[0];
//var lon = gearPoint[1];
//var intensity = gearPoint[2];


ACCESS_TOKEN = 'pk.eyJ1IjoiY2Fzc2V5bG93IiwiYSI6ImNpbmJlempxZTBuM2x2MGtxancwdWNuNG4ifQ.VX5m8_Z0bzR05B5tvcAUZQ';
MB_ATTR = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>';
MB_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + ACCESS_TOKEN;

L.tileLayer(MB_URL, {attribution: MB_ATTR, id: 'casseylow.podmh4l5'}).addTo(map);
 
        
var heat = L.heatLayer(gearPoints,{
    radius: 20,
    blur: 14, 
    maxZoom: 17,
}).addTo(map);