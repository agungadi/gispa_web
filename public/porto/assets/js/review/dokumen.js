$(document).ready(function () {

    var docs = []

    var filedata = [];
    var id_pernyataan;
    var env;

    // ------------  File upload BEGIN ------------



    $(document).on('click', '.open-doc', function (event) {
        var id = $(event.currentTarget).data('id');
        // id_pernyataan = id;
        // $('#docTable').empty();
        renderData(id);

    });

    function renderData(id) {
        $.ajax({
            url: route('dokumen.list', id),
            type: 'GET',
            success: function success(result) {

                docs = result.data;
                env = result.env;
                $.each(docs, function (i, docs) {
                    appendToUsrTable(docs);
                });


                function appendToUsrTable(user) {
                    $("#docTable").append(`
                          <tr id="user-${user.id}">
                              <td>${user.jenis_dokumen}</td>
                              '<td>${user.filename}</td>
                              '<td align="center">

                                  <a title="Download" class="btn btn-success btn-icon-only-action rounded-circle download-doc" data-id="${user.path}" data-path="${user.filename}" href="#">
                                  <span class="btn-inner--icon"><i class="fa fa-file-download"></i></span></a>

                                </td>
                          </tr>
                      `);
                }



            }
        });
    };


    $(document).on('click', '.btn-editDoc', function (event) {
        var id = $(event.currentTarget).data('id');
        editData(id);

    });

    function editData(id) {
        $.ajax({
          url: route('dokumen.edit', id),
          type: 'GET',
          success: function success(result) {
            $('#stateFieldId').val(result.data.id);
            $('#IdPernyataan').val(result.data.id_pernyataan);

            $('#edit_doc').val(result.data.jenis_dokumen).trigger('change.select2');
            $('.listFileEdit').empty();
            $('.listFileEdit').append("<div class='fileEdit__value'><div class='fileEdit__value--text'>" + result.data.filename + "</div></div>");

            // $('#stateFieldId').val(result.data.id);
            // $('#editName').val(result.data.name);
            // $('#editBobot').val(result.data.bobot);

            // $('#editCountryFieldID').val(result.data.subkomponen_id).trigger('change.select2');
            // $('#editDoc').modal('show');
          }
        });
      }

      var fileEdit;

    $('.file__input--fileEdit').on('change', function (event) {
        var files = event.target.files;

        fileEdit = files;

        $('.listFileEdit').empty();
        $('.listFileEdit').append("<div class='fileEdit__value'><div class='fileEdit__value--text'>" + files[0].name + "</div></div>");

    });

    $('.file__input--file').on('change', function (event) {
        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            filedata.push(file);
            $('.listFile').append("<div class='file__value'><div class='file__value--text'>" + file.name + "</div></div>");

        }
    });

    $(document).on('click', '.fileEdit__value', function () {
        $(this).remove();
    });

    $(document).on('click', '.file__value', function () {
        var removed = filedata.splice($(this).index(), 1);
        $(this).remove();
    });

    $(document).on('submit', '#editDocForm', function (e) {

            e.preventDefault();
            var formFile = new FormData(this);

            // var formData;

            var loadingButton = jQuery(this).find('#editSaveBtn');
            loadingButton.button('loading');

            var id = $('#stateFieldId').val();
            var id_pernyataan= $('#IdPernyataan').val();
            var jenis_doc = $('#edit_doc').val();

            if(fileEdit != undefined || fileEdit != null){
                formFile.append('files', fileEdit[0]);
            }

            formFile.append('id_pernyataan', id_pernyataan);
            formFile.append('jenis_dokumen', jenis_doc);
            formFile.append('_method', 'put');

        $.ajax({
          url: route('dokumen.update', id),
          type: 'POST',
          data: formFile,
          cache: false,
          contentType: false,
          processData: false,
          dataType: 'json',
          success: function success(result) {
            $('#editModalDoc').modal('hide');
            displaySuccessMessage(result.message);
            $('#docTable').empty();
            renderData(id_pernyataan);

          },
          error: function error(result) {
            displayErrorMessage(result.responseJSON.message);
          },
          complete: function complete() {
            loadingButton.button('reset');
          }
        });
      });


    $('#multi-file-upload-ajax').submit(function (e) {

        if(filedata.length == 0){
            $('#warning').text('Pilih File Terlebih Dahulu !');
        }else{
            $('#warning').text('');

            e.preventDefault();
            var formData = new FormData(this);

            var TotalFiles = filedata.length;
            var jenis_doc = $('#jenis_doc').find('option:selected').val();

  



            for (let i = 0; i < TotalFiles; i++) {
                formData.append('files' + i, filedata[i]);
            }
            formData.append('TotalFiles', TotalFiles);
            formData.append('jenis_dokumen', jenis_doc);
            formData.append('id_pernyataan', id_pernyataan);

            $.ajax({
                type: 'POST',
                url: route('dokumen.store'),
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: (data) => {
                    $('#docTable').empty();
                    renderData(id_pernyataan);
                }
            });
        }



    });

    $(document).on('click', '.delete-doc', function (event) {
        var stateId = $(event.currentTarget).data('id');


        var deleteStateUrl = route('dokumen.destroy', stateId);



        deleteItems(deleteStateUrl, 'Dokumen');



      });




window.deleteItems = function (url, header) {
    var callFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    swal.fire({
      title: 'Delete !',
      text: 'Are you sure want to delete this "' + header + '" ?',
      type: 'warning',
      icon: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      confirmButtonColor: '#f5365c',
      cancelButtonColor: '#888888',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then(function (result) {
      if (result.isConfirmed) {
        deleteItemAjax(url, header, callFunction);
      }
    });
  };

  function deleteItemAjax(url, header) {
    var callFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    $.ajax({
      url: url,
      type: 'DELETE',
      dataType: 'json',
      success: function success(obj) {
        if (obj.success) {

            $('#docTable').empty();
            renderData(id_pernyataan);
        }

        swal.fire({
          title: 'Deleted!',
          text: header + ' has been deleted.',
          icon: 'success',
          confirmButtonColor: '#f5365c',
          timer: 2000
        });

        if (callFunction) {
          eval(callFunction);
        }
      },
      error: function error(data) {
        swal.fire({
          title: '',
          text: data.responseJSON.message,
          icon: 'error',
          confirmButtonColor: '#f5365c',
          timer: 5000
        });
      }
    });
  }

  $(document).on('click', '.download-doc', function (event) {

    var path = $(event.currentTarget).data('id');
    var name = $(event.currentTarget).data('path');



    // var path =  `${process.env.URL_PATH_DOKUMEN}`;
    // window.axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.MIX_API_TOKEN}`;

    var url = env + path;



    let filename = '';
    try {
    filename = new URL(url).pathname.split('/').pop();
    } catch (e) {
    console.error(e);
    }

    var link = env + filename;


    $.ajax({
        url: link,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = name;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
  });



});


