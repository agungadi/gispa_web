$('#layermap .hamburger').on('click', function() {
    $(this).parent().toggleClass('open');
  });

    var map = L.map('leafletmap',  {zoomControl: false}).setView([-7.152479, 111.886929], 12);

    L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
                maxZoom: 18,
            }).addTo(map);

            new L.Control.Zoom({
                position: 'topright'
              }).addTo(map);


            var MarkerIcon = L.Icon.extend({
                options: {

                iconSize:     [32, 37], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            });

            var redMarker = new MarkerIcon({iconUrl: 'leaflet/icons/redmarker.png'}),
                blueMarker = new MarkerIcon({iconUrl: 'leaflet/icons/bluemarker.png'});

                var buildingLayers = L.layerGroup().addTo(map);


  L.geoJson(bldgData, {
    onEachFeature: function(feature, layer) {
      var thisLayer = layer;
      // layer.bindPopup(feature.properties.NAME);
      var $listItem = $('<li>').html(feature.properties.NAME).appendTo('#layermap ul');
      $listItem.on('click', function(){
        buildingLayers.clearLayers(); // remove existing markers
        var thisLat = thisLayer.feature.geometry.coordinates[1];
        var thisLon = thisLayer.feature.geometry.coordinates[0];
        map.panTo([thisLat,thisLon]);
        //thisLayer.addTo(map);
        buildingLayers.addLayer(thisLayer);
        var notifyIcon = L.divIcon({
          className: 'notify-icon',
          iconSize: [25, 25],
          html: '<span></span>'
          });
        var notifyMarker = L.marker([thisLat,thisLon], {icon: notifyIcon});
        buildingLayers.addLayer(notifyMarker);

        if(map.getSize().x < 768){
          $('#layermap').removeClass('open');
        }
        thisLayer.on('click', function(){alert(thisLayer.feature.properties.NAME + " :: " + thisLayer.feature.properties.BODY);});
      });
    }
  });

