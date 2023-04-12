@extends('layouts.app')
@section('title')
    Patok
@endsection

@section('css')
    <link href="{{ asset('assets/css/dataTables.bootstrap4.min.css') }}" rel="stylesheet" type="text/css" />

    <link rel='stylesheet' href='https://cdn.datatables.net/responsive/2.2.6/css/responsive.dataTables.min.css'>
    <link rel='stylesheet' href='https://cdn.datatables.net/select/1.3.1/css/select.dataTables.min.css'>
@endsection
@section('content')


<div class="accordion-table">
    <header class="header">Cluster K-Means</header>
    <?php foreach ($hasil_iterasi as $key => $value) { ?>

    <button type="button" class="accordiontable" id="accordiontable">
        <span class="step">step {{ $key + 1}}</span>
        <span class="accordion-title">
            Iterasi Ke-{{ $key + 1}}
        </span>
    </button>
    <div class="panel">
        <div id="tblIterasi">
            <table>
                <thead>
                    <tr>
                        <th >Centroid</th>
                        <th>Jumlah Rusak</th>
                        <th>Jumlah Hilang</th>
                        <th>Jumlah Terhalang</th>
                        <th>Jumlah Geser</th>
                    </tr>


                </thead>
                <tbody>
                    <?php foreach ($centroid[$key] as $key_data => $value_data) { ?>
                    <tr>
                        <td>{{ $key_data + 1}}</td>
                        <td>{{ $value_data[0] }}</td>
                        <td>{{ $value_data[1] }}</td>
                        <td>{{ $value_data[2] }}</td>
                        <td>{{ $value_data[3] }}</td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        {{-- </br> --}}
            <table>
                <thead>
                    <tr>
                        <th rowspan="2" >No</th>
                        <th rowspan="2" >Ruas Jalan</th>
                        <th rowspan="2" >Nilai Km</th>
                        <th rowspan="1" colspan="4">Jumlah</th>
                        <th rowspan="1" colspan="3" >Jarak Ke Centroid</th>
                        <th rowspan="2">Terdekat</th>
                        <th rowspan="2">CLuster</th>

                    </tr>
                    <tr>
                        <th rowspan="1" >Rusak</th>
                        <th rowspan="1" >Hilang</th>
                        <th rowspan="1" >Terhalang</th>
                        <th rowspan="1" >Geser</th>
                        <th rowspan="1" >1</th>
                        <th rowspan="1" >2</th>
                        <th rowspan="1" >3</th>

                    </tr>


                </thead>
                <tbody>
                    <?php foreach ($value as $key_data => $value_data) { ?>
                    <tr>
                        <td>{{ $key_data + 1}}</td>
                        <td>{{ $value_data['data']->ruas_jalan }}</td>
                        <td>{{ $value_data['data']->nilai_km }}</td>
                        <td>{{ $value_data['data']->jumlah_rusak }}</td>
                        <td>{{ $value_data['data']->jumlah_hilang }}</td>
                        <td>{{ $value_data['data']->jumlah_terhalang }}</td>
                        <td>{{ $value_data['data']->jumlah_geser }}</td>
                        <td>
                            @if($value_data['jarak_ke_centroid'][0] == 0)
                            0
                            @else
                            {{ number_format($value_data['jarak_ke_centroid'][0], 4) }}
                            @endif
                        </td>
                        <td>
                            @if($value_data['jarak_ke_centroid'][1] == 0)
                            0
                            @else
                            {{ number_format($value_data['jarak_ke_centroid'][1], 4) }}
                            @endif                        </td>
                        <td>
                            @if($value_data['jarak_ke_centroid'][2] == 0)
                            0
                            @else
                            {{ number_format($value_data['jarak_ke_centroid'][2], 4) }}
                            @endif
                        </td>
                        <td>
                            @if( $value_data['jarak_terdekat']['value']  == 0)
                            0
                            @else
                            {{ number_format( $value_data['jarak_terdekat']['value'], 4) }}
                            @endif
                        </td>
                        <td>{{ $value_data['jarak_terdekat']['cluster'] }}</td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>

        </div>
    </div>

    <?php }  ?>


</div>


@endsection


@section('scripts')
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="./script.js"></script>
    <script src="{{ asset('porto/assets/js/cluster/cluster.js') }}"></script>
@endsection
