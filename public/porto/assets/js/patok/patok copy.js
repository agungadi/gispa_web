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
      url: route('patok.index'),
      data: function data(_data) {
        _data.kategori_id = $('#filterCountry').find('option:selected').val();
        console.log(_data);
        console.log(_data.kategori_id);

    }
    },
    columnDefs: [{
      'targets': [8],
      'width': '8%',
      'orderable': false,
      'className': 'text-center action-table-btn'
    },{
        'targets': [6],
        'width': '8%',
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
        data: 'kategori.nama',
        name: 'kategori_id'
      },
    {
        data: 'nilai_km',
        name: 'nilai_km'
      },
      {
        data: 'nilai_hm',
        name: 'nilai_hm'
      },
      {
        data: 'wilayah',
        name: 'wilayah'
      },
      {
        data: 'ruas_jalan',
        name: 'ruas_jalan'
      },
      {
        data: function data(row) {
            var shilang;
            if(row.hilang == "Tidak"){
                shilang = "<i class='fas fa-check-circle greeniconcolor'> Hilang : Tidak"
            }else {
                shilang = "<i class='fas fa-times-circle rediconcolor'> Hilang : Ya"
            }

            var srusak;
            if(row.rusak == "Tidak"){
                srusak = "<i class='fas fa-check-circle greeniconcolor'> Rusak : Tidak"
            }else {
                srusak = "<i class='fas fa-times-circle rediconcolor'> Rusak : Ya"
            }

            var sgeser;
            if(row.geser == "Tidak"){
                sgeser = "<i class='fas fa-check-circle greeniconcolor'> Bergeser : Tidak"
            }else {
                sgeser = "<i class='fas fa-times-circle rediconcolor'> Bergeser : Ya"
            }

            var sterhalang;
            if(row.terhalang == "Tidak"){
                sterhalang = "<i class='fas fa-check-circle greeniconcolor'> Terhalang : Tidak"
            }else {
                sterhalang = "<i class='fas fa-times-circle rediconcolor'> Terhalang : Ya"
            }

            var data = [{
              'id': row.id,
              'hilang': shilang,
              'rusak': srusak,
              'geser': sgeser,
              'terhalang': sterhalang,

            }];
            return prepareTemplateRender('#statesWarna', data);
          },
        name: 'id'
      },
      {
        data: 'status',
        name: 'status'
      },

    {
      data: function data(row) {
        var url = route('patok.edit', row.id);
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
      url: route('patok.store'),
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
      url: route('patok.edit', id),
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
        $('#edi_warna_tebal').val(result.data.tebal_border);
        $('#edi_opacity').val(result.data.opacity);

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
      url: route('patok.update', id),
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
    var deleteStateUrl = route('patok.destroy', stateId);
    deleteItem(deleteStateUrl, '#userTable', 'User');
  });

  $(document).on('click', '.detail-btn', function (event) {
    var id = $(event.currentTarget).data('id');
    console.log(id);
    $('#detailModal').modal('show');
    detailData(id);
});


function detailData(id) {
    console.log("lfg 1");

    $.ajax({
      url: route('patok.edit', id),
      type: 'GET',
      success: function success(result) {
        $('.r-detail').empty();
        $('#img-detail').empty();
        console.log(result.data);
        console.log();
        $('#d_nama').val(result.data.nama);

        $('#img-detail').append(`
        `+
        (result.data.image.path_new != "" && result.data.image.path_new != null ? `
        <img class="modal__img" src="https://nanomacine.my.id${result.data.image.path_new}" alt="">
        <p class="detail__bagBtn">add to bag</p>`: `
        <img class="modal__img" src="https://nanomacine.my.id${result.data.image.path}" alt="">
        `) +`

        `)

        $('.r-detail').append(`
        <table>
        <tr>
        <th>Jenis Patok </th>
        <td> : ${result.data.kategori.nama}</td>
    </tr>
        <tr>
            <th>Nilai KM </th>
            <td> : ${result.data.nilai_km}</td>
        </tr>
        <tr>
            <th>Nilai HM </th>
            <td> : ${result.data.nilai_hm}</td>
        </tr>
        <tr>
            <th>Wilayah </th>
            <td> : ${result.data.wilayah}</td>
        </tr>
        <tr>
            <th>Ruas Jalan</th>
            <td> : ${result.data.ruas_jalan}</td>
        </tr>
        <tr>
            <th>Rusak </th>
            <td> : ${result.data.rusak}</td>
        </tr>
        <tr>
            <th>Hilang </th>
            <td> : ${result.data.hilang}</td>
        </tr>
        <tr>
            <th>Terhalang </th>
            <td> : ${result.data.terhalang}</td>
        </tr>
        <tr>
          <th>Geser </th>
          <td> : ${result.data.geser}</td>
      </tr>
      <tr>
      <th>Status Geser </th>
      <td> : ${result.data.status_geser}</td>
  </tr>
      <tr>
          <th>Status </th>
          <td> : ${result.data.status}</td>
      </tr>
      <tr>
          <th>Deskripsi </th>
          <td> : ${result.data.deskripsi}</td>
      </tr>
      <tr>
          <th>Koordinat </th>
          <td> : ${result.data.latlng}</td>
      </tr>
      <tr>
          <th>Tanggal </th>
          <td> : ${result.data.created_at}</td>
      </tr>
        `+
        (result.data.image.path_new != ""  && result.data.image.path_new != null ? ` <tr>
        <th>Diperbarui </th>
        <td> : ${result.data.updated_at}</td>
        </tr>`: '') +`
    </table
        `);

        if(result.data.image.path_new != ""){
            $('r-detail').append(``)
        };

      }
    });
  }


});
/******/ })()
;
