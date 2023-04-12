/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/assets/js/states/states.js ***!
  \**********************************************/


$(document).ready(function () {
    var url = $(location).attr('href');
    var last_part=url.substr(url.lastIndexOf('/') + 1)

    let splitStr = last_part.split("%")[0];
    console.log(splitStr);

    const accordion = document.querySelectorAll(".accordiontable");

accordion.forEach((element) => {
	element.addEventListener("click", () => {
		element.classList.toggle("active");
		let panel = element.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
});

    $('[data-toggle="toggle"]').change(function(){
        $(this).parents().next('.hide').toggle();
    });

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
      url: route('cluster.detail', splitStr),
      data: function data(_data) {
        _data.kategori_id = $('#filterCountry').find('option:selected').val();
        console.log(_data.kategori_id);

    }
    },
    columnDefs: [

        {
        'targets': [7],
        'width': '9%',
        'orderable': false,
        'className': 'text-center action-table-btn'
      },
      {
        'targets': [4],
        'width': '9%',
        'orderable': false,
        'className': 'text-center action-table-btn'
      },
      {
        'targets': [6],
        'width': '9%',
        'orderable': false,
        'className': 'text-center action-table-btn'
      },
      {
        'targets': [5],
        'width': '9%',
        'orderable': false,
        'className': 'text-center action-table-btn'
      },
      {
          'targets': [3],
          'width': '30%',
          "className": "text-center",
          'orderable': false,
          'className': 'text-center action-table-btn'
        },


        {
        targets: '_all',
        defaultContent: 'N/A'
      }],
      select: {
        style:    'multi',
        selector: 'td.select-checkbox'
    },
      columns: [

        {
          data: 'nama',
          name: 'nama'
        },

        {
            data: 'kategori.nama',
            name: 'kategori.nama'
          },
          {
            data: 'status',
            name: 'status'
          },
        {
            data: 'deskripsi',
            name: 'deskripsi'
          },
        {
            data: 'rusak',
            name: 'rusak'
        },
        {
            data: 'hilang',
            name: 'hilang'
        },
        {
            data: 'terhalang',
            name: 'terhalang'
        },
        {
            data: 'geser',
            name: 'geser'
        },
      {
        data: function data(row) {
          var data = [{
            'id': row.id,

          }];
          return prepareTemplateRender('#statesTemplate', data);
        },
        name: 'id'
      }],
    'fnInitComplete': function fnInitComplete() {
      $(document).on('change', '#filterCountry', function () {
        console.log('sada');
        $('#clusterTable').DataTable().ajax.reload(null, true);
        console.log('working');
      });
    }
  });

  $(document).on('click', '.detail-cluster', function (event) {
    var wilayah = $(event.currentTarget).data('id');
    var km = $(event.currentTarget).data('km');
    var ruas = $(event.currentTarget).data('ruas');

    console.log(wilayah);
    console.log(km);
    console.log(ruas);

    var formData = {
        wilayah: wilayah,
        ruas_jalan: ruas,
        nilai_km: km,
    };

    console.log(formData);

    $.ajax({
        url: route('cluster.detail'),
        type: 'POST',
        data: formData,
        success: function success(result) {
            console.log(result.data);
            // var enc = result.data.enkrip;
            // var url = route('datageografis.index', enc);
            // window.open(url, '_blank').focus();

        }
    });
    // renderData(id);
  });

  $('#stateModal').on('hidden.bs.modal', function () {
    $('#editopd').val([]).trigger('change');
    $('#editroles').val([]).trigger('change');

    resetModalForm('#createStateForm', '#validationErrorsBox');
  });
  $(document).on('click', '.edit-btn', function (event) {
    var id = $(event.currentTarget).data('id');
    console.log(id);
    // $('#editModal').modal('show');

    renderData(id);
  });

  function renderData(id) {

    $.ajax({
      url: route('patok.edit', id),
      type: 'GET',
      success: function success(result) {
        console.log(result.data);
        $('#fotoedit').empty();
        $('#stateFieldId').val(result.data.id);
        $('#editJenis').val(result.data.kategori_id).trigger('change.select2');
        $('#editKM').val(result.data.nilai_km);
        $('#editHM').val(result.data.nilai_hm);

        $('#editWilayah').val(result.data.wilayah).trigger('change.select2');
        $('#editJalan').val(result.data.ruas_jalan).trigger('change.select2');

        // $("#radiorusak")('input[value="Ya"]').prop('checked', true);
        // $("#radiogeser")('input[value="Ya"]').prop('checked', true);
        // $('input:radio[name=rows]').val(['input[value="Ya"]']).prop('checked', true);
        // $("#yarusak").prop('checked', true);
        // $("#yahilang").prop('checked', true);
        // $("#yarusak").attr('checked', 'checked');
        // $("#yahilang").attr('checked', 'checked');


        if(result.data.rusak == "Ya"){
            $("#yarusak").prop('checked', true);
        }else{
            $("#tidakrusak").prop('checked', true);
        }

        if(result.data.hilang == "Ya"){
            $("#yahilang").prop('checked', true);
        }else{
            $("#tidakhilang").prop('checked', true);
        }

        if(result.data.terhalang == "Ya"){
            $("#yaterhalang").prop('checked', true);
        }else{
            $("#tidakterhalang").prop('checked', true);
        }

        if(result.data.geser == "Ya"){
            $("#yageser").prop('checked', true);
        }else{
            $("#tidakgeser").prop('checked', true);
        }
        $('#statusPatok').val(result.data.status).trigger('change.select2');


        $('#editDeskripsi').val(result.data.deskripsi);

        $('#fotoedit').append(`<img src="http://192.168.161.1:8001${result.data.image.path}" style="max-width:128px" />`);

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
    deleteItem(deleteStateUrl, '#clusterTable', 'User');
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
        <img class="modal__img" src="http://192.168.161.1:8001${result.data.image.path_new}" alt="">
        <p class="detail__bagBtn">add to bag</p>`: `
        <img class="modal__img" src="http://192.168.161.1:8001${result.data.image.path}" alt="">
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
      <tr>
      <th>Periode </th>
      <td> : ${result.data.periode}</td>
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
