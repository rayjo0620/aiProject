(function($) {
	
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	console.log("SESSION :: "+eno+"//"+auth);
	
	var today = moment().format('YY/MM/DD');
	var SELECT_MFBIZ = 'ALL';
	var table;
	var table_cnt = 0;
	var USER_ENO = '001';
	var today = moment().format('YY/MM/DD');
	var pick_date;
	
	//+++++++++++++++++++Insert변수++++++++++++++++++++++++
	var modal_devc;
	var modal_model;
	var modal_ip;
	var modal_os;
	var modal_cpu;
	var modal_sw;
	var modal_mfbiz;
	
	//++++++++++++++++++체크 박스 Select 변수**************************
	var sel_devc;
	var sel_model;
	var sel_ip;
	var sel_os;
	var sel_cpu;
	var sel_sw;
	var sel_mfbiz_id;
	var sel_mfbiz_nm;
	var sel_user;
	var sel_indc;
	var sel_cls;
	var sel_stat;
	
	//+++++++++++++++++modal 상태 선택값+++++++++++++++++
	var devc_stat;
	
	
	var picker = new Lightpick({
	    field: document.getElementById('modal_date'),
	    onSelect: function(date){
			pick_date = moment(date).format('YY/MM/DD');
			console.log( moment(date).format('YY/MM/DD'));
	        //document.getElementById('modal_date').innerHTML = pick_date;
			$("#modal_date").val(pick_date);
		}
	});
	
	$.ajax({
			url : "/common/devc_mfbiz",
			type : "Post",
			
			dataType : 'text',
			success : function(data) {
				
					var list = JSON.parse(data);
					$('#cm_mfbiz_list').empty();
					$('#modal_mfbiz_list').empty();
					
					$('#cm_mfbiz_list').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="all">전체 제조사</a> </li>');
					$(list).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.MFBIZ_ID+'">'+data.MFBIZ_NM+'</a> </li>';
						
						$('#cm_mfbiz_list').append(html_append);
						$('#modal_mfbiz_grid').append(html_append);
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
	    SELECT_MFBIZ=$(this).attr('value');
	});
	
	$(document).on("click","#modal_mfbiz_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_mfbiz=$(this).attr('value');

		console.log(modal_mfbiz);
	});
	
	$(document).on("click","#modal_stat li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_dropdown').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    devc_stat=$(this).attr('value');
	});
	
	$("#cm_search").on('click', function(e) { 
		
		read();
		
	});
	
	$("#cm_insert").on('click', function(e){
		$('#modal_devc').val("");
		$('#modal_model').val("");
		$('#modal_ip').val("");
		$('#modal_os').val("");
		$('#modal_cpu').val("");
		$('#modal_sw').val("");
		$('#modal_date').val("");
		
		$('#modal_dropdown_btn').val("");
		
		$('#modal_insert').modal('show');
		
	});
	
	$("#cm_modify").on('click', function(e){
		modify();
	});
	
	
	function read(){
		
		var param = {
			USER_ENO : USER_ENO,
			MFBIZ_ID : 	SELECT_MFBIZ
		};
		
		console.log(param);
		
		$.ajax({
				url : "/common/devc_manage_list",
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
									            { "data" : "MFBIZ_NM" },
									            { "data" : "MODEL_ID" },
												{ "data" : "DEVC_UNO" },
												{ "data" : "DTL_CDNM", defaultContent:"정상" },
												{ "data" : "INDC_DATE" },
									            { "data" : "DSCD_DATE", defaultContent:"-" }
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
		
		modal_devc = $("#modal_devc").val();
		modal_model = $("#modal_model").val();
		modal_ip = $("#modal_ip").val();
		modal_os = $("#modal_os").val();
		modal_cpu = $("#modal_cpu").val();
		modal_sw = $("#modal_sw").val();
		
		var param = {
			USER_ENO : USER_ENO,
			MFBIZ_ID : modal_mfbiz,
			DEVC_UNO : modal_devc,
			MODEL_ID : modal_model,
			DEVC_IP : modal_ip,
			OS_INFO : modal_os,
			CPU_INFO : modal_cpu,
			SW_VER : modal_sw,
			INDC_DATE : pick_date,
			REG_DT : today
		};
		
		var param_chk = {DEVC_UNO : $("#modal_devc").val()}
		
		$.ajax({
				url : "/common/devc_manage_insert_chk",
				type : "Post",
				data : param_chk,
				dataType : 'text',
				success : function(data) {
					console.log(data);
						if(data==0){
							
							$.ajax({
									url : "/common/devc_manage_insert",
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
						}else{
							alert('중복된 기기번호 입니다.');
						}
					},
				error : function(request, status, error) {
					console.log(error);
					}
		});
		
		
		
	});
	
	// modal modify 영역
	function modify(){
			var checkbox =  $('.theClass:checkbox:checked');
			var select = table.rows( '.selected' ).data();
			
			
			if(select[0] == undefined){
				alert("체크 된 항목이 없습니다!");
			}else {
				
				console.log(select[0]);
				
				sel_devc = select[0].DEVC_UNO;
				sel_model = select[0].MODEL_ID;
				sel_ip = select[0].DEVC_IP;
				sel_os = select[0].OS_INFO;
				sel_cpu = select[0].CPU_INFO;
				sel_sw = select[0].SW_VER;
				sel_mfbiz_id = select[0].MFBIZ_ID;
				sel_mfbiz_nm = select[0].MFBIZ_NM;
				sel_user = select[0].USER_ENO;
				sel_indc = select[0].INDC_DATE;
				sel_cls = select[0].DSCD_DATE;
				sel_stat = select[0].DEVC_STAT;
				
				$("#modal_devc2").val(sel_devc);
				$("#modal_model2").val(sel_model);
				$("#modal_ip2").val(sel_ip);
				$("#modal_os2").val(sel_os);
				$("#modal_cpu2").val(sel_cpu);
				$("#modal_sw2").val(sel_sw);
				$("#modal_mfbiz2").val(sel_mfbiz_nm);
				$("#modal_date2").val(sel_indc);
				
				if(sel_stat=='3'){
					alert("폐쇄된 영업점입니다.");
				}else{
					$("#modal_modify").modal('show');
				}
				
			}
		}

	
	$("#modal_submit_btn2").on("click", function(e){
		
		var param = {
			USER_ENO : sel_user,
			MFBIZ_ID : sel_mfbiz_id,
			DEVC_UNO : sel_devc,
			MODEL_ID : sel_model,
			DEVC_IP : $("#modal_ip2").val(),
			OS_INFO : $("#modal_os2").val(),
			CPU_INFO : $("#modal_cpu2").val(),
			SW_VER : $("#modal_sw2").val(),
			MDFCN_DT : today,
			INDC_DATE: sel_indc,
			DEVC_STAT: devc_stat,
			REG_DT : today
		};
		
		console.log(param);
		
		if($("#modal_ip2").val()== "" || $("#modal_os2").val() == "" || $("#modal_cpu2").val() == "" || $("#modal_sw2").val() == "" ||devc_stat == undefined ){
			alert("모든 항목을 입력해주세요!");
		}else{
			$.ajax({
				url : "/common/devc_manage_modify",
				type : "post",
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
	
	//폐쇄
	$("#modal_cls_btn").on("click", function(e){
		
		var param = {
			USER_ENO : sel_user,
			MFBIZ_ID : sel_mfbiz_id,
			DEVC_UNO : sel_devc,
			MODEL_ID : sel_model,
			DEVC_IP : $("#modal_ip2").val(),
			OS_INFO : $("#modal_os2").val(),
			CPU_INFO : $("#modal_cpu2").val(),
			SW_VER : $("#modal_sw2").val(),
			MDFCN_DT : today,
			INDC_DATE: sel_indc,
			DEVC_STAT: '3',
			DSCD_DATE : today,
			REG_DT : today
		};
		
		if(sel_stat!="3"){
			var del_confirm = confirm("정말 해당 기기를 폐쇄하시겠습니까?");
		
			  if ( del_confirm == true ) {
					$.ajax({
						url : "/common/devc_cls",
						type : "POST",
						data : param,
						dataType : 'text',
						success : function(data) {
								alert("폐쇄 완료");
								$("#modal_modify").modal('hide');
								read();
							},
						error : function(request, status, error) {
							console.log(error);
							alert("이미 폐쇄된 기기입니다.");
							}
					});
				};
		}else{
			alert("이미 폐쇄된 기기입니다.");
		}	
	});
	
	
	
	
	
})(jQuery);