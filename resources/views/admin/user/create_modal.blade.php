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
                        {{ Form::label('country_id','Roles :') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('roles', $roles, null, ['class' => 'form-control','required', 'id' => 'createrole', 'placeholder' => "Pilih Roles"]) }}
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('email', 'Email :') }}<span class="text-danger">*</span>
                        {{ Form::email('email', null, ['class' => 'form-control', 'required', 'placeholder' => "Masukan Email"]) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('no_hp', 'No HP :') }}<span class="text-danger">*</span>
                        {{ Form::number('no_hp', null, ['class' => 'form-control', 'required', 'placeholder' => "Masukan Np HP"]) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('username', 'Username :') }}<span class="text-danger">*</span>
                        {{ Form::text('username', null , ['class' => 'form-control','required','placeholder' => 'Masukan Username','id'=>'stateName']) }}
                    </div>

                <div class="col-md-6">
                    <div class="form-group">

                        {{ Form::label('password', 'Password:') }}<span class="text-danger">*</span>
                        {{ Form::password('password', ['class' => 'form-control','required','min' => '6','max' => '20','placeholder'=>'Enter Password']) }}
                        </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        {{ Form::label('password_confirmation', 'Confirmation Password:') }}<span class="text-danger">*</span>
                        {{ Form::password('password_confirmation', ['class' => 'form-control','required','min' => '6','max' => '20', 'placeholder'=>'Enter Confirm Password']) }}
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
