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
                        <h6 class="h2 text-white d-inline-block mb-0">Patok KM & HM</h6>
                    </div>
                    {{-- <div class="col-lg-6 col-6 text-right categories-btn">
                        <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                            data-target="#stateModal">Tambah Patok</a>
                    </div> --}}
                    <div class="col-lg-6 col-6 text-right d-flex experience-alignment">
                        <div class="ml-auto text-center mr-3 custom_all_button mt-2rem">
                            {{-- {{ Form::select('kategori_id', $kategori, null, ['id' => 'filterCountry', 'class' => 'form-control' ,'placeholder' => 'Filter Patok']) }} --}}
                                <select name="kategori_id" id="filterCountry" class="form-control" placeholder="Filter Patok">
                                    <option value="">Filter Patok</option>
                                    <option value="ideal">Patok Ideal</option>
                                    <option value="rusak">Patok Rusak</option>
                                    <option value="hilang">Patok Hilang</option>
                                    <option value="terhalang">Patok Terhalang</option>
                                    <option value="geser">Patok Geser</option>
                                </select>
                        </div>

                        <div class="mt-2rem custom_exp_button">

                            <select name="status_id" id="filterStatus" class="form-control" placeholder="Filter Status">
                                <option value="">Filter Status</option>
                                <option value="Menunggu">Menunggu</option>
                                <option value="Laporkan">Laporkan</option>
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
                @include('admin.patok.table')
            </div>
        </div>
        @include('admin.patok.create_modal')
        @include('admin.patok.edit_modal')
        @include('admin.patok.detail_modal')

        @include('admin.patok.templates.templates')
        @include('admin.patok.templates.warna')
        @include('admin.patok.templates.gambar')
        @include('admin.patok.templates.status')

    </div>
@endsection
@section('scripts')

    <script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ asset('porto/assets/js/patok/patok.js') }}"></script>
@endsection
