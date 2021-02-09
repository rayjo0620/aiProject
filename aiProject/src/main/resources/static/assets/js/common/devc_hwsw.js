(function($) {
	
	var eno = $('#sessionId').val();
	var auth= $("#sessionAuthor").val();
	
	console.log("SESSION :: "+eno+"//"+auth);
	
	var USER_ENO = eno;
	
	var today = moment().format('YY/MM/DD');
	var SELECT_MFBIZ = 'ALL';
	var table;
	var table_cnt = 0;
	

	
	$.ajax({
			url : "/common/devc_mfbiz",
			type : "Post",
			
			dataType : 'text',
			success : function(data) {
				
					var list = JSON.parse(data);
					$('#cm_mfbiz_list').empty();
					
					$('#cm_mfbiz_list').append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="all">전체 제조사</a> </li>');
					$(list).each(function(index, data){
						
						var html_append = '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" value="'+data.MFBIZ_ID+'">'+data.MFBIZ_NM+'</a> </li>';
						
						$('#cm_mfbiz_list').append(html_append);
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
	
	$("#cm_search").on('click', function(e) { 
		
		read();
		
	});
	
	
	
	function read(){
		
		var param = {
			USER_ENO : USER_ENO,
			MFBIZ_ID : 	SELECT_MFBIZ
		};
		
		console.log(param);
		
		$.ajax({
				url : "/common/devc_swhw_list",
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
									            { "data" : "MFBIZ_NM" },
									            { "data" : "OS_INFO" },
												{ "data" : "CPU_INFO" },
												{ "data" : "SW_VER"},
												{ "data" : "DEVC_UNO" },
									        ],
								"destroy": true,
								"order": [[0, 'asc']],
	  							"ordering": true
								
						    } );
		
							table_cnt=1;
					},
				error : function(request, status, error) {
					console.log(error);
					}
			});
		
	};
	
})(jQuery);