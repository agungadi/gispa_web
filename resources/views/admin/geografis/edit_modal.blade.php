<div class="modal fade pr-0" id="editModal" tabindex="-1" role="dialog" aria-labelledby="countryModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="countryModalLabel">Edit User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert-danger alert d-none" id="editValidationErrorsBox"></div>
                {{ Form::open(['id' =>'editStateForm','method'=>'post']) }}
                {{ Form::hidden('id', null, ['id' => 'stateFieldId']) }}
                {{ Form::hidden('nama_tabel', null, ['id' => 'stateFieldTabel']) }}

                <div class="row">
                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Nama :') }}<span class="text-danger">*</span>
                        {{ Form::text('nama', null , ['class' => 'form-control','required','placeholder' => 'Nama','id'=>'editName']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('keterangan','Keterangan :') }}<span class="text-danger">*</span>
                        {{ Form::text('keterangan', null, ['class' => 'form-control', 'required', 'id' => 'editKet', 'placeholder' =>'Keterangan']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('country_id', 'Kelompok Data :') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('keldata', $keldata, null, ['class' => 'form-control','required', 'id' => 'editkeldata', 'placeholder' => 'kelompok']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Tipe :') }}<span class="text-danger">*</span>
                        <select name="tipe" id="edit_tipe" class="form-control">
                            <option value="">Pilih Tipe</option>
                            <option value="Point">Point</option>
                            <option value="Linestring">Linestring (Garis)</option>
                            <option value="Polygon">Polygon (Wilayah)</option>
                        </select>
                    </div>

                    <div class="form-group col-lg-12 col-sm-12 ">
                        {{ Form::label('Kolom :') }}<span class="text-danger">*</span>

                        <div class="koloms">

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

