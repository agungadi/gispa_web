@extends('layouts.app')
@section('title')
    Data Geografis
@endsection
@section('css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />

    <link href="{{ asset('assets/css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
@endsection
@section('content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4 d-flex content-responsive">
                    <div class="col-lg-6 col-6 content-text">
                        <h6 class="h2 text-white d-inline-block mb-0">Layer</h6>
                        {{-- {{ Form::text('id', null, ['id' => 'getParam', 'value' => {{ $en }}]) }} --}}
                        <input type="hidden" name="getParams" id="getParam" value="{{ $tabel }}">

                    </div>
                    <div class="col-lg-6 col-6 text-right categories-btn">
                        <a href="#" class="btn btn-group-lg btn-neutral custom-button-size add-btn" data-toggle="modal"
                            data-target="#stateModal">Tambah Layer</a>
                    </div>
                    {{-- <div class="col-lg-6 col-6 text-right d-flex experience-alignment">
                        <div class="ml-auto text-center mr-3 custom_all_button mt-2rem">
                            {{ Form::select('kel_data', $roles, null, ['id' => 'filterCountry', 'class' => 'form-control' ,'placeholder' => 'Filter OPD']) }}
                        </div>
                        <div class="mt-2rem custom_exp_button">
                            <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                               data-target="#stateModal">Tambah User</a>
                        </div>
                    </div> --}}
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid mt--6">
        <div class="card mb-4">
            <div class="card-body">
                {{-- <div class="col-md-12"> --}}
                @include('admin.isigeografis.table')

                {{-- </div> --}}
            </div>
        </div>
        @include('admin.isigeografis.create_modal')
        @include('admin.isigeografis.edit_modal')
        @include('admin.isigeografis.templates.templates')
        @include('admin.isigeografis.templates.warna')

    </div>
@endsection
@section('scripts')
    <script type="text/javascript">


        ///Setting the center of the map
        // var center = [-7.2369247, 111.894956];
        // // Create the map
        // var map = L.map('map').setView(center, 10);
        // // Set up the Open Street Map layer
        // L.tileLayer(
        //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //         attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
        //         maxZoom: 18
        //     }).addTo(map);
        // var drawnItems = new L.FeatureGroup();
        // map.addLayer(drawnItems);
        // var drawControl = new L.Control.Draw({
        //     position: 'topright',
        //     draw: {
        //         polygon: {
        //             shapeOptions: {
        //                 color: 'purple' //polygons being drawn will be purple color
        //             },
        //             allowIntersection: false,
        //             drawError: {
        //                 color: 'orange',
        //                 timeout: 1000
        //             },
        //             showArea: true, //the area of the polygon will be displayed as it is drawn.
        //             metric: false,
        //             repeatMode: true
        //         },
        //         polyline: {
        //             shapeOptions: {
        //                 color: 'red'
        //             },
        //         },
        //         circlemarker: false, //circlemarker type has been disabled.
        //         rect: {
        //             shapeOptions: {
        //                 color: 'green'
        //             },
        //         },
        //         circle: false,
        //     },
        //     edit: {
        //         featureGroup: drawnItems
        //     }
        // });
        // map.addControl(drawControl);
        // map.on('draw:created', function(e) {
        //     var type = e.layerType,
        //         layer = e.layer;
        //     var shape = layer.toGeoJSON();
        //     var shape_for_db = JSON.stringify(shape);
        //     var x = JSON.parse(shape_for_db);
        //     var res = "";
        //     if (x['geometry']['type'] == "Point") {
        //         $('#tipe').val('point');
        //         res = "POINT(";
        //         res += x['geometry']['coordinates'][0] + " " + x['geometry']['coordinates'][1];
        //         res += ")";
        //         // POINT( x y )
        //     } else if (x['geometry']['type'] == "LineString") {
        //         $('#tipe').val('line');
        //         res = "LINESTRING(";
        //         // alert(x['geometry']['coordinates'].length);
        //         for (var i = 0; i < x['geometry']['coordinates'].length; i++) {
        //             if (i == 0) {
        //                 res += x['geometry']['coordinates'][i][0] + " " + x['geometry']['coordinates'][i][1];
        //             } else {
        //                 res += ',' + x['geometry']['coordinates'][i][0] + " " + x['geometry']['coordinates'][i][1];
        //             }
        //         }
        //         res += ")";
        //     } else if (x['geometry']['type'] == "Polygon") {
        //         $('#tipe').val('polygon');
        //         res = "POLYGON((";
        //         for (var i = 0; i < x['geometry']['coordinates'][0].length; i++) {
        //             if (i == 0) {
        //                 res += x['geometry']['coordinates'][0][i][0] + " " + x['geometry']['coordinates'][0][i][1];
        //             } else {
        //                 res += ',' + x['geometry']['coordinates'][0][i][0] + " " + x['geometry']['coordinates'][0][
        //                     i][1];
        //             }
        //         }
        //         res += "))";

        //     }
        //     drawnItems.addLayer(layer);
        //     $('#polygon').val(res);
        // });

        // $('#stateModal').on('shown.bs.modal', function() {
        //     console.log("azzzzz");
        //     map.invalidateSize();
        // });


        // $('#editModal').on('shown.bs.modal', function() {
        //     console.log("mapzzzz kuyy");
        //     map.invalidateSize();
        // });



        // if ($('.select22').length) {
        //     $('.select22').select2();
        // }
        // START SCRIPT TABEL
        $.extend($.fn.dataTable.defaults, {
            autoWidth: false,
            columnDefs: [{
                orderable: false,
                width: '100px',
            }],
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_',
                // searchPlaceholder: 'Type to filter...',
                lengthMenu: '<span>Menampilkans :</span> _MENU_',
                paginate: {
                    'first': 'First',
                    'last': 'Last',
                    'next': '&rarr;',
                    'previous': '&larr;'
                }
            },
            drawCallback: function() {
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
            },
            preDrawCallback: function() {
                $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
            }
        });
        $('.datatable-table').DataTable();
        // END SCRIPT TABEL
    </script>

    <script type="text/javascript" src="{{asset('leaflet/wicket/wicket.js')}}"></script>
    <script type="text/javascript" src="{{asset('leaflet/wicket/wicket-leaflet.js')}}"></script>

    <script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ asset('porto/assets/js/isigeografis/isigeografis.js') }}"></script>
@endsection
