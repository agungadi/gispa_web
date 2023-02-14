@extends('layouts.app')
@section('css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />

    <link href="{{ asset('assets/css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
    <script type="text/javascript" src="{{asset('leaflet/leaflet.js')}}"></script>
    <link href="{{ asset('leaflet/leaflet.css') }}" rel="stylesheet" type="text/css">

    @endsection
@section('content')

{{-- <div class="container"> --}}

<div id="petagis" style="height: 100%"> </div>

{{-- </div> --}}

<script type="text/javascript" src="{{asset('leaflet/wicket/wicket.js')}}"></script>
<script type="text/javascript" src="{{asset('leaflet/wicket/wicket-leaflet.js')}}"></script>

<script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
<script src="{{ asset('porto/assets/js/isigeografis/isigeografis.js') }}"></script>
<script>
    var map = L.map('petagis').setView([-7.152479, 111.886929], 10);
    L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
                maxZoom: 18
            }).addTo(map);

</script>
@endsection
