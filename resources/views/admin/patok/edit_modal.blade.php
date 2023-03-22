<div class="modal fade pr-0" id="editModal" tabindex="-1" role="dialog" aria-labelledby="countryModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="countryModalLabel">Edit Patok</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert-danger alert d-none" id="editValidationErrorsBox"></div>
                {{ Form::open(['id' =>'editStateForm','method'=>'post']) }}
                {{ Form::hidden('id', null, ['id' => 'stateFieldId']) }}
                <div class="row">


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Jenis Patok :') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('kategori', $kategori, null, ['class' => 'form-control','required', 'id' => 'editJenis', 'placeholder' => "Pilih Jenis Patok"]) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Nilai KM :') }}<span class="text-danger">*</span>
                        {{ Form::number('nilaikm', null , ['class' => 'form-control','required','placeholder' => 'Nilai KM','id'=>'editKM']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Nilai HM :') }}<span class="text-danger">*</span>
                        {{ Form::number('nilaihm', null , ['class' => 'form-control','required','placeholder' => 'Nilai HM','id'=>'editHM']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Wilayah :') }}<span class="text-danger">*</span>
                        <select name="wilayah" id="editWilayah" class="form-control" placeholder="Filter Patok">
                            <option value="Bojonegoro">Bojonegoro</option>
                            <option value="Tuban">Tuban</option>
                        </select>
                    </div>



                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Ruas Jalan :') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('jalan', $jalan, null, ['class' => 'form-control','required', 'id' => 'editJalan', 'placeholder' => "Pilih Ruas Jalan"]) }}
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Kondisi Patok Rusak :') }}<span class="text-danger">*</span> &nbsp;
                        <input name="rusak" id="yarusak" value="Ya" type="radio">
                        <label for="radiorusak">Ya</label> &nbsp; &nbsp; &nbsp;
                        <input name="rusak" id="tidakrusak" value="Tidak" type="radio">
                        <label for="radiorusak">Tidak</label>
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Kondisi Patok Hilang :') }}<span class="text-danger">*</span> &nbsp;
                        <input name="hilang" id="yahilang" value="Ya" type="radio">
                        <label for="radiohilang">Ya</label> &nbsp; &nbsp; &nbsp;
                        <input name="hilang" id="tidakhilang" value="Tidak" type="radio">
                        <label for="radiohilang">Tidak</label>
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Kondisi Patok Terhalang :') }}<span class="text-danger">*</span> &nbsp;
                        <input name="terhalang" id="yaterhalang" value="Ya" type="radio">
                        <label for="radioterhalang">Ya</label> &nbsp; &nbsp; &nbsp;
                        <input name="terhalang" id="tidakterhalang" value="Tidak" type="radio">
                        <label for="radioterhalang">Tidak</label>
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Kondisi Patok Geser :') }}<span class="text-danger">*</span> &nbsp;
                        <input name="geser" id="yageser" value="Ya" type="radio">
                        <label for="radiogeser">Ya</label> &nbsp; &nbsp; &nbsp;
                        <input name="geser" id="tidakgeser" value="Tidak" type="radio">
                        <label for="radiogeser">Tidak</label>
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Status :') }}<span class="text-danger">*</span>
                        <select name="statuspatok" id="statusPatok" class="form-control" placeholder="Pilih Status">
                            <option value="Menunggu">Menunggu</option>
                            <option value="Perbaiki">Perbaiki</option>
                            <option value="Selesai">Selesai</option>
                        </select>
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Deskripsi :') }}<span class="text-danger">*</span>
                        {{ Form::text('deskripsi', null , ['class' => 'form-control','required','placeholder' => 'Deskripsi','id'=>'editDeskripsi']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Foto :') }}<span class="text-danger">*</span>
                        <div id="fotoedit">

                        </div>
                    </div>


                </div>
                <div class="d-flex align-items-center">
                    {{ Form::button('Save', ['type' => 'submit', 'class' => 'btn btn-primary', 'id' => 'editSaveBtn', 'data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}
                    {{ Form::button('Cancel', ['type' => 'button', 'class' => 'btn btn-light text-dark','data-dismiss'=>'modal']) }}
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
</div>
</div>

