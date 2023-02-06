@extends('layouts.app')
@section('title')
    Geografis
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
                        <h6 class="h2 text-white d-inline-block mb-0">Geografis</h6>
                    </div>
                    <div class="col-lg-6 col-6 text-right categories-btn">
                        <a href="#" class="btn btn-group-lg btn-neutral custom-button-size" data-toggle="modal"
                        data-target="#stateModal">Tambah Geografis</a>
                    </div>
                    {{-- <div class="col-lg-6 col-6 text-right d-flex experience-alignment">
                        <div class="ml-auto text-center mr-3 custom_all_button mt-2rem">
                            {{ Form::select('unit_opd', $roles, null, ['id' => 'filterCountry', 'class' => 'form-control' ,'placeholder' => 'Filter OPD']) }}
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
                @include('admin.geografis.table')
            </div>
        </div>
        @include('admin.geografis.create_modal')
        @include('admin.geografis.edit_modal')
        @include('admin.geografis.templates.templates')
        @include('admin.geografis.templates.templatesisi')

    </div>
@endsection
@section('scripts')
<script>
    let message = '{{__('messages.select_country')}}';
</script>
    <script src="{{ asset('porto/assets/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('porto/assets/js/custom/custom-datatable.js') }}"></script>
    <script src="{{ asset('porto/assets/js/geografis/geografis.js')}}"></script>
@endsection


