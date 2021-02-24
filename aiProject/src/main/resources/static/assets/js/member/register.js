
(function($) {

      "use strict"; // Start of use strict


        $("#register_nm").on("propertychange change keyup paste input",function(){
            var name = document.getElementById("register_nm");
            var nameRe = name.value
            var pattern = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
            nameRe = nameRe.replace(pattern, '');

            name.value=nameRe
        })

        $("#register_id").on("propertychange change keyup paste input",function(){
            var id = document.getElementById("register_id");
            var idRe = id.value
            var pattern =  /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]|[ \[\]{}()<>?|`~!@#$%^&*_=,.;:]/g;
            idRe = idRe.replace(pattern, '');
            id.value=idRe
        })

        $("#register_pw").on("propertychange change keyup paste input",function(){

            var password1 = $("#register_pw").val();
            var password2 = $("#register_repw").val();
            console.log(password1+"/"+password2);
            if(password1 != password2){
                $("#chkPwAlert").text("");
                $("#chkPwAlert").html("비밀번호가 일치하지 않습니다.");
            } else {
                $("#chkPwAlert").empty();
            };

            if(password1 == ""){
                $("#chkPwAlert").text("");
                $("#chkPwAlert").html("");
            };

        })

        $("#register_repw").on("propertychange change keyup paste input",function(){

            var password1 = $("#register_pw").val();
            var password2 = $("#register_repw").val();
            console.log(password1+"/"+password2);
            if(password1 != password2){
                $("#chkPwAlert").text("");
                $("#chkPwAlert").html("비밀번호가 일치하지 않습니다.");
            } else {
                $("#chkPwAlert").empty();

            };

            if(password1 == ""){
                $("#chkPwAlert").text("");
                $("#chkPwAlert").html("");
            };

        })

        $("#register_tel_body").on("propertychange change keyup paste input",function(){
            if($(this).val().length > 8){
                $(this).val($(this).val().substring(0,8));
            }
        })

    //register_tel_body 영역에 숫자 8자리 까지만 입력가능하게 제한
        function chkPhoneNum(e){
             if(e.value.length > e.maxLength){
            e.value = e.value.slice(0, e.maxLength);
            }
        }


    //핸드폰 번호 앞자리 선택 폼

    var testArr = ['010', '011', '019', '018', '016', '070'];

    var mobileSelect1 = new MobileSelect({
        trigger: '#trigger1',
        title: 'Picker Sample',
        wheels: [
                    {data: testArr}
                ],

        transitionEnd:function(indexArr, data){
            document.getElementById('register_tel_head').value= data;
            console.log("transitionEnd");
        },
        callback:function(indexArr, data){
            //document.getElementById('register_tel_head').value= data;
            console.log("callback");
            console.log(data);
            $("#trigger1").empty();
            $("#trigger1").append('<input class="form-control form-control-user" type="text" id="register_tel_head" placeholder="010" name="register_tel_head"'+' value="'+data+'"style = "text-align:center;">');

            console.log($("#register_tel_head").val());

        }
    });


    // 등록버튼 기능
    $("#register").on('click', function(e) {

        var param ={
            CNTRL_USER_ID : $("#register_id").val(),
            USER_PW : $("#register_pw").val(),
            USER_NM : $("#register_nm").val(),
            USER_HP : $("#register_tel_head").val()+$("#register_tel_body").val(),
            USER_EMAIL : $("#register_email").val()
            }

            console.log(param);

            $.ajax({
            url : "joinAction.do",
            type : "Post",
            data : param,
            dataType : 'text',
            success : function(data) {

                alert("가입 성공");
                //console.log("data="+data);
                location.href = "/";
                },
            error : function(request, status, error) {
                alert("              가입 실패 \n 입력 정보를 확인해주세요 \n (아이디가 중복 되었습니다.)");
                $('#id').focus();
                    console.log("code:"+ request.status+ "\n"+ "message:"+ request.responseText+ "\n"+ "error:"+ error);
                }
            });

    });



})(jQuery);