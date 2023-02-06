
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
            var url = route('geografis.edit', row.id);
            var data = [{
              'id': row.id,
              'url': url
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

        if(result.data.field1 != ""){
            var fields = result.data.field1;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field1" class="form-control" type="${results[0]}" placeholder="nama field 1" value="${results[2]}">
            <input type="hidden" name="type_of_name1" value="${results[0]}">
            `)
        }
        if(result.data.field2 != ""){
            var fields = result.data.field2;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field2" class="form-control" type="${results[0]}" placeholder="nama field 2" value="${results[2]}">
            <input type="hidden" name="type_of_name2" value="${results[0]}">

            `)
        }
        if(result.data.field3 != ""){
            var fields = result.data.field3;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field3" class="form-control" type="${results[0]}" placeholder="nama field 3 value="${results[2]}">
            <input type="hidden" name="type_of_name3" value="${results[0]}">

            `)
        }
        if(result.data.field4 != ""){
            var fields = result.data.field4;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field4" class="form-control" type="${results[0]}" placeholder="nama field 4" value="${results[2]}">
            <input type="hidden" name="type_of_name4" value="${results[0]}">

            `)
        }
        if(result.data.field5 != ""){
            var fields = result.data.field5;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field5" class="form-control" type="${results[0]}" placeholder="nama field 5" value="${results[2]}">
            <input type="hidden" name="type_of_name5" value="${results[0]}">

            `)
        }
        if(result.data.field6 != ""){
            var fields = result.data.field6;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field6" class="form-control" type="${results[0]}" placeholder="nama field 6" value="${results[2]}">
            <input type="hidden" name="type_of_name6" value="${results[0]}">

            `)
        }
        if(result.data.field7 != ""){
            var fields = result.data.field7;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field7" class="form-control" type="${results[0]}" placeholder="nama field 7" value="${results[2]}">
            <input type="hidden" name="type_of_name7" value="${results[0]}">

            `)
        }
        if(result.data.field8 != ""){
            var fields = result.data.field8;
            var results = fields.split("||");
             $(".koloms").append(`
            <input name="field8" class="form-control" type="${results[0]}" placeholder="nama field 8" value="${results[2]}">
            <input type="hidden" name="type_of_name8" value="${results[0]}">

            `)
        }

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

});
/******/ })()
;
