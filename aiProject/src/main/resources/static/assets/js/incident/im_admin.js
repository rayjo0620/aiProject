(function($) {
	
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
	var modal_user;
	var modal_obty;
	var modal_accd;
	var modal_acdts;
	var modal_ocrn;
	var modal_strt;
	
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	console.log("SESSION :: "+eno+"//"+auth);
	
	$.ajax({
			url : "/incident/br_list",
			type : "Post",
			data : param_br,
			dataType : 'text',
			success : function(data) {
									
					var brList = JSON.parse(data);
					$('#im_grid').empty();

					$('#im_grid').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="all">전체 지점</a> </li>');
					$(brList).each(function(index, data){
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';
						$('#im_grid').append(html_append);
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
	
	function read(){
			var param ={
			USER_ENO : USER_ENO,
			BR_CD : select_br
			}
			$.ajax({
				url : "/incident/admin_grid",
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
												{ "data" : null, defaultContent: ""},												
									            { "data" : "BR_NM" },
									            { "data" : "DEVC_UNO" },
									            { "data" : "REG_YN" },
									            { "data" : "OCRN_DATE" },
												{ "data" : "OB_TYPE" },
												{ "data" : "AC_DTS" },
												{ "data" : "REQRE_TM" }
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
	}
		
	$("#im_insert").on('click', function(e) { 
		
		var checkbox =  $('.theClass:checkbox:checked');
		
		var select = $('#example').DataTable().rows( '.selected' ).data();
		console.log(select[0]);
		
		if(select[0]==undefined){
			alert("체크된 항목이 없습니다!");
		}else{			
			$("#modal_br").val(select[0].BR_NM);
			$("#modal_devc").val(select[0].DEVC_UNO);
			
			modal_br = select[0].BR_CD;
			modal_devc = select[0].DEVC_UNO;
			modal_user = select[0].USER_ENO;
			modal_ocrn = select[0].OCRN_DATE;
			modal_strt = select[0].OB_STRT_TM;
			$("#modal_admin").modal('show');	
		}
		
	});	
	
	$(document).on("click","#modal_obty_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_obty_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_obty=$(this).attr('value');
	});
	
	$(document).on("click","#modal_ac_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_ac_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_accd=$(this).attr('value');
	});
	
	
	
	$("#modal_submit_btn").on('click', function(e) { 
		var time = moment().format('HHmmss');
		var param = {
			BR_CD : modal_br,
			DEVC_UNO : modal_devc,
			USER_ENO : modal_user,
			OB_TYPE : modal_obty,
			AC_CD : modal_accd,
			AC_DTS : $("#modal_acdts").val(),
			REG_DT : today,
			OCRN_DATE : modal_ocrn,
			OB_STRT_TM : modal_strt
			
		}
		
		console.log(param);
		
		$.ajax({
			url : "/incident/admin_modify",
			type : "Post",
			data : param,
			dataType : 'text',
			success : function(data) {
					
					alert("완료");
					$("#modal_admin").modal('hide');
					read();
									
				},
			error : function(request, status, error) {
				console.log(error);
				}
		});
		
		
		
	});
	
	
	
	
	
	
})(jQuery);