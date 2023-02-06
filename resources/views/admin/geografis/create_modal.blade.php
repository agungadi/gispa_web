<div class="modal fade p-0" id="stateModal" tabindex="-1" role="dialog" aria-labelledby="stateModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="stateModalLabel">Tambah User</h5>
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
                        {{ Form::label('keterangan', 'Keterangan :') }}<span class="text-danger">*</span>
                        {{ Form::text('keterangan', null , ['class' => 'form-control','required','placeholder' => 'Keterangan','id'=>'stateKet']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('country_id','Kelompok Data :') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('keldata', $keldata, null, ['class' => 'form-control','required', 'id' => 'createKelData', 'placeholder' => "Pilih Kelompok Data"]) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Tipe :') }}<span class="text-danger">*</span>
                        <select name="tipe" id="add_tipe" class="form-control">
                            <option value="">Pilih Tipe</option>
                            <option value="Point">Point</option>
                            <option value="Linestring">Linestring (Garis)</option>
                            <option value="Polygon">Polygon (Wilayah)</option>
                        </select>
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Kolom :') }}<span class="text-danger">*</span>

                    <div class="customer_records">
                        <input name="kolom[]" class="form-control" type="text" placeholder="nama kolom">
                        <select name="kolomselect[]" id="add_tipe" class="form-control">
                            <option value="">Pilih Tipe Data</option>
                            <option value="text">Text</option>
                            <option value="double precision">Angka</option>
                        </select>

                        <a class="extra-fields-customer" href="#">Add Kolom</a>
                    </div>
                    <div class="customer_records_dynamic"></div>

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
