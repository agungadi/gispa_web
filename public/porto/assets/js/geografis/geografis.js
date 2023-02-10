
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
    'placeholder': 'Pilih Roles'
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
      url: route('geografis.index'),
      data: function data(_data) {
        _data.roles = $('#filterCountry').find('option:selected').val();
        console.log(_data.roles);

    }
    },
    columnDefs: [{
      'targets': [5],
      'width': '8%',
      'orderable': false,
      'className': 'text-center action-table-btn'
    },{
        'targets': [4],
        'width': '10%',
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
        data: 'keterangan',
        name: 'keterangan'
      },
      {
        data: 'tipe',
        name: 'tipe'
      },
      {
        data: 'keldata',
        name: 'kelompokdata.nama'
      },
      {
        data: function data(row) {

            var data = [{
              'id': row.id,
            }];
            return prepareTemplateRender('#statesTemplateIsi', data);
          },
          name: 'id'
      },

    {
      data: function data(row) {

        var url = route('geografis.edit', row.id);
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
      url: route('geografis.store'),
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
      url: route('geografis.edit', id),
      type: 'GET',
      success: function success(result) {

        $('#stateFieldId').val(result.data.id);
        $('#stateFieldTabel').val(result.data.nama_tabel);

        $('#editName').val(result.data.nama);
        $('#editKet').val(result.data.keterangan);
        $('#editkeldata').val(result.data.kelompok_data).trigger('change.select2');
        $('#edit_tipe').val(result.data.tipe).trigger('change.select2');
        $('#editModal').modal('show');



        // for(var i = 1; i <= 8; i++){
        //     // fields = datas.field+i;
        //     console.log(JSON.stringify(datas));
        //     console.log(i);
        //     // console.log(datas.field);
        //     if(result.data.field+i != NaN){
        //     $(".koloms").append(`
        //     <input name="field${i}" class="form-control" type="text" placeholder="nama field ${i}" value="${result.data.field+i}">
        //     `)
        //     }

        // }
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
      url: route('geografis.update', id),
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
    var deleteStateUrl = route('geografis.destroy', stateId);
    deleteItem(deleteStateUrl, '#userTable', 'User');

  });

  $('.extra-fields-customer').click(function() {
    console.log("asasasasa");
    console.log($('.customer_records_dynamic').children(".remove").length);
    if($('.customer_records_dynamic').children(".remove").length <= 6){


    $('.customer_records').clone().appendTo('.customer_records_dynamic');
    $('.customer_records_dynamic .customer_records').addClass('single remove');
    $('.single .extra-fields-customer').remove();
    $('.single').append('<a href="#" class="remove-field btn-remove-customer">Remove Kolom</a>');
    $('.customer_records_dynamic > .single').attr("class", "remove");
    }
    console.log("asasasasa");


    // $('.customer_records_dynamic input').each(function() {
    //   var count = 0;
    //   var fieldname = $(this).attr("name");
    //   $(this).attr('name', fieldname + count);
    //   count++;
    // });

  });

  $(document).on('click', '.remove-field', function(e) {
    $(this).parent('.remove').remove();
    e.preventDefault();
  });


  $(document).on('click', '.isi-data', function (event) {
    var id = $(event.currentTarget).data('id');
    console.log(id);
    $.ajax({
        url: route('geografis.edit', id),
        type: 'GET',
        // async: false,
        success: function success(result) {
            console.log(result);
            var enc = result.data.enkrip;
            var url = route('datageografis.index', enc);
            window.open(url, '_blank').focus();

        }
    });
    // renderData(id);
  });

});
/******/ })()
;
