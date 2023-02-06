

$(document).ready(function () {



    $('.btn-default').on('click', function () {
        $("#first-modal").modal("show");
        // customConfirm();
    });

    var id_evaluasi;
    var id_indikator;

    var id_subkomponen;
    var id_komponen;
    var id_kelompok;
    var bobot_indikator;


    $(document).on('click', '.btn-modal', function (event) {
        var id = $(event.currentTarget).data('id');
        console.log("ini id indikator");
        console.log(id);
        id_indikator = id;
        renderData(id, id_evaluasi);
        // getParents(id);

    });


    function getParents(id) {
        $.ajax({
            url: route('tahap5.indikatorid', id),
            type: 'GET',
            success: function success(result) {
                console.log("get Parents");
                console.log(result.data[0]);
                console.log(result.data[0].id);
                console.log(result.data[0].subkomponen.id);
                console.log(result.data[0].subkomponen.komponen2.id);
                console.log(result.data[0].subkomponen.komponen2.komponen1.id);
                console.log(result.data[0].bobot);

                id_subkomponen = result.data[0].subkomponen.id;
                id_komponen = result.data[0].subkomponen.komponen2.id;
                id_kelompok = result.data[0].subkomponen.komponen2.komponen1.id;
                bobot_indikator = result.data[0].bobot;
            }
        });
    }


    $('.btn').click(function () {
        $('.btn').removeClass('active').addClass('inactive');
        $(this).removeClass('inactive').addClass('active');
    });

    $(document).on('click', '#kelompok', function (event) {

        // renderData("3");


        var id = $(event.currentTarget).data('id');
        var ids = $(event.currentTarget).data('ids');

        id_evaluasi = ids

        console.log("dsadasd");
        console.log(id_evaluasi);
        console.log("dsadasd");

        $('.skf-tree').empty();

        komponen(id, "no");


    });


    $(document).on('click', '#komponen', function (event) {

        var id = $(event.currentTarget).data('id');
        console.log(id);
        if ($("#subkomponen" + id).children("#countsubkomponen").length == 0) {
            subkomponen(id, "no")
        }
        $('input[value=sub1]').prop('checked', true);


    });

    $(document).on('click', '#subkomponenklik', function (event) {
        var id = $(event.currentTarget).data('id');
        if ($("#indikator" + id).children("#countindikator").length == 0) {
            indikator(id, "no")
        }
    });

    $(document).on('click', '#indikatorklik', function (event) {

        var id = $(event.currentTarget).data('id');
        console.log("sadas");
        console.log($("#docTable").children("#tableReview").length);
        if ($("#docTable").children("#tableReview").length == 0) {
            console.log("testing tablee");
            lke(id)
        }
    });

    // $("input:checkbox").click(function() { return false; });

    $(document).on('click', '.projectcontent', function (event) {
        var id = $(event.currentTarget).data('id');
        console.log('input[value="val' + id + '"]');
        console.log("cekkkk klikkk");
        $('input[value="val' + id + '"]').prop('checked', false);

    });

    $('input[type=checkbox]').click(function (e) {
        e.stopPropagation();
    });

    function kelompok() {
        $.ajax({
            url: route('tahap5.kelompok'),
            type: 'GET',
            success: function success(result) {
                console.log("ini adalah komponen");
                console.log(result.data)
                var datas = result.data;

                for (var i = 0; i < datas.length; i++) {
                    console.log(datas[i].name);
                    console.log(datas[i].sumall);
                    $('#' + datas[i].name).empty();
                    $('#' + datas[i].name).append(Math.round(datas[i].sumall * 100) / 100);
                }


            }
        })


    }

    function komponen(id, update) {
        $.ajax({
            url: route('tahap5.komponen', id),
            type: 'GET',
            success: function success(result) {
                console.log(result.data)
                var datas = result.data;


                for (var i = 0; i < datas.length; i++) {

                    var nilai = 0;
                    if (datas[i].hasil_nilai.length == 0) {
                        nilai = 0;
                    } else {
                        for (var index = 0; index < datas[i].hasil_nilai.length; index++) {
                            console.log(datas[i].hasil_nilai[index]['nilai_indikator'])
                            nilai += parseFloat(datas[i].hasil_nilai[index]['nilai_indikator']); //don't forget to add the base
                        }
                    }
                    console.log(Math.round(nilai * 100) / 100);



                    if (update == "no") {
                        $('.skf-tree').append(
                            '<label class="tree">\
                        <input type="checkbox" class="komponen" value="kom'+ datas[i]['id'] + '" name="checkbox-tree" id="komponen" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Komponen] '+ datas[i]['name'] + '</span> <span id="nkom' + i + '" class="nilai">' + Math.round(nilai * 100) / 100 + '</span></div>\
                        <div class="tree__content subkomponen" id="subkomponen'+ datas[i]['id'] + '">\
                        </div>\
                    </label>'
                        );
                    } else {

                        $('#nkom' + i).empty();
                        $('#nkom' + i).append(Math.round(nilai * 100) / 100);
                    }

                }

            }
        })


    }

    function subkomponen(id, update) {
        $.ajax({
            url: route('tahap5.subkomponen', id),
            type: 'GET',
            success: function success(result) {
                console.log(result.data)
                var datas = result.data;


                for (var i = 0; i < datas.length; i++) {
                    var nilai = 0;
                    if (datas[i].children.length == 0) {
                        nilai = 0;
                    } else {
                        for (var index = 0; index < datas[i].children.length; index++) {
                            console.log(datas[i].children[index]['nilai_indikator'])
                            nilai += parseFloat(datas[i].children[index]['nilai_indikator']); //don't forget to add the base
                        }
                    }
                    console.log(nilai);


                    if (update == "no") {
                        $('#subkomponen' + datas[i]['komponen_id']).append(
                            '<label class="tree" id="countsubkomponen">\
                        <input type="checkbox" class="subkomponen" value="sub'+ datas[i]['id'] + '" name="checkbox-tree" id="subkomponenklik" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Sub-Komponen] '+ datas[i]['name'] + '</span> <span id="nsub' + i + '" class="nilai">' + Math.round(nilai * 100) / 100 + '</span> </div>\
                        <div class="tree__content" id="indikator'+ datas[i]['id'] + '">\
                        </div>\
                    </label>'
                        );
                    } else {

                        $('#nsub' + i).empty();
                        $('#nsub' + i).append(Math.round(nilai * 100) / 100);
                    }

                }

            }
        })

    }

    function indikator(id, update) {
        $.ajax({
            url: route('tahap5.indikator', id),
            type: 'GET',
            success: function success(result) {
                console.log("ini adalah daftar nilaiiiii");
                console.log(result.data)
                var datas = result.data;


                for (var i = 0; i < datas.length; i++) {
                    var nilai;
                    if (datas[i].children.length == 0) {
                        nilai = 0;
                    } else {
                        nilai = datas[i].children[0]['nilai_indikator'];
                    }
                    if (update == "no") {
                        console.log("tidak updateee");

                        $('#indikator' + datas[i]['subkomponen_id']).append(
                            '<label class="tree" id="countindikator">\
                        <input type="checkbox" class="project-input indikator" value="val'+ datas[i]['id'] + '" name="checkbox-tree" id="indikatorklik" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Indikator] '+ datas[i]['name'] + '</span> <span id="nindex' + i + '" class="nilai">' + Math.round(nilai * 100) / 100 + '</span></div>\
                        <div class="tree__contentlast" id="pertanyaan'+ datas[i]['id'] + '">\
                        <div class="projectcontent"  data-id='+ datas[i]['id'] + '>\
                        <div class="form-c" id="form'+ datas[i]['id'] + '">\
                        <div class="qa">\
                        <div class="q" id="result' + datas[i]['id'] + '">\
                        <table class="rwd-table">\
                        <tr>\
                            <th  style="width:36%">Nama</th>\
                            <th  style="width:13%">Jawaban</th>\
                            <th  style="width:20%">Nilai</th>\
                            <th  style="width:13%">Jawaban Review</th>\
                            <th  style="width:20%">Nilai Review</th>\
                          </tr>\
                          <tbody id="docTable" class="revTab'+ datas[i]['id'] + '">\
                          </tbody>\
                        </table>\
                        </div>\
                    </div>\
                    </br>\
                    <button class="btn btn-primary btn-modal" id="tombol'+ datas[i]['id'] + '" data-id="' + datas[i]['id'] + '" data-toggle="modal" data-target="#fsModal">\
                    Review LKE\
                    </button>\
                    </div>\
                        </div>\
                        </label>'
                        );
                    } else {

                        $('#nindex' + i).empty();
                        $('#nindex' + i).append(Math.round(nilai * 100) / 100);
                    }


                }
            }


        })
    }

    function lke(id) {
        var formData = {
            id_evaluasi: id_evaluasi,
            id_indikator: id,
        };
        $.ajax({
            url: route('lke.hasil'),
            type: 'GET',
            data: formData,
            success: function success(result) {
                if (result.success) {
                    console.log("sukses");
                }
                console.log(result.data);


                result.data.forEach((ans, i) => {
                    console.log(ans.id);
                    console.log(ans.nilai);
                    console.log(ans.jawaban);
                    var num = i + 1;

                    var reviewJawaban = ans.review.jawaban || "-";
                    var reviewNnilai = ans.review.nilai || "-";



                    $('#docTable').append(`
                    <tr id="tableReview">
                    <td>${ans.pertanyaan.name}</td>
                    <td align="center">${ans.jawaban}</td>
                    <td align="center">${ans.nilai}</td>
                    <td align="center">${reviewJawaban} </td>
                    <td align="center">${reviewNnilai}</td>

                    </tr>`);
                });

            },
        });
    }


    function renderData(id, id_evaluasi) {
        $.ajax({
            url: route('review.soal', id),
            type: 'GET',
            success: function success(result) {



                var questions = result.data;
                console.log(questions);

                $('#myModalLabel').empty();

                $('#myModalLabel').append(result.data[0].indikator.name);

                var content = $('.wraps');

                var selections = [];

                getLKE();

                function chosen() {

                    const accordion = document.querySelectorAll(".accordion");

                    accordion.forEach((element) => {
                        element.addEventListener("click", () => {
                            // ids = element.getAttribute('data-id')
                            element.classList.toggle("active");
                            let panel = element.nextElementSibling;
                            if (panel.style.maxHeight) {
                                console.log(element.getAttribute('data-id'));

                                $('#bukti' + element.getAttribute('data-id')).text('Lihat Bukti');

                                panel.style.maxHeight = null;
                            } else {
                                console.log(element.getAttribute('data-id'));

                                $('#bukti' + element.getAttribute('data-id')).text('Tutup Bukti');
                                panel.style.maxHeight = panel.scrollHeight + "px";
                            }
                        });
                    });

                    console.log(selections)

                    for (var i = 0; i < selections.length; i++) {
                        console.log("ini memilih jawaban radio");
                        console.log(selections[i])
                        $('input[value="' + i + selections[i] + '"]').prop('checked', true);

                        $('input[name="answer' + i + '"]').attr('disabled', 'disabled');
                    }

                    // $("#youridname input:radio").attr('disabled',true);

                }

                function display() {


                    console.log("display");
                    console.log(questions.length);
                    console.log(questions[0]);

                    console.log(questions[0].name);

                    var accordion = $('<div class="accordion-container">');

                    content.append(accordion);

                    var itemList = $('<div id="items_list">');

                    for (var index = 0; index < questions.length; index++) {
                        var num = index + 1;
                        // /Item pertanyaan/////
                        var button = $('<button type="button" class="accordion" id="accordion" data-id="' + index + '">');
                        var step = $('<span class="step" style="text-align: center;">' + num + '</span>');
                        var pertanyaan = $(`<span class="accordion-title">
                                         ${questions[index].name}
                                    </span>`);
                        var bukti = $('<span class="step-right"  id="bukti' + index + '"  style="text-align:center;">Lihat Bukti</span>');

                        var panel = $('<div class="panel">');

                        var paragaf = $(`
                    <div id="dokulist">
                    <!-- <h1>Mydokulist 購物清單</h1> -->
                    <div class="deskripsi_item control_panel">
                    <div id="pad">
                    <center>Deskripsi</center>
                    <textarea class="textarea"></textarea>
                    </div>
                    </div>
                    <label id="lblUnduh">List File <span class="text-danger">*Klik Untuk Unduk</span> :</label>

                    <div id="files_list">

                    <li id='{{id}}' class='files_item'><span class="jwban">File 1</span> : What is the web and howorks What</li>
                    <li id='{{id}}' class='files_item'><span class="jwban">File 2</span> : What is the web and how it works</li>
                    </div>
                    </div>
`);

                        accordion.append(button);
                        button.append(step).append(pertanyaan);
                        button.append(bukti);

                        panel.append(paragaf);

                        accordion.append(panel);


                        var kontainer = $('<div class="container">');

                        var rows = $('<div class="row">');

                        var sixCol = $('<section class="six columns">');
                        var sixCols = $('<section class="six columns">');

                        var question = $('<div class="question">');
                        var answer = $('<div id="choice">');
                        var answers = $('<div id="choices">')

                        for (var i = 0; i < questions[index].children.length; i++) {
                            $option = $('<input name="answer' + index + '" id="a' + index + i + '" value="' + index + questions[index].children[i].jawaban + '" type="radio">');
                            $label = $('<label for="a' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                            $options = $('<input name="answers' + index + '" id="b' + index + i + '" value="' + questions[index].children[i].nilai + '" type="radio">');
                            $labels = $('<label for="b' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                            answer.append($option).append($label);
                            answers.append($options).append($labels);

                        }

                        accordion.append(kontainer);
                        kontainer.append(rows)
                        rows.append(sixCol);
                        rows.append(sixCols);
                        sixCol.append(answer);
                        sixCols.append(answers);



                        //     var row = $('<div class="row">');
                        // var rows = $('<div class="row">');

                        // var sebelasCols = $('<div class="duabelas columns">');
                        // var satuCols = $('<div class="satu columns">');
                        // var sixCol = $('<section class="six columns">');
                        // var sixCols = $('<section class="six columns">');

                        // var question = $('<div class="question">');
                        // var answer = $('<div id="choice">');
                        // var answers = $('<div id="choices">');

                        ////Soal///

                        // for (var i = 0; i < questions[index].children.length; i++) {
                        //     $option = $('<input name="answer'+index+'" id="a' + index + i + '" value="' + index + questions[index].children[i].jawaban + '" type="radio">');
                        //     $label = $('<label for="a' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                        //     $options = $('<input name="answers'+index+'" id="b' + index + i + '" value="' + questions[index].children[i].nilai + '" type="radio">');
                        //     $labels = $('<label for="b' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                        //     answer.append($option).append($label);
                        //     answers.append($options).append($labels);

                        // }

                        ///reviewe///

                        // content.append(row);
                        // row.append(sebelasCols);
                        // row.append(satuCols);
                        // sebelasCols.append(`<div class="">${questions[index].name}</div>`);
                        // satuCols.append('<div class="">bukti</div>')

                        // content.append(rows);
                        // rows.append(sixCol);
                        // rows.append(sixCols);
                        // sixCol.append(answer);
                        // sixCols.append(answers);

                    }

                    chosen();

                }

                function getLKE() {
                    var formData = {
                        id_evaluasi: id_evaluasi,
                        id_indikator: id,
                    };
                    console.log("cek getLKE");
                    console.log(id_evaluasi);
                    console.log(id);

                    console.log(formData);
                    $.ajax({
                        url: route('lke.hasil'),
                        type: 'GET',
                        data: formData,
                        success: function success(result) {
                            if (result.success) {
                                console.log("sukses okelah");
                            }
                            console.log(result.data);
                            result.data.forEach((ans, i) => {
                                console.log("looop get lke");
                                console.log(ans.jawaban);

                                console.log(ans);
                                selections.push(ans.jawaban);
                            });

                            display();

                            // result.data.forEach((ans, i) => {


                        },
                    });
                }

            }
        });
    }

})

