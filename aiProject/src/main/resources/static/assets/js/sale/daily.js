(function($) {
	
	var USER_ENO = '001';
	
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	console.log("SESSION :: "+eno+"//"+auth);
	
	var param_br = {USER_ENO : USER_ENO};
	var select_br = "all";
	
	//날짜 구하기
	var now = new Date();
    var year = now.getFullYear();
    let yy = String(year).substr(2,4);
    var mm = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
    var dd = now.getDate();

    mm = mm >=10 ? mm : "0" + mm; //1월 -> 01월
    dd  = dd  >= 10 ? dd : "0" + dd; //1일 -> 01일
    
  	var date = [year,'년',mm,'월',dd,'일'].join(" "); 
 	var today = moment().format('YY/MM/DD');
	today = "21/01/11";
    
	
	
	/*
	*	드롭다운 관련 정보 얻어오기
	* 	드롭다운의 항목들은 동적으로 생성된 객체들이므로 $(document).on()을 통해 다시 읽어와야함
	*/
	
	
	$(document).on("click","#sm_daily_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#sm_daily_dropdown_btn').text($(this).text());
	        
	    // 선택된 항목 값(value) 얻기
	    select_br=$(this).attr('value');

	});

	//날짜 입력하기 
	$('#sm_daily_date').empty();
	$('#sm_daily_date').text('오늘의 매출('+date+')');
	
	//날짜 종료
	
	//동적 드롭다운 생성 (로그인 사용자의 영업점 목록)
	$.ajax({
			url : "/sales/br_list",
			type : "Post",
			data : param_br,
			dataType : 'text',
			success : function(data) {
					var brList = data;					
					var brList2 = JSON.parse(data);
					$('#sm_daily_grid').empty();
					$('#sm_daily_grid').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="all">전체 지점</a> </li>');
					$(brList2).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';
						
						$('#sm_daily_grid').append(html_append);
					});
					
					
					
				},
			error : function(request, status, error) {
				console.log(error);
				}
	});
	
	//조회버튼 동작
	$("#sm_daily_search").on('click', function(e) { 
		var BRCD = select_br;
		
		var param ={
		USER_ENO : USER_ENO,
		BR_CD : select_br,
		DELNG_DATE : today
		}
		
		$.ajax({
			url : "/sales/dailyDo",
			type : "Post",
			data : param,
			dataType : 'text',
			success : function(data) {
					if(data == 'empty'){
						alert("금일 판매 내역이 없습니다!");
						$('#sm_daily_sales').text("금일 판매 내역이 없습니다.");
					}else{
						var data2 = JSON.parse(data);
					
						var grid = JSON.parse(data2.grid_list);
						
						var salesTot = '총 매출액 :'+data2.daily_tot+' 원';
						
						$('#sm_daily_sales').text(salesTot);
						
						$('#example').DataTable( {
							
							"data" :grid,
					        "scrollX": true,
							"responsive": true,
							"autofill": true,
							"columns" : [
								            { "data" : "BR_NM" },
								            { "data" : "DEVC_UNO" },
								            { "data" : "GOODS_NM" },
								            { "data" : "DLAMT" },
								            { "data" : "DELNG_DATE" },
								            { "data" : "DELNG_TM" }
								        ],
							"destroy": true,
							"order": [[0, 'asc']],
  							"ordering": true
					    } );
					}

				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
	});
	
	
	
	
})(jQuery);