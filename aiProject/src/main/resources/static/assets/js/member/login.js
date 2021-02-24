(function($) {

      "use strict"; // Start of use strict

 $("#login").on('click', function(e) {
    var param = {
                    CNTRL_USER_ID : $("#id").val(),
                    USER_PW : $("#password").val()
                }

    console.log(param);

    if($("#id").val()==""){
        alert("아이디를 입력해주세요")
        $('#Id').focus();
    }else if($('#password').val()==""){
        alert("비밀번호를 입력해주세요")
        $('#password').focus();
    }else{
        $.ajax({
            url : "loginAction.do",
            type : "Post",
            data : param,
            dataType : 'text',
            success : function(data) {

                alert("로그인 성공");
                location.href = "/main";
                },
            error : function(request, status, error) {
                console.log("로그인 실패 \n 아이디와 비밀번호를 확인해주세요");
                alert("              로그인 실패 \n 아이디와 비밀번호를 확인해주세요");
                $('#id').focus();
                    console.log("code:"+ request.status+ "\n"+ "message:"+ request.responseText+ "\n"+ "error:"+ error);
                }
            });
        }
  });


})(jQuery);