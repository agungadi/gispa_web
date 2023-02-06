/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/assets/js/states/states.js ***!
  \**********************************************/


$(document).ready(function () {
  $('#countryFieldID,#editCountryFieldID').select2({
    'width': '100%',
    'placeholder': 'Pilih Komponen'
  });
  $('#filterCountry').select2({
    width: '170px'
  });
  $('#stateModal, #editModal').on('shown.bs.modal', function () {
    $(document).off('focusin.modal');
  });
  var tablename = $('#tahap3Table');
  tablename.DataTable({
    deferRender: true,
    scroller: true,
    processing: true,
    serverSide: true,
    'order': [[0, 'asc']],
    ajax: {
      url: route('tahap3.index'),
      data: function data(_data) {
        _data.komponen_id = $('#filterCountry').find('option:selected').val();
        console.log(_data.komponen_id);
      }
    },
    columnDefs: [{
      'targets': [3],
      'width': '8%',
      'orderable': false,
      'className': 'text-center action-table-btn'
    },{
      'targets': 2,
      'visible': false,
    },  {
      targets: '_all',
      defaultContent: 'N/A'
    }],
    columns: [{
      data: 'name',
      name: 'name'
    },
    {
        data: 'bobot',
        name: 'bobot'
      },
       {
      data: 'komponen2.name',
      name: 'komponen_id'
    }, {
      data: function data(row) {
        var url = route('tahap3.edit', row.id);
        var data = [{
          'id': row.id,
          'url': url
        }];
        return prepareTemplateRender('#statesTemplate', data);
      },
      name: 'id'
    }],

    order: [[2, 'asc']],
    drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api
            .column(2, { page: 'current' })
            .data()
            .each(function (group, i) {
                if (last !== group) {
                    $(rows)
                        .eq(i)
                        .before('<tr class="group" ><td colspan="4">[Komponen] ' + group + '</td></tr>');

                    last = group;
                }
            });
    },
    'fnInitComplete': function fnInitComplete() {
      $(document).on('change', '#filterCountry', function () {
        $('#tahap3Table').DataTable().ajax.reload(null, true);
        console.log('working');
      });
    }
  });
  $(document).on('submit', '#createStateForm', function (e) {
    e.preventDefault();
    var loadingButton = jQuery(this).find('#saveBtn');
    loadingButton.button('loading');
    $.ajax({
      url: route('tahap3.store'),
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
    resetModalForm('#createStateForm', '#validationErrorsBox');
  });
  $(document).on('click', '.edit-btn', function (event) {
    var id = $(event.currentTarget).data('id');
    renderData(id);
  });

  function renderData(id) {
    $.ajax({
      url: route('tahap3.edit', id),
      type: 'GET',
      success: function success(result) {
        $('#stateFieldId').val(result.data.id);
        $('#editName').val(result.data.name);
        $('#editBobot').val(result.data.bobot);

        $('#editCountryFieldID').val(result.data.komponen_id).trigger('change.select2');
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
      url: route('tahap3.update', id),
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
    var deleteStateUrl = route('tahap3.destroy', stateId);
    deleteItem(deleteStateUrl, '#tahap3Table', 'SubKomponen');
  });


  $('#example tbody').on('click', 'tr.group', function () {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
        table.order([groupColumn, 'desc']).draw();
    } else {
        table.order([groupColumn, 'asc']).draw();
    }
});
});
/******/ })()
;
