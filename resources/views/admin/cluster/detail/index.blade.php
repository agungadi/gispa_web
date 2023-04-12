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
                        <h6 class="h2 text-white d-inline-block mb-0">Detail Patok : {{$ruas_jalan}} KM.{{$nilai_km}} (Cluster {{$cluster}})</h6>
                    </div>
{{--
                    <div class="col-lg-6 col-6 text-right d-flex experience-alignment">
                        <div class="ml-auto text-center mr-3 custom_all_button mt-2rem">
                                <select name="kategori_id" id="filterCountry" class="form-control" placeholder="Filter Patok">
                                    <option value="">Filter Patok</option>
                                    <option value="ideal">Patok Ideal</option>
                                    <option value="rusak">Patok Rusak</option>
                                    <option value="hilang">Patok Hilang</option>
                                    <option value="terhalang">Patok Terhalang</option>
                                    <option value="geser">Patok Geser</option>
                                </select>
                        </div> --}}
                        {{-- <div class="mt-2rem custom_exp_button">
                            <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                               data-target="#stateModal">Tambah User</a>
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

@endsection
