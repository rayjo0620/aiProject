(function($) {

    var no = $('#sessionId').val();
    var auth= $("#sessionAuthor").val();

    console.log("SESSION :: "+no+"//"+auth);

    var USER_NO = no;
    var CNTRL_AUTHOR = auth;

    var select_br = "";
    var table;
    var param_br = { USER_NO : USER_NO, CNTRL_AUTHOR : CNTRL_AUTHOR }

    var html_01;
    var html_02;
    var html_03;
    var html_04;
    var html_05;

    var no = $('#sessionId').val();
    var auth= $("#sessionAuthor").val();

    console.log("SESSION :: "+no+"//"+auth);

    $.ajax({
            url : "/incident/br_list",
            type : "Post",
            data : param_br,
            dataType : 'text',
            success : function(data) {

                    var brList = JSON.parse(data);
                    $('#im_grid').empty();
                    $('#modal_br_grid').empty();


                    $('#im_grid').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="">전체 지점</a> </li>');
                    $(brList).each(function(index, data){
                        var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';
                        $('#im_grid').append(html_append);
                    });

                    $(brList).each(function(index, data){
                        var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';
                        $('#modal_br_grid').append(html_append);
                    });
                },
            error : function(request, status, error) {
                console.log(error);
                }
    });

    $(document).on("click","#im_grid li > a", function() {
        // 버튼에 선택된 항목 텍스트 넣기
        $('#im_dropdown_btn').text($(this).text());

        // 선택된 항목 값(value) 얻기
        select_br=$(this).attr('value');

        read();
        setInterval(function(){
            $('#tbody01').empty();
            $('#tbody02').empty();
            $('#tbody03').empty();
            $('#tbody04').empty();
            $('#tbody05').empty();
            read();
        }, 5000);
    });

    function read(){
        var param ={
            USER_NO : USER_NO,
            CNTRL_AUTHOR : CNTRL_AUTHOR,
            BR_CD : select_br
        }

        $.ajax({
            url : "/incident/dash_grid",
            type : "Post",
            data : param,
            dataType : 'text',
            success : function(data) {

                var list = JSON.parse(data);



                $(list).each(function(index, data){

                        console.log("ACT_CD : " + data.ACT_CD);
						console.log("ACT_CDNM : " + data.ACT_CDNM);

                        var html_append = '<tr role="row" class="even"><td>'+data.BR_NM+'</td><td>'+data.DEVC_NO+'</td></tr>';

                        if(data.ACT_CDNM=="출동요청중"){
                            $('#tbody01').append(html_append);
                        }else if(data.ACT_CDNM=="기사배정중"){
                            $('#tbody02').append(html_append);
                        }else if(data.ACT_CDNM=="출동중"){
                            $('#tbody03').append(html_append);
                        }else if(data.ACT_CDNM=="조치중"){
                            $('#tbody04').append(html_append);
                        }else if(data.ACT_CDNM=="복구확인중"){
                            $('#tbody05').append(html_append);
                        }

                    });

                /*  $('#table_01').DataTable( {
                                "scrollX": true,
                                "scrollY": true,


                                "responsive": true,
                                "autofill": true,
                                "destroy": true,
                                "paging" : false
                                ,"searching" : false
                            } );
                    $('#table_02').DataTable( {
                                "scrollX": true,
                                "scrollY": true,
                                "responsive": true,
                                "autofill": true,
                                "destroy": true,
                                "paging" : false
                                ,"searching" : false
                            } );
                    $('#table_03').DataTable( {
                                "scrollX": true,
                                "scrollY": true,
                                "responsive": true,
                                "autofill": true,
                                "destroy": true,
                                "paging" : false
                                ,"searching" : false
                            } );
                    $('#table_04').DataTable( {
                                "scrollX": true,
                                "scrollY": true,
                                "responsive": true,
                                "autofill": true,
                                "destroy": true,
                                "paging" : false
                                ,"searching" : false
                            } );
                    $('#table_05').DataTable( {
                                "scrollX": true,
                                "scrollY": true,
                                "responsive": true,
                                "autofill": true,
                                "destroy": true,
                                "paging" : false
                                ,"searching" : false
                            } );*/

                },
            error : function(request, status, error) {
                console.log(error);
                }
        });


    }

})(jQuery);