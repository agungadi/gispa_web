
// Search

$(document).ready(function () {



    $('.btn-default').on('click', function () {
        $("#first-modal").modal("show");
        // customConfirm();
    });

    var id_evaluasi;

    var id_indikator;
    var rbUnit;

    var id_subkomponen;
    var id_komponen;
    var id_kelompok;
    var bobot_indikator;


    $(document).on('click', '.btn-modal', function (event) {
        var id = $(event.currentTarget).data('id');
        console.log("ini id indikator");
        console.log(id);
        id_indikator = id;
        renderData(id);
        getParents(id);

    });


    function getParents(id) {
        $.ajax({
            url: route('tahap5.indikatorid', id),
            type: 'GET',
            success: function success(result) {
                console.log("get Parents");


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
        // $('input[value=sub1]').prop('checked', true);
    });

    $(document).on('click', '#subkomponenklik', function (event) {
        var id = $(event.currentTarget).data('id');
        if ($("#indikator" + id).children("#countindikator").length == 0) {
            $("#overlay").fadeIn(300);
            indikator(id, "no")
        }
    });

    $(document).on('click', '#indikatorklik', function (event) {

        var id = $(event.currentTarget).data('id');
        console.log("sadas");
        console.log($("#result" + id).children(".result").length);
        if ($("#result" + id).children(".result").length == 1) {
            $("#overlay").fadeIn(300);
            lke(id)
        }
    });

    // $("input:checkbox").click(function() { return false; });

    $(document).on('click', '.projectcontent', function (event) {
        var id = $(event.currentTarget).data('id');
        //    document.getElementById("indikatorklik").disabled = true;
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
                    console.log(datas[i].sumall);
                    $('#' + datas[i].name).empty();
                    $('#' + datas[i].name).append(Math.round(datas[i].sumall * 100) / 100);
                }


            }
        })


    }

    function komponen(id, update) {
        var formData = {
            id_evaluasi: id_evaluasi,
            rb_unit: rbUnit,
        };
        $.ajax({
            url: route('tahap5.komponen', id),
            type: 'GET',
            data: formData,
            async: false,
            success: function success(result) {
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

                    if (update == "no") {
                        $('.skf-tree').append(
                            '<label class="tree">\
                        <input type="checkbox" class="komponen" value="kom'+ datas[i]['id'] + '" name="checkbox-tree" id="komponen" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Komponen] '+ datas[i]['name'] + '</span> <span id="nkom' +id + i + '" class="nilai">' + Math.round(nilai * 100) / 100 + '</span></div>\
                        <div class="tree__content subkomponen" id="subkomponen'+ datas[i]['id'] + '">\
                        </div>\
                    </label>'
                        );
                    } else {
                        $('#nkom' +id + i).empty();
                        $('#nkom' + id + i).append(Math.round(nilai * 100) / 100);
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
        $.ajax({
            url: route('tahap5.subkomponen', id),
            type: 'GET',
            data: formData,
            async: false,
            success: function success(result) {
                var datas = result.data;


                for (var i = 0; i < datas.length; i++) {
                    var nilai = 0;
                    if (datas[i].children.length == 0) {
                        nilai = 0;
                    } else {
                        for (var index = 0; index < datas[i].children.length; index++) {
                            nilai += parseFloat(datas[i].children[index]['nilai_indikator']); //don't forget to add the base
                        }
                    }


                    if (update == "no") {
                        $('#subkomponen' + datas[i]['komponen_id']).append(
                            '<label class="tree" id="countsubkomponen">\
                        <input type="checkbox" class="subkomponen" value="sub'+ datas[i]['id'] + '" name="checkbox-tree" id="subkomponenklik" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Sub-Komponen] '+ datas[i]['name'] + '</span> <span id="nsub'+ id + i + '" class="nilai">' + Math.round(nilai * 100) / 100 + '</span> </div>\
                        <div class="tree__content" id="indikator'+ datas[i]['id'] + '">\
                        </div>\
                    </label>'
                        );
                    } else {

                        $('#nsub' +id + i).empty();
                        $('#nsub' +id + i).append(Math.round(nilai * 100) / 100);
                    }

                }

            }
        })
        setTimeout(function () {
            $("#overlay").fadeOut(300);
        }, 100);
    }

    function indikator(id, update) {
        var formData = {
            id_evaluasi: id_evaluasi,
        };
        $.ajax({
            url: route('tahap5.indikator', id),
            type: 'GET',
            data: formData,
            async: false,
            success: function success(result) {
                var datas = result.data;


                for (var i = 0; i < datas.length; i++) {
                    var nilai;
                    if (datas[i].children.length == 0) {
                        nilai = 0;
                    } else {
                        nilai = datas[i].children[0]['nilai_indikator'];
                    }

                    console.log("updatesssss");
                    console.log(update);
                    console.log(nilai);
                    if (update == "no") {

                        $('#indikator' + datas[i]['subkomponen_id']).append(
                            '<label class="tree" id="countindikator">\
                        <input type="checkbox" class="project-input indikator" value="val'+ datas[i]['id'] + '" name="checkbox-tree" id="indikatorklik" data-id=' + datas[i]['id'] + '>\
                        <div class="tree__header"><span>[Indikator] '+ datas[i]['name'] + '</span> <span id="nindex' + id + i + '" class="nilai">' + Math.round(nilai * 100) / 100 + '</span></div>\
                        <div class="tree__content" id="pertanyaan'+ datas[i]['id'] + '">\
                        <div class="projectcontent"  data-id='+ datas[i]['id'] + '>\
                         <div class="form-c" id="form'+ datas[i]['id'] + '">\
                        <div class="qa">\
                        <div class="q">\
                        <h3 class="q-item">Hasil Nilai </h3>\
                        </div>\
                        <div class="a'+ datas[i]['id'] + '" id="result' + datas[i]['id'] + '">\
                        <div class="result">\
                        <div class="result-q"><span>Nama</div>\
                        <div class="result-p">Jawaban</div>\
                        <div class="result-p">Nilai</div>\
                        </div>\
                        </div>\
                        </div>\
                    </div>\
                    <button class="btn btn-primary btn-modal" id="tombol'+ datas[i]['id'] + '" data-id="' + datas[i]['id'] + '" data-toggle="modal" data-target="#fsModal">\
                    Pertanyaan LKE\
                    </button>\
                    </div>\
                    <br>\
                        </div>\
                        </label>'
                        );
                    } else {

                        $('#nindex' +id + i).empty();
                        $('#nindex' +id + i).append(Math.round(nilai * 100) / 100);
                    }
                    $('.form-c').hide();
                    $('.btn-modal').hide();

                }
            }


        })
        setTimeout(function () {
            $("#overlay").fadeOut(300);
        }, 100);
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
            async: false,
            success: function success(result) {
                if (result.success) {
                    console.log("sukses");
                }

                if (result.data.length == 0) {
                    // $('.projectcontent').append(`
                    // <button class="btn btn-primary btn-modal" data-id="${id}" data-toggle="modal" data-target="#fsModal">
                    // Pertanyaan LKE\
                    // </button>`);
                    $('#tombol' + id).show();

                } else {
                    $('#form' + id).show();
                }


                result.data.forEach((ans, i) => {

                    var num = i + 1;

                    $('.a' + ans.id_indikator + '').append(`
                    <div class="result">
                    <div class="result-q"><span> ${num}. </span>${ans.pertanyaan.name}</div>
                    <div class="result-p">${ans.jawaban}</div>
                    <div class="result-p">${ans.nilai}</div>
                    </div>`);
                });

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('#tombol' + id).show();
            }
        });
        setTimeout(function () {
            $("#overlay").fadeOut(300);
        }, 100);
    }



    function renderData(id) {
        $.ajax({
            url: route('tahap5.soal', id),
            type: 'GET',
            success: function success(result) {

                var questions = [];

                questions = result.data;

                $('#myModalLabel').empty();
                $('.content').empty();

                $('#myModalLabel').append(result.data[0].indikator.name);

                $('#quiz').append(`
                <button class="btn btn-success" id="submit">Submit</button>
                 <button class="btn btn-primary" id="next">Next</button>
                 <button class="btn btn-info" id="prev">Prev</button>
                 <div id="result-stats">
                 <table>
                     <tr>
                         <th style="width:70%">Item Pertanyaan</th>
                         <th style="width:15%; text-align: center;">Jawaban</th>
                         <th style="width:15%; text-align: center;">Point</th>
                     </tr>
                 </table>
             </div>
                 `);

                var questionCounter = 0; //Tracks question number
                var selections = []; //Array containing user choices
                var quiz = $('.content'); //Quiz div object
                var textEditor = $('.editor'); //Quiz div object

                var jenisSoal = []; //Array containing user choices
                var listRumus = [];
                var listPersentase = [];


                var defaults = {
                    key: [],
                    scoring: "normal",
                    progress: true
                },
                    settings = $.extend(defaults),
                    $option = null,
                    $label = null,
                    itemCount = questions.length,
                    chosen = [];
                var deskripsi = [];

                // var filedata = [];
                var filedata = new Array();
                var tempData = new Array();
                var formula = undefined;
                console.log("formulassssssssss");

                console.log(formula);

                if (settings.progress) {
                    var $bar = $('#emc-progress'),
                        $inner = $('<div id="emc-progress_inner"></div>'),
                        $perc = $('<span id="emc-progress_ind">0/' + itemCount + '</span>');
                    $bar.append($inner).prepend($perc);
                }







                displayNext();


                $('#result-stats').hide();
                $('#next').on('click', function (e) {

                    console.log("1111");

                    console.log(questions);
                    getScore();
                    e.preventDefault();
                    // Suspend click listener during fade animation
                    if (quiz.is(':animated')) {
                        return false;
                    }
                    console.log(questions);

                    if (jenisSoal[questionCounter] == "Pilihan Ganda") {
                        choose();
                    }

                    console.log("22222");

                    console.log(questions);

                    // If no user selection, progress is stopped
                    if (isNaN(selections[questionCounter])) {
                        $('#warning').text('Silahkan tentukan jawaban untuk melanjutkan!');
                    } else if (deskripsi[questionCounter] === undefined || deskripsi[questionCounter] === null) {
                        $('#warning').text('Mohon isi deskripsi dahulu untuk melanjutkan!');
                    }
                    else {


                        if (filedata[questionCounter] == undefined) {

                            filedata.push(tempData);
                        } else {

                            filedata[questionCounter] = []
                            for (var i = 0; i < tempData.length; i++) {
                                filedata[questionCounter].push(tempData[i]);
                            }
                        }
                        console.log("asaas");

                        tempData = [];


                        questionCounter++;
                        displayNext();
                        $('#warning').text('');

                        console.log("5555");

                        console.log(questions);

                    }
                });


                $('#prev').on('click', function (e) {



                    filedata[questionCounter] = []
                    console.log(tempData);
                    for (var i = 0; i < tempData.length; i++) {
                        filedata[questionCounter].push(tempData[i]);
                    }

                    tempData = [];
                    console.log(tempData);

                    console.log("tahap5555");
                    console.log(questions);
                    console.log(questionCounter);

                    // tempData.push(filedata[questionCounter])


                    e.preventDefault();

                    if (quiz.is(':animated')) {
                        return false;
                    }

                    choose();

                    questionCounter--;


                    displayNext();

                });

                $('#submit').on('click', function (e) {
                    if (jenisSoal[questionCounter] == "Pilihan Ganda") {

                    choose();
                    }
                    console.log("submit assssss");
                    console.log(selections[questionCounter]);
                    console.log(selections);

                    console.log(questionCounter);

                    if (isNaN(selections[questionCounter])) {
                        $('#warning').text('Silahkan tentukan jawaban untuk melanjutkan!');
                    } else if (deskripsi[questionCounter] === undefined || deskripsi[questionCounter] === null) {
                        $('#warning').text('Mohon isi deskripsi dahulu untuk melanjutkan!');
                    }
                    else {
                        $("#first-modal").modal("show");
                    }
                });

                $('.btn-submit ').on('click', function (e) {
                    $("#overlay").fadeIn(300);

                    console.log("horeee submit");
                    $("#first-modal").modal("hide");

                    getScore();
                    e.preventDefault();



                    // Suspend click listener during fade animation
                    if (quiz.is(':animated')) {
                        return false;
                    }
                    // choose();

                    // If no user selection, progress is stopped
                    if (isNaN(selections[questionCounter])) {
                        $('#warning').text('Please make a selection!');
                    } else {

                        if (filedata[questionCounter] == undefined) {
                            console.log("if saja");

                            filedata.push(tempData);
                        } else {
                            console.log("else saja");

                            // filedata.splice(questionCounter, 1);
                            filedata[questionCounter] = []
                            console.log(tempData);
                            for (var i = 0; i < tempData.length; i++) {
                                filedata[questionCounter].push(tempData[i]);
                            }
                        }
                        console.log("asaas");
                        console.log(questionCounter);

                        tempData = [];
                        console.log(tempData);
                        console.log(filedata);

                        questionCounter++;
                        displayNext();
                        $('#warning').text('');


                    }
                });


                function createQuestionElement(index) {


                    var qElement = $('<div>', {
                        id: 'question'
                    });

                    var header = $('<h2>Item Pernyataan ' + (index + 1) + ':</h2>');
                    qElement.append(header);

                    var question = $('<h3>').append(questions[index].name);

                    qElement.append(question);

                    var radioButtons = createRadios(index);
                    qElement.append(radioButtons);
                    // this is new
                    var warningText = $('<p id="warning">');
                    qElement.append(warningText);

                    var textEditor = $('<div id="editor-container"></div>\
                    <div id="toolbar" class="border--top">\
                    <div class="wrap">\
                    <div class="row no-gutters">\
                    <div class="col-xs-6 col-sm-8 col-md-10">\
                    <div class="file__input" id="file__input">\
                        <input class="file__input--file"  id="customFile" type="file" />\
                        <label class="file__input--label" for="customFile" data-text-btn="Upload">Add file :</label>\
                    </div>\
                    </div>\
                    <div class="col-xs-6 col-sm-4 col-md-2">\
                    <buttton href="#" class="btns biru open-doc" data-toggle="modal" data-id="'+ questions[index].id + '" data-target="#ModalDoc">Download Template</buttton>\
                    </div>\
                        </div>\
                        <div class="listFile'+ index + '"></div>\
                    </div>\
                    </div>')
                    qElement.append(textEditor);




                    return qElement;

                }


                function numPersentase() {
                    $('#hasResult').text(listRumus[questionCounter]);

                    $('.percentage').text(listPersentase[questionCounter]);
                }


                function createRadios(index) {

                    console.log("jenis jawaban cek");

                    console.log(questions[index].children[0].jenis_jawaban);
                    if (questions[index].children[0].jenis_jawaban == "Pilihan Ganda") {
                        jenisSoal[questionCounter] = "Pilihan Ganda";

                        var radioList = $('<div id="choice">');

                        for (var i = 0; i < questions[index].children.length; i++) {

                            //   input = '<input type="radio" name="answer" value=' + i + ' />';
                            $option = $('<input name="answer" id="' + i + '" value="' + questions[index].children[i].nilai + '" type="radio">');
                            $label = $('<label for="' + i + '">' + questions[index].children[i].jawaban + '. ' + questions[index].children[i].name + '</label>');
                            //   item.append(input);
                            radioList.append($option).append($label);
                            $option.on('change', function () {
                                console.log("choseennnn");
                                var index = $(this).prevAll('[name="answer"]').length;
                                chosen[questionCounter] = +index;

                            });

                        }
                    } else {

                        formula = questions[index].formula[0].rumus;

                        jenisSoal[questionCounter] = "Persentase";

                        var radioList = $('<div class="buy_item control_panel">');

                        radioList.append(`<h3>${questions[index].formula[0].nama}</h3>`);

                        $kerangka = $(`<div class="flex-container">`);

                        $childKerangka1 = (`<div class="flex-child magenta">`);

                        $childKerangka2 = $(`<div class="flex-child green">`);

                        $count1 = $(`<div class="count">`);
                        $count2 = $(`<div class="counts">
                         <h2>Persentase</h2>
                         <h3><span class="value-cost costs percentage">0</span> <sup>%</sup></h3>
                         </div>
                         </div>`);

                        $btnRes = $(`<hr class="batas"/>
                        <input id="formel" value="${questions[index].formula[0].rumus}" type="text" placeholder="insert formular" readonly/>

                        <button id="submitResult${index}" class="btn btn-primary">Submit Jawaban</button>

                        <h2 id="hasResult"></h2><hr class="batas"/>`)

                        console.log("inputnumber")

                        console.log(questions[index].children.length);



                        radioList.append($kerangka);
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
                        radioList.append($btnRes);

                        for (var i = 0; i < questions[index].children.length; i++) {
                            radioList.append(`<li class='buy_item'><span class="jwban">${questions[index].children[i].jawaban}</span> : ${questions[index].children[i].name}</li>`);
                        }

                        // $('#formel').val(questions[questionCounter].formula[0].rumus);

                    }
                    return radioList;
                }

                function choose() {

                    selections[questionCounter] = +$('input[name="answer"]:checked').val();
                }

                function fileList() {

                    if (filedata[questionCounter] != undefined) {
                        console.log(filedata[questionCounter].length);
                        for (var i = 0; i < filedata[questionCounter].length; i++) {
                            var file = filedata[questionCounter][i];
                            tempData.push(file)

                            console.log(file);

                            $('.listFile' + questionCounter).append("<div id='file__value" + questionCounter + "' class='file__value'><div class='file__value--text'>" + file.name + "</div></div>");
                        }
                    }
                    console.log(tempData);
                    console.log("tandai");

                }



                function displayNext() {



                    quiz.fadeOut(function () {

                        $('#question').remove();


                        if (questionCounter < questions.length) {


                            console.log(questions);

                            var nextQuestion = createQuestionElement(questionCounter);
                            quiz.append(nextQuestion).fadeIn();


                            // console.log(questions[questionCounter].formula[0].rumus);

                            numPersentase();

                            fileList();

                            const editorOptions = {
                                modules: {
                                    'toolbar': {
                                        container: '#toolbar'
                                    }
                                },
                                placeholder: '\n  Tuliskan dekskrisi...',
                                theme: 'snow'  // or 'bubble'
                            };


                            const editor = new Quill('#editor-container', editorOptions);

                            console.log(deskripsi[questionCounter]);
                            if (deskripsi[questionCounter] != undefined || deskripsi[questionCounter] != null) {
                                editor.setText(deskripsi[questionCounter]);
                            }

                            editor.on('text-change', (delta, source) => {

                                someText = editor.getText().replace(/(\r\n|\n|\r)/gm, "");

                                deskripsi[questionCounter] = someText;
                            });

                            $('.file__input--file').on('change', function () {

                                console.log("dasdasd");
                                var files = event.target.files;
                                console.log(files);
                                for (var i = 0; i < files.length; i++) {
                                    var file = files[i];
                                    tempData.push(file);
                                    $('.listFile' + questionCounter).append("<div id='file__value" + questionCounter + "' class='file__value'><div class='file__value--text'>" + file.name + "</div></div>");
                                }


                            });

                            $(document).on('click', '#file__value' + questionCounter, function () {
                                // console.log(filedata[questionCounter][$(this).index()]);
                                // var removed = filedata.splice($(this).index(), 1);
                                if ($(this).index() >= 0) {
                                    console.log(tempData[$(this).index()]);
                                    tempData.splice($(this).index(), 1);
                                    $(this).remove();
                                }

                            });
                            $('#submitResult'+questionCounter+'').on('click', function () {
                                chosen[questionCounter] = "Persen";

                                console.log("azzzzzz");
                                formula = questions[questionCounter].formula[0].rumus;
                                console.log("anssss");
                                console.log(questions);
                                console.log(questions[questionCounter]);
                                console.log(questions[questionCounter].formula[0].rumus);
                                console.log("anssss");

                                     var persen;
                                var hasilpersen;
                                var nilaiAkhir;
                                $('.count *').filter(':input')
                                    .each(function () {

                                        // Print the value currently in
                                        // the input element
                                        formula = formula.toUpperCase().replaceAll($(this).attr('id').toUpperCase(), $(this).val());

                                    });
                                hasilRumus = eval(formula);
                                persen = hasilRumus * 100;
                                if (persen > 100) {
                                    hasilpersen = "0"
                                } else {
                                    hasilpersen = persen;
                                }


                                $('#hasResult').text('' + formula + ' = ' + hasilRumus + '');

                                $('.percentage').text(hasilpersen);

                                nilaiAkhir = '' + formula + ' = ' + hasilRumus + '';

                                selections[questionCounter] = hasilRumus;

                                listRumus[questionCounter] = nilaiAkhir;
                                listPersentase[questionCounter] = hasilpersen;

                            });

                            // $(document).on('click', '#submitResult' + questionCounter, function () {
                            //     chosen[questionCounter] = "Persen";

                            //     // formula = questions[questionCounter].formula[0].rumus;
                            //     formula = "B / A";
                            //     console.log("anssss");
                            //     console.log(questions);
                            //     console.log(questions[questionCounter]);
                            //     console.log(questions[questionCounter].formula[0].rumus);
                            //     console.log("anssss");

                            //     // console.log(formula);
                            //     var hasilRumus;
                            //     var persen;
                            //     var hasilpersen;
                            //     var nilaiAkhir;
                            //     $('.count *').filter(':input')
                            //         .each(function () {

                            //             // Print the value currently in
                            //             // the input element
                            //             formula = formula.toUpperCase().replaceAll($(this).attr('id').toUpperCase(), $(this).val());



                            //         });
                            //     hasilRumus = eval(formula);
                            //     persen = hasilRumus * 100;
                            //     if (persen > 100) {
                            //         hasilpersen = "0"
                            //     } else {
                            //         hasilpersen = persen;
                            //     }


                            //     $('#hasResult').text('' + formula + ' = ' + hasilRumus + '');

                            //     $('.percentage').text(hasilpersen);

                            //     nilaiAkhir = '' + formula + ' = ' + hasilRumus + '';

                            //     selections[questionCounter] = hasilRumus;

                            //     listRumus[questionCounter] = nilaiAkhir;
                            //     listPersentase[questionCounter] = hasilpersen;

                            //     // customConfirm();
                            // });


                            if (!(isNaN(selections[questionCounter]))) {
                                $('input[value="' + selections[questionCounter] + '"]').prop('checked', true);
                            }

                            // Controls display of 'prev' button
                            if ((questionCounter + 1) === questions.length) {
                                $('#prev').show();
                                $('#submit').show();
                                $('#next').hide();

                            }
                            else if (questionCounter >= 1) {
                                $('#prev').show();
                                $('#submit').hide();
                                $('#next').show();

                            } else if (questionCounter === 0) {
                                $('#prev').hide();
                                $('#next').show();
                                $('#submit').hide();

                            }
                        } else {
                            console.log("5");

                            var scoreElem = displayScore();
                            quiz.append(scoreElem).fadeIn();
                            $('#next').hide();
                            $('#prev').hide();
                            $('#submit').hide();
                        }
                    });

                    textEditor.fadeOut(function () {

                    });
                    getProgress();

                    console.log("testing saja");





                }

                function getProgress() {
                    var prog = (chosen.length / itemCount) * 100 + "%",
                        $submit = $('#emc-submit');
                    if (settings.progress) {
                        $perc.text(chosen.length + '/' + itemCount);
                        $inner.css({ height: prog });
                    }
                }

                function displayScore() {

                    var formData;
                    console.log(deskripsi);

                    var score = $('<h3>', { id: 'question' });

                    //cek apakah file empty
                    console.log("cek file empty");

                    for (var i = 0; i < filedata.length; i++) {
                        console.log(filedata[i]);
                        if (filedata[i].length == 0) {
                            selections[i] = 0;
                        }
                    };

                    //////hitung hasil LKE////
                    var sumall = 0;
                    for (var i = 0; i < selections.length; i++) {
                        sumall += parseFloat(selections[i]); //don't forget to add the base
                    }

                    var avg = sumall / (selections.length);
                    var nilai;
                    if(id_kelompok == 1){
                        nilai = avg * bobot_indikator;
                    }else{
                        nilai = avg;
                    }

                    getResult(nilai);





                    score.append('Total nilai yang didapat adalah ' + nilai + ' dari ' +
                        questions.length + ' LKE yang telah dikerjakan');


                    var $inputs = $(this).find('input[type="radio"]');
                    $inputs.each(function (index, value) {
                        if ($(this).is(':checked')) {
                            // console.log(value);
                            chosen.push(index + 1);
                            sum.push(index);

                        }
                    });



                    var table = $('#result-stats table').find('tbody');
                    var tr;
                    for (var i = 0; i < questions.length; i++) {
                        console.log("sukses1");
                        console.log(chosen[i]);
                        if(chosen[i] == "Persen"){
                            formData = {
                                id_evaluasi: id_evaluasi,
                                id_indikator: id_indikator,
                                id_pernyataan: questions[i].id,
                                id_jawaban: questions[i].children[0].id,
                                jawaban: listRumus[i],
                                nilai: selections[i],
                                deskripsi: deskripsi[i],
                            };
                        }else{
                            formData = {
                                id_evaluasi: id_evaluasi,
                                id_indikator: id_indikator,
                                id_pernyataan: questions[i].id,
                                id_jawaban: questions[i].children[chosen[i]].id,
                                jawaban: questions[i].children[chosen[i]].jawaban,
                                nilai: selections[i],
                                deskripsi: deskripsi[i],
                            };

                        }



                        $.ajax({
                            url: route('tahap5.store'),
                            type: 'POST',
                            async: false,
                            data: formData,
                            success: function success(result) {
                                uploadFile(result.data.id, i);
                                console.log(i);
                                if (result.success) {
                                    displaySuccessMessage(result.message);
                                    console.log("sukses2");
                                }
                            },
                        });




                        tr = $('<tr>');
                        tr.append('<td><i class="fa fa-check-circle"></i>' + questions[i].name + '</td>');

                        if(chosen[i] == "Persen"){
                            tr.append('<td style="text-align: center;">' + listRumus[i] + '</td>');

                        }else{
                            tr.append('<td style="text-align: center;">' + questions[i].children[chosen[i]].jawaban + '</td>');

                        }
                        tr.append('<td style="text-align: center;">' + selections[i] + '</td>');
                        tr.appendTo(table);
                    }

                    $('#result-stats').show();

                    return score;
                }


                function uploadFile(id, index) {

                    console.log(filedata[index].length);

                    if (filedata[index].length > 0) {



                        console.log("upload file");

                        var fileBody = new FormData(multifile);

                        var TotalFiles = filedata[index].length;



                        fileBody.append('id_lke', id);

                        for (let i = 0; i < TotalFiles; i++) {
                            console.log("looping total files");
                            console.log(i);
                            console.log(index);
                            console.log(filedata[index][i]);
                            fileBody.append('files' + i, filedata[index][i]);
                        }
                        fileBody.append('TotalFiles', TotalFiles);

                        $.ajax({
                            type: 'POST',
                            url: route('upload.file'),
                            data: fileBody,
                            cache: false,
                            contentType: false,
                            processData: false,
                            dataType: 'json',
                            success: (data) => {
                                console.log("sukses foto");
                                // alert('Files has been uploaded using jQuery ajax');
                            },
                            error: function (data) {
                                console.log(data);
                                alert(data.responseJSON.errors);
                            }
                        });
                        console.log("last");
                    }
                }

                function getResult(nilai) {
                    var formData = {
                        id_evaluasi: id_evaluasi,
                        id_indikator: id_indikator,
                    };
                    $.ajax({
                        url: route('lke.index'),
                        type: 'GET',
                        data: formData,
                        success: function success(result) {
                            if (result.success) {
                                storeResult(nilai);

                                console.log("sukses");
                            }
                            console.log(result.data);

                            // if(result.data.length == 0){
                            //     storeResult(nilai);
                            // }else{
                            //     var sumNilai = result.data.nilai_indikator + nilai;
                            //     console.log(result.data.id);
                            //     updateResult(sumNilai, result.data.id);
                            // }

                        }
                    });

                }

                function storeResult(nilai) {

                    var formData = {
                        id_evaluasi: id_evaluasi,
                        id_kelompok: id_kelompok,
                        id_komponen: id_komponen,
                        id_subkomponen: id_subkomponen,
                        id_indikator: id_indikator,
                        nilai_indikator: nilai,
                    };
                    $.ajax({
                        url: route('result.store'),
                        type: 'POST',
                        async: false,
                        data: formData,
                        success: function success(result) {
                            console.log("berhasil store");
                            getEvaluasi(nilai);
                        },
                    });
                    console.log("refresh");
                    console.log(id_kelompok);
                    console.log(id_komponen);
                    console.log(id_subkomponen);

                    kelompok();
                    komponen(id_kelompok, "yes");
                    subkomponen(id_komponen, "yes");
                    indikator(id_subkomponen, "yes");

                    console.log("refresh");

                    setTimeout(function () {
                        $("#overlay").fadeOut(500);
                    }, 100);

                }

                function getEvaluasi(nilai) {
                    console.log("evaaaaaa");
                $.ajax({
                    url: route('evaluasi.edit', id_evaluasi),
                    type: 'GET',
                    success: function success(result) {
                    var sumval = parseFloat(result.data.nilai) + parseFloat(nilai);
                    updateEvaluasi(sumval)
                    }
                });

                }

                function updateEvaluasi(sumval) {
                    var formData = {
                        nilai: sumval,
                    }
                    console.log(sumval);
                    $.ajax({
                        url: route('tahap5.nilai', id_evaluasi),
                        type: 'PUT',
                        data: formData,
                        success: function success(result) {

                            console.log(result);
                            console.log("berhasil tambah evaluasi");
                        },
                      });
                }



                function getScore() {

                    var formData = {
                        id_evaluasi: id_evaluasi,
                        id_indikator: id_indikator,

                    };
                    $.ajax({
                        url: route('lke.index'),
                        type: 'GET',
                        data: formData,
                        success: function success(result) {
                            if (result.success) {
                                console.log("sukses");
                            }

                        },
                    });
                }
            }
        });
    }

})

