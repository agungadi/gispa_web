<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="To manage the InfyOm Portfolio">
    <meta name="author" content="InfyOm Technologies">

    <title>@yield('title') | {{config('app.name')}} </title>
    <!-- Favicon -->
    {{-- <link rel="icon" href="{{ asset(getAdminSettingValue('favicon')) }}" type="image/png"> --}}

    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Fonts -->
    <link href="//fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css" rel="stylesheet">

    <!-- Icons -->
    <link href="{{ asset('porto/assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ asset('porto/vendor/nucleo/css/nucleo.css') }}" type="text/css">
    <link rel="stylesheet" href="{{ asset('porto/assets/css/font-awesome.min.css') }}">
    <link href="{{ asset('porto/assets/css/sweetalert2.css') }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ asset('porto/assets/css/iziToast.min.css') }}">
    <link href="{{ asset('porto/assets/css/select2.min.css') }}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="{{ asset('porto/assets/css/bootstrap-datetimepicker.min.css') }}">

        <!-- Peta Leaflet Js -->

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin=""/>
    {{-- <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script> --}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"></script>


    <!-- General CSS Files -->

    <link rel="stylesheet" href="{{ asset('porto/css/argon.css') }}" type="text/css">

    <!-- Template CSS -->
    <link rel="stylesheet" href="{{ asset('porto/assets/css/style.css') }}">

    {{-- <link href="{{ asset('porto/assets/css/phone-number-code.css') }}" rel="stylesheet" type="text/css" /> --}}
    <!-- CSS Libraries -->
    @yield('page_css')
    @yield('css')
    @routes
    <!-- Template CSS -->
</head>
<body id="">
        @include('sweetalert::alert')

        @include('layouts.header')

{{-- @include('layouts.sidebar') --}}
@stack('sidebar_js')



    @yield('content')


{{-- @include('profile.change_password') --}}
{{-- @include('profile.edit_profile')
@include('profile.change_langauge') --}}
<!-- Scripts -->
<script src="{{ asset('porto/vendor/js-cookie/js.cookie.js') }}"></script>
<script src="{{ asset('porto/assets/js/moment.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/popper.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/jquery.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/sidebar_menu_search/sidebar_menu_search.js') }}"></script>
<script src="{{ asset('porto/assets/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/iziToast.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/sweetalert2.all.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/select2.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/jquery.nicescroll.js') }}"></script>
<script src="{{ asset('porto/vendor/jquery.scrollbar/jquery.scrollbar.min.js') }}"></script>
<script src="{{ asset('porto/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js') }}"></script>
<script src="{{ asset('porto/assets/js/bootstrap-datepicker.js') }}"></script>

<script src="{{ asset('porto/js/argon.js') }}"></script>

<script src='https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js'></script>



@yield('page_js')
@yield('scripts')
{{-- <script src="{{ asset('porto/assets/js/app/app.js') }}"></script>
<script>
    let pdfDocumentImageUrl = "{{asset('assets/img/pdf_icon.png')}}";
    let docxDocumentImageUrl = "{{asset('assets/img/doc_icon.png')}}";
    let xlsxDocumentImageUrl = "{{asset('assets/img/xlsx_icon.png')}}";
    let defaultImage = "{{asset('img/infyom-logo.png')}}";
    let successMessage = "{{ session('successMessage') }}";
    let iconUrl = '{{asset('assets/web/css/images/done.png')}}';
</script>
<script src="{{ asset('porto/assets/js/custom/custom.js') }}"></script>
<script src="{{ asset('porto/assets/js/user-profile/user-profile.js') }}"></script>
 --}}

</body>
</html>
