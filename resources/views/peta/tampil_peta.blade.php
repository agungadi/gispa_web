@extends('layouts.appmap')
@section('title')
    Data Geografis
@endsection
@section('css')
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>

    <link rel='stylesheet' href='https://unpkg.com/leaflet@1.6.0/dist/leaflet.css'>

    <link rel='stylesheet' href='https://rawgit.com/nickpeihl/leaflet-sidebar-v2/master/css/leaflet-sidebar.css'>
@endsection

@section('content')
    <div id="mapwrap">

        <!-- partial:index.partial.html -->
        <div id="sidebar" class="leaflet-sidebar collapsed">
            <!-- Nav tabs -->
            <div class="leaflet-sidebar-tabs">
                <ul role="tablist">
                    <li><a href="#autopan" role="tab">
                            <i class="fa fa-arrow-left" style="color: aliceblue;"></i></a></li>
                </ul>
            </div>

            <!-- Tab panes -->
            <div class="leaflet-sidebar-content">
                <div class="leaflet-sidebar-pane" id="autopan">
                    <h1 class="leaflet-sidebar-header">
                        Filter Layer
                        <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                    </h1>


                </br>
                    <div class="dropdownss">
                        <select name="one" id="select-cluster" class="dropdownss-select">
                          <option value="">Clustering</option>
                          <option value="1">Cluster 1</option>
                          <option value="2">Cluster 2</option>
                          <option value="3">Cluster 3</option>
                        </select>
                      </div>
                    </br>

                      <button id="btn-cluster">Submit Cluster</button>
                    </br>


                    <div class="accordion-container" id="keljalan">
                        <header class="header">Jalan</header>

                    </div>



                    <div class="accordion-container" id="kelbatas">
                        <header class="header">Batas</header>
                    </div>

                    <div class="accordion-container" id="kelpatok">
                        <header class="header">patok</header>
                        <button type="button" class="accordion" id="accordion">
                            <span class="accordion-title">
                                Periode
                            </span>
                        </button>
                        <div class="panel" style="padding-left: 20px; padding-right: 20px">
                        </br>

                            <div class="dropdownss">
                                <select name="periode" id="select-periode" class="dropdownss-select">
                                  <option value="">Periode</option>
                                  @foreach($kuarter as $q)

                                  <option value="{{$q}}">{{$q}}</option>
                                  {{-- <option value="2">Option #2</option>
                                  <option value="3">Option #3</option> --}}
                                  @endforeach

                                </select>
                              </div>
                            </br>

                              <button id="btn-cluster" class="btn-periode">Submit Periode</button>
                            </br>

                        </div>
                        <button type="button" class="accordion" id="accordion">
                            <span class="accordion-title">
                                Kondisi Patok
                            </span>
                        </button>
                        <div class="panel">
                            <div class="grid-containers">
                                <div class="cellss switch">
                                    <div class="switch__1">
                                        <input id="switch-rusak" value="rusak" type="checkbox">
                                        <label for="switch-rusak"></label>
                                    </div>
                                    <div class="largess">
                                        <p style="font-size: 0.9em"> Rusak </p>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-containers">
                                <div class="cellss switch">
                                    <div class="switch__1">
                                        <input id="switch-hilang" value="hilang" type="checkbox">
                                        <label for="switch-hilang"></label>
                                    </div>
                                    <div class="largess">
                                        <p style="font-size: 0.9em"> Hilang </p>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-containers">
                                <div class="cellss switch">
                                    <div class="switch__1">
                                        <input id="switch-terhalang" value="Ya" type="checkbox">
                                        <label for="switch-terhalang"></label>
                                    </div>
                                    <div class="largess">
                                        <p style="font-size: 0.9em"> Terhalang </p>
                                    </div>
                                </div>
                            </div>


                            <div class="grid-containers">
                                <div class="cellss switch">
                                    <div class="switch__1">
                                        <input id="switch-geser" value="geser" type="checkbox">
                                        <label for="switch-geser"></label>
                                    </div>
                                    <div class="largess">
                                        <p style="font-size: 0.9em"> Bergeser </p>
                                    </div>
                                </div>
                            </div>

                            <div class="grid-containers">
                                <div class="cellss switch">
                                    <div class="switch__1">
                                        <input id="switch-ideal" value="ideal" type="checkbox">
                                        <label for="switch-ideal"></label>
                                    </div>
                                    <div class="largess">
                                        <p style="font-size: 0.9em"> Ideal </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div id="leafletmap"></div>
    </div>

    @include('peta.detail_modal')

    <!-- partial -->

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js'></script>
    <script type="text/javascript" src="{{ asset('leaflet/wicket/wicket.js') }}"></script>
    <script type="text/javascript" src="{{ asset('leaflet/wicket/wicket-leaflet.js') }}"></script>
    <script src="{{ asset('porto/assets/js/peta/peta.js') }}"></script>
    <script src='https://unpkg.com/leaflet@1.6.0/dist/leaflet.js'></script>
    <script src='https://rawgit.com/nickpeihl/leaflet-sidebar-v2/master/js/leaflet-sidebar.js'></script>
@endsection
