@extends('layouts.app')
@section('title')
    Layer
@endsection
@section('css')
    <link href="{{ asset('assets/css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" type="text/css" />
@endsection
@section('content')
    <div class="header bg-primary pb-6">
        <div class="container-fluid">
            <div class="header-body">
                <div class="row align-items-center py-4 d-flex content-responsive">
                    <div class="col-lg-6 col-6 content-text">
                        <h6 class="h2 text-white d-inline-block mb-0">Layer</h6>
                    </div>
                    <div class="col-lg-6 col-6 text-right categories-btn">
                        <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
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
                @include('admin.layers.table')
            </div>
        </div>
        @include('admin.layers.create_modal')
        @include('admin.layers.edit_modal')
        @include('admin.layers.templates.templates')
        @include('admin.layers.templates.warna')

    </div>
@endsection
@section('scripts')
    <script>
        let message = '{{ __('messages.select_country') }}';

        function tmb_preview_warna(warna, warnastroke, warna_tebal, opacity) {

            opacity = opacity / 10;
            var a = `
            <span style="
            border: ` + warna_tebal + `px solid ` + warnastroke + `;
            background-color: ` + warna + `;
            content: '';
            display: inline-block;
            height: 50px;
            opacity: ` + opacity + `;
            width: 50px;
            position: relative;
            vertical-align: middle; ">
            </span>
            `;
            $('.tmb_preview_warna').html(a);
        }

        function edit_preview_warna(warna, warnastroke, warna_tebal, opacity) {

            opacity = opacity / 10;
            var b = `
            <span style="
            border: ` + warna_tebal + `px solid ` + warnastroke + `;
            background-color: ` + warna + `;
            content: '';
            display: inline-block;
            height: 50px;
            opacity: ` + opacity + `;
            width: 50px;
            position: relative;
            vertical-align: middle; ">
            </span>
            `;
            $('.edit_preview_warna').html(b);
        }
    </script>
    <script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ asset('porto/assets/js/layer/layer.js') }}"></script>
@endsection
