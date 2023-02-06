<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="To manage the InfyOm Portfolio">
    <meta name="author" content="InfyOm Technologies">
    {{-- <link rel="icon" href="{{ asset(getAdminSettingValue('favicon')) }}" type="image/png"> --}}
    <title>@yield('title') | {{config('app.name')}} </title>
    <!-- Favicon -->
    {{--    <link rel="icon" href="{{ asset(!empty(getSettingValue('favicon') ? getSettingValue('favicon') : '')) }}"--}}
    {{--          type="image/png">--}}

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">
    <!-- Icons -->
    <link rel="stylesheet" href="{{ asset('porto/vendor/nucleo/css/nucleo.css') }}" type="text/css">
    <link rel="stylesheet" href="{{ asset('porto/vendor/@fortawesome/fontawesome-free/css/all.min.css') }}" type="text/css">

    <!-- General CSS Files -->
    <link rel="stylesheet" href="{{ asset('porto/css/argon.css?v=1.2.0') }}" type="text/css">
    <link rel="stylesheet" href="{{asset('porto/assets/web/css/login.css')}}">
    <link rel="stylesheet" href="{{ asset('porto/assets/css/iziToast.min.css') }}">
    <!-- CSS Libraries -->

@stack('css')
<!-- Template CSS -->
</head>
<body id="app">
<!-- Main content -->
<div class="main-content">
    @yield('content')
</div>

<!-- Footer -->
<footer class="py-3 position-relative login-footer" id="footer-main">
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col-xl-6">
                <div class="copyright text-center text-muted">
                    {{--                    All rights reserved  &copy; {{ date('Y') }} <a href="{{ getWebsiteUrl() }}" class="font-weight-bold ml-1"--}}
                    {{--                                              target="_blank">{{getAppName()}}</a>--}}
                </div>
            </div>
        </div>
    </div>
</footer>

<!-- Scripts -->
<script src="{{ asset('porto/vendor/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('porto/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('porto/vendor/js-cookie/js.cookie.js') }}"></script>
<script src="{{ asset('porto/vendor/jquery.scrollbar/jquery.scrollbar.min.js') }}"></script>
<script src="{{ asset('porto/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js') }}"></script>
<script src="{{ asset('porto/js/argon.js?v=1.2.0') }}"></script>
<script src="{{ asset('porto/assets/js/iziToast.min.js') }}"></script>

@yield('page_js')
@stack('scripts')
</body>
</html>
