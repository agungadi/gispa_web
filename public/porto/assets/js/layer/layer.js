/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/assets/js/states/states.js ***!
  \**********************************************/




$(document).ready(function () {
  $('#editopd,#createopd').select2({
    'width': '100%',
    'placeholder': 'Pilih OPD'
  });
  $('#editroles,#createrole').select2({
    'width': '100%',
    'placeholder': 'Pilih Data Geografis'
  });
  $('#filterCountry').select2({
    width: '170px'
  });
  $('#stateModal, #editModal').on('shown.bs.modal', function () {
    $(document).off('focusin.modal');
  });
  var tablename = $('#userTable');
  tablename.DataTable({
    deferRender: true,
    scroller: true,
    processing: true,
    serverSide: true,
    'order': [[0, 'asc']],
    ajax: {
      url: route('layer.index'),
      data: function data(_data) {
        _data.roles = $('#filterCountry').find('option:selected').val();
        console.log(_data.roles);

    }
    },
    columnDefs: [{
      'targets': [4],
      'width': '8%',
      'orderable': false,
      'className': 'text-center action-table-btn'
    },{
        'targets': [3],
        'width': '10%',
        "className": "text-center",
        'orderable': false,
        'className': 'text-center action-table-btn'
      }, {
      targets: '_all',
      defaultContent: 'N/A'
    }],
    columns: [{
      data: 'nama',
      name: 'nama'
    },
    {
        data: 'geografis.tipe',
        // name: 'geografis_id'
      },
      {
        data: 'geografis.nama',
        // name: 'geografis_id'
      },
      {
        data: function data(row) {
            var url = route('layer.edit', row.id);
            var data = [{
              'id': row.id,
              'warna': row.warna,
              'warna_border': row.warna_border,
              'tebal_border': row.tebal_border,
              'opacity' : row.opacity,
              'url': url
            }];
            return prepareTemplateRender('#statesWarna', data);
          },
        name: 'id'
      },
    {
      data: function data(row) {
        var url = route('layer.edit', row.id);
        var data = [{
          'id': row.id,
          'url': url
        }];
        return prepareTemplateRender('#statesTemplate', data);
      },
      name: 'id'
    }],
    'fnInitComplete': function fnInitComplete() {
      $(document).on('change', '#filterCountry', function () {
        console.log('sada');
        $('#userTable').DataTable().ajax.reload(null, true);
        console.log('working');
      });
    }
  });
  $(document).on('submit', '#createStateForm', function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    var loadingButton = jQuery(this).find('#saveBtn');
    loadingButton.button('loading');
    $.ajax({
      url: route('layer.store'),
      type: 'POST',
      data: $(this).serialize(),
      success: function success(result) {
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
    console.log(id);
    renderData(id);
  });

  function renderData(id) {

    $.ajax({
      url: route('layer.edit', id),
      type: 'GET',
      success: function success(result) {
        console.log(result.data);
        console.log();
        $('.edit_preview_warna').empty();
        $('#stateFieldId').val(result.data.id);
        $('#editGeo').val(result.data.geografis_id).trigger('change.select2');
        $('#editName').val(result.data.nama);
        $('#edit_warna').val(result.data.warna);
        $('#edit_warnastroke').val(result.data.warna_border);
        $('#edit_warna_tebal').val(result.data.tebal_border);
        $('#edit_opacity').val(result.data.opacity * 10);

        $('.edit_preview_warna').append(`<span style="
        border: ` + result.data.tebal_border + `px solid ` + result.data.warna_border + `;
        background-color: ` + result.data.warna + `;
        content: '';
        display: inline-block;
        height: 50px;
        opacity: ` + result.data.opacity + `;
        width: 50px;
        position: relative;
        vertical-align: middle; ">
        </span>`)
        $('#editModal').modal('show');
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
