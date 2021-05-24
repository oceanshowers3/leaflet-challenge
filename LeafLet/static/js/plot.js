// Create map
var myMap = L.map("map", {
    center: [
        58.3019, -134.4197
    ],
    zoom: 5,
});

// Define layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 10,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

// Add layers to map
streetmap.addTo(myMap);

 // API endpoint
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Fetch earthquake json
d3.json(queryUrl, function(data) {

    // style map
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: mapColor(feature.properties.mag),
            color: "#000000",
            radius: mapRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // colors for magnitude sizes
    function mapColor(mag) {
        switch (true) {
            case mag > 5:
            return "#db170d";
            case mag > 4:
            return "#ff3300";
            case mag > 3:
            return "#ff9900";
            case mag > 2:
            return "#8be109";
            case mag > 1:
            return "#00e600";
            default:
            return "#00cccc";
        }
    }
    // radiuses for magnitude sizes
    function mapRadius(mag) {
      if (mag === 0) {
        return 1;
      }
  
      return mag * 4;
    }
    
  
  
    L.geoJson(data, {
  
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
  
      style: mapStyle,
  
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  
      }
    }).addTo(myMap);
  