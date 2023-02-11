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
        //   var tablename = $('#userTable');
        //   var param= $("input[name=getParams]").val();

        //   tablename.DataTable({
        //     deferRender: true,
        //     scroller: true,
        //     processing: true,
        //     serverSide: true,
        //     'order': [[0, 'asc']],
        //     ajax: {
        //         url: route('datageografis.index', param),
        //         data: function data(_data) {
        //         _data.roles = $('#filterCountry').find('option:selected').val();
        //         console.log(_data.roles);

        //     }
        //     },
        //     columnDefs: [{
        //       'targets': [1],
        //       'width': '8%',
        //       'orderable': false,
        //       'className': 'text-center action-table-btn'
        //     }, {
        //       targets: '_all',
        //       defaultContent: 'N/A'
        //     }],
        //     columns: [
        //     {
        //       data: 'f_jalan',
        //       name: 'f_jalan'
        //     },
        //     // {
        //     //     data: 'tipe',
        //     //     name: 'geografis.tipe'
        //     //   },
        //     //   {
        //     //     data: 'namageo',
        //     //     name: 'geografis.nama'
        //     //   },
        //     {
        //       data: function data(row) {
        //         var url = route('layer.edit', row.id);
        //         var data = [{
        //           'id': row.id,
        //           'url': url
        //         }];
        //         return prepareTemplateRender('#statesTemplate', data);
        //       },
        //       name: 'id'
        //     }],
        //     'fnInitComplete': function fnInitComplete() {
        //       $(document).on('change', '#filterCountry', function () {
        //         console.log('sada');
        //         $('#userTable').DataTable().ajax.reload(null, true);
        //         console.log('working');
        //       });
        //     }
        //   });
        $(document).on('submit', '#createStateForm', function (e) {
            e.preventDefault();
            console.log($(this).serialize());
            var loadingButton = jQuery(this).find('#saveBtn');
            loadingButton.button('loading');
            console.log("asuuuuuu");
            $.ajax({
                url: route('datageografis.store'),
                type: 'POST',
                data: $(this).serialize(),
                success: function success(result) {
                    console.log("asuuuuuu");
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

        $(document).on('click', '.add-btn', function (event) {
            console.log("tambah");
            var center = [-7.2369247, 111.894956];
            // Create the map
            var map = L.map('map').setView(center, 10);
            // Set up the Open Street map layer
            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetmap</a>',
                maxZoom: 18
            }).addTo(map);
            var drawnItems = new L.FeatureGroup();
            map.addLayer(drawnItems);
            var drawControl = new L.Control.Draw({
                position: 'topright',
                draw: {
                    polygon: {
                        shapeOptions: {
                            color: 'purple' //polygons being drawn will be purple color
                        },
                        allowIntersection: false,
                        drawError: {
                            color: 'orange',
                            timeout: 1000
                        },
                        showArea: true, //the area of the polygon will be displayed as it is drawn.
                        metric: false,
                        repeatMode: true
                    },
                    polyline: {
                        shapeOptions: {
                            color: 'red'
                        },
                    },
                    circlemarker: false, //circlemarker type has been disabled.
                    rect: {
                        shapeOptions: {
                            color: 'green'
                        },
                    },
                    circle: false,
                },
                edit: {
                    featureGroup: drawnItems
                }
            });
            map.addControl(drawControl);
            map.on('draw:created', function (e) {
                var type = e.layerType,
                    layer = e.layer;
                var shape = layer.toGeoJSON();
                var shape_for_db = JSON.stringify(shape);
                var x = JSON.parse(shape_for_db);
                var res = "";
                if (x['geometry']['type'] == "Point") {
                    $('#tipe').val('point');
                    res = "POINT(";
                    res += x['geometry']['coordinates'][0] + " " + x['geometry']['coordinates'][1];
                    res += ")";
                    // POINT( x y )
                } else if (x['geometry']['type'] == "LineString") {
                    $('#tipe').val('line');
                    res = "LINESTRING(";
                    // alert(x['geometry']['coordinates'].length);
                    for (var i = 0; i < x['geometry']['coordinates'].length; i++) {
                        if (i == 0) {
                            res += x['geometry']['coordinates'][i][0] + " " + x['geometry']['coordinates'][
                                i][1];
                        } else {
                            res += ',' + x['geometry']['coordinates'][i][0] + " " + x['geometry'][
                                'coordinates'
                            ][i][1];
                        }
                    }
                    res += ")";
                } else if (x['geometry']['type'] == "Polygon") {
                    $('#tipe').val('polygon');
                    res = "POLYGON((";
                    for (var i = 0; i < x['geometry']['coordinates'][0].length; i++) {
                        if (i == 0) {
                            res += x['geometry']['coordinates'][0][i][0] + " " + x['geometry'][
                                'coordinates'][0][i][1];
                        } else {
                            res += ',' + x['geometry']['coordinates'][0][i][0] + " " + x['geometry'][
                                'coordinates'
                            ][0][
                                i
                            ][1];
                        }
                    }
                    res += "))";

                }
                drawnItems.addLayer(layer);
                $('#polygon').val(res);
            });
            $('#editModal').on('shown.bs.modal', function () {
                console.log("mapzzzz kuyy");
                map.invalidateSize();
            });



        });


        $(document).on('click', '.edit-btn', function (event) {



            var id = $(event.currentTarget).data('id');
            var tb = $(event.currentTarget).data('tb');

            console.log(id);
            console.log(tb);
            // $('#mapedit').empty();
            // $("#mapedit").append(`<div id="mapid" style="height: 600px; width: 95%; margin-left: 2%; margin-bottom: 2%;"></div>`);


            renderData(id, tb);
        });

        function renderData(id, tb) {
            var formData = {
                id: id,
                idgeo: tb,
            };
            console.log(formData);
            $.ajax({
                url: route('edit.datageo'),
                type: 'GET',
                data: formData,
                success: function success(result) {
                    console.log("asssss");
                    console.log(result);

                    $('#stateFieldId').val(result.data.id);

                    $('#editgeojson').val(result.data.geojson);

                    if (result.data.field1 != "") {
                        console.log(result.data.field1);

                        $('#edit1').val(result.data.field1);
                    }
                    if (result.data.field2 != "") {
                        $('#edit2').val(result.data.field2);
                    }
                    if (result.data.field3 != "") {
                        $('#edit3').val(result.data.field3);
                    }
                    if (result.data.field4 != "") {
                        $('#edit4').val(result.data.field4);

                    }
                    if (result.data.field5 != "") {
                        $('#edit5').val(result.data.field5);

                    }
                    if (result.data.field6 != "") {
                        $('#edit6').val(result.data.field6);
                    }
                    if (result.data.field7 != "") {
                        $('#edit7').val(result.data.field7);
                    }
                    if (result.data.field8 != "") {
                        $('#edit8').val(result.data.field8);

                    }

                    $('#editModal').modal('show');
                    var center = [-7.2369247, 111.894956];
                    // Create the map
                    var map = L.map('mapid').setView(center, 10);


                    // Set up the Open Street map layer
                    L.tileLayer(
                        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: 'Data © <a href="http://osm.org/copyright">OpenStreetmap</a>',
                        maxZoom: 18
                    }).addTo(map);
                    var drawnItems = new L.FeatureGroup();
                    map.addLayer(drawnItems);


                    map.on('draw:created', function (e) {
                        var type = e.layerType,
                            layer = e.layer;
                        var shape = layer.toGeoJSON();
                        var shape_for_db = JSON.stringify(shape);
                        var x = JSON.parse(shape_for_db);
                        var res = "";
                        if (x['geometry']['type'] == "Point") {
                            $('#tipe').val('point');
                            res = "POINT(";
                            res += x['geometry']['coordinates'][0] + " " + x['geometry']['coordinates'][1];
                            res += ")";
                            // POINT( x y )
                        } else if (x['geometry']['type'] == "LineString") {
                            $('#tipe').val('line');
                            res = "LINESTRING(";
                            // alert(x['geometry']['coordinates'].length);
                            for (var i = 0; i < x['geometry']['coordinates'].length; i++) {
                                if (i == 0) {
                                    res += x['geometry']['coordinates'][i][0] + " " + x['geometry']['coordinates'][
                                        i][1];
                                } else {
                                    res += ',' + x['geometry']['coordinates'][i][0] + " " + x['geometry'][
                                        'coordinates'
                                    ][i][1];
                                }
                            }
                            res += ")";
                        } else if (x['geometry']['type'] == "Polygon") {
                            $('#tipe').val('polygon');
                            res = "POLYGON((";
                            for (var i = 0; i < x['geometry']['coordinates'][0].length; i++) {
                                if (i == 0) {
                                    res += x['geometry']['coordinates'][0][i][0] + " " + x['geometry'][
                                        'coordinates'][0][i][1];
                                } else {
                                    res += ',' + x['geometry']['coordinates'][0][i][0] + " " + x['geometry'][
                                        'coordinates'
                                    ][0][
                                        i
                                    ][1];
                                }
                            }
                            res += "))";

                        }
                        $('#editgeojson').val(res);

                        drawnItems.addLayer(layer);
                        // $('#polygon').val(res);
                    });

                    var drawControl = new L.Control.Draw({
                        position: 'topright',
                        draw: {
                            polygon: {
                                shapeOptions: {
                                    color: 'purple' //polygons being drawn will be purple color
                                },
                                allowIntersection: false,
                                drawError: {
                                    color: 'orange',
                                    timeout: 1000
                                },
                                showArea: true, //the area of the polygon will be displayed as it is drawn.
                                metric: false,
                                repeatMode: true
                            },
                            polyline: {
                                shapeOptions: {
                                    color: 'red'
                                },
                            },
                            circlemarker: false, //circlemarker type has been disabled.
                            rect: {
                                shapeOptions: {
                                    color: 'green'
                                },
                            },
                            circle: false,
                        },
                        edit: {
                            featureGroup: drawnItems
                        }
                    });
                    map.addControl(drawControl);

                    var gjson = result.data.geojson;
                    var wicket = new Wkt.Wkt();
                    var polygon = wicket.read(gjson);
                    var data_wicket = polygon.toObject();


                    data_wicket.addTo(map);
                    drawnItems.addLayer(data_wicket);
                    console.log("tandai");
                    console.log(data_wicket);
                    // var wkt = new gjson.Wkt();


                    // var polygon1 = wkt.read(result.data.geojson);

                    // var data_wkt = gjson.toObject();
                    // console.log(polygon1);
                    // console.log(data_wkt);


                    map.on('draw:edited', function (e) {
                        var layers = e.layers;
                        var shape = layers.toGeoJSON();
                        var shape_for_db = JSON.stringify(shape);
                        var x = JSON.parse(shape_for_db);
                        var xs = JSON.stringify(x['features']);
                        var xs_new = JSON.parse(xs);
                        $('.saleh_attamimi').html(xs_new[0]['geometry']['type']);
                        console.log(xs_new[0]['geometry']['type']);


                        var countOfEditedLayers = 0;
                        var res = "";
                        if (xs_new[0]['geometry']['type'] == "Point") {
                            $('#tipe').val('point');
                            res = "POINT(";
                            res += xs_new[0]['geometry']['coordinates'][0] + " " + xs_new[0]['geometry']['coordinates'][1];
                            res += ")";
                        // POINT( x y )
                    } else if (xs_new[0]['geometry']['type'] == "LineString") {
                        $('#tipe').val('line');
                        res = "LINESTRING(";
                        // alert(x['geometry']['coordinates'].length);
                        for (var i = 0; i < xs_new[0]['geometry']['coordinates'].length; i++) {
                            if (i == 0) {
                                res += xs_new[0]['geometry']['coordinates'][i][0] + " " + xs_new[0]['geometry']['coordinates'][i][1];
                            } else {
                                res += ',' + xs_new[0]['geometry']['coordinates'][i][0] + " " + xs_new[0]['geometry']['coordinates'][i][1];
                            }
                        }
                        res += ")";
                    } else if (xs_new[0]['geometry']['type'] == "Polygon") {
                        $('#tipe').val('polygon');
                        res = "POLYGON((";
                        for (var i = 0; i < xs_new[0]['geometry']['coordinates'][0].length; i++) {
                            if (i == 0) {
                                res += xs_new[0]['geometry']['coordinates'][0][i][0] + " " + xs_new[0]['geometry']['coordinates'][0][i][1];
                            } else {
                                res += ',' + xs_new[0]['geometry']['coordinates'][0][i][0] + " " + xs_new[0]['geometry']['coordinates'][0][i][1];
                            }
                        }
                        res += "))";
                    }
                    else if (xs_new[0]['geometry']['type'] == "Multipolygon") {
                        $('#tipe').val('multipolygon');
                        res = "MULTIPOLYGON((";
                        for (var i = 0; i < xs_new[0]['geometry']['coordinates'][0].length; i++) {
                            if (i == 0) {
                                res += xs_new[0]['geometry']['coordinates'][0][i][0] + " " + xs_new[0]['geometry']['coordinates'][0][i][1];
                            } else {
                                res += ',' + xs_new[0]['geometry']['coordinates'][0][i][0] + " " + xs_new[0]['geometry']['coordinates'][0][i][1];
                            }
                        }
                        res += "))";
                    }

                    $('#editgeojson').val(res);
                        layers.eachLayer(function(layer) {
                            countOfEditedLayers++;
                        });
                        console.log("Edited " + countOfEditedLayers + " layers");
                    });


                    map.invalidateSize();


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
                url: route('datageografis.update', id),
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
            var tb = $(event.currentTarget).data('tb');



            var formData = {
                id: stateId,
                idgeo: tb,
            };

            var deleteStateUrl = route('datageografis.hapus', stateId);
            deleteItems(deleteStateUrl, 'Data Geografis', formData);

            // console.log(formData);
            // $.ajax({
            //     url: route('datageografis.hapus', id),
            //     type: 'POST',
            //     data: formData,
            //     success: function success(result) {

            //     }
            // });

        });

        window.deleteItems = function (url, header, form) {
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
                deleteItemAjax(url, header, form);
              }
            });
          };

          function deleteItemAjax(url, header, form) {
            var callFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            $.ajax({
                url: url,
                type: 'POST',
                data: form,
              success: function success(obj) {
                if (obj.success) {

                    // $('#docTable').empty();
                    // renderData(id_pernyataan);
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


    });
    /******/
})()
    ;
W
