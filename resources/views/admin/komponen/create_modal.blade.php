<div class="modal fade p-0" id="stateModal" tabindex="-1" role="dialog" aria-labelledby="stateModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="stateModalLabel">{{__('messages.tahap2.tambah')}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="alert-danger alert d-none" id="validationErrorsBox"></div>
                {{ Form::open(['id' =>'createStateForm','method'=>'post']) }}
                <div class="row">
                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('name', __('messages.tahap2.name').':') }}<span class="text-danger">*</span>
                        {{ Form::text('name', null , ['class' => 'form-control','required','placeholder' => __('messages.states.name'),'id'=>'stateName']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('name', __('messages.tahap1.bobot').':') }}<span class="text-danger">*</span>
                        {{ Form::number('bobot', null , ['step'=>'any', 'class' => 'form-control','required','placeholder' => __('messages.tahap1.bobot'),'id'=>'stateName']) }}
                    </div>

                    <div class="form-group col-lg-12 col-sm-12">
                        {{ Form::label('country_id',__('messages.tahap1.tahap1').':') }}<span
                                class="text-danger">*</span>
                        {{ Form::select('komponen1_id', $komponen1, null, ['class' => 'form-control','required', 'id' => 'countryFieldID', 'placeholder' => __('messages.select_tahap1')]) }}
                    </div>

                </div>
                <div class="d-flex align-items-center">
                    {{ Form::button(__('messages.save'), ['type' => 'submit', 'class' => 'btn btn-primary', 'id' => 'saveBtn', 'data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}
                    {{ Form::button(__('messages.cancel'), ['type' => 'button', 'class' => 'btn btn-light text-dark','data-dismiss'=>'modal']) }}
                </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
</div>
