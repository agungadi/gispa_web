$('#layermap .hamburger').on('click', function () {
    $(this).parent().toggleClass('open');
});

var ii = 1000;

var feat = new Array(ii);


function init_show_map() {
    var map = L.map('leafletmap', {
        zoomControl: false
    }).setView([-7.152479, 111.886929], 12);

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

            iconSize: [32, 37], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        }
    });

    var redMarker = new MarkerIcon({ iconUrl: 'leaflet/icons/redmarker.png' }),
        blueMarker = new MarkerIcon({ iconUrl: 'leaflet/icons/bluemarker.png' });

    var buildingLayers = L.layerGroup().addTo(map);


    L.geoJson(bldgData, {
        onEachFeature: function (feature, layer) {
            var thisLayer = layer;
            // layer.bindPopup(feature.properties.NAME);
            var $listItem = $('<li>').html(feature.properties.NAME).appendTo('#layermap ul');
            $listItem.on('click', function () {
                buildingLayers.clearLayers(); // remove existing markers
                var thisLat = thisLayer.feature.geometry.coordinates[1];
                var thisLon = thisLayer.feature.geometry.coordinates[0];
                map.panTo([thisLat, thisLon]);
                //thisLayer.addTo(map);
                buildingLayers.addLayer(thisLayer);
                var notifyIcon = L.divIcon({
                    className: 'notify-icon',
                    iconSize: [25, 25],
                    html: '<span></span>'
                });
                var notifyMarker = L.marker([thisLat, thisLon], { icon: notifyIcon });
                buildingLayers.addLayer(notifyMarker);

                if (map.getSize().x < 768) {
                    $('#layermap').removeClass('open');
                }
                thisLayer.on('click', function () { alert(thisLayer.feature.properties.NAME + " :: " + thisLayer.feature.properties.BODY); });
            });
        }


    });


    // var formData = {
    //     nama_tabel: "d['nama_tabel']",
    // };
    // console.log(formData);
    // console.log($('meta[name="csrf-token"]').attr('content'));

    // $.ajax({
    //     url: route('geografis.getlayer'),
    //     type: 'POST',
    //     data: formData,

    //     success: function success(result) {
    //         console.log(result);

    //     }
    // });

    console.log("ambil data");
    $.ajax({
        url: route('layer.index'),
        type: 'GET',
        success: function success(result) {

            var style = [];

            console.log(result.data);

            var datas = result.data;
            console.log("sstart");
            console.log(datas);
            $.each(datas, function (i, d) {
                var id = d['id'];
                console.log("wowowowwo");
                console.log(id);


                console.log(d.geografis);

                var formData = {
                    nama_tabel: d.geografis['nama_tabel'],
                };
                console.log(formData);

                var wkt = [];
                var wktObj = [];

                $.ajax({
                    url: route('geografis.getlayer'),
                    type: 'POST',
                    data: formData,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function success(result) {
                        console.log(result.data);
                        datas2 = result.data;

                        $.each(datas2, function (i2, d2) {


                            console.log(i2);
                            console.log("ambil data tingkat 2");
                            console.log(d2);
                            console.log(d2['geojson']);
                            wkt[i2] = new Wkt.Wkt();
                            wkt[i2].read(d2['geojson']);
                            console.log(wkt);

                            wktObj = wkt[i2].toObject();

                            console.log(wktObj);
                            console.log(feat);

                            feat[i2] = wkt[i2].toObject();

                            console.log(feat);

                            feat[i2].setStyle({
                                color: datas[i]['warna_border'],
                                fillColor: datas[i]['warna'],
                                fillOpacity: datas[i]['opacity'],
                                weight: datas[i]['tebal_border'],
                                opacity: datas[i]['opacity'],
                            });

                            feat[i2].addTo(map);


                            console.log("ambil data tingkat 22");
                            // console.log(feat);
                        })
                    }
                });

                // $.each(datas, function (i, d) {
                //     console.log(i);
                //     console.log("ambil data");

                //     console.log(d['nama_tabel']);

                //     var formData = {
                //         nama_tabel: d['nama_tabel'],
                //     };
                //     console.log(formData);

                //     var wkt = [];
                //     var wktObj = [];


                //     $.ajax({
                //         url: route('geografis.getlayer'),
                //         type: 'POST',
                //         data: formData,
                //         headers: {
                //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                //         },
                //         success: function success(result) {
                //             console.log(result.data);
                //             datas2 = result.data;
                //             $.each(datas2, function (i2, d2) {
                //                 console.log(i2);
                //                 console.log("ambil data tingkat 2");
                //                 console.log(d2);
                //                 console.log(d2['geojson']);
                //                 wkt[i2] = new Wkt.Wkt();


                //                 wkt[i2].read(d2['geojson']);
                //                 console.log(wkt);

                //                 wktObj = wkt[i2].toObject();

                //                 console.log(wktObj);


                //                 wktObj.setStyle({
                //                     color: "#000000",
                //                     fillColor: "#24e544",
                //                     fillOpacity: "0.9",
                //                     weight: "1",
                //                     opacity: "1",
                //                 });

                //                 wktObj.addTo(map);


                //                 console.log("ambil data tingkat 22");
                //                 // console.log(feat);


                //             });


                //         }
                //     });

                //     /// do stuff
                // });




            });

            // $.each(datas, function (i, d) {
            //     console.log(i);
            //     console.log("ambil data");

            //     console.log(d['nama_tabel']);

            //     var formData = {
            //         nama_tabel: d['nama_tabel'],
            //     };
            //     console.log(formData);

            //     var wkt = [];
            //     var wktObj = [];


            //     $.ajax({
            //         url: route('geografis.getlayer'),
            //         type: 'POST',
            //         data: formData,
            //         headers: {
            //             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //         },
            //         success: function success(result) {
            //             console.log(result.data);
            //             datas2 = result.data;
            //             $.each(datas2, function (i2, d2) {
            //                 console.log(i2);
            //                 console.log("ambil data tingkat 2");
            //                 console.log(d2);
            //                 console.log(d2['geojson']);
            //                 wkt[i2] = new Wkt.Wkt();


            //                 wkt[i2].read(d2['geojson']);
            //                 console.log(wkt);

            //                 wktObj = wkt[i2].toObject();

            //                 console.log(wktObj);


            //                 wktObj.setStyle({
            //                     color: "#000000",
            //                     fillColor: "#24e544",
            //                     fillOpacity: "0.9",
            //                     weight: "1",
            //                     opacity: "1",
            //                 });

            //                 wktObj.addTo(map);


            //                 console.log("ambil data tingkat 22");
            //                 // console.log(feat);


            //             });


            //         }
            //     });

            //     /// do stuff
            // });


        }
    });



}
