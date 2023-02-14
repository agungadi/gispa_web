{{-- <div id="fsModal" class="modal animated bounceIn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
aria-hidden="true"> --}}

<?php
$field1 = explode('||', $geo->field1);
$field2 = explode('||', $geo->field2);
$field3 = explode('||', $geo->field3);
$field4 = explode('||', $geo->field4);
$field5 = explode('||', $geo->field5);
$field6 = explode('||', $geo->field6);
$field7 = explode('||', $geo->field7);
$field8 = explode('||', $geo->field8);

if ($field1[0] != 'text') {
    $field1[0] = 'number';
}
if ($field2[0] != 'text') {
    $field2[0] = 'number';
}
if ($field3[0] != 'text') {
    $field3[0] = 'number';
}
if ($field4[0] != 'text') {
    $field4[0] = 'number';
}
if ($field5[0] != 'text') {
    $field5[0] = 'number';
}
if ($field6[0] != 'text') {
    $field6[0] = 'number';
}
if ($field7[0] != 'text') {
    $field7[0] = 'number';
}
if ($field8[0] != 'text') {
    $field8[0] = 'number';
}
?>

<div id="editModal" class="modal animated bounceIn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
    aria-hidden="true">
    <div class="modalfull-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modalfull-title" id="stateModalLabel">Edit Layer</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="modal-body">


                <div class="alert-danger alert d-none" id="validationErrorsBox"></div>
                {{ Form::open(['id' => 'editStateForm', 'method' => 'post']) }}
                {{ Form::hidden('id', null, ['id' => 'stateFieldId']) }}
                <input type="hidden" name="getId" id="getId" value="{{$geo->id}}">


                <div class="row" id="petaku">
                    <?php for ($i=1; $i <= 8; $i++) {  ?>
                    @if (!empty($geo->{'field' . $i}))
                        <div class="form-group col-lg-12 col-sm-12">
                            <label>
                                {{ ${'field' . $i}[2] }} - {{ ${'field' . $i}[0] }} : <span class="text-danger">*</span>
                            </label>
                            <input required="required" type="{{ ${'field' . $i}[0] }}" id="edit{{ $i }}"
                                class="form-control" name="{{ ${'field' . $i}[1] }}" step=0.01>
                        </div>
                    @endif
                    <?php } ?>




                    <div class="form-group col-lg-12 col-sm-12 peta">
                        {{ Form::label('GeoJson :') }}<span class="text-danger">*</span>

                        <input readonly="readonly" required="required" type="text" class="form-control"
                            id="editgeojson" name="geojson" value="{{ request('polygon') }}">
                        <small>
                            * Data harus diisi melalui peta
                        </small>

                    </div>

                    {{-- <div id="mapedit"> --}}
                    {{-- <div id="mapid" style="height: 600px; width: 95%; margin-left: 2%; margin-bottom: 2%;"></div> --}}
                    {{-- </div> --}}
                    <br>

                    <br>


                </div>
                {{ Form::button('Simpan', ['type' => 'submit', 'class' => 'btn btn-primary text-right', 'id' => 'saveBtn', 'data-loading-text' => "<span class='spinner-border spinner-border-sm'></span> Processing..."]) }}

                {{ Form::button('Batalkan   ', ['type' => 'button', 'class' => 'btn btn-light text-dark', 'data-dismiss' => 'modal', 'id' => 'cancelBtn']) }}

                {{-- </div> --}}
                {{ Form::close() }}
            </div>


        </div>



    </div>
