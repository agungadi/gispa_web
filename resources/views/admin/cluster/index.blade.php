@extends('layouts.app')
@section('title')
    Patok
@endsection
@section('css')
    <link href="{{ asset('assets/css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" type="text/css"/>
    <link rel='stylesheet' href='https://cdn.datatables.net/responsive/2.2.6/css/responsive.dataTables.min.css'>
    <link rel='stylesheet' href='https://cdn.datatables.net/select/1.3.1/css/select.dataTables.min.css'>
    @endsection
@section('content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4 d-flex content-responsive">
                    <div class="col-lg-6 col-6 content-text">
                        <h6 class="h2 text-white d-inline-block mb-0">Patok KM & HM</h6>
                    </div>

                    <div class="col-lg-6 col-6 text-right d-flex experience-alignment">
                        <div class="ml-auto text-center mr-3 custom_all_button mt-2rem">
                                {{-- <select name="kategori_id" id="filterCountry" class="form-control" placeholder="Filter Patok">
                                    <option value="">Filter Patok</option>
                                    <option value="ideal">Patok Ideal</option>
                                    <option value="rusak">Patok Rusak</option>
                                    <option value="hilang">Patok Hilang</option>
                                    <option value="terhalang">Patok Terhalang</option>
                                    <option value="geser">Patok Geser</option>
                                </select> --}}
                        </div>

                        <div class="mt-2rem custom_exp_button" style="margin-right: 1rem;">
                            <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                               data-target="#detailModal">Detail Iterasi</a>
                        </div>

                        <div class="mt-2rem custom_exp_button" style="margin-right: 1rem;">
                            <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                               data-target="#stateModal">Cetak</a>
                        </div>


                        {{-- <div class="mt-2rem custom_exp_button">
                            <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                               data-target="#stateModal">Simpan</a>
                        </div> --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid mt--6">
        <div class="card mb-4">
            <div class="card-body">
                @include('admin.cluster.table')
            </div>
        </div>
        {{-- @include('admin.cluster.create_modal') --}}
        {{-- @include('admin.cluster.edit_modal') --}}
        @include('admin.cluster.detail_modal')

        @include('admin.cluster.templates.templates')
        @include('admin.cluster.templates.warna')
        {{-- @include('admin.cluster.templates.gambar') --}}

    </div>
@endsection
@section('scripts')

    <script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ asset('porto/assets/js/cluster/cluster.js') }}"></script>
    <script src='https://cdn.datatables.net/responsive/2.2.6/js/dataTables.responsive.min.js'></script>
    <script src='https://cdn.datatables.net/select/1.3.1/js/dataTables.select.min.js'></script>
    @endsection
