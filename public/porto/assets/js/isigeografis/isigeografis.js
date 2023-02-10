/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/assets/js/states/states.js ***!
  \**********************************************/




$(document).ready(function () {

    var loading = `<div class="text-center">
    <div class="pace-demo">
    <div class="theme_squares"><div class="pace-progress" data-progress-text="60%" data-progress="60"></div><div class="pace_activity"></div></div>
    </div>
    </div>`;

    _peta_get_wkt_tambah('{{csrf_token()}}', '.div_peta_tambah');

    function _peta_get_wkt_tambah(token, target,div, wkt=""){
        console.log("wowowowow");
        console.log(token);
        $(target).html(loading);
        console.log("wowowowow");
        // var public_path = $('#public_path').val(); /* di layouts */
        // console.log(public_path);
        var act = '/peta';
        $.post(act, {
            _token: token
            , wkt
        },
        function (data) {
            $(target).html(data);
        });
        console.log("aszzzz");

    }

    console.log("asasasa");


    // var url = route('layer.edit', $en);
    // var url = "{{ route('detail.user', $user_id)}}";
    // console.log(url);

  $('#editopd,#createopd').select2({
    'width': '100%',
    'placeholder': 'Pilih OPD'
  });
  $('#editroles,#createrole').select2({
    'width': '100%',
    'placeholder': 'Pilih Roles'
  });
  $('#filterCountry').select2({
    width: '170px'
  });
  $('#stateModal, #editModal').on('shown.bs.modal', function () {
    $(document).off('focusin.modal');
  });
//   var tablename = $('#userTable');
//   var param= $("input[name=getParams]").val();

//   tablename.DataTable({
//     deferRender: true,
//     scroller: true,
//     processing: true,
//     serverSide: true,
//     'order': [[0, 'asc']],
//     ajax: {
//         url: route('datageografis.index', param),
//         data: function data(_data) {
//         _data.roles = $('#filterCountry').find('option:selected').val();
//         console.log(_data.roles);

//     }
//     },
//     columnDefs: [{
//       'targets': [1],
//       'width': '8%',
//       'orderable': false,
//       'className': 'text-center action-table-btn'
//     }, {
//       targets: '_all',
//       defaultContent: 'N/A'
//     }],
//     columns: [
//     {
//       data: 'f_jalan',
//       name: 'f_jalan'
//     },
//     // {
//     //     data: 'tipe',
//     //     name: 'geografis.tipe'
//     //   },
//     //   {
//     //     data: 'namageo',
//     //     name: 'geografis.nama'
//     //   },
//     {
//       data: function data(row) {
//         var url = route('layer.edit', row.id);
//         var data = [{
//           'id': row.id,
//           'url': url
//         }];
//         return prepareTemplateRender('#statesTemplate', data);
//       },
//       name: 'id'
//     }],
//     'fnInitComplete': function fnInitComplete() {
//       $(document).on('change', '#filterCountry', function () {
//         console.log('sada');
//         $('#userTable').DataTable().ajax.reload(null, true);
//         console.log('working');
//       });
//     }
//   });
  $(document).on('submit', '#createStateForm', function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    var loadingButton = jQuery(this).find('#saveBtn');
    loadingButton.button('loading');
    console.log("asuuuuuu");
    $.ajax({
      url: route('datageografis.store'),
      type: 'POST',
      data: $(this).serialize(),
      success: function success(result) {
        console.log("asuuuuuu");
        if (result.success) {
          displaySuccessMessage(result.message);
          $('#stateModal').modal('hide');
          $(tablename).DataTable().ajax.reload(null, false);
        }
      },
      error: function error(result) {
        displayErrorMessage(result.responseJSON.message);
      },
      complete: function complete() {
        loadingButton.button('reset');
      }
    });
  });
  $('#stateModal').on('hidden.bs.modal', function () {
    $('#editopd').val([]).trigger('change');
    $('#editroles').val([]).trigger('change');

    resetModalForm('#createStateForm', '#validationErrorsBox');
  });
  $(document).on('click', '.edit-btn', function (event) {
    var id = $(event.currentTarget).data('id');
    var tb = $(event.currentTarget).data('tb');

    console.log(id);
    console.log(tb);

    renderData(id, tb);
  });

  function renderData(id, tb) {
    var formData = {
        id: id,
        idgeo: tb,
    };
    console.log(formData);
    $.ajax({
      url: route('edit.datageo'),
      type: 'GET',
      data: formData,
      success: function success(result) {
        console.log("asssss");
        console.log(result);
        $('#stateFieldId').val(result.data.id);

        $('#editgeojson').val(result.data.geojson);

        if(result.data.field1 != ""){
            $('#edit1').val(result.data.field1);
        }
        if(result.data.field2 != ""){
            $('#edit2').val(rresult.data.field2);
        }
        if(result.data.field3 != ""){
            $('#edit3').val(result.data.field3);
        }
        if(result.data.field4 != ""){
            $('#edit4').val(result.data.field4);

        }
        if(result.data.field5 != ""){
            $('#edit5').val(result.data.field5);

        }
        if(result.data.field6 != ""){
            $('#edit6').val(result.data.field6);
        }
        if(result.data.field7 != ""){
            $('#edit7').val(result.data.field7);
        }
        if(result.data.field8 != ""){
            $('#edit8').val(result.data.field8);

        }
      }
    });
  }

  $(document).on('submit', '#editStateForm', function (e) {
    e.preventDefault();
    var loadingButton = jQuery(this).find('#editSaveBtn');
    loadingButton.button('loading');
    var id = $('#stateFieldId').val();
    console.log(id);
    console.log($(this).serialize());
    $.ajax({
      url: route('layer.update', id),
      type: 'PUT',
      data: $(this).serialize(),
      success: function success(result) {
        $('#editModal').modal('hide');
        displaySuccessMessage(result.message);
        $(tablename).DataTable().ajax.reload(null, false);
      },
      error: function error(result) {
        displayErrorMessage(result.responseJSON.message);
      },
      complete: function complete() {
        loadingButton.button('reset');
      }
    });
  });
  $(document).on('click', '.delete-btn', function (event) {
    var stateId = $(event.currentTarget).data('id');
    var deleteStateUrl = route('layer.destroy', stateId);
    deleteItem(deleteStateUrl, '#userTable', 'User');
  });


});
/******/ })()
;
