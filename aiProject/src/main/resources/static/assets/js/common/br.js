(function($) {
    var no = $('#sessionId').val();
    var auth= $("#sessionAuthor").val();

    console.log("SESSION :: "+no+"//"+auth);

    var USER_NO = no;

    var param_br = {USER_NO : USER_NO};
    var select_br = "all";
    var today = moment().format('YY/MM/DD');

    var table;
    var table_cnt = 0;

    var modal_cdnm;
    var modal_adr;
    var modal_adr2;
    var modal_brcd;
    var cls_dt;

    $.ajax({
            url : "/sales/br_list",
            type : "Post",
            data : param_br,
            dataType : 'text',
            success : function(data) {

                    var brList2 = JSON.parse(data);
                    $('#cm_grid').empty();

                    $('#cm_grid').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="all">전체 지점</a> </li>');
                    $(brList2).each(function(index, data){

                        var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';

                        $('#cm_grid').append(html_append);
                    });

                },
            error : function(request, status, error) {
                console.log(error);
                }
    });

    $(document).on("click","#cm_grid li > a", function() {
        // 버튼에 선택된 항목 텍스트 넣기
        $('#cm_dropdown_btn').text($(this).text());
        // 선택된 항목 값(value) 얻기
        select_br=$(this).attr('value');
    });

    $("#cm_search").on('click', function(e) {

        read();

    });

    $("#cm_br_insert").on('click', function(e){
         $("#modal_brnm").val("");
         $("#modal_adr").val("");
        $("#modal_adr2").val("");

        $("#modal_insert").modal('show');

    });


    function read(){

        var param = {
                USER_NO : USER_NO,
                BR_CD : select_br
        };

        console.log(param);

        $.ajax({
                url : "/common/br_loc_grid",
                type : "Post",
                data : param,
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
                                                { "data" : "BR_NM" },
                                                { "data" : "BR_ADR3" },
                                                { "data" : "CLS_DT", defaultContent:"-" }
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

                            table_cnt=1;
                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });

    };

    // modal insert 영역
    $("#modal_submit_btn").on("click", function(e){
        modal_brnm = $("#modal_brnm").val();
        modal_adr = $("#modal_adr").val();
        modal_adr2 = $("#modal_adr2").val();

        var param = {
            USER_NO : USER_NO,
            BR_NM : modal_brnm,
            BR_ADR : modal_adr,
            BR_ADR2 : modal_adr2,
            REG_DT : today
        }



        if(modal_brnm == "" || modal_adr == "" || modal_adr2 == "" ){
            alert("모든 항목을 입력해주세요!");
        }else{
            console.log(param);

            $.ajax({
                url : "/common/br_insert",
                type : "Post",
                data : param,
                dataType : 'text',
                success : function(data) {
                        alert("등록 완료");
                        $("#modal_insert").modal('hide');
                        read();
                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });

        }
    });

    // modal modify 영역
    $("#cm_br_modify").on('click', function(e){


        var checkbox =  $('.theClass:checkbox:checked');
        var select = table.rows( '.selected' ).data();

        if(select[0] == undefined){
            alert("체크 된 항목이 없습니다!");
        }else {
            $("#modal_brnm2").val(select[0].BR_NM);
            $("#modal_adr_2").val(select[0].BR_ADR);
            $("#modal_adr22").val(select[0].BR_ADR2);

            modal_brcd = select[0].BR_CD;
            cls_dt = select[0].CLS_DT;
            console.log(cls_dt);

            $("#modal_modify").modal('show');
        }


    });

    $("#modal_submit_btn2").on("click", function(e){
        modal_brnm = $("#modal_brnm2").val();
        modal_adr = $("#modal_adr_2").val();
        modal_adr2 = $("#modal_adr22").val();

        var param = {
            USER_NO : USER_NO,
            BR_NM : modal_brnm,
            BR_ADR : modal_adr,
            BR_ADR2 : modal_adr2,
            MDFCN_DT : today,
            BR_CD : modal_brcd
        }

        if(modal_brnm == "" || modal_adr == "" || modal_adr2 == "" ){
            alert("모든 항목을 입력해주세요!");
        }else{
            console.log(param);

            $.ajax({
                url : "/common/br_modify",
                type : "Post",
                data : param,
                dataType : 'text',
                success : function(data) {
                        alert("수정 완료");
                        $("#modal_modify").modal('hide');
                        read();
                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });

        }
    });

    $("#modal_submit_btn3").on("click", function(e){
        modal_brnm = $("#modal_brnm").val();
        modal_adr = $("#modal_adr").val();
        modal_adr2 = $("#modal_adr2").val();

        var param = {
            USER_NO : USER_NO,
            BR_CD : modal_brcd,
            CLS_DT : today,
            MDFCN_DT : today
        }
        if(cls_dt == undefined){
            var del_confirm = confirm("정말 해당 점포를 폐쇄하시겠습니까?");

              if ( del_confirm == true ) {
                    $.ajax({
                        url : "/common/br_cls",
                        type : "Post",
                        data : param,
                        dataType : 'text',
                        success : function(data) {
                                alert("폐쇄 완료");
                                $("#modal_modify").modal('hide');
                                read();
                            },
                        error : function(request, status, error) {
                            console.log(error);
                            alert("이미 폐쇄된 영업점입니다.");
                            }
                    });
                };
        }else{
            alert("이미 폐쇄된 점포입니다.");
        }







    });




    ////////////////////////////////////////////////////////카카오 주소찾기 영역 ////////////////////////////////////////////////////////////
     // 우편번호 찾기 찾기 화면을 넣을 element
    var element_wrap = document.getElementById('wrap');

     var element_wrap2 = document.getElementById('wrap2');

    function foldDaumPostcode() {
        // iframe을 넣은 element를 안보이게 한다.
        element_wrap.style.display = 'none';
    }

    function foldDaumPostcode2() {
        // iframe을 넣은 element를 안보이게 한다.
        element_wrap2.style.display = 'none';
    }

    function DaumPostcode() {
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    //document.getElementById("modal_adr2").value = extraAddr;

                } else {
                    document.getElementById("modal_adr2").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById("modal_adr").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("modal_adr2").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_wrap.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                element_wrap.style.height = size.height+'px';
            },
            width : '100%',
            height : '100%'
        }).embed(element_wrap);

        // iframe을 넣은 element를 보이게 한다.
        element_wrap.style.display = 'block';
    }

    function DaumPostcode2() {
        // 현재 scroll 위치를 저장해놓는다.
        var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        new daum.Postcode({
            oncomplete: function(data) {
                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    //document.getElementById("modal_adr2").value = extraAddr;

                } else {
                    document.getElementById("modal_adr22").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById("modal_adr_2").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("modal_adr22").focus();

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_wrap2.style.display = 'none';

                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                document.body.scrollTop = currentScroll;
            },
            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            onresize : function(size) {
                element_wrap2.style.height = size.height+'px';
            },
            width : '100%',
            height : '100%'
        }).embed(element_wrap2);

        // iframe을 넣은 element를 보이게 한다.
        element_wrap2.style.display = 'block';
    }

    $("#modal_adr").on("click", function(e){
        DaumPostcode();
    });

    $("#modal_adr_2").on("click", function(e){
        DaumPostcode2();
    });

    $("#fold_btn").on("click", function(e){
        /*element_wrap.style.display = 'none';
        console.log("fold");*/
        foldDaumPostcode();
    });

    $("#fold_btn2").on("click", function(e){
        /*element_wrap.style.display = 'none';
        console.log("fold");*/
        foldDaumPostcode2();
    });

})(jQuery);