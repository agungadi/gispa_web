 <div id="detailModal" class="modal animated bounceIn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
     <div class="modalfull-dialog">

        <!-- content -->
        <div class="modal-content">

            <!-- header -->
            <div class="modalmid-header">

                <h1 id="myModalLabel" class="modalmid-title">
                    Detail Iterasi
                </h1>

            </div>
            <!-- header -->

            <!-- body -->
            <div class="modal-body">
                <div class="doc-modal">

                    <div class="container">



<div class="accordion-table">
    <header class="header">Clustering K-Means</header>
    <?php foreach ($hasil_iterasi as $key => $value) { ?>

    <button type="button" class="accordiontable" id="accordiontable">
        <span class="step">step {{ $key + 1}}</span>
        <span class="accordion-title">
            Iterasi Ke-{{ $key + 1}}
        </span>
    </button>
    <div class="panel">
        <div id="tblIterasi">
            <table class="table table-responsive-sm table-striped table-bordered datatable-table">
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
            <table class="table table-responsive-sm">
                <thead>
                    <tr>
                        <th rowspan="2" >No</th>
                        <th rowspan="2"  class="text-center">Ruas Jalan</th>
                        <th rowspan="2"  class="text-center" >Nilai Km</th>
                        <th rowspan="1"  class="text-center" colspan="4">Jumlah</th>
                        <th rowspan="1" colspan="3"  class="text-center" >Jarak Ke Centroid</th>
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
                        <td style="max-width: 260px">{{ $value_data['data']->ruas_jalan }}</td>
                        <td>{{ $value_data['data']->nilai_km }}</td>
                        <td>{{ $value_data['data']->jumlah_rusak }}</td>
                        <td>{{ $value_data['data']->jumlah_hilang }}</td>
                        <td>{{ $value_data['data']->jumlah_terhalang }}</td>
                        <td>{{ $value_data['data']->jumlah_geser }}</td>
                        <td>
                            @if($value_data['jarak_ke_centroid'][0] == 0)
                            0
                            @else
                            {{ number_format($value_data['jarak_ke_centroid'][0], 2) }}
                            @endif
                        </td>
                        <td>
                            @if($value_data['jarak_ke_centroid'][1] == 0)
                            0
                            @else
                            {{ number_format($value_data['jarak_ke_centroid'][1], 2) }}
                            @endif                        </td>
                        <td>
                            @if($value_data['jarak_ke_centroid'][2] == 0)
                            0
                            @else
                            {{ number_format($value_data['jarak_ke_centroid'][2], 2) }}
                            @endif
                        </td>
                        <td>
                            @if( $value_data['jarak_terdekat']['value']  == 0)
                            0
                            @else
                            {{ number_format( $value_data['jarak_terdekat']['value'], 2) }}
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

                    </div>
                </div>

            </div>
            <!-- body -->

            <!-- footer -->
            <div class="modal-footer">

                <button class="btn btn-primary" data-dismiss="modal">
                    Close
                </button>
            </div>
            <!-- footer -->

        </div>
        <!-- content -->

    </div>
    <!-- dialog -->

</div>

