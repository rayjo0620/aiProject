(function($) {

    var eno = $('#sessionId').val();
    var auth= $("#sessionAuthor").val();

    console.log("SESSION :: "+eno+"//"+auth);

    var USER_NO = eno;
        var today = moment().format('YY/MM/DD');
        var pw_ori;
        var pw_ori_input;
        var pw_new;
        var pw_new2;
        var email;
        var tel;

    read();

    $("#submit").on("click", function(){



        pw_ori_input=$('#pw_ori').val();
        pw_new=$('#pw_new').val();
        pw_new2=$('#pw_new2').val();
        pw_email=$('#pw_email').val();
        pw_tel=$('#pw_tel').val();

        console.log(pw_ori);

        if(pw_ori_input==""||pw_new==""||pw_new2==""){
            alert("누락된 항목이 있습니다!");
        }else if(pw_ori != pw_ori_input){
            alert("기존 비밀번호가 일치하지 않습니다!")
        }else{
            if(pw_new != pw_new2){
                alert("확인 비밀번호가 일치하지 않습니다.")
            }else{
                modify();
                alert("변경완료");
            }
        }

    });

    function read(){
        var param ={USER_NO : USER_NO};

        $.ajax({
                url : "/common/user_info",
                type : "Post",
                data : param,
                dataType : 'text',
                success : function(data) {

                        var grid = JSON.parse(data);

                        console.log(grid[0]);

                        $('#id').val(grid[0].CNTRL_USER_ID);
                        $('#email').val(grid[0].USER_EMAIL);
                        $('#tel').val(grid[0].USER_HP);
                        pw_ori = grid[0].USER_PW

                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });
    }

    function modify(){

        pw_ori_input=$('#pw_ori').val();
        pw_new=$('#pw_new').val();
        pw_new2=$('#pw_new2').val();
        pw_email=$('#email').val();
        pw_tel=$('#tel').val();

        console.log(pw_new);
        var param={
            USER_PW : pw_new,
            USER_HP : pw_tel,
            USER_EMAIL : pw_email,
            MDFCN_DT : today,
            USER_NO : USER_NO

        };

        $.ajax({
                url : "/common/user_my_modify",
                type : "Post",
                data : param,
                dataType : 'text',
                success : function(data) {

                        var grid = JSON.parse(data);
                        read();
                        $('#pw_new').val("");
                        $('#pw_new2').val("");
                        $('#pw_ori').val("");


                    },
                error : function(request, status, error) {
                    console.log(error);
                    }
            });
    }

})(jQuery);