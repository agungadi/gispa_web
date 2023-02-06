<div class="modal fade p-0" id="stateModal" tabindex="-1" role="dialog" aria-labelledby="stateModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="stateModalLabel">Tambah Layer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert-danger alert d-none" id="validationErrorsBox"></div>
                {{ Form::open(['id' =>'createStateForm','method'=>'post']) }}
                <div class="row">
                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('nama', 'Nama :') }}<span class="text-danger">*</span>
                        {{ Form::text('nama', null , ['class' => 'form-control','required','placeholder' => 'Nama','id'=>'stateName']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('country_id','Data Geografis :') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('geografis', $keldata, null, ['class' => 'form-control','required', 'id' => 'createrole', 'placeholder' => "Pilih Data Geografis"]) }}
                    </div>

                    {{-- <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Tipe :') }}<span class="text-danger">*</span>
                        <select name="tipe" id="add_tipe" class="form-control">
                            <option value="">Pilih Jenis Layer</option>
                            <option value="Point">Point</option>
                            <option value="Linestring">Linestring (Garis)</option>
                            <option value="Polygon">Polygon (Wilayah)</option>
                        </select>
                    </div> --}}

{{--
                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('username', 'Username :') }}<span class="text-danger">*</span>
                        {{ Form::text('username', null , ['class' => 'form-control','required','placeholder' => 'Masukan Username','id'=>'stateName']) }}
                    </div> --}}

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Warna :') }}<span class="text-danger">*</span>

                            <input type="color" class="form-control" id="tmb_warna" name="warna"
                                   onchange="tmb_preview_warna($('#tmb_warna').val(), $('#tmb_warnastroke').val(), $('#tmb_warna_tebal').val(), $('#tmb_opacity').val());">
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Warna border :') }}<span class="text-danger">*</span>
                            <input type="color" class="form-control" id="tmb_warnastroke" name="border"
                                   onchange="tmb_preview_warna($('#tmb_warna').val(), $('#tmb_warnastroke').val(), $('#tmb_warna_tebal').val(), $('#tmb_opacity').val());">
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Tebal border :') }}<span class="text-danger">*</span>
                        <input value="1" min="1" type="number" class="form-control" id="tmb_warna_tebal" name="tebalborder"
                        oninput="tmb_preview_warna($('#tmb_warna').val(), $('#tmb_warnastroke').val(), $('#tmb_warna_tebal').val(), $('#tmb_opacity').val());">
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Opacity :') }}<span class="text-danger">*</span>
                            <input type="range" min="1" max="10" class="form-control" id="tmb_opacity" name="opacity"
                                   onchange="tmb_preview_warna($('#tmb_warna').val(), $('#tmb_warnastroke').val(), $('#tmb_warna_tebal').val(), $('#tmb_opacity').val());">
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Preview Warna :') }}<span class="text-danger">*</span>
                        <div class="col-sm-9 tmb_preview_warna">
                            <span style="
                                border:1px solid black;
                                background-color: black;
                                content: '';
                                display: inline-block;
                                height: 50px;
                                width: 50px;
                                position: relative;
                                vertical-align: middle; ">
                            </span>
                        </div>
                    </div>


                </div>
                <div class="d-flex align-items-center">
                    {{ Form::button('Simpan', ['type' => 'submit', 'class' => 'btn btn-primary', 'id' => 'saveBtn', 'data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}
                    {{ Form::button('Batalkan   ', ['type' => 'button', 'class' => 'btn btn-light text-dark','data-dismiss'=>'modal']) }}
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
</div>
