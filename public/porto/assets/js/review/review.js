

$(document).ready(function () {



    $('#showdropdown').on('click', function () {
        $dropdown = $('.dropdown-menu-right');
        if (($dropdown).hasClass("show")) {
            $dropdown.removeClass('show');
        }else{
            $dropdown.addClass('show');
        }
    });

    var id_evaluasi;
    var id_indikator;
    var rbUnit;

    var id_subkomponen;
    var id_komponen;
    var id_kelompok;
    var bobot_indikator;


    $(document).on('click', '.btn-modal', function (e) {
        $('.wraps').empty();

        e.preventDefault();
        var id = $(e.currentTarget).data('id');
        id_indikator = id;
        renderData(id, id_evaluasi);
        getParents(id);

    });


    function getParents(id) {
        $.ajax({
            url: route('tahap5.indikatorid', id),
            type: 'GET',
            success: function success(result) {


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
        $("#overlay").fadeIn(300);


        var id = $(event.currentTarget).data('id');
        var ids = $(event.currentTarget).data('ids');

        rbUnit = $(event.currentTarget).data('unit');

        id_evaluasi = ids


        $('.skf-tree').empty();

        komponen(id, "no");


    });


    $(document).on('click', '#komponen', function (event) {

        var id = $(event.currentTarget).data('id');
        console.log(id);
        if ($("#subkomponen" + id).children("#countsubkomponen").length == 0) {
            $("#overlay").fadeIn(300);
            subkomponen(id, "no")
        }
        $('input[value=sub1]').prop('checked', true);


    });

    $(document).on('click', '#subkomponenklik', function (event) {
        var id = $(event.currentTarget).data('id');
        if ($("#indikator" + id).children("#countindikator").length == 0) {
            $("#overlay").fadeIn(300);
            indikator(id, null,"no")
        }
    });

    $(document).on('click', '#indikatorklik', function (event) {

        var id = $(event.currentTarget).data('id');

        if ($("#docTable" +id).children("#tableReview").length == 0) {
            $("#overlay").fadeIn(300);
            lke(id)
        }
    });

    // $("input:checkbox").click(function() { return false; });

    $(document).on('click', '.projectcontent', function (event) {
        var id = $(event.currentTarget).data('id');

        $('input[value="val' + id + '"]').prop('checked', false);

    });

    $('input[type=checkbox]').click(function (e) {
        e.stopPropagation();
    });

    function kelompok() {
        var formData = {
            id_evaluasi: id_evaluasi,
        };
        $.ajax({
            url: route('tahap5.kelompok'),
            type: 'GET',
            data: formData,
            success: function success(result) {

                var datas = result.data;

                for (var i = 0; i < datas.length; i++) {
                    console.log(datas[i].name);
                    console.log(datas[i].sumReview);
                    $('#' + datas[i].name).empty();
                    $('#' + datas[i].name).append(Math.round(datas[i].sumReview * 100) / 100);
                }


            }
        })


    }

    function komponen(id, update) {

        console.log(id_evaluasi);
        var formData = {
            id_evaluasi: id_evaluasi,
            rb_unit: rbUnit,
        };
        $.ajax({
            url: route('tahap5.komponen', id),
            type: 'GET',
            data: formData,
            success: function success(result) {
                console.log(result.data)
                var datas = result.data;


                for (var i = 0; i < datas.length; i++) {

                    var nilai = 0;
                    if (datas[i].hasil_nilai.length == 0) {
                        nilai = 0;
                    } else {
                        for (var index = 0; index < datas[i].hasil_nilai.length; index++) {
                            nilai += parseFloat(datas[i].hasil_nilai[index]['nilai_indikator']); //don't forget to add the base
                        }
                    }

                    var nilReview = 0;
                    if (datas[i].hasil_review.length == 0) {
                        nilReview = 0;
                    } else {
                        for (var index = 0; index < datas[i].hasil_review.length; index++) {
                            console.log(datas[i].hasil_review[index]['nilai_indikator'])
                            nilReview += parseFloat(datas[i].hasil_review[index]['nilai_indikator']); //don't forget to add the base
                        }
                    }

                    console.log("nlai indikatorrr");
                    console.log(nilai);
                    console.log(nilReview);




                    if (update == "no") {
                        $('.skf-tree').append(
                            '<label class="tree">\
                        <input type="checkbox" class="komponen" value="kom'+ datas[i]['id'] + '" name="checkbox-tree" id="komponen" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Komponen] '+ datas[i]['name'] + '</span> <div class="borlabel"><div class="numLKE" id="nkom'+id + i + '">'+ Math.round(nilai * 100) / 100 +'</div><div class="lblLKE">LKE</div></div> <div class="borlabel"><div class="numReviews" id="rkom'+id + i + '">'+ Math.round(nilReview * 100) / 100 +'</div><div class="lblReviews">Review</div></div></div>\
                        <div class="tree__content subkomponen" id="subkomponen'+ datas[i]['id'] + '">\
                        </div>\
                    </label>'
                        );
                    } else {
                        console.log("ubahhhhhhhh gesss");

                        $('#nkom'+id + i).empty();
                        $('#rkom'+id + i).empty();

                        $('#nkom'+id + i).append(Math.round(nilai * 100) / 100);
                        $('#rkom'+id + i).append(Math.round(nilReview * 100) / 100);

                    }

                }

            }
        })

        setTimeout(function () {
            $("#overlay").fadeOut(300);
        }, 100);

    }

    function subkomponen(id, update) {
        var formData = {
            id_evaluasi: id_evaluasi,
        };
        console.log("cek id");
        console.log(id);
        $.ajax({
            url: route('tahap5.subkomponen', id),
            type: 'GET',
            data: formData,
            success: function success(result) {
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
                    var nilReview = 0;
                    if (datas[i].hasil_review.length == 0) {
                        nilReview = 0;
                    } else {
                        for (var index = 0; index < datas[i].hasil_review.length; index++) {
                            nilReview += parseFloat(datas[i].hasil_review[index]['nilai_indikator']); //don't forget to add the base
                        }
                    }




                    if (update == "no") {
                        $('#subkomponen' + datas[i]['komponen_id']).append(
                            '<label class="tree" id="countsubkomponen">\
                        <input type="checkbox" class="subkomponen" value="sub'+ datas[i]['id'] + '" name="checkbox-tree" id="subkomponenklik" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Sub-Komponen] '+ datas[i]['name'] + '</span> <div class="borlabel"><div class="numLKE" id="nsub'+id + i + '">'+ Math.round(nilai * 100) / 100 +'</div><div class="lblLKE">LKE</div></div> <div class="borlabel"><div class="numReviews" id="rsub'+id + i + '">'+ Math.round(nilReview * 100) / 100 +'</div><div class="lblReviews">Review</div></div> </div>\
                        <div class="tree__content" id="indikator'+ datas[i]['id'] + '">\
                        </div>\
                    </label>'
                        );
                    } else {

                        $('#nsub'+id + i).empty();
                        $('#rsub'+id + i).empty();

                        $('#nsub'+id + i).append(Math.round(nilai * 100) / 100);
                        $('#rsub'+id + i).append(Math.round(nilReview * 100) / 100);
                    }

                }

            }
        })
        setTimeout(function () {
            $("#overlay").fadeOut(300);
        }, 100);

    }

    function indikator(id, idkator, update) {

        var formData = {
            id_evaluasi: id_evaluasi,
        };
        $.ajax({
            url: route('tahap5.indikator', id),
            type: 'GET',
            data: formData,
            success: function success(result) {
                var datas = result.data;


                for (var i = 0; i < datas.length; i++) {
                    var nilai;
                    if (datas[i].children.length == 0) {
                        nilai = 0;
                    } else {
                        nilai = datas[i].children[0]['nilai_indikator'];
                    }

                    var nilReview;
                    if (datas[i].hasil_review.length == 0) {
                        nilReview = 0;
                    } else {
                        nilReview = datas[i].hasil_review[0]['nilai_indikator']; //don't forget to add the base
                    }

                    console.log("nlai indikatorrr");
                    console.log(Math.round(nilReview * 100) / 100);
                    console.log(Math.round(nilai * 100) / 100)
                    console.log(nilai);
                    console.log(nilReview);


                    //////TIDAK ADA UPDATE NILAI/////
                    if (update == "no") {
                        console.log("tidak ubahhhh indikatorrr");

                        $('#indikator' + datas[i]['subkomponen_id']).append(
                            '<label class="tree" id="countindikator">\
                        <input type="checkbox" class="project-input indikator" value="val'+ datas[i]['id'] + '" name="checkbox-tree" id="indikatorklik" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Indikator] '+ datas[i]['name'] + '</span> <div class="borlabel"><div class="numLKE" id="nindex'+id+i+'">'+ Math.round(nilai * 100) / 100 +'</div><div class="lblLKE">LKE</div></div> <div class="borlabel"><div class="numReviews" id="rindex'+id+i+'">'+ Math.round(nilReview * 100) / 100 +'</div><div class="lblReviews">Review</div></div> </div>\
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
                          <tbody id="docTable' + datas[i]['id'] + '" class="revTab'+ datas[i]['id'] + '">\
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
                        ////UPDATE NILAI
                        console.log("ubaahhhhhh indikatorrr");
                        console.log('#rindex'+id+i+'')
                        console.log('#rindex'+id+i+'')
                        console.log(Math.round(nilReview * 100) / 100);
                        console.log(Math.round(nilai * 100) / 100);

                        $('#nindex'+id+i).empty();
                        $('#rindex'+id+i).empty();

                        $('#rindex'+id+i).append(Math.round(nilReview * 100) / 100);
                        $('#nindex'+id+i).append(Math.round(nilai * 100) / 100);
                    }


                }
                if(update == "yes"){
                    $('#docTable'+idkator).empty();
                    lke(idkator);
                }
            }


        })
        setTimeout(function () {
            $("#overlay").fadeOut(300);
        }, 100);

    }

    function lke(id) {
        console.log("for yesss ansss");
        $('#tombol'+id).hide();
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



                result.data.forEach((ans, i) => {

                    console.log("for each ansss");
                    $('#tombol'+id).show();

                    console.log(ans);

                    var num = i + 1;

                    var reviewJawaban;
                    var reviewNnilai;
                    if(ans.review.length == 0){
                        reviewJawaban =  "-";
                        reviewNnilai =  "-";
                    }else{
                        reviewJawaban = ans.review[0].jawaban || "-";
                        reviewNnilai = ans.review[0].nilai || "-";
                    }




                    $('#docTable' + ans.id_indikator + '').append(`
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
        setTimeout(function () {
            $("#overlay").fadeOut(300);
        }, 100);

    }


    function renderData(id, id_evaluasi) {
        $('#emc-submit').hide();

        $.ajax({
            url: route('review.soal', id),
            type: 'GET',
            success: function success(result) {

                var env = result.env;

                var questions = [];
                questions = result.data;

                console.log("cekk filesss");
                console.log(questions);

                $('#myModalLabel').empty();

                $('.wraps').empty();
                $('.quiz').empty();
                $('#confirmSubmit').empty();
                $('#myModalLabel').append(result.data[0].indikator.name);
                $('#emc-progress').empty();

                $('.quiz').append(`
                <div class="wraps">
                </div>
                <div class="submit">
                <button id="emc-submit">Submit Review</button>
                </div>`)

                $('#confirmSubmit').append(`
                <button type="button"  class="btn-submit btn-second-modal within-first-modal btn btn-primary">
                    Ya
                </button>
                <button type="button" class="btn btn-default btnclose" data-dismiss="modal">Tidak</button>
                `)

                var content = $('.wraps');

                var selections = [];
                var listRumus = [];
                var selectionsReview = [];

                var deskripsi = [];
                var idLke = [];

                var persen = [];

                var filedata = new Array();

                var tempChosen = [];
                var tempSelections = [];

                cekReview();
                $('#result-stats').hide();


                /////proses klik after download////
                $(document).on('click', '.download-File', function (event) {
                    var path = $(event.currentTarget).data('path');
                    var name = $(event.currentTarget).data('id');

                    console.log(env);

                    var url = env + path;

                    console.log(url);

                    let filename = '';
                    try {
                    filename = new URL(url).pathname.split('/').pop();
                    } catch (e) {
                    console.error(e);
                    }
                    console.log(`filename: ${filename}`);

                    var link = env + filename;
                    console.log(link);


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






                function chosen() {

                    const accordion = document.querySelectorAll(".accordion");

                    accordion.forEach((element) => {
                        element.addEventListener("click", () => {
                            // ids = element.getAttribute('data-id')
                            element.classList.toggle("active");
                            let panel = element.nextElementSibling;
                            if (panel.style.maxHeight) {

                                $('#bukti' + element.getAttribute('data-id')).text('Lihat Bukti');

                                panel.style.maxHeight = null;
                            } else {

                                $('#bukti' + element.getAttribute('data-id')).text('Tutup Bukti');
                                panel.style.maxHeight = panel.scrollHeight + "px";
                            }
                        });
                    });


                    for (var i = 0; i < selections.length; i++) {
                        $('input[value="' + i + selections[i] + '"]').prop('checked', true);

                        $('input[name="answer' + i + '"]').attr('disabled', 'disabled');
                    }

                    ////centang radio button jika review sudah terisi
                    if(selectionsReview.length > 0){
                        for (var i = 0; i < selectionsReview.length; i++) {
                            $('input[value="b' + i + selectionsReview[i] + '"]').prop('checked', true);

                            $('input[name="answers' + i + '"]').attr('disabled', 'disabled');
                        }
                    }
                    // $("#youridname input:radio").attr('disabled',true);
                }

                function display() {



                    var fillQuestion = createQuestionElement();

                    content.append(fillQuestion);

                    var itemList = $('<div id="items_list">');

                    ///store array jawaban yg dipilih////
                    for (var index = 0; index < questions.length; index++) {

                        $('input[name="answers'+index+'"]').on('change', function() {
                            var names = $(this).attr("name");
                            var counterIndex = $(this).attr("class");
                            var values = $(this).attr("value");

                            var urutan = $(this).prevAll('[name='+names+']').length;
                            tempChosen[counterIndex] = +urutan;
                            tempSelections[counterIndex] = values;

                            // $('#fsModal').modal('toggle');
                            // $("#fsModal").fadeOut();
                            // $('#fsModal').modal({backdrop: 'false'}, 'hide');

                            // $("#btn-close")[0].onclick();

                            console.log($(this).val());
                            getChosen();

                        });

                        $('#submitResult'+index+'').on('click', function () {

                            console.log("cekk resulttssss");


                            console.log(questions);
                            console.log(selections);
                            console.log(selectionsReview);
                            console.log(deskripsi);
                            console.log(idLke);
                            console.log(tempChosen);
                            console.log(tempSelections);

                            var counterIndex = $(this).attr("data-id");

                            var formula = questions[counterIndex].formula[0].rumus;
                            console.log(formula);
                            var hasilRumus;
                            var persen;
                            var hasilpersen;
                            var nilaiAkhir;
                            $('.count'+counterIndex+' *').filter(':input')
                                .each(function () {
                                    console.log("sadasasa");

                                    // Print the value currently in
                                    // the input element
                                    formula = formula.toUpperCase().replaceAll($(this).attr('id').toUpperCase(), $(this).val());


                                    console.log($(this).val());
                                    console.log($(this).attr('id'));

                                });

                            hasilRumus = eval(formula);
                            console.log(formula);
                            console.log(hasilRumus);
                            persen = hasilRumus * 100;
                            if (persen > 100) {
                                hasilpersen = "0"
                            } else {
                                hasilpersen = persen;
                            }
                            // console.log("perhitungan");
                            // console.log(formula);
                            // console.log(persen);

                            // console.log(hasilpersen);

                            // console.log(hasilRumus);
                            // console.log(formula);

                            $('#hasResult'+counterIndex).text('' + formula + ' = ' + Math.round(hasilRumus * 1000) / 1000 + '');

                            $('.percentage'+counterIndex).text(Math.round(hasilpersen * 100) / 100);

                            nilaiAkhir = '' + formula + ' = '+ Math.round(hasilRumus * 1000) / 1000 + '';

                            tempSelections[counterIndex] = Math.round(hasilRumus * 1000) / 1000;

                            listRumus[counterIndex] = nilaiAkhir;
                            // listPersentase[questionCounter] = hasilpersen;

                            // console.log("aiiii");
                            // console.log(selections[questionCounter]);


                            // customConfirm();
                            tempChosen[counterIndex] = "Persen";

                            getChosen();

                        });
                    }





                    // $('input[type=radio][name=answers0]').change(function() {
                    //     console.log("asssszzzzz");

                    //     console.log(this.value);

                    // });


                    chosen();
                }

                function createQuestionElement() {



                    var accordion = $('<div class="accordion-container">');



                    var itemList = $('<div id="items_list">');

                    ////body bukti/////
                    for (var index = 0; index < questions.length; index++) {
                        console.log("length file");
                        // console.log(filedata[index].length);
                        // console.log(filedata[index].length);

                        var num = index + 1;
                        // Item pertanyaan
                        var button = $('<button type="button" class="accordion" id="accordion" data-id="' + index + '">');
                        var step = $('<span class="step" style="text-align: center;">' + num + '</span>');
                        var pertanyaan = $(`<span class="accordion-title">
                                         ${questions[index].name}
                                    </span>`);
                        var bukti = $('<span class="step-right"  id="bukti' + index + '"  style="text-align:center;">Lihat Bukti</span>');

                        var panel = $('<div class="panel">');

                        var paragaf = $(`
                        <div id="dokulist">
                        <div class="deskripsi_item control_panel">
                        <div id="pad">
                        <center>Deskripsi</center>
                        <textarea class="textarea" readonly>${deskripsi[index]}</textarea>
                        </div>
                        </div>
                        <label id="lblUnduh">List File <span class="text-danger">*Klik Untuk Unduh</span> :</label>

                        <div id="files_list${index}">

                        </div>
                        </div>`);



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
                        console.log("jenis jawaban cek");
                        console.log(questions);

                        console.log(questions[index].children[0].jenis_jawaban);
                        if (questions[index].children[0].jenis_jawaban == "Pilihan Ganda") {
                         /////jika review sudah terisi////
                        if(selectionsReview.length > 0){
                            for (var i = 0; i < questions[index].children.length; i++) {
                                $option = $('<input name="answer' + index + '" id="a' + index + i + '" value="' + index + questions[index].children[i].jawaban + '" type="radio">');
                                $label = $('<label for="a' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                                $options = $('<input name="answers' + index + '" class="'+index+'"  id="b' + index + i + '" value="b' + index + questions[index].children[i].jawaban + '" type="radio">');
                                $labels = $('<label for="b' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                                answer.append($option).append($label);
                                answers.append($options).append($labels);

                            }
                        }else{
                            for (var i = 0; i < questions[index].children.length; i++) {
                                $option = $('<input name="answer' + index + '" id="a' + index + i + '" value="' + index + questions[index].children[i].jawaban + '" type="radio">');
                                $label = $('<label for="a' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                                $options = $('<input name="answers' + index + '" class="'+index+'"  id="b' + index + i + '" value="' + questions[index].children[i].nilai + '" type="radio">');
                                $labels = $('<label for="b' + index + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                                answer.append($option).append($label);
                                answers.append($options).append($labels);

                            }

                        }
                        }else{
                            formula = questions[index].formula[0].rumus;
                            console.log("adas");
                            console.log(questions[index]);

                            answer.append(`<h3>${questions[index].formula[0].nama}</h3>`);
                            $kerangka = $(`<div class="flex-container">`);

                            $childKerangka1 = (`<div class="flex-child magenta">`);

                            $childKerangka2 = $(`<div class="flex-child green">`);


                            $count1 = $(`<div class="count">`);
                            $count2 = $(`<div class="counts">
                            <h2>Persentase</h2>
                            <h3><span class="value-cost costs percentage">${persen[index]}</span> <sup>%</sup></h3>
                            </div>
                            </div>`);



                            answer.append($kerangka);
                            $kerangka.append($childKerangka1).append($count1);

                            $count1.append(`<label class="lblJwb">${selections[index]}</label>`)

                            $btnRev = $(`<hr class="batas"/>
                            <input id="formel" value="${questions[index].formula[0].rumus}" type="text" placeholder="insert formular" readonly/>

                            `);

                        $kerangka.append($childKerangka2).append($count2);
                        answer.append($btnRev);

                        //////reviewer/////
                        formula = questions[index].formula[0].rumus;

                        answers.append(`<h3>${questions[index].formula[0].nama}</h3>`);
                        $kerangka = $(`<div class="flex-container">`);

                        $childKerangka1 = (`<div class="flex-child magenta">`);

                        $childKerangka2 = $(`<div class="flex-child green">`);


                        $count1 = $(`<div class="count${index}">`);
                        $count2 = $(`<div class="counts">
                        <h2>Persentase</h2>
                        <h3><span class="value-cost costs percentage${index}">0</span> <sup>%</sup></h3>
                        </div>
                        </div>`);

                        $btnRes = $(`<hr class="batas"/>
                        <input id="formel" value="${questions[index].formula[0].rumus}" type="text" placeholder="insert formular" readonly/>
                        <button id="submitResult${index}" data-id="${index}" class="btn btn-primary">Submit Jawaban</button>

                        <h2 id="hasResult${index}"></h2><hr class="batas"/>`);

                        answers.append($kerangka);
                        $kerangka.append($childKerangka1).append($count1);


                        for (var i = 0; i < questions[index].children.length; i++) {
                            if(questions[index].children[i].jumlah == "Jumlah tidak dapat diubah"){
                                $count1.append(`<label class="lblJwb">${questions[index].children[i].jawaban} :
                                <input class="clue" style="Width: 55px;" value="${questions[index].children[i].nilai}"  id="${questions[index].children[i].jawaban}" type="number" readonly/>
                                 </label>`);
                            }else{
                            $count1.append(`<label class="lblJwb">${questions[index].children[i].jawaban} :
                            <input class="clue" style="Width: 55px;" id="${questions[index].children[i].jawaban}" type="number"/>
                             </label>`);
                            }

                        }
                        $kerangka.append($childKerangka2).append($count2);
                        answers.append($btnRes);



                        for (var i = 0; i < questions[index].children.length; i++) {
                            answer.append(`<li class='buy_item'><span class="jwban">${questions[index].children[i].jawaban}</span> : ${questions[index].children[i].name}</li>`);
                            answers.append(`<li class='buy_item'><span class="jwban">${questions[index].children[i].jawaban}</span> : ${questions[index].children[i].name}</li>`);

                        }

                        }





                        accordion.append(kontainer);
                        kontainer.append(rows)
                        rows.append(sixCol);
                        rows.append(sixCols);
                        sixCol.append(answer);
                        sixCols.append(answers);



                        ///untuk append file list/////
                     if (filedata[index] != undefined) {
                        for (var i = 0; i < filedata[index].length; i++) {
                            console.log("hitungggg");
                            console.log('#files_list'+index+'');
                            paragaf.append(`<li id='{{id}}' class="files_item"><span class="jwban">File 1 :</span>
                            <a href="#" class="download-File" data-path="${filedata[index][i].path}" data-id="${filedata[index][i].filename}">
                              ${filedata[index][i].filename}</a></li>`);
                        }
                     }


                    };

                        return accordion;

                }


                function getChosen(index) {
                    console.log("get chosenn");
                    var jumlahSoal = questions.length;
                    console.log(jumlahSoal);
                    console.log(tempSelections.length);
                    $submit = $('#emc-submit');
                    if(tempSelections.filter(String).length == jumlahSoal){
                        $submit.addClass('ready-show');
                        $submit.click(function(e){
                            $("#first-modal").modal("show");
                            e.stopPropagation();


                        });
                    }
                }

                // $(document).on('click', '#emc-submit', function (e) {
                //     $("#first-modal").modal("show");
                // });

                $('.btnclose').on('click', function (e) {

                    $("#first-modal").modal("hide");

                    e.stopPropagation();

                    $('.modal').css('overflow-y', 'auto');

                });

                $('.btn-submit').on('click', function (e) {


                    // $("#first-modal").modal("hide");

                    console.log("jumlah button submitttttttt");

                    getScore();
                    e.preventDefault();


                });

                function getScore(){


                            // $('.modal').modal('hide');
                    //  $("#fsModal").modal("hide");

                    ////hitung hasil review////
                    var sumall = 0;
                    for (var i = 0; i < tempSelections.length; i++) {
                        sumall += parseFloat(tempSelections[i]); //don't forget to add the base
                    }
                    var avg = sumall / (tempSelections.length);
                    var nilai = avg * bobot_indikator;

                    /////post  nilai Review////

                    $("#overlay").fadeIn(function(){
                    storeReview(nilai);
                    });
                    // storeHasilReview(nilai);
                }

                function storeReview(nilai) {

                    // var table = $('#result-stats table').find('tbody');
                    // var tr;



                    for (var i = 0; i < questions.length; i++) {

                        // console.log(questions[i].children[tempChosen[i]]);

                        // console.log();
                        // console.log();
                        // console.log();

                        if(tempChosen[i] == "Persen"){
                            formData = {
                                id_lke : idLke[i],
                                id_evaluasi: id_evaluasi,
                                id_indikator: id_indikator,
                                id_pernyataan: questions[i].id,
                                id_jawaban: questions[i].children[0].id,
                                jawaban: listRumus[i],
                                nilai: tempSelections[i],
                                deskripsi: deskripsi[i],
                            };
                        }else{
                            formData = {
                                id_lke : idLke[i],
                                id_evaluasi: id_evaluasi,
                                id_indikator: id_indikator,
                                id_pernyataan: questions[i].id,
                                id_jawaban: questions[i].children[tempChosen[i]].id,
                                jawaban: questions[i].children[tempChosen[i]].jawaban,
                                nilai: tempSelections[i],
                                deskripsi: deskripsi[i],
                            };
                        }



                        $.ajax({
                            url: route('review.store'),
                            type: 'POST',
                            async: false,
                            data: formData,
                            success: function success(result) {
                                console.log(i);
                                if (result.success) {
                                }
                            },
                        });


                        // tr = $('<tr>');
                        // tr.append('<td><i class="fa fa-check-circle"></i>' + questions[i].name + '</td>');

                        // if(tempChosen[i] == "Persen"){
                        //     tr.append('<td style="text-align: center;">' + listRumus[i] + '</td>');
                        // }else{
                        //     tr.append('<td style="text-align: center;">' + questions[i].children[tempChosen[i]].jawaban + '</td>');
                        // }
                        // tr.append('<td style="text-align: center;">' + tempChosen[i] + '</td>');
                        // tr.appendTo(table);

                    }
                    // $('#result-stats').show();

                    storeHasilReview(nilai);

                }

                function storeHasilReview(nilai) {
                    var formData = {
                        id_evaluasi: id_evaluasi,
                        id_kelompok: id_kelompok,
                        id_komponen: id_komponen,
                        id_subkomponen: id_subkomponen,
                        id_indikator: id_indikator,
                        nilai_indikator: nilai,
                    };

                    console.log("horeee submit");

                    // $("#overlay").fadeIn(function(){

                    $.ajax({
                        url: route('resultreview.store'),
                        type: 'POST',
                        async: false,
                        data: formData,
                        success: function success(result) {



                            getEvaluasi(nilai);

                            // $('#fsModal').modal('toggle');
                            // $('#fsModal').modal('hide');
                            // $('.modal').modal('hide');

                        },
                    });
                    // });
                    console.log("horeee submit");

                    // console.log("refresh");
                    // console.log(id_kelompok);
                    // console.log(id_komponen);
                    // console.log(id_subkomponen);

                    kelompok();
                    komponen(id_kelompok, "yes");
                    subkomponen(id_komponen, "yes");
                    indikator(id_subkomponen, id_indikator, "yes");

                    // console.log("refresh");
                    // $('.modal').modal('hide');

                    setTimeout(function () {
                        $("#overlay").fadeOut(500);
                        $('.modal').modal("hide");
                        $('.modal-backdrop').remove();
                    }, 100);

                }

                function getEvaluasi(nilai) {
                    console.log("evaaaaaa");
                $.ajax({
                    url: route('evaluasi.edit', id_evaluasi),
                    type: 'GET',
                    async: false,
                    success: function success(result) {

                    var sumval = parseFloat(result.data.nilai_review) + parseFloat(nilai);
                    updateEvaluasi(sumval)
                    }
                });

                }

                function updateEvaluasi(sumval) {
                    var formData = {
                        nilai_review: sumval,
                    }
                    $.ajax({
                        url: route('resultreview.nilai', id_evaluasi),
                        type: 'PUT',
                        data: formData,
                        async: false,
                        success: function success(result) {


                        },
                      });
                }

                function cekReview() {
                    var formData = {
                        id_evaluasi: id_evaluasi,
                        id_indikator: id,
                    };

                    console.log(formData);

                    $.ajax({
                        url: route('review.cek'),
                        type: 'GET',
                        data: formData,
                        async: false,
                        success: function success(result) {

                            if(result.data.length > 0){
                                $('#emc-submit').hide();
                                result.data.forEach((ans, i) => {
                                    console.log("looop get review");
                                    console.log(ans.jawaban);
                                    selectionsReview.push(ans.jawaban);
                                })
                                getLKE();
                            }else{
                                $('#emc-submit').show();

                                getLKE();
                            }
                        }
                        });
                }

                function getLKE() {
                    var formData = {
                        id_evaluasi: id_evaluasi,
                        id_indikator: id,
                    };

                    $.ajax({
                        url: route('lke.hasil'),
                        type: 'GET',
                        data: formData,
                        async: false,
                        success: function success(result) {
                            if (result.success) {
                                console.log("sukses okelah");
                            }
                            result.data.forEach((ans, i) => {



                                selections.push(ans.jawaban);
                                deskripsi.push(ans.deskripsi);
                                idLke.push(ans.id);
                                persen.push(Math.round((ans.nilai * 100) * 100) / 100);

                                ////store file dokumen ke array/////
                                console.log(filedata[0]);
                                for(var index = 0; index < ans.file.length; index++){
                                    if(filedata[i] == undefined){
                                        filedata[i] = [];
                                    }

                                    filedata[i].push(ans.file[index]);
                                    // filedata[questionCounter].push(tempData[i]);

                                }
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

