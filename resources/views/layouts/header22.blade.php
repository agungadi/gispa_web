<header class="page-topbar" id="header">
    <div class="navbar">
        <nav class="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark gradient-45deg-light-blue-cyan">
            <div class="">
                <ul class="left">
                    <li>
                        <h1 class="logo-wrapper"><a class="brand-logo darken-1" href="index.html"><img src="material/images/logo/materialize-logo.png" alt="materialize logo"><span class="logo-text hide-on-med-and-down">Materialize</span></a></h1>
                    </li>
                </ul>

                <ul class="right hide-on-med-and-down">

                    <li class="nav-item dropdown">
                        <a class="nav-link pr-0" id="showdropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                           >
                            <div class="media align-items-center">
                      <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="{{ asset('img/person.png') }}" class="bg-white">
                      </span>
                                <div class="media-body  ml-2  d-none d-lg-block">
                                    <span class="mb-0 text-sm text-dark font-weight-bold">{{__('messages.user.hi')}},&nbsp;&nbsp;{{Auth::user()->name }}</span>
                                </div>
                            </div>
                        </a>
                        <div class="dropdown-menu  dropdown-menu-right">
                            <div class="dropdown-header noti-title">
                                <h6 class="text-overflow m-0">{{__('messages.user.welcome')}},&nbsp;&nbsp;{{Auth::user()->name }}</h6>
                            </div>
                            <a href="#!" class="dropdown-item edit-profile" data-target="#editProfileModal"
                               data-toggle="modal" data-id="{{ auth()->id() }}">
                                <i class="ni ni-single-02"></i>
                                <span style="color: black">Edit Profil</span>
                            </a>
                            <a href="#!" class="dropdown-item" data-toggle="modal" data-target="#changePasswordModal"
                               data-id="{{ auth()->id() }}">
                                <i class="ni ni-lock-circle-open"></i>
                                <span>{{__('messages.user.change_password')}}</span>
                            </a>

                            @if(session('impersonated_by'))
                                <a class="dropdown-item" href="{{ route('impersonate.leave') }}">
                                    <i class="fas fa-user-check"></i>{{__('messages.admin_users.return_to_admin')}}</a>
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


                <ul class="navbar-list right">
                    <li class="hide-on-med-and-down"><a class="waves-effect waves-block waves-light toggle-fullscreen" href="javascript:void(0);"><i class="fas fa-expand  navi-margin"></i></a></li>
                    {{-- <li><a class="waves-effect waves-block waves-light notification-button" href="javascript:void(0);" data-target="notifications-dropdown"><i class="fas fa-bell navis-margin"><small class="notification-badge orange accent-3">5</small></i></a></li> --}}
                    {{-- <li class="hide-on-med-and-down"><a class="waves-effect waves-block waves-light profile-button" href="javascript:void(0);" data-target="profile-dropdown"><i class="fas fa-user-circle"></i> </a></li> --}}



                </ul>

                <ul class="right hide-on-med-and-down">
                    <li><a href="#">Sass</a></li>
                    <li><a href="#">Components</a></li>
                    <li><a href="#">Javascript</a></li>
                    <li><a href="{{ route('users.index') }}">User</a></li>
                </ul>



                <!-- translation-button-->


                <!-- notifications-dropdown-->

                <!-- profile-dropdown-->







            </div>

        </nav>

        </nav>
    </div>
</header>
