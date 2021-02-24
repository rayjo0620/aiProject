(function($) {
	
	/*var USER_NO = '001';
	
	var param_br = {USER_NO : USER_NO};*/
	
	var no = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	console.log("SESSION :: "+no+"//"+auth);
	
	var USER_NO = no;
	var CNTRL_AUTHOR = auth;
	
	var param_br = {USER_NO : USER_NO, CNTRL_AUTHOR : CNTRL_AUTHOR};
	
////////////////////////////////////////////////////////////////////////////////////////////
	var select_br = "";
	var table;
	var table_cnt = 0;
	var today = moment().format('YY/MM/DD');
	var modal_br;
	var modal_devc;
	var modal_gt;
	var modal_gnm;
	var modal_qty;
	
	var MODIFY_BR_NM;
	var MODIFY_BR_CD;
	var MODIFY_DEVC_NO;
	var MODIFY_GOODS_CD;
	var MODIFY_GOODS_TYPE;
	var MODIFY_GOODS_NM;
	var MODIFY_GOODS_TYPENM ;
	var MODIFY_GOODS_QY;
	
	var now = new Date();
    var year = now.getFullYear();
    let yy = String(year).substr(2,4);
    var mm = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
    var dd = now.getDate();

    mm = mm >=10 ? mm : "0" + mm; //1월 -> 01월
    dd  = dd  >= 10 ? dd : "0" + dd; //1일 -> 01일
    
  	var date = [year,'년',mm,'월',dd,'일'].join(" "); 
	
	$("#stk_date").text(date);
		
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
	
	$(document).on("click","#modal_br_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_br_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_br=$(this).attr('value');
		$('#modal_devc_dropdown_btn').text("기기번호");
		$('#modal_gt_dropdown_btn').text("상품분류");
	 	$('#modal_gnm_dropdown_btn').text("상품명");
		$('#modal_qty').text("입고수량");
		modalDevc();
		
	});
	
	$(document).on("click","#modal_devc_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_devc_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_devc=$(this).attr('value');
		$('#modal_gt_dropdown_btn').text("상품분류");
	 	$('#modal_gnm_dropdown_btn').text("상품명");
		$('#modal_qty').text("입고수량");
		
		modalGt();
	});
	
	$(document).on("click","#modal_gt_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_gt_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_gt=$(this).attr('value');
		$('#modal_gnm_dropdown_btn').text("상품명");
		$('#modal_qty').text("입고수량");
		
		modalGnm();
	});
	
	$(document).on("click","#modal_gnm_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_gnm_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_gnm=$(this).attr('value');
		$('#modal_qty').text("입고수량");
	});
	
	
	
	
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
					$('#modal_br_grid').empty();
					
					$('#sm_daily_grid').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="">전체 지점</a> </li>');
					$(brList2).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';
						
						$('#sm_daily_grid').append(html_append);
					});
					
					$(brList2).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';
						
						$('#modal_br_grid').append(html_append);
					});
				},
			error : function(request, status, error) {
				console.log(error);
				}
	});
	
	
	
	//조회버튼 동작
	$("#sm_stkManage_search").on('click', function(e) { 
		
		read();
		
	});
	
	$("#sm_stkManage_insert").on('click', function(e) {
		
		if(table_cnt == 0){
			alert("조회된 데이터가 없습니다!");
		}else{
		$('#modal_br_dropdown_btn').text("영업점선택");	
		$('#modal_devc_dropdown_btn').text("기기번호");
		$('#modal_gt_dropdown_btn').text("상품분류");
	 	$('#modal_gnm_dropdown_btn').text("상품명");
		$('#modal_qy').val("");
		
		
		$("#sm_stkManage_modal_insert").modal('show');
		}
		
		
				
	 });

	$("#sm_stkManage_modify").on('click', function(e) {
		if(table_cnt == 0){
			alert("조회된 데이터가 없습니다!");
		}
		
		var checkbox =  $('.theClass:checkbox:checked');
		
		var select = table.rows( '.selected' ).data();
		
		console.log(select[0]);
		
		if(select[0]==undefined){
			alert("체크된 항목이 없습니다!");
		}else{
			MODIFY_BR_NM = select[0].BR_NM;
			MODIFY_BR_CD = select[0].BR_CD;
			MODIFY_DEVC_NO = select[0].DEVC_NO;
			MODIFY_GOODS_CD = select[0].GOODS_CD;
			MODIFY_GOODS_TYPE = select[0].GOODS_TYPE;
			MODIFY_GOODS_NM = select[0].GOODS_NM;
			MODIFY_GOODS_TYPENM = select[0].GOODS_TYPENM;
			MODIFY_GOODS_QY = select[0].GOODS_QY;
			
			$('#modal_modify_br').val(MODIFY_BR_NM);
			$('#modal_modify_devc').val(MODIFY_DEVC_NO);
			$('#modal_modify_gt').val(MODIFY_GOODS_TYPENM);
			$('#modal_modify_gnm').val(MODIFY_GOODS_NM);
			$('#modal_modify_qy').val(MODIFY_GOODS_QY);
			
			$("#sm_stkManage_modal_modify").modal('show');
		}
				
		
			
		
		
		
		
		
	 });

	$("#sm_stkManage_delete").on('click', function(e) {
		if(table_cnt == 0){
			alert("조회된 데이터가 없습니다!");
		}
		
		var checkbox =  $('.theClass:checkbox:checked');
		
		var select = table.rows( '.selected' ).data();
		console.log(select[0]);
		
		if(select[0]==undefined){
			alert("체크된 항목이 없습니다!");
		}else{
			console.log(select[0].BR_CD);
			
			var del_confirm = confirm("정말 삭제하시겠습니까?");
 
	        if ( del_confirm == true ) {
		
			console.log("push");
			
	  		var param_del={
							BR_CD : select[0].BR_CD,
							DEVC_NO : select[0].DEVC_NO,
							GOODS_CD : select[0].GOODS_CD,
							USER_NO : select[0].USER_NO,
							GOODS_TYPE : select[0].GOODS_TYPE
							}
							
				$.ajax({
					url : "/sales/stkManage_del",
					type : "Post",
					data : param_del,
					dataType : 'text',
					success : function(data) {
								console.log(data);
								alert("삭제 되었습니다.");
								read();
							
						},
					error : function(request, status, error) {
						console.log(error);
						}
				});
	        }	
		}
	 });
	
	$("#modal_insert_btn").on("click", function(){
		
		modalInesert();
		read();
	});
	
	$("#modal_modify_btn").on("click", function(){
		
		modalModify();
		read();
	});
	
	function read(){
			var param ={
			USER_NO : USER_NO,
			CNTRL_AUTHOR : CNTRL_AUTHOR,
			BR_CD : select_br
			}
		
			$.ajax({
				url : "/sales/stkDo",
				type : "Post",
				data : param,
				dataType : 'text',
				success : function(data) {
						
							var grid = JSON.parse(data);
							
						console.log(grid);
							
						table =	$('#example').DataTable( {
								"data" :grid,
						        "scrollX": true,
								"scrollY": true,
								"paging": false,
								"responsive": true,
								"autofill": true,
								"columns" : [	
												{ "data" : null, defaultContent: ""},
									            { "data" : "BR_NM" },
									            { "data" : "DEVC_NO" },
									            { "data" : "GOODS_NM" },
									            { "data" : "GOODS_QY" },
												
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
		}
	
	function modalDevc(){
		
		var param_modal = {
							USER_NO : USER_NO,
							CNTRL_AUTHOR : CNTRL_AUTHOR,
							BR_CD : modal_br
						}
		
		$.ajax({
			url : "/sales/modal_devc",
			type : "Post",
			data : param_modal,
			dataType : 'text',
			success : function(data) {
													
					var modal_devc_list = JSON.parse(data);
				
					$('#modal_devc_grid').empty();
					
					$(modal_devc_list).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.DEVC_NO+'">'+data.DEVC_NO+'</a> </li>';
						
						$('#modal_devc_grid').append(html_append);
					});
										
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
	};
	
	function modalGt(){	
		$.ajax({
			url : "/sales/modal_gt",
			type : "Post",
			dataType : 'text',
			success : function(data) {
													
					var modal_gt_list = JSON.parse(data);
				
					$('#modal_gt_grid').empty();
					
					$(modal_gt_list).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.GOODS_TYPE+'">'+data.GOODS_TYPENM+'</a> </li>';
						
						$('#modal_gt_grid').append(html_append);
					});
										
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
	};
	
	
	
	function modalGnm(){
		
		var param_modal = {
							GOODS_TYPE : modal_gt
						}
		
		$.ajax({
			url : "/sales/modal_gnm",
			type : "Post",
			data : param_modal,
			dataType : 'text',
			success : function(data) {
													
					var modal_gnm_list = JSON.parse(data);
				
					$('#modal_gnm_grid').empty();
					
					$(modal_gnm_list).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.GOODS_CD+'">'+data.GOODS_NM+'</a> </li>';
						
						$('#modal_gnm_grid').append(html_append);
					});
										
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
	};
	
	function modalInesert(){
		if(modal_br == undefined || modal_devc == undefined || modal_gt == undefined || modal_gnm  == undefined){
			alert("입력값을 확인해주세요.");
		}else{
			var modal_qy = $("#modal_qy").val();
			if(modal_qty == ""){
				modal_qty = "0";
			}
			
			var param = {
						USER_NO : USER_NO,
						BR_CD : modal_br,
						DEVC_NO : modal_devc,
						GOODS_TYPE : modal_gt,
						GOODS_CD : modal_gnm,
						GOODS_QY : modal_qy,
						REG_DT : today
					}
			
			$.ajax({
				url : "/sales/modal_insert",
				type : "Post",
				data : param,
				dataType : 'text',
				success : function(data) {
						
						$("#sm_stkManage_modal_insert").modal('hide');
														
						alert("등록 완료");
						
						read();
						
											
					},
				error : function(request, status, error) {
					console.log(error);
					alert("이미 등록된 상품입니다!");
					}
			});
			
		}	
	}
	
	function modalModify(){
		
		if(modal_qty == ""){
			modal_qty = "0";
		}
		
		var param = {
				BR_NM : MODIFY_BR_NM,
				BR_CD : MODIFY_BR_CD,
				DEVC_NO : MODIFY_DEVC_NO,
				GOODS_CD : MODIFY_GOODS_CD,
				GOODS_TYPE : MODIFY_GOODS_TYPE,
				GOODS_NM : MODIFY_GOODS_NM,
				GOODS_TYPENM : MODIFY_GOODS_TYPENM,
				GOODS_QY : $('#modal_modify_qy').val(),
				REG_DT : today,
				USER_NO : USER_NO
			}
			
			
		
			$.ajax({
				url : "/sales/modal_update",
				type : "Post",
				data : param,
				dataType : 'text',
				success : function(data) {
						
						$("#sm_stkManage_modal_modify").modal('hide');
														
						alert("수정 완료");
						
						read();
						
											
					},
				error : function(request, status, error) {
					console.log(error);
					alert("잘못된 접근입니다.");
					}
			});
		
	}

	
})(jQuery);