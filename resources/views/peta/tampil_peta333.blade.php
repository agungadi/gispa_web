@extends('layouts.appmap')
@section('title')
    Data Geografis
@endsection
@section('css')

{{-- <link href="{{ asset('leaflet/leaflet.css') }}" rel="stylesheet" type="text/css"> --}}
{{-- <script src="{{ asset('porto/assets/js/jquery.min.js') }}"></script> --}}
{{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" /> --}}

<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
<link rel='stylesheet' href='https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'><link rel="stylesheet" href="./style.css">


<style type="text/css">
    .full-container {
    padding: 0px !important;
    margin: 0;
    position: absolute;
    top: 9%;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>


@endsection

@section('content')

{{-- <body class="container"> --}}
{{-- <div class="full-container">
     </div> --}}

     <div id="mapwrap">
{{--
        <div id="layermap">
            <div class="hamburger">
              <span>Filter&nbsp;Layer</span>
            </div>
            <div id="tourstops">
              <h2>Tour Stops</h2>
              <ul>
              </ul>
            </div>

          </div> --}}


          <div id="leafletmap"></div>

      </div>



{{-- </div> --}}




{{-- </div> --}}
<script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67683/ccbuildings.js"> </script>

<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
{{-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> --}}

<script type="text/javascript" src="{{asset('leaflet/wicket/wicket.js')}}"></script>
<script type="text/javascript" src="{{asset('leaflet/wicket/wicket-leaflet.js')}}"></script>
<script src="{{ asset('porto/assets/js/peta/peta.js') }}"></script>

<script src='https://unpkg.com/leaflet@1.6.0/dist/leaflet.js'></script><script  src="./script.js"></script>


{{-- <script>
    function togglelayerbar(ref){
    document.getElementById("layerbar").classList.toggle('active');
    }

    var map = L.map('petagis').setView([-7.152479, 111.886929], 12);
    L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
                maxZoom: 18
            }).addTo(map);


        //google Street
        //street = m
        //hyberid = s,h
        //satelit = m
        //terrain = p
//     L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// }).addTo(map);

// var marker = L.marker([-7.152479, 111.886929]);
// marker.addTo(map);

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

// var marker = L.marker([-7.152479, 111.886929], {icon: redIcon});
// var marker2 = L.marker([-7.152499, 111.886949], {icon: blueIcon});
L.marker([-7.152479, 111.886929], {icon: redMarker}).addTo(map).bindPopup("I am a green leaf.");
L.marker([-7.144199, 111.842149], {icon: blueMarker}).addTo(map).bindPopup("I am a red leaf.");

// marker.addTo(map);
// marker2.addTo(map);
var latlang = [
            [[-7.10927, 111.863539], [ -7.152876, 111.864912], [-7.154238, 111.815459]],
            [[-7.116084, 111.815459], [ -7.13925, 111.871781], [-7.156964, 111.838812]]
         ];

// var latlang = [
//             [[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],
//             [[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]
//          ];

         // Creating poly line options
         var multiPolyLineOptions = {color:'red'};

         // Creating multi poly-lines
         var multipolyline = L.polyline(latlang , multiPolyLineOptions);

         // Adding multi poly-line to map
         multipolyline.addTo(map);

         //refresh ke lokasi polyline
        //  map.fitBounds(multipolyline.getBounds());

         multipolyline.on('click',(e) =>{
            console.log(e);
            // alert(e.latlng);
         });



         var lpolygon = [
            [[
              -7.147564881219893,
              111.8757825849251
            ],
            [
              -7.150650174644596,
              111.87695296406031
            ],
            [
              -7.149659173894989,
              111.87964267010085
            ],
            [
              -7.147361119170938,
              111.87836437754459
            ],
            [
              -7.146036144658282,
              111.87644954784844
            ],
            [
              -7.147564881219893,
              111.8757825849251
            ]],
            [
            [
              -7.153268491999725,
              111.88138920919141
            ],
            [
              -7.153268491999725,
              111.88064380985458
            ],
            [
              -7.154257131436793,
              111.88064380985458
            ],
            [
              -7.154257131436793,
              111.88138920919141
            ],
            [
              -7.153268491999725,
              111.88138920919141
            ]
            ]
        ];

        var multiPolygonOptions = {color:'red'};

        var multipolygon = L.polygon(lpolygon , multiPolygonOptions);


        multipolygon.addTo(map);


         $.getJSON('leaflet/geojson/map.geojson', function(json){
            geoLayer = L.geoJson(json, {
                style: function(feature) {
                    return {
                        fillOpacity: 0.5,
                        weight: 5,
                        opacity: 1,
                        color: "#008cff"
                    };
                },
                onEachFeature: function(feature, layer) {

                    //    alert(feature.properties.nama);
                    layer.addTo(map);
                }
            });
         });

</script> --}}
@endsection
