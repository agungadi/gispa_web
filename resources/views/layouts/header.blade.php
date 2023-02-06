<header>

    <div id="judul">

        <ul class="navbar-nav mr-auto d-xl-block d-none">

            <a href="javascript:void(0);">

                <h1><img alt="Image placeholder" src="{{ asset('img/logos.png') }}" style="max-width:28px" class="bg-white logoss"> GISPA</h1>
            </a>

        </ul>
    </div>

    <div id="isi">


<nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">

    <div class="container-fluid">




            @if (session('impersonated_by'))
                <a href="{{ route('impersonate.leave') }}" class="mr-3 text-danger" data-toggle="tooltip"
                    title="{{ __('messages.admin_users.return_to_admin') }}">
                    <i class="fas fa-user-check font-size-25px"></i>
                </a>
            @endif
            @role('admin')
                <a href="{{ url('p' . DIRECTORY_SEPARATOR . Auth::user()->username) }}" class="mr-3 text-danger" target="_blank"
                    data-toggle="tooltip" title="{{ __('messages.user.preview_blog') }}">
                    <i class="fas fa-eye font-size-25px"></i>
                </a>
            @endrole

            <div id="brand">
                <a href="javascript:void(0);">
                    <h1>Home</h1>
                </a>
                <a href="{{ route('geografis.index') }}">
                    <h1>Geografis</h1>
                </a>
                <a href="{{ route('layer.index') }}">
                    <h1>Layer</h1>
                </a>
                <a href="javascript:void(0);">
                    <h1>Clustering</h1>
                </a>
                <a href="javascript:void(0);">
                    <h1>Peta</h1>
                </a>
                <a href="{{ route('users.index') }}">
                    <h1>User</h1>
                </a>

                <ul class="navbar-nav align-items-center  ml-auto ml-md-0 ">
                    <li class="dropdown language-menu no-hover mr-2">
                        {{-- <a href="{{ Auth::user()->hasRole('super_admin') ? route('admin.settings.index') : route('settings.index') }}"
                           data-toggle="tooltip" title="{{__('messages.settings')}}"> --}}
                        <i class="fa fa-cog text-primary font-size-25px"></i>
                        </a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link pr-0" id="showdropdown" href="#" role="button" data-toggle="dropdown"
                            aria-haspopup="true">
                            <div class="media align-items-center">
                                <span class="avatar avatar-sm rounded-circle">
                                    <img alt="Image placeholder" src="{{ asset('img/person.png') }}" class="bg-white">
                                </span>
                                <div class="media-body  ml-2  d-none d-lg-block">
                                    <span
                                        class="mb-0 text-sm text-dark font-weight-bold">Welcome,&nbsp;&nbsp;{{ Auth::user()->nama }}</span>
                                </div>
                            </div>
                        </a>
                        <div class="dropdown-menu  dropdown-menu-right">
                            <div class="dropdown-header noti-title">
                                <h6 class="text-overflow m-0">
                                    {{ __('messages.user.welcome') }},&nbsp;&nbsp;{{ Auth::user()->nama }}</h6>
                            </div>
                            <a href="#!" class="dropdown-item edit-profile" data-target="#editProfileModal"
                                data-toggle="modal" data-id="{{ auth()->id() }}">
                                <i class="ni ni-single-02"></i>
                                <span>Edit Profil</span>
                            </a>
                            <a href="#!" class="dropdown-item" data-toggle="modal"
                                data-target="#changePasswordModal" data-id="{{ auth()->id() }}">
                                <i class="ni ni-lock-circle-open"></i>
                                <span>Ubah Password</span>
                            </a>
                            {{-- <a class="dropdown-item" href="#" data-toggle="modal" data-id="{{ auth()->id() }}"
                               data-target="#changeLanguageModal"><i
                                        class="fa fa-language"></i>{{__('messages.user.change_language')}}</a> --}}
                            @if (session('impersonated_by'))
                                <a class="dropdown-item" href="{{ route('impersonate.leave') }}">
                                    <i
                                        class="fas fa-user-check"></i>{{ __('messages.admin_users.return_to_admin') }}</a>
                            @endif
                            <div class="dropdown-divider"></div>
                            <a href="{{ url('logout') }}" class="dropdown-item"
                                onclick="event.preventDefault(); localStorage.clear();  document.getElementById('logout-form').submit();">
                                <i class="ni ni-button-power"></i>
                                <span>Logout</span>
                            </a>
                            <form id="logout-form" action="{{ url('/logout') }}" method="POST" class="d-none">
                                {{ csrf_field() }}
                            </form>
                        </div>
                    </li>
                </ul>
            </div>



    </div>

    </div>
</nav>
    </div>

</header>
