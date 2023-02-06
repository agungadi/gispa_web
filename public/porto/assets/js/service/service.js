/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./resources/assets/js/service/service.js ***!
  \************************************************/


$(document).ready(function () {
  //create new record
  var pickr = createColorPicker();
  setTimeout(function () {
    pickr.setColor(serviceDefaultColor);
  }, 100);
  var picked = false;
  pickr.on('change', function () {
    var color = pickr.getColor().toHEXA().toString();
    pickr.setColor(color);
    $('#color').val(color);
    picked = true;
  }); //edit record

  var editPickr = editColorPicker();
  editPickr.on('change', function () {
    var color = editPickr.getColor().toHEXA().toString();
    editPickr.setColor(color);
    $('#edit_color').val(color);
  });
  var tablename = $('#serviceTable');
  tablename.DataTable({
    deferRender: true,
    scroller: true,
    processing: true,
    serverSide: true,
    'order': [[4, 'desc']],
    ajax: {
      url: route('services.index')
    },
    columnDefs: [{
      'targets': [0],
      'className': 'text-center',
      'orderable': false,
      'width': '5%'
    }, {
      'targets': [1],
      'className': 'text-wrap'
    }, {
      'targets': [2],
      'width': '7%',
      'className': 'text-center',
      'orderable': false
    }, {
      'targets': [3],
      'width': '8%',
      'orderable': false,
      'className': 'text-center action-table-btn'
    }, {
      'targets': [4],
      'visible': false
    }],
    columns: [{
      data: function data(row) {
        return '<img src="' + row.icon_image + '" class="rounded-circle thumbnail-rounded"' + '</img>';
      },
      name: 'id'
    }, {
      data: function data(row) {
        return '<a href="#" class="show-btn text-blue"  data-id="' + row.id + '">' + row.name + ' </a>';
      },
      name: 'name'
    }, {
      data: function data(row) {
        var inStyle = 'style';

        if (row.color == '#FFFFFF') {
          return "<span class=\"badge data-table-common-color d-block\" ".concat(inStyle, "=\"background:#f5365c\"></span>");
        } else {
          return "<span class=\"badge data-table-common-color d-block\" ".concat(inStyle, "=\"background: ").concat(row.color, "\"></span>");
        }
      },
      name: 'id'
    }, {
      data: function data(row) {
        var url = route('services.edit', row.id);
        var data = [{
          'id': row.id,
          'url': url
        }];
        return prepareTemplateRender('#serviceTemplate', data);
      },
      name: 'id'
    }, {
      data: function data(row) {
        return row.created_at;
      },
      name: 'created_at'
    }]
  });
  $(document).on('click', '.addNewServices', function (event) {
    $('.pcr-button').css({
      'color': '#f5365c',
      'border': '1px solid grey'
    });
    $('#serviceModal').appendTo('body').modal('show');
  });
  var filename;
  $(document).on('change', '#icon', function () {
    filename = $(this).val();

    if (isValidImg($(this), '#validationErrorsBox')) {
      serviceDisplayPhoto(this, '#iconPreview');
    }

    $('#validationErrorsBox').delay(3000).slideUp(300);
  });
  $(document).on('change', '#editIcon', function () {
    filename = $(this).val();

    if (isValidImg($(this), '#editValidationErrorsBox')) {
      serviceDisplayPhoto(this, '#editIconPreview');
    }

    $('#editValidationErrorsBox').delay(3000).slideUp(300);
  });
  $(document).on('submit', '#serviceForm', function (e) {
    e.preventDefault();
    var empty = $('#description').val().trim().replace(/ \r\n\t/g, '') === '';

    if (empty) {
      displayErrorMessage('Description field is not contain only white space');
      return false;
    }

    if (filename == null || filename == '') {
      displayErrorMessage('Please select image');
      return false;
    }

    if (!picked) {
      displayErrorMessage('Please select color.');
      return false;
    }

    var loadingButton = jQuery(this).find('#serviceSaveBtn');
    loadingButton.button('loading');
    $.ajax({
      url: route('services.store'),
      type: 'POST',
      data: new FormData($(this)[0]),
      contentType: false,
      processData: false,
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          $('#serviceModal').modal('hide');
          $('#serviceTable').DataTable().ajax.reload(null, false);
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
  $('#serviceModal').on('hidden.bs.modal', function () {
    $('#iconPreview').attr('src', defaultImage);
    filename = null;
    pickr.setColor('#000000');
    pickr.hide();
    resetModalForm('#serviceForm', '#validationErrorsBox');
  });
  $(document).on('click', '.edit-btn', function (event) {
    var id = $(event.currentTarget).data('id');
    renderData(id);
  });

  function renderData(id) {
    $.ajax({
      url: route('services.edit', id),
      type: 'GET',
      success: function success(result) {
        $('#serviceId').val(result.data.id);
        $('#editName').val(result.data.name);
        $('#showCreatedOn').val(result.data.created_at);
        $('#showUpdatedOn').val(result.data.updated_at);
        $('#editDescription').text(result.data.description);
        editPickr.setColor(result.data.color);
        $('#editIconPreview').attr('src', result.data.icon_image);
        $('#editModal').modal('show');
      }
    });
  }

  $(document).on('submit', '#serviceUpdateForm', function (e) {
    var empty = $('#editDescription').val().trim().replace(/ \r\n\t/g, '') === '';

    if (empty) {
      displayErrorMessage('Description field is not contain only white space');
      return false;
    }

    e.preventDefault();
    var loadingButton = jQuery(this).find('#serviceSaveBtn');
    loadingButton.button('loading');
    var id = $('#serviceId').val();
    $.ajax({
      url: route('services.update', id),
      type: 'POST',
      data: new FormData($(this)[0]),
      contentType: false,
      processData: false,
      success: function success(result) {
        $('#editModal').modal('hide');
        displaySuccessMessage(result.message);
        $('#serviceTable').DataTable().ajax.reload(null, false);
      },
      error: function error(result) {
        displayErrorMessage(result.responseJSON.message);
      },
      complete: function complete() {
        loadingButton.button('reset');
      }
    });
  });
  $('#editModal').on('hidden.bs.modal', function () {
    editPickr.hide();
    resetModalForm('#serviceUpdateForm', '#editValidationErrorsBox');
  });
  $(document).on('click', '.show-btn', function (event) {
    var servicelId = $(event.currentTarget).data('id');
    $.ajax({
      url: route('services.show', servicelId),
      type: 'GET',
      success: function success(result) {
        if (result.success) {
          $('#showName').html('');
          $('#showDescription').html('');
          $('#iconPreview').attr('');
          $('#showCreatedOn').html('');
          $('#showUpdatedOn').html('');
          $('.showColor').html('');
          $('#showName').append(result.data.name);
          var element = document.createElement('textarea');
          element.innerHTML = !isEmpty(result.data.description) ? result.data.description : 'N/A';
          $('#showDescription').html(element.value);

          if (result.data.color == '#FFFFFF') {
            $('.showColor').css('background', '#f5365c');
          } else {
            $('.showColor').css('background', result.data.color);
          }

          $('#showCreatedOn').append(moment(result.data.created_at).fromNow());
          $('#showUpdatedOn').append(moment(result.data.updated_at).fromNow());
          $('#showIconPreview').attr('src', result.data.icon_image);
          $('#showModal').appendTo('body').modal('show');
        }
      },
      error: function error(result) {
        displayErrorMessage(result.responseJSON.message);
      }
    });
  });
  $(document).on('click', '.delete-btn', function (event) {
    var serviceId = $(event.currentTarget).data('id');
    var deleteServiceUrl = route('services.destroy', serviceId);
    deleteItem(deleteServiceUrl, tablename, 'Service');
  });

  window.serviceDisplayPhoto = function (input, selector, validationMessageSelector) {
    var displayPreview = true;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;

        image.onload = function () {
          // if ((image.height < 300 || image.width < 300)) {
          //     $('#iconicon').val('');
          //     $('#editIcon').val('');
          //     $(validationMessageSelector).removeClass('d-none');
          //     displayErrorMessage('The image must be grater than of pixel 300x300.')
          //     return false;
          // }
          $(selector).attr('src', e.target.result);
          displayPreview = true;
        };
      };

      if (displayPreview) {
        reader.readAsDataURL(input.files[0]);
        $(selector).show();
      }
    }
  };
});
/******/ })()
;