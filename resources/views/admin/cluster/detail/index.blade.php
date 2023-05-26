@extends('layouts.app')
@section('title')
    Patok
@endsection
@section('css')
    <link href="{{ asset('assets/css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" type="text/css"/>
@endsection
@section('content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4 d-flex content-responsive">
                    <div class="col-lg-6 col-6 content-text">
                        <h6 id="mycluster" class="h2 text-white d-inline-block mb-0">Detail Patok : {{$ruas_jalan}} KM.{{$nilai_km}} (Cluster {{$cluster}})</h6>
                    </div>

                    <div class="col-lg-6 col-6 text-right d-flex experience-alignment">
                        <div class="ml-auto text-center mr-3 custom_all_button mt-2rem">

                        </div>
                        <div class="mt-2rem custom_exp_button" style="margin-right: 1rem;">
                            <a id="exportButton" class="btn btn-group-lg btn-neutral custom-button-size">Cetak</a>
                        </div>
                        {{-- <button id="exportButton">Export to Excel</button> --}}


                        {{-- <div class="col-lg-6 col-6 text-right d-flex experience-alignment">

                        <div class="mt-2rem custom_exp_button" style="margin-right: 1rem;">
                            <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                               data-target="#stateModal">Cetak</a>
                        </div>
                        </div> --}}

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid mt--6">
        <div class="card mb-4">
            <div class="card-body">
                @include('admin.cluster.detail.table')
            </div>
        </div>
        @include('admin.cluster.detail.edit_modal')
        @include('admin.cluster.detail.detail_modal')

        @include('admin.cluster.detail.templates.templates')
        {{-- @include('admin.patok.templates.warna')
        @include('admin.patok.templates.gambar') --}}

    </div>
@endsection
@section('scripts')


    <script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
    {{-- <script src="{{ asset('porto/assets/js/cluster/cluster.js') }}"></script> --}}
    <script src="{{ asset('porto/assets/js/cluster/detail.js') }}"></script>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/exceljs/1.7.0/exceljs.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js'></script>

@endsection
