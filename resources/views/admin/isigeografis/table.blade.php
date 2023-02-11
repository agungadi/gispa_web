<?php
$field1 = explode("||", $geo->field1);
$field2 = explode("||", $geo->field2);
$field3 = explode("||", $geo->field3);
$field4 = explode("||", $geo->field4);
$field5 = explode("||", $geo->field5);
$field6 = explode("||", $geo->field6);
$field7 = explode("||", $geo->field7);
$field8 = explode("||", $geo->field8);

?>

{{-- <form action="">

    <div id="map" style="height: 600px"></div>
    <br>
    <div>
        <label>The layer To Be Stored:</label>
        <input id="polygon" type="text" class="form-control" name="polygon" value="{{request('polygon')}}">
    </div>
    <br>
    <div>
        <button type="submit" class="btn btn-success">Submit</button>
    </div>
</div>
</form> --}}

<table class="table table-responsive-sm table-striped table-bordered datatable-table" id="userTable">
    <thead>
    <tr>
        <th style="width: 2%">No</th>
        @if(!empty($geo->field1)) <th>{{ $field1[2] }}</th> @endif
        @if(!empty($geo->field2)) <th>{{ $field2[2] }}</th> @endif
        @if(!empty($geo->field3)) <th>{{ $field3[2] }}</th> @endif
        @if(!empty($geo->field4)) <th>{{ $field4[2] }}</th> @endif
        @if(!empty($geo->field5)) <th>{{ $field5[2] }}</th> @endif
        @if(!empty($geo->field6)) <th>{{ $field6[2] }}</th> @endif
        @if(!empty($geo->field7)) <th>{{ $field7[2] }}</th> @endif
        @if(!empty($geo->field8)) <th>{{ $field8[2] }}</th> @endif
        {{-- <th scope="col">Nama</th> --}}
        {{-- <th scope="col">Tipe</th>
        <th scope="col">Nama Geografis</th>
        <th scope="col">Warna</th> --}}
        <th scope="col" style="width: 8%">Action</th>
    </tr>
    </thead>
    <tbody class="tablerows">
        <?php $no = 0;
  ?>
      @foreach($tabel as $rs)
{{--
    @php
    $get_isi_data = App\Model\Data::get_isi_data($r->id,$metadata->nama_tabel_history);
    @endphp --}}
  <?php $no ++;
  ?>
  <tr style="height: 52px">
    <td >{{$no}}</td>
    @if(!empty($geo->field1)) <td>{{ $rs->{$field1[1]} }}</td> @endif
    @if(!empty($geo->field2)) <td>{{ $rs->{$field2[1]} }}</td> @endif
    @if(!empty($geo->field3)) <td>{{ $rs->{$field3[1]} }}</td> @endif
    @if(!empty($geo->field4)) <td>{{ $rs->{$field4[1]} }}</td> @endif
    @if(!empty($geo->field5)) <td>{{ $rs->{$field5[1]} }}</td> @endif
    @if(!empty($geo->field6)) <td>{{ $rs->{$field6[1]} }}</td> @endif
    @if(!empty($geo->field7)) <td>{{ $rs->{$field7[1]} }}</td> @endif
    @if(!empty($geo->field8)) <td>{{ $rs->{$field8[1]} }}</td> @endif
  <td>
    <a title="Edit" class="btn btn-default btn-icon-only-action rounded-circle edit-btn" href="javascript:void(0)" data-tb="{{$geo->id}}"  data-id="{{$rs->id}}">
        <span class="btn-inner--icon"><i class="fa fa-edit"></i></span>
</a>
<a title="Delete" class="btn btn-danger btn-icon-only-action rounded-circle delete-btn" data-tb="{{$geo->id}}" data-id="{{$rs->id}}" href="#">
        <span class="btn-inner--icon"><i class="fa fa-trash"></i></span>
</a>

  </td>
  </tr>
  @endforeach

    </tbody>
</table>

