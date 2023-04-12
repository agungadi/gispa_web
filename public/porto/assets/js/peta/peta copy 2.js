$(document).ready(function () {


    var ii = 1000;

    var feat = new Array(ii);
    var markerpatok = new Array(ii);


    //$('#sidebar').hide();


    // function init_show_map() {


    var map = L.map('leafletmap', {
        zoomControl: true,
        measureControl: true
    }).setView([-7.152479, 111.886929], 12);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
    }).addTo(map);


    var sidebar = L.control.sidebar({ container: 'sidebar', autopan: true, position: 'right' })
        .addTo(map);
    sidebar.on('content', function (e) {
        console.log(e);
    })

    // new L.Control.Zoom({
    //     position: 'topright'
    // }).addTo(map);



    // Setting the company logo as a custom icon
    let myIcon = L.divIcon({
        iconUrl: 'https://w7.pngwing.com/pngs/592/2/png-transparent-map-location-breckenridge-lyon-villa-map-marker-angle-business-travel-world.png',
        iconSize: [45, 72],
        iconAnchor: [22.5, 72],
        popupAnchor: [0, -72]
    });





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



    // L.geoJson(bldgData, {
    //     onEachFeature: function (feature, layer) {
    //         var thisLayer = layer;
    //         // layer.bindPopup(feature.properties.NAME);
    //         var $listItem = $('<li>').html(feature.properties.NAME).appendTo('#layermap ul');
    //         $listItem.on('click', function () {
    //             buildingLayers.clearLayers(); // remove existing markers
    //             var thisLat = thisLayer.feature.geometry.coordinates[1];
    //             var thisLon = thisLayer.feature.geometry.coordinates[0];
    //             map.panTo([thisLat, thisLon]);
    //             //thisLayer.addTo(map);
    //             buildingLayers.addLayer(thisLayer);
    //             var notifyIcon = L.divIcon({
    //                 className: 'notify-icon',
    //                 iconSize: [25, 25],
    //                 html: '<span></span>'
    //             });
    //             var notifyMarker = L.marker([thisLat, thisLon], { icon: notifyIcon });
    //             buildingLayers.addLayer(notifyMarker);

    //             if (map.getSize().x < 768) {
    //                 $('#layermap').removeClass('open');
    //             }
    //             thisLayer.on('click', function () { alert(thisLayer.feature.properties.NAME + " :: " + thisLayer.feature.properties.BODY); });
    //         });
    //     }


    // });

    // console.log("ambil patok");
    $.ajax({
        url: route('patok.index'),
        type: 'GET',
        success: function success(result) {
            console.log("ambil patok");
            console.log(result.data);
            var datapatok = result.data;
            var wkt = [];
            var wktObj = [];
            var temp = [];

            $.each(datapatok, function (i, d) {
                console.log("tahap1")
                // console.log("POINT"+d['point_latlng'])

                if (d['longlat'] != null) {


                    // var wkt_geom = "POINT(111.87572166666665, -7.267805)";

                    var namafield = '';
                    temp[i] = "<table>";

                    // if (namafield != '') {
                    console.log("lastt tempp 11111");
                    // console.log(d2[keys[k]]);
                    temp[i] = temp[i] +
                        `<tr>
                    <td>`
                        + d['nama'] +
                        `</td>
                    <td>:</td>
                    <td>` + d['ruas_jalan'] +
                        `</td>
                </tr>`;
                    // detail = `<button"> Detail</button>`;
                    // if (arr2[0]['jenis_layer'] == 'kolom') {
                    //     detail = `<button "> Detail</button>`;
                    // }
                    // }

                    // var f = d['point_latlng'].split(",");
                    // console.log(f);
                    // var pt_geom = "POINT("+f[0]+", "+ f[1]+")";
                    // console.log(pt_geom);

                    wkt[i] = new Wkt.Wkt();
                    wkt[i].read(d['longlat']);

                    redMarker = new MarkerIcon({ iconUrl: 'leaflet/icons/redmarker.png' }),

                        blueMarker = new MarkerIcon({ iconUrl: 'leaflet/icons/bluemarker.png' });

                    // "greenIcon from official documentation noted above.

                    if (d["hilang"] == "Tidak" && d["rusak"] == "Tidak" && d["terhalang"] == "Tidak" && d["geser"] == "Tidak") {
                        var feature = wkt[i].toObject({ icon: blueMarker });

                    } else {
                        var feature = wkt[i].toObject({ icon: redMarker });

                    }

                    // Presumably featureGroup is already instantiated and added to your map.
                    feature.addTo(map);
                    feature.bindPopup(temp[i]);

                    // var koor = "POINT(-7.267805,111.87572166666665)";
                    // wkt = new Wkt.Wkt();
                    // wkt.read(koor);
                    // // wktObj = wkt[i].toObject();
                    // blueMarker = new MarkerIcon({ iconUrl: 'leaflet/icons/bluemarker.png' });
                    console.log("tahap2")

                    // console.log("POINT"+d['point_latlng'])


                    // temp[i] = wktObj({ icon: blueMarker });
                    // temp[i].addTo(map);

                    console.log("tahap3")

                }



            });



        }
    });


    // console.log("ambil data");
    $.ajax({
        url: route('layer.index'),
        type: 'GET',
        success: function success(result) {

            var style = [];


            var datas = result.data;
            console.log("sstart");
            console.log(datas);
            $.each(datas, function (i, d) {
                if (d.geografis['kelompok_data'] == 1) {
                    console.log("huahauhauha00000");
                    $('#keljalan').append(`
                    <button type="button" class="accordion" id="accordion">
                    <span class="accordion-title">
                        ${d.geografis['nama']}
                    </span>
                    </button>
                        <div class="panel" id="layers${d.geografis['id']}">

                        <div class="grid-containers">
                        <div class="cellss switch">
                            <div class="switch__1">
                                <input id="switch-1" type="checkbox">
                                <label for="switch-1"></label>
                            </div>
                            <div class="largess">
                                <p style="font-size: 0.9em"> What is the web web What is the web web </p>
                            </div>
                        </div>
                    </div>
                    <div class="grid-containers">
                        <div class="cellss switch">
                            <div class="switch__1">
                                <input id="switch-3" type="checkbox">
                                <label for="switch-3"></label>
                            </div>
                            <div class="largess">
                                <p style="font-size: 0.85em"> What is the web web What is the web web </p>
                            </div>
                        </div>
                    </div>
                    </div>
                        `)
                    } else {
                        $('#kelbatas').append(`
                        <button type="button" class="accordion" id="accordion">
                        <span class="accordion-title">
                            ${d.geografis['nama']}
                        </span>
                    </button>
                    <div class="panel" id="layers${d.geografis['id']}">
                    <div class="grid-containers">
                    <div class="cellss switch">
                        <div class="switch__1">
                            <input id="switch-1" type="checkbox">
                            <label for="switch-1"></label>
                        </div>
                        <div class="largess">
                            <p style="font-size: 0.9em"> What is the web web What is the web web </p>

                        </div>
                    </div>

                </div>
                <div class="grid-containers">
                    <div class="cellss switch">
                        <div class="switch__1">
                            <input id="switch-3" type="checkbox">
                            <label for="switch-3"></label>
                        </div>
                        <div class="largess">
                            <p style="font-size: 0.85em"> What is the web web What is the web web </p>
                        </div>
                    </div>
                </div>
                    </div>
                    `)

                }
                var id = d['id'];
                console.log("wowowowwo");
                console.log(datas.length);

                console.log(id);

                feat[id] = new Array(datas.length);
                console.log(feat[id]);


                console.log(d.geografis);

                var formData = {
                    nama_tabel: d.geografis['nama_tabel'],
                };
                console.log(formData);

                var wkt = [];
                var wktObj = [];
                var temp = [];


                $.ajax({
                    url: route('geografis.getlayer'),
                    type: 'POST',
                    data: formData,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function success(result) {
                        console.log("sia sia sia");

                        console.log(result.data);
                        console.log("sia sia sia");
                        datas2 = result.data;

                        $.each(datas2, function (i2, d2) {




                            var keys = Object.keys(d2);
                            var detail = '';


                            console.log(keys);
                            console.log("ambil data tingkat 2");
                            console.log(d2);
                            // console.log(d2['geojson']);
                            wkt[i2] = new Wkt.Wkt();
                            wkt[i2].read(d2['geojson']);
                            // console.log(wkt);

                            wktObj = wkt[i2].toObject();

                            console.log(wktObj);
                            console.log(feat);

                            feat[id][i2] = wkt[i2].toObject();

                            // console.log(feat);

                            temp[i2] = "<table>";
                            for (var k = 0; k < keys.length; k++) {
                                if ((keys[k] != 'id') && (keys[k] != 'geojson') && (keys[k] != "created_at") && (keys[k].substr(0, 1) != '_')) {
                                    var namafield = '';
                                    console.log("temp awal");
                                    console.log(keys[k]);

                                    for (var n = 1; n < 8; n++) {
                                        var ff = d.geografis['field' + n];
                                        // console.log(d.geografis);

                                        // console.log(ff);
                                        if (ff) {
                                            var f = ff.split("||");
                                            // console.log(f);

                                            if (f[1] == keys[k]) {
                                                namafield = f[2];

                                            }
                                            console.log(namafield);

                                        }

                                    }
                                    if (namafield != '') {
                                        console.log("lastt tempp");
                                        console.log(k);
                                        console.log(d2[keys[k]]);
                                        temp[i2] = temp[i2] +
                                            `<tr>
                                            <td>`
                                            + namafield +
                                            `</td>
                                            <td>:</td>
                                            <td>` + d2[keys[k]] +
                                            `</td>
                                        </tr>`;
                                        detail = `<button"> Detail</button>`;
                                        // if (arr2[0]['jenis_layer'] == 'kolom') {
                                        //     detail = `<button "> Detail</button>`;
                                        // }
                                    }
                                }
                            }

                            console.log("keyssss");
                            console.log(d2[keys]);

                            $("#layers" + d.geografis['id']).append(`
                            <div class="grid-containers">
                            <div class="cellss switch">
                                <div class="switch__1">
                                    <input id="switch-1" type="checkbox">
                                    <label for="switch-1"></label>
                                </div>
                                <div class="largess">
                                    <p style="font-size: 0.9em"> ${d2[keys[1]]} </p>
                                </div>
                            </div>
                        </div>
                            `)

                            feat[id][i2].setStyle({
                                color: datas[i]['warna_border'],
                                fillColor: datas[i]['warna'],
                                fillOpacity: datas[i]['opacity'],
                                weight: datas[i]['tebal_border'],
                                opacity: datas[i]['opacity'],
                            });

                            feat[id][i2].addTo(map);
                            // .bindPopup(
                            //     L.popup({}).setContent(
                            //         `<h3>${options.name}</h3>
                            //         <p>${options.adress}</p>
                            //         <p>${options.postalCode}, ${options.city}</p>
                            //         <div class="links">
                            //           <a href="${options.website[0]}">${options.website[1]}</a>
                            //           <a href="${options.socialMedia[0]}">${options.socialMedia[1]}</a>
                            //         </div>`
                            //     )
                            //   )
                            // .openPopup();

                            feat[id][i2].bindPopup(temp[i2]);

                            console.log("ambil data tingkat 22");
                            // console.log(feat);


                        })


                    }

                });




            });



            const accordion = document.querySelectorAll(".accordion");

            accordion.forEach((element) => {
                element.addEventListener("click", () => {
                    element.classList.toggle("active");
                    let panel = element.nextElementSibling;
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null;
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                });
            });

            console.log(accordion);


        }
    });





    // }

});
