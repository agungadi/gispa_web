/*================================================================================
  Item Name: Materialize - Material Design Admin Template
  Version: 5.0
  Author: PIXINVENT
  Author URL: https://themeforest.net/user/pixinvent/portfolio
================================================================================*/

// Globally variables
var sidenavMain = $(".sidenav-main"),
   contentOverlay = $(".content-overlay"),
   navCollapsible = $(".navbar .nav-collapsible"),
   breadcrumbsWrapper = $("#breadcrumbs-wrapper");

// Functions
//----------

// Menu: Default menu collapse check
defaultMenuCollapse();
function defaultMenuCollapse() {
   if ($("body").hasClass("menu-collapse") && $(window).width() > 993) {
      //  Toggle navigation expan and collapse
      sidenavMain.removeClass("nav-lock");
      $(".nav-collapsible .navbar-toggler i").text("radio_button_unchecked");
      navCollapsible.removeClass("sideNav-lock");
      toogleMenuCollapse();
      navigationCollapse();
   }
}

// Menu: Function for toggle class for menu collapse
function toogleMenuCollapse() {
   if (sidenavMain.hasClass("nav-expanded") && !sidenavMain.hasClass("nav-lock")) {
      sidenavMain.toggleClass("nav-expanded");
      $("#main").toggleClass("main-full");
   } else {
      $("#main").toggleClass("main-full");
   }
}

   // Fullscreen
   function toggleFullScreen() {
      if (
         (document.fullScreenElement && document.fullScreenElement !== null) ||
         (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
         if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
         } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
         } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
         } else if (document.documentElement.msRequestFullscreen) {
            if (document.msFullscreenElement) {
               document.msExitFullscreen();
            } else {
               document.documentElement.msRequestFullscreen();
            }
         }
      } else {
         if (document.cancelFullScreen) {
            document.cancelFullScreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
         }
      }
   }
   $(".toggle-fullscreen").click(function () {
      toggleFullScreen();
   });

   // Detect touch screen and enable scrollbar if necessary
   function is_touch_device() {
      try {
         document.createEvent("TouchEvent");
         return true;
      } catch (e) {
         return false;
      }
   }
   if (is_touch_device()) {
      $("#nav-mobile").css({
         overflow: "auto"
      });
   }

   // Language translation
   // Init i18n and load language file
   i18next.use(window.i18nextXHRBackend).init(
      {
         debug: false,
         fallbackLng: "en",
         backend: {
            loadPath: "../../../app-assets/data/locales/{{lng}}.json"
         },
         returnObjects: true
      },
      function (err, t) {
         // resources have been loaded
         jqueryI18next.init(i18next, $);
      }
   );
   //Change language according to data-language of dropdown item
   $(".dropdown-language .dropdown-item").on("click", function () {
      var $this = $(this);
      $this.siblings(".selected").removeClass("selected");
      $this.addClass("selected");
      var selectedFlag = $this.find(".flag-icon").attr("class");
      $(".translation-button .flag-icon")
         .removeClass()
         .addClass(selectedFlag);
      var currentLanguage = $this.find("a").data("language");
      i18next.changeLanguage(currentLanguage, function (err, t) {
         $(".sidenav-main, #horizontal-nav").localize();
      });
   });
   // Horizontal-nav active parent
   if ($("#ul-horizontal-nav li.active").length > 0) {
      $('#ul-horizontal-nav li.active').closest('ul').parents('li').addClass('active');
   }

   // RTL specific
   if ($("html[data-textdirection='rtl']").length > 0) {
      //Main Left Sidebar Menu // sidebar-collapse
      $(".sidenav").sidenav({
         edge: "right" // Choose the horizontal origin
      });
      $(".slide-out-right-sidenav").sidenav({
         edge: "left"
      });
      //Main Right Sidebar Chat
      $(".slide-out-right-sidenav-chat").sidenav({
         edge: "left"
      });
   }
});

//Collapse menu on below 994 screen
$(window).on("resize", function () {
   if ($(window).width() < 994) {
      if (sidenavMain.hasClass("nav-collapsed")) {
         sidenavMain.removeClass("nav-collapsed").addClass("nav-lock nav-expanded");
         navCollapsible.removeClass("nav-collapsed").addClass("sideNav-lock");
      }
   } else if ($(window).width() > 993 && $("body").hasClass("menu-collapse")) {
      if (sidenavMain.hasClass("nav-lock")) {
         sidenavMain.removeClass("nav-lock nav-expanded").addClass("nav-collapsed");
         navCollapsible.removeClass("sideNav-lock").addClass("nav-collapsed");
      }
   }
});
