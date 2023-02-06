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
                <div class="row">
                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Nama :') }}<span class="text-danger">*</span>
                        {{ Form::text('nama', null , ['class' => 'form-control','required','placeholder' => 'Tahap 1','id'=>'editName']) }}
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('country_id','Data Geografis :') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('geografis', $keldata, null, ['class' => 'form-control','required', 'id' => 'editGeo', 'placeholder' => "Pilih Data Geografis"]) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Warna :') }}<span class="text-danger">*</span>

                            <input type="color" class="form-control" id="edit_warna" name="warna"  value="""
                                   onchange="edit_preview_warna($('#edit_warna').val(), $('#edit_warnastroke').val(), $('#edit_warna_tebal').val(), $('#edit_opacity').val());">
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Warna border :') }}<span class="edit-danger">*</span>
                            <input type="color" class="form-control" id="edit_warnastroke" name="border"
                                   onchange="edit_preview_warna($('#edit_warna').val(), $('#edit_warnastroke').val(), $('#edit_warna_tebal').val(), $('#edit_opacity').val());">
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Tebal border :') }}<span class="text-danger">*</span>
                        <input value="1" min="1" type="number" class="form-control" id="edit_warna_tebal" name="tebalborder"
                        oninput="edit_preview_warna($('#edit_warna').val(), $('#edit_warnastroke').val(), $('#edit_warna_tebal').val(), $('#edit_opacity').val());">
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Opacity :') }}<span class="text-danger">*</span>
                            <input type="range" min="1" max="10" class="form-control" id="edit_opacity" name="opacity"
                                   onchange="edit_preview_warna($('#edit_warna').val(), $('#edit_warnastroke').val(), $('#edit_warna_tebal').val(), $('#edit_opacity').val());">
                    </div>


                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('Preview Warna :') }}<span class="text-danger">*</span>
                        <div class="col-sm-9 edit_preview_warna">
                            {{-- <span style="
                                border:1px solid black;
                                background-color: black;
                                content: '';
                                display: inline-block;
                                height: 50px;
                                width: 50px;
                                position: relative;
                                vertical-align: middle; ">
                            </span> --}}
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

