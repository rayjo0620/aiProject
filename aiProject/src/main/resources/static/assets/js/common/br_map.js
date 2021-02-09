(function($) {
	//var USER_ENO = '001';
	
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	var USER_ENO = eno;
	
	console.log("SESSION :: "+eno+"//"+auth);
	
	var param_br = {USER_ENO : USER_ENO};
	var select_br = "all";
	var today = moment().format('YY/MM/DD');
		
	var table_br;
	var table_devc;
	var table_cnt = 0;
	
	var select_br;
	var select_devc;
	

	$.ajax({
			url : "/sales/br_list",
			type : "Post",
			data : param_br,
			dataType : 'text',
			success : function(data) {
				
					var brList2 = JSON.parse(data);
					$('#cm_grid').empty();
					
					$('#cm_grid').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="all">전체 지점</a> </li>');
					$(brList2).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.BR_CD+'">'+data.BR_NM+'</a> </li>';
						
						$('#cm_grid').append(html_append);
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
	    select_br=$(this).attr('value');
	});
	
	$("#cm_search").on('click', function(e) { 
		
		read();
		
	});
	
	$("#cm_br_insert").on('click', function(e){
		
		select_br = table_br.rows( '.selected' ).data();
		select_devc = table_devc.rows( '.selected' ).data();
		
		if(select_br[0]==undefined || select_devc[0]==undefined){
			alert("체크되지 않은 항목이 있습니다!");
		}else{
			console.log("br=="+JSON.stringify(select_br[0]));
			console.log("devc=="+JSON.stringify(select_devc[0]));
			
			mapping();
		}
		
		
		
		
		
	})
	
	function read(){
		

		$.ajax({
				url : "/common/br_map_grid",
				type : "Post",
				data : param_br,
				dataType : 'text',
				success : function(data) {
						
						var grid = JSON.parse(data);
							
						var br_grid = JSON.parse(grid.br);
						var devc_grid = JSON.parse(grid.devc);	
						
						table_br=$('#table_br').DataTable( {
								"data" :br_grid,
						        "scrollX": true,
								"scrollY": true,
								"paging": false,
								"responsive": true,
								"autofill": true,
								"columns" : [	
												{ "data" : null, defaultContent: ""},
									            { "data" : "BR_NM" },
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
		
						table_devc=$('#table_devc').DataTable( {
								"data" :devc_grid,
						        "scrollX": true,
								"scrollY": true,
								"paging": false,
								"responsive": true,
								"autofill": true,
								"columns" : [	
												{ "data" : null, defaultContent: ""},
									            { "data" : "DEVC_UNO" },
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
		
	};
	
	
	function mapping(){
		
		var param = {
			USER_ENO : USER_ENO,
			BR_CD : select_br[0].BR_CD,
			MFBIZ_ID : select_devc[0].MFBIZ_ID,
			MODEL_ID : select_devc[0].MODEL_ID,
			DEVC_UNO : select_devc[0].DEVC_UNO
		}
		
		$.ajax({
				url : "/common/br_map_mapping",
				type : "Post",
				data : param,
				dataType : 'text',
				success : function(data) {
						alert("맵핑 완료!");
						read();
					},
				error : function(request, status, error) {
					console.log(error);
						alert("이미 등록된 기기입니다!")
					}
			});
	}
	
	
	
})(jQuery);