(function($) {

    var no = $('#sessionId').val();
    var auth= $("#sessionAuthor").val();

    console.log("SESSION :: "+no+"//"+auth);

    var USER_NO = no;

    var today = moment().format('YY/MM/DD');
    var selectYn;
    var selectYn2;

    read();

    $("#cm_insert").on("click", function(){

        $("#modal_id").val("");
        $("#modal_nm").val("");
        $("#modal_yn_dropdown_btn").text("사용여부");


        $("#modal_insert").modal("show");
    });

    $(document).on("click","#modal_yn_grid li > a", function() {
        // 버튼에 선택된 항목 텍스트 넣기
        $('#modal_yn_dropdown_btn').text($(this).text());
        // 선택된 항목 값(value) 얻기
        selectYn=$(this).attr('value');
    });

    $(document).on("click","#modal_yn_grid2 li > a", function() {
        // 버튼에 선택된 항목 텍스트 넣기
        $('#modal_yn_dropdown_btn2').text($(this).text());
        // 선택된 항목 값(value) 얻기
        selectYn2=$(this).attr('value');
    });

    $("#modal_submit").on("click", function(){

            var param = {

            GRP_CDID : $("#modal_id").val(),
            GRP_CDNM : $("#modal_nm").val(),
            DTL_CDID : $("#modal_id_d").val(),
            DTL_CDNM : $("#modal_nm_d").val(),
            USE_YN : selectYn,
            REG_DT : today
            };

            console.log(param);

            $.ajax({
                url : "/common/code_insert",
                data : param,
                type : "Post",
                dataType : 'text',
                success : function(data) {
                        alert("등록 완료");
                        $("#modal_insert").modal("hide");
                        read();
                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });
    });


        $("#cm_modify").on("click", function(){
            var checkbox =  $('.theClass:checkbox:checked');
            var select = table.rows( '.selected' ).data();

            console.log(select[0]);

            $("#modal_id2").val(select[0].GRP_CDID);
            $("#modal_nm2").val(select[0].GRP_CDNM);
            $("#modal_id2_d").val(select[0].DTL_CDID);
            $("#modal_nm2_d").val(select[0].DTL_CDNM);
            $('#modal_yn_dropdown_btn2').text("사용여부");

            $("#modal_modify").modal("show");


        });

    $("#modal_submit2").on("click", function(){

            var param = {
            GRP_CDID : $("#modal_id2").val(),
            GRP_CDNM : $("#modal_nm2").val(),
            DTL_CDID : $("#modal_id2_d").val(),
            DTL_CDNM : $("#modal_nm2_d").val(),
            USE_YN : selectYn2,
            MDFCN_DT : today
            };


        if(selectYn2 == undefined){
            alert("사용여부를 선택해주세요!")
        }else{
            console.log(param);
        }

        $.ajax({
                url : "/common/code_modify",
                data : param,
                type : "Post",
                dataType : 'text',
                success : function(data) {
                        alert("수정 완료");
                        $("#modal_modify").modal("hide");
                        read();
                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });

    });

    $("#cm_delete").on("click", function(){
            var checkbox =  $('.theClass:checkbox:checked');

            var select = table.rows( '.selected' ).data();
            console.log(select[0]);
            if(select[0]==undefined){
                alert("체크된 항목이 없습니다!");
            }else{
                var param_del ={
                    GRP_CDID : select[0].GRP_CDID,
                    DTL_CDID : select[0].DTL_CDID
                };



            var del_confirm = confirm("정말 삭제하시겠습니까?");
              if ( del_confirm == true ) {

                    $.ajax({
                        url : "/common/code_del",
                        data : param_del,
                        type : "Post",
                        dataType : 'text',
                        success : function(data) {
                                alert("삭제 완료");
                                read();
                            },
                        error : function(request, status, error) {
                            console.log(error);
                            }
                    });
                }
        }
        });

//++++++++++++++++++++++++++++++++++++++++++++++++엑셀 출력 파트 ++++++++++++++++++++++++++++++++++++++++
    $("#cm_excel").on("click",function(){

    });


    function read(){

        $.ajax({
                url : "/common/code_code_list",
                type : "Post",
                dataType : 'text',
                success : function(data) {

                            var grid = JSON.parse(data);

                            console.log(grid);


                        table = $('#example').DataTable( {
                                "data" :grid,
                                "scrollX": true,
                                "scrollY": true,
                                "paging": false,
                                "responsive": true,
                                "autofill": true,
                                "columns" : [
                                                { "data" : null, defaultContent: ""},
                                                { "data" : "GRP_CDID" },
                                                { "data" : "GRP_CDNM" },
                                                { "data" : "DTL_CDID" },
                                                { "data" : "DTL_CDNM" },
                                                { "data" : "USE_YN", defaultContent:"미등록"  },
                                                { "data" : "REG_DT", defaultContent:"-"  },
                                                { "data" : "MDFCN_DT", defaultContent:"-" }
                                            ],
                                "destroy": true,
                                "order": [[1, 'asc']],
                                "ordering": true,
                                "columnDefs" : [
                                    {
                                    orderable: false,
                                    className: 'select-checkbox',
                                    targets:   0
                                    }
                                ],
                                "select" : {
                                    style:    'os',
                                    selector: 'td:first-child'
                                }
                            } );
                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });

    };


})(jQuery);