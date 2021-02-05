(function($) {
	
	var today = moment().format('YY/MM/DD');
	
	read();
	
	$("#cm_insert").on("click", function(){
		
		$("#modal_id").val("");
		$("#modal_pw").val("");
		$("#modal_hp").val("");
		$("#modal_email").val("");
		
		
		$("#modal_insert").modal("show");
	});
	
	$("#modal_submit").on("click", function(){
		var param;
		
		if($("#modal_email").val()==""){
			param = {
			CNTRL_USER_ID : $("#modal_id").val(),
			USER_PW : $("#modal_pw").val(),
			USER_HP : $("#modal_hp").val(),
			USER_EMAIL : '-',
			REG_DT : today
			};
		}else{
			var param = {
			CNTRL_USER_ID : $("#modal_id").val(),
			USER_PW : $("#modal_pw").val(),
			USER_HP : $("#modal_hp").val(),
			USER_EMAIL : $("#modal_email").val(),
			REG_DT : today
			};
		};
		
		
		
		
		
		$.ajax({
				url : "/common/user_insert",
				data : param,
				type : "Post",
				dataType : 'text',
				success : function(data) {
						alert("등록 완료");
						$("#modal_insert").modal("hide");
						read();
					},
				error : function(request, status, error) {
					console.log(error);
					}
			});	
		
	});
	
	
		$("#cm_modify").on("click", function(){
			var checkbox =  $('.theClass:checkbox:checked');
			var select = table.rows( '.selected' ).data();
			
			console.log(select[0]);
			
			$("#modal_id2").val(select[0].CNTRL_USER_ID);
		 	$("#modal_pw2").val(select[0].USER_PW);
			$("#modal_hp2").val(select[0].USER_HP);
			$("#modal_email2").val(select[0].USER_EMAIL);
			
			$("#modal_modify").modal("show");
		});
	
	$("#modal_submit2").on("click", function(){
		var param;
		
		if($("#modal_email2").val()==""){
			param = {
			CNTRL_USER_ID : $("#modal_id2").val(),
			USER_PW : $("#modal_pw2").val(),
			USER_HP : $("#modal_hp2").val(),
			USER_EMAIL : '-',
			MDFCN_DT : today
			};
		}else{
			var param = {
			CNTRL_USER_ID : $("#modal_id2").val(),
			USER_PW : $("#modal_pw2").val(),
			USER_HP : $("#modal_hp2").val(),
			USER_EMAIL : $("#modal_email2").val(),
			MDFCN_DT : today
			};
		};
		
		$.ajax({
				url : "/common/user_modify",
				data : param,
				type : "Post",
				dataType : 'text',
				success : function(data) {
						alert("수정 완료");
						$("#modal_modify").modal("hide");
						read();
					},
				error : function(request, status, error) {
					console.log(error);
					}
			});	
		
	});
	
	$("#cm_delete").on("click", function(){
			var checkbox =  $('.theClass:checkbox:checked');
			
			var select = table.rows( '.selected' ).data();
			console.log(select[0]);
			if(select[0]==undefined){
				alert("체크된 항목이 없습니다!");
			}else{
				var param_del ={
					CNTRL_USER_ID : select[0].CNTRL_USER_ID
				};
			
		
			
			var del_confirm = confirm("정말 삭제하시겠습니까?");
			  if ( del_confirm == true ) {
					
					$.ajax({
						url : "/common/user_del",
						data : param_del,
						type : "Post",
						dataType : 'text',
						success : function(data) {
								alert("삭제 완료");
								read();
							},
						error : function(request, status, error) {
							console.log(error);
							}
					});					
				}
		}
		});
	
	
	function read(){
		
		$.ajax({
				url : "/common/user_list",
				type : "Post",
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
									            { "data" : "CNTRL_USER_ID" },									           
									            { "data" : "USER_EMAIL" },
												{ "data" : "USER_HP" },	
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
	
	
})(jQuery);