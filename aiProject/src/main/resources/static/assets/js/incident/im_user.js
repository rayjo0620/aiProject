(function($) {
	
	//var USER_ENO = '001';
	
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	console.log("SESSION :: "+eno+"//"+auth);
	
	var USER_ENO = eno;
	
	var select_br = "all";
	var today = moment().format('YY/MM/DD');
	var table;
	var param_br = { USER_ENO : USER_ENO }
	var data;
	
	var modal_br;
	var modal_devc;
	var modal_obty;
	
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	console.log("SESSION :: "+eno+"//"+auth);

	read();
	
	$.ajax({
			url : "/incident/br_list",
			type : "Post",
			data : param_br,
			dataType : 'text',
			success : function(data) {
									
					var brList = JSON.parse(data);
					$('#im_grid').empty();
					$('#modal_br_grid').empty();
					
					
					$('#im_grid').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="all">전체 지점</a> </li>');
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

	});
	
	$("#im_search").on('click', function(e) { 
		read();
	});
	
	$("#modal_btn_sub").on('click', function(e) { 
		$("#modal_btn").modal('hide');
	});
	
	
	function read(){
			var param ={
			USER_ENO : USER_ENO,
			BR_CD : select_br
			}
		
			$.ajax({
				url : "/incident/user_grid",
				type : "Post",
				data : param,
				dataType : 'text',
				success : function(data) {						
						var grid = JSON.parse(data);	
						
						table =	$('#example').DataTable( {
								"data" :grid,
						        "scrollX": true,
								"scrollY": true,
								"responsive": true,
								"autofill": true,
								"columns" : [													
									            { "data" : "BR_NM" },
									            { "data" : "DEVC_UNO" },
									            { "data" : "REG_YN" },
									            { "data" : "OCRN_DATE" },
												{ "data" : "OB_TYPE" },
												{ "data" : "AC_DTS" },
												{ "data" : "REQRE_TM" },
												{ "data" : null, defaultContent: "<button>상세</button>"}												
									        ],
								"destroy": true,
								"order": [[0, 'asc']],
	  							"ordering": true

						    } );	
		
						
						
							
					},
				error : function(request, status, error) {
					console.log(error);
					}
			});
			
			
					
		
	}
	
	$(document).on("click", "#example tbody > tr > td > button", function() {
				data = $('#example').DataTable().row($(this).parents('tr')).data();
				
				console.log(data);
				console.log(data.BR_NM);
				$("#modal_br").val(data.BR_NM);
				$("#modal_devc").val(data.DEVC_UNO);
				$("#modal_obty").val(data.OB_TYPE);
				$("#modal_mfbizNm").val(data.MFBIZ_NM);
				$("#modal_mfbizTel").val(data.MNTMNG_TEL);
				$("#modal_btn").modal('show');
			});	
	
	$("#im_insert").on('click', function(e) { 
		$("#modal_user_obInsert").modal('show');
		
		$('#modal_br_dropdown_btn').text("영업점명");
		$('#modal_devc_dropdown_btn').text("기기번호");
		$('#modal_obty_dropdown_btn').text("장애분류");	
	});	
	
	$(document).on("click","#modal_br_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_br_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_br=$(this).attr('value');
		$('#modal_devc_dropdown_btn').text("기기번호");
		$('#modal_obty_dropdown_btn').text("장애분류");	 	
		modalDevc();
	});
	
	$(document).on("click","#modal_devc_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_devc_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_devc=$(this).attr('value');
		$('#modal_obty_dropdown_btn').text("장애분류");		
	});
	
	$(document).on("click","#modal_obty_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_obty_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_obty=$(this).attr('value');
	});
	
	
	
	function modalDevc(){
		
		var param_modal = {
							USER_ENO : USER_ENO,
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
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.DEVC_UNO+'">'+data.DEVC_UNO+'</a> </li>';
						
						$('#modal_devc_grid').append(html_append);
					});
										
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
	};
	
	$("#modal_submit_btn").on('click', function(e) { 
		var time = moment().format('HHmmss');
		var param = {
			OCRN_DATE : today,
			BR_CD : modal_br,
			DEVC_UNO : modal_devc,
			USER_ENO : USER_ENO,
			OB_TYPE : modal_obty,
			REG_DT : today,
			OB_STRT_TM : time
		}
		
		$.ajax({
			url : "/incident/user_insert",
			type : "Post",
			data : param,
			dataType : 'text',
			success : function(data) {
					
					alert("장애 등록 완료!");
					$("#modal_user_obInsert").modal('hide');
					read();
									
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
		
		
		
	});
	
	
	
	
	
	
})(jQuery);