/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/assets/js/states/states.js ***!
  \**********************************************/


$(document).ready(function () {
  $('#countryFieldID,#editCountryFieldID').select2({
    'width': '100%',
    'placeholder': 'Pilih OPD'
  });
  $('#rolesFieldID,#editCountryFieldID').select2({
    'width': '100%',
    'placeholder': 'Pilih Roles'
  });
  $('#filterCountry').select2({
    width: '170px'
  });
  $('#stateModal, #editModal').on('shown.bs.modal', function () {
    $(document).off('focusin.modal');
  });
  var tablename = $('#roleTable');
  tablename.DataTable({
    deferRender: true,
    scroller: true,
    processing: true,
    serverSide: true,
    'order': [[0, 'asc']],
    ajax: {
      url: route('roles.index'),
    //   data: function data(_data) {
    //     _data.tahap3_id = $('#filterCountry').find('option:selected').val();
    //     console.log(_data.tahap1_id);
    //   }
    },
    columnDefs: [{
      'targets': [1],
      'width': '8%',
      'orderable': false,
      'className': 'text-center action-table-btn'
    }, {
      targets: '_all',
      defaultContent: 'N/A'
    }],
    columns: [{
      data: 'name',
      name: 'name'
    },
    {
      data: function data(row) {
        var url = route('roles.edit', row.id);
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
        $('#roleTable').DataTable().ajax.reload(null, true);
        console.log('working');
      });
    }
  });
  $(document).on('submit', '#createStateForm', function (e) {
    e.preventDefault();
    var loadingButton = jQuery(this).find('#saveBtn');
    loadingButton.button('loading');
    $.ajax({
      url: route('roles.store'),
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
    $('#countryFieldID').val([]).trigger('change');
    $('#rolesFieldID').val([]).trigger('change');

    resetModalForm('#createStateForm', '#validationErrorsBox');
  });
  $(document).on('click', '.edit-btn', function (event) {
    var id = $(event.currentTarget).data('id');
    renderData(id);
  });

  function renderData(id) {
    $.ajax({
      url: route('roles.edit', id),
      type: 'GET',
      success: function success(result) {
        $(".cekbox").prop("checked", false);

        var array = [];
        console.log(result.array);

        var sizeOfArrray = Object.keys(result.array).length;
        // console.log(Object.keys(result.array).length);

        console.log(result.array[0]);


        for (let i = 0; i < sizeOfArrray; i++) {
            array.push(result.array[i]);
            // console.log(result.array[i]);
            $("#"+result.array[i]).prop("checked", true);
        }
        // console.log(array);

        $('#stateFieldId').val(result.data.id);
        $('#editName').val(result.data.name);
        // $('#editPermission').val(result.array);

        // $('#editCountryFieldID').val(result.data.tahap3_id).trigger('change.select2');
        $('#editModal').modal('show');
      }
    });
  }

  $(document).on('submit', '#editStateForm', function (e) {
    e.preventDefault();
    var loadingButton = jQuery(this).find('#editSaveBtn');
    loadingButton.button('loading');
    var id = $('#stateFieldId').val();
    $.ajax({
      url: route('roles.update', id),
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
    var deleteStateUrl = route('roles.destroy', stateId);
    deleteItem(deleteStateUrl, '#roleTable', 'Role');
  });
});
/******/ })()
;
