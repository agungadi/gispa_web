/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/assets/js/states/states.js ***!
  \**********************************************/


$(document).ready(function () {

    function addImage(url, workbook, worksheet, excelCell, resolve) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.onload = function () {
          var reader = new FileReader();
          reader.readAsDataURL(xhr.response);
          reader.onloadend = function() {
            var base64data = reader.result;
            const image = workbook.addImage({
              base64: base64data,
              extension: 'png',
            });

            worksheet.getRow(excelCell.row).height = 170;

            worksheet.addImage(image, {
              tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
              br: { col: excelCell.col, row: excelCell.row }
            });

            resolve();
          }
        }
        xhr.onerror = function () {
          console.error('could not add image to excel cell')
        };
        xhr.send();
      }

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


  $.ajax({
    url: route('cluster.detail', splitStr),
    method: "GET",
    data: function data(_data) {
      console.log(_data);
      _data.kategori_id = $('#filterCountry').find('option:selected').val();
      console.log(_data.kategori_id);


  },
  success: function(data) {

    console.log(data.data);
    var tablename = $('#userTable').DataTable({
        data: data.data,



        deferRender: true,
        scroller: true,
        processing: true,

        columnDefs: [
            {
                'targets': [0],
                'width': '9%',
                'visible': false,
                'className': 'text-center action-table-btn'
              },
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
                data: 'image.path',
                name: 'image.path'
              },

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
              }
        ],


      });

    $(document).on('click', '#exportButton', function() {
        console.log("assss");
        var headervalue = $("#mycluster").text();

        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet('Main sheet');
        var promiseArray = [];


        const cellA1 = worksheet.getCell('A3');
        const cellB1 = worksheet.getCell('B3');
        const cellC1 = worksheet.getCell('C3');
        const cellD1 = worksheet.getCell('D3');
        const cellE1 = worksheet.getCell('E3');
        const cellF1 = worksheet.getCell('F3');
        const cellG1 = worksheet.getCell('G3');
        const cellH1 = worksheet.getCell('H3');
        const cellI1 = worksheet.getCell('I3');

        worksheet.getCell('A3').value = "Foto";
        worksheet.getCell('B3').value = "Nama";
        worksheet.getCell('C3').value = "Kategori";
        worksheet.getCell('D3').value = 'Status';
        worksheet.getCell('E3').value = 'Deskripsi';
        worksheet.getCell('F3').value = 'Rusak';
        worksheet.getCell('G3').value = 'Hilang';
        worksheet.getCell('H3').value = 'Geser';
        worksheet.getCell('I3').value = 'Terhalang';

        worksheet.getCell('A3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('B3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('C3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('D3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('E3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('F3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('G3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('H3').style = {font:{bold: true, name: 'Arial'}};
        worksheet.getCell('I3').style = {font:{bold: true, name: 'Arial'}};

        const ACol = worksheet.getColumn('A');
        const BCol = worksheet.getColumn('A');

        ACol.width = 25;
        BCol.width = 30;

        worksheet.getCell('A1').value = headervalue;



        tablename.rows().every(function() {
            var rowData = this.data();
            var rowNode = this.node();
            var rowIndex = tablename.row(rowNode).index() + 4;

            console.log(rowData);
            console.log(rowNode);

            console.log(rowData['nama']);
            console.log(rowIndex);




                // console.log(rowData);
                // console.log(rowNode);

                console.log(rowIndex);
                console.log("http://192.168.161.1:8001/"+rowData.image.path)


                worksheet.getCell('B' + rowIndex).value = rowData['nama'];
                worksheet.getCell('C' + rowIndex).value = rowData['kategori']['nama'];
                worksheet.getCell('D' + rowIndex).value = rowData['status'];
                worksheet.getCell('E' + rowIndex).value = rowData['deskripsi'];
                worksheet.getCell('F' + rowIndex).value = rowData['rusak'];
                worksheet.getCell('G' + rowIndex).value = rowData['hilang'];
                worksheet.getCell('H' + rowIndex).value = rowData['terhalang'];
                worksheet.getCell('I' + rowIndex).value = rowData['geser'];

                worksheet.getCell('A' + rowIndex).border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('B' + rowIndex).border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('C' + rowIndex).border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('D' + rowIndex).border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('E' + rowIndex).border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('F' + rowIndex).border = {
                  top: {style:'thin'},
                  left: {style:'thin'},
                  bottom: {style:'thin'},
                  right: {style:'thin'}
                };
                worksheet.getCell('G' + rowIndex).border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                  };
                  worksheet.getCell('H' + rowIndex).border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                  };
                  worksheet.getCell('I' + rowIndex).border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                  };


                  worksheet.getCell('B' + rowIndex).alignment = { wrapText: true };
                  worksheet.getCell('C' + rowIndex).alignment = { wrapText: true };
                  worksheet.getCell('D' + rowIndex).alignment = { wrapText: true };
                  worksheet.getCell('E' + rowIndex).alignment = { wrapText: true };
                  worksheet.getCell('F' + rowIndex).alignment = { wrapText: true };
                  worksheet.getCell('G' + rowIndex).alignment = { wrapText: true };
                  worksheet.getCell('H' + rowIndex).alignment = { wrapText: true };
                  worksheet.getCell('I' + rowIndex).alignment = { wrapText: true };



                var pictureUrl = "http://192.168.161.1:8001"+rowData.image.path;
                var pictureCell = worksheet.getCell('A' + rowIndex);
                pictureCell.value = undefined;

                var promise = new Promise(function(resolve, reject) {
                  addImage(pictureUrl, workbook, worksheet, pictureCell, resolve);
                });
                promiseArray.push(promise);
              });

              worksheet.columns.forEach(function (column, i) {
                if(i!==0)
                {
                    var maxLength = 0;
                    column["eachCell"]({ includeEmpty: true }, function (cell) {
                        var columnLength = cell.value ? cell.value.toString().length : 15;
                        if (columnLength > maxLength ) {
                            maxLength = columnLength;
                        }
                    });
                    column.width = maxLength < 12 ? 12 : maxLength;
                }
            });

            [cellA1, cellB1, cellC1, cellD1, cellE1, cellF1, cellG1, cellH1, cellI1].forEach(cell => {
                cell.border = {
                  top: { style: 'double', color: { argb: '3D3D3D' } },
                  left: { style: 'double', color: { argb: '3D3D3D' } },
                  bottom: { style: 'double', color: { argb: '3D3D3D' } },
                  right: { style: 'double', color: { argb: '3D3D3D' } }
                };
              });

            Promise.all(promiseArray).then(function() {
                workbook.xlsx.writeBuffer().then(function(buffer) {
                  saveAs(new Blob([buffer], { type: "application/octet-stream" }), "ExcelJSFormat.xlsx");
                });
              });


        });



  }


  }),



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

        var stringArray = result.data.nama.split(/(\s+)/);

        $('#fotoedit').empty();
        $('#stateFieldId').val(result.data.id);
        $('#editJenis').val(result.data.kategori_id).trigger('change.select2');
        $('#editNama').val(stringArray[0]);
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

        $('#fotoedit').append(`<img src="https://gispatok.com${result.data.image.path}" style="max-width:128px" />`);

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
        window.location.reload();
        $('#editModal').modal('hide');
        displaySuccessMessage(result.message);
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
        <img class="modal__img" src="https://gispatok.com${result.data.image.path_new}" alt="">
        <button class="detail__bagBtn" id="popup-img">Foto Lama</button>`: `
        <img class="modal__img" src="https://gispatok.com${result.data.image.path}" alt="">
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

  $(document).on('click', '#popup-img', function (event) {
    console.log("wowowow");

});

});
/******/ })()
;
