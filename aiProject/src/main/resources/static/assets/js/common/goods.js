(function($) {
	
	var today = moment().format('YY/MM/DD');
		
	var table;
	var table_cnt = 0;
	
	var modal_type;
	var modal_cdnm;
	
	var modal_type_ori;
	var modal_type_modify;
	var modal_cd_ori;
	var modal_cdnm_modify;
	var cls_dt;
	
	
	read();
	read_type();
	
	
	$("#cm_goods_insert").on('click', function(e){
		
		modal_type = undefined;
		$('#modal_type_dropdown_btn').text("상품분류");
		$('#modal_cdnm_insert').val("");
		read_type();
		$("#modal_insert").modal('show');
	});
	
	$(document).on("click","#modal_type_grid li > a", function() {
	    // 버튼에 선택된 항목 텍스트 넣기 
	    $('#modal_type_dropdown_btn').text($(this).text());        
	    // 선택된 항목 값(value) 얻기
	    modal_type = $(this).attr('value');
	});
	
	
	
	$("#modal_submit_btn").on('click', function(e){
		
		goods_insert();
	});
	
	$("#cm_goods_modify").on('click', function(e){
		
		var checkbox =  $('.theClass:checkbox:checked');
		
		var select = table.rows( '.selected' ).data();
		/*$('#modal_type_dropdown_btn2').val(select[0].GOODS_TYPE);
		$('#modal_type_dropdown_btn2').text(select[0].GOODS_TYPENM);*/
		$('#modal_type_modify').val(select[0].GOODS_TYPENM);
		$('#modal_cdnm_insert2').val(select[0].GOODS_CDNM);
		
		modal_type_ori = select[0].GOODS_TYPE;
		modal_type_modify = select[0].GOODS_TYPE;
		modal_cd_ori = select[0].GOODS_CD;
		cls_dt = select[0].CLS_DT;
		
		
		
		
		read_type();
		$("#modal_modify").modal('show');
		
		
	});
	
	$("#modal_submit_btn2").on('click', function(e){
		
		goods_modify();
	});
	
	
	$("#cm_goods_delete").on('click', function(e) {
		if(table_cnt == 0){
			alert("조회된 데이터가 없습니다!");
		}
		
		var checkbox =  $('.theClass:checkbox:checked');
		
		var select = table.rows( '.selected' ).data();
		console.log(select[0]);
		if(select[0]==undefined){
			alert("체크된 항목이 없습니다!");
		}else{
			var param_del ={
				GOODS_TYPE : select[0].GOODS_TYPE,
				GOODS_CD : select[0].GOODS_CD
			};
			
		
			
			var del_confirm = confirm("정말 삭제하시겠습니까? \n 해당 상품 카테고리로 등록된 재고 물품의 여부를 반드시 확인해주세요.");
			  if ( del_confirm == true ) {
					goods_del(param_del);				
					
				}
		}
	
	 });

	
	function read(){

			$.ajax({
				url : "/common/goods_grid",
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
									            { "data" : "GOODS_TYPENM" },									           
									            { "data" : "GOODS_CDNM" }												
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
	
	function read_type(){
		$.ajax({
			url : "/common/goods_read_type",
			type : "post",
			dataType : "text",
			success : function(data) {
					var list = JSON.parse(data);
					
					$('#modal_type_grid').empty();
					$('#modal_type_grid2').empty();
						
					$(list).each(function(index, data){
							
					var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.GOODS_TYPE+'">'+data.GOODS_TYPENM+'</a> </li>';
							
					$('#modal_type_grid').append(html_append);
					$('#modal_type_grid2').append(html_append);
					});
			},
			error : function(request, status, error) {
				console.log(error);
			}
		});
	};
	
	function goods_insert(){
		
		modal_cdnm = $('#modal_cdnm_insert').val();
		
	
		
		if(modal_type==undefined){
			alert("상품분류를 선택해주세요!");
		}else{	
			
				var param_insert = {
			
			GOODS_TYPE : modal_type,
			GOODS_CDNM : modal_cdnm,
			REG_DT : today
		}
		console.log(param_insert);		
					$.ajax({
						url : "/common/goods_insert",
						type : "Post",
						data : param_insert,
						dataType : 'text',
						success : function(data) {
									console.log(data);
									if(data=='0'){
										alert("중복된 상품명입니다.");
									}else{
										alert("등록 되었습니다.");
										$("#modal_insert").modal('hide');
										read();
									}
									
									
							},
						error : function(request, status, error) {
							console.log(error);
							alert("중복된 상품명입니다.");
							}
					});
		}
		
	};
	
	function goods_modify(){
		
		modal_cdnm_modify = $('#modal_cdnm_insert2').val();
		
		
		
		var param_modify = {
			
			GOODS_TYPE : modal_type_ori,
			GOODS_TYPE_MODIFY : modal_type_modify,
			GOODS_CD : modal_cd_ori,
			GOODS_CDNM : modal_cdnm_modify,
			MDFCN_DT : today
			
		}
		
		console.log(param_modify);
		
					$.ajax({
						url : "/common/goods_modify",
						type : "Post",
						data : param_modify,
						dataType : 'text',
						success : function(data) {
									console.log(data);
									if(data=='0'){
										alert("중복된 상품명입니다.");
									}else{
										alert("등록 되었습니다.");
										$("#modal_modify").modal('hide');
										read();
									}
									
									
							},
						error : function(request, status, error) {
							console.log(error);
							alert("중복된 상품명입니다.");
							}
					});
	};
	
	function goods_del(e){
		
					$.ajax({
						url : "/common/goods_del",
						type : "Post",
						data : e,
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
	};
	
})(jQuery);