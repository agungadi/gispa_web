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
                        <h6 class="h2 text-white d-inline-block mb-0">Proses Patok</h6>
                    </div>
                    <div class="col-lg-6 col-6 text-right d-flex experience-alignment">
                        <div class="ml-auto text-center mr-3 custom_all_button mt-2rem">
                                <select name="kategori_id" id="filterCountry" class="form-control" placeholder="Filter Patok">
                                    <option value="">Filter Status</option>
                                    <option value="Laporkan">Laporkan</option>
                                    <option value="Perbaiki">Perbaiki</option>
                                    <option value="Ideal">Ideal</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid mt--6">
        <div class="card mb-4">
            <div class="card-body">
                @include('Kepala.proses.table')
            </div>
        </div>
        @include('Kepala.proses.edit_modal')
        @include('Kepala.proses.detail_modal')

        @include('Kepala.proses.templates.templates')
        @include('Kepala.proses.templates.warna')
        @include('Kepala.proses.templates.gambar')

    </div>
@endsection
@section('scripts')

    <script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ asset('porto/assets/js/patok/proses.js') }}"></script>

@endsection
