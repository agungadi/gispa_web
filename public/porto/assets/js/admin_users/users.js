/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./resources/assets/js/admin_users/users.js ***!
  \**************************************************/


$(document).ready(function () {
  $('#status, #available_as_freelancer').select2({
    width: '100%'
  });
  var tableName = $('#usersTable');
  tableName.DataTable({
    deferRender: true,
    scroller: true,
    processing: true,
    serverSide: true,
    'order': [[1, 'desc']],
    ajax: {
      url: route('users.index'),
      data: function data(_data) {
        _data.status = $('#status').find('option:selected').val();
        _data.available_as_freelancer = $('#available_as_freelancer').find('option:selected').val();
      }
    },
    columnDefs: [{
      'targets': [0],
      'className': 'text-center',
      'orderable': false,
      'searchable': false,
      'width': '5%'
    }, {
      'targets': [3],
      'className': 'text-center',
      'width': '4%'
    }, {
      'targets': [4],
      'orderable': false,
      'searchable': false,
      'className': 'text-center',
      'width': '4%'
    }, {
      'targets': [4, 5],
      'orderable': false,
      'searchable': false,
      'className': 'text-center',
      'width': '4%'
    }, {
      'targets': [6, 7],
      'orderable': false,
      'className': 'text-center action-table-btn',
      'width': '5%'
    }, {
      targets: '_all',
      defaultContent: 'N/A'
    }],
    columns: [{
      data: function data(row) {
        return '<img src="' + row.profile_image + '" class="rounded-circle thumbnail-rounded"' + '</img>';
      },
      name: 'profile'
    }, {
      data: function data(row) {
        return '<a href="' + route('users.show', row.id) + '" class="text-blue">' + row.full_name + '</a>';
      },
      name: 'created_at'
    }, {
      data: 'email',
      name: 'email'
    }, {
      data: function data(row) {
        if (row.status == 1 && row.roles[0].name !== 'super_admin') {
          return "<a href=\"".concat(route('portfolio.front', row.user_name), "\" class=\"show-btn text-blue\" target=\"_blank\">").concat(row.user_name, "</a>");
        } else {
          return row.user_name;
        }
      },
      name: 'user_name'
    }, {
      data: function data(row) {
        if (row.roles[0].name === 'super_admin') {
          return "<span class=\"badge badge-primary\">Active</span>";
        }

        return "<label class=\"custom-toggle pl-0 mx-auto\">\n            <input type=\"checkbox\" name=\"status\"  id=\"status\" value=\"".concat(row.status, "\" data-id=\"").concat(row.id, "\" ").concat(row.status == 1 ? 'checked' : '', ">\n            <span class=\"custom-toggle-slider rounded-circle\"></span>\n        </label>");
      },
      name: 'status'
    }, {
      data: function data(row) {
        if (row.roles[0].name === 'super_admin') {
          return "<span class=\"badge badge-primary\">Active</span>";
        }

        return "<label class=\"custom-toggle pl-0 mx-auto\">\n            <input type=\"checkbox\" name=\"email_verified_at\" id=\"emailVerified\" data-id=\"".concat(row.id, "\" ").concat(row.email_verified_at != null ? 'checked' : '', " >\n            <span class=\"custom-toggle-slider rounded-circle\"></span>\n        </label>");
      },
      name: 'email_verified_at'
    }, {
      data: function data(row) {
        if (row.status == 1) {
          var role = row.roles[0].name === 'super_admin';
          var url = route('impersonate', row.id);
          var data = [{
            'url': url,
            'role': role,
            'username': row.full_name
          }];
          return prepareTemplateRender('#impersonateUserTemplate', data);
        } else {
          return 'N/A';
        }
      },
      name: 'id'
    }, {
      data: function data(row) {
        var role = row.roles[0].name === 'super_admin';
        var url = route('admin.users.edit', row.id);
        var data = [{
          'id': row.id,
          'url': url,
          'role': role
        }];
        return prepareTemplateRender('#userTemplate', data);
      },
      name: 'id'
    }],
    'fnInitComplete': function fnInitComplete() {
      $(document).on('change', '#status, #available_as_freelancer', function () {
        $(tableName).DataTable().ajax.reload(null, true);
      });
    }
  });
  $(document).on('click', '.delete-btn', function (event) {
    var recordId = $(event.currentTarget).data('id');
    deleteItem(route('users.destroy', recordId), tableName, 'User');
  });
  $(document).on('click', '#status', function () {
    var id = $(this).attr('data-id');
    var status = $(this).is(':checked') ? $(this).val(1) : $(this).val(0);
    $.ajax({
      url: route('change.status', id),
      data: status,
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          $(tableName).DataTable().ajax.reload(null, true);
        }
      }
    });
  });
  $(document).on('click', '#emailVerified', function () {
    var id = $(this).attr('data-id');
    $.ajax({
      url: route('change.email', id),
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          $(tableName).DataTable().ajax.reload(null, true);
        }
      }
    });
  });
});
/******/ })()
;