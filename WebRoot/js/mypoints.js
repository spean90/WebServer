var mypoints = {
		initMyPoints : function() {
			var config = {
					url : Sys.serviceDomain+"/detailOwnCustomersIntegral?key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$('.wallet-title .c-red').html(content.amount-content.usedAmount);
					}
			};
			Modal.jsonp(config);
		},
		getMyPointsByPage : function(page,type) {
			var t = 'all';
			if (type==1) {
				t = 'all';
			}else if(type == 2){
				t = 'increase';
			}else if(type==3){
				t = 'reduce';
			}
			var config = {
					url : Sys.serviceDomain+"/listUserIntegralDetail?recordPerPage=4&currentPage="+page+"&detailType="+type+"&key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('#'+t+' tr:gt(0)').remove();
						var str = '';
						for(var i=0;i<list.length;i++) {
							str = '<tr><td width="250">'+list[i].updateTime+'</td>'
				                +'<td>'+list[i].operate+'</td>'
				                +'<td>'+list[i].detailDesc+'</td>'
				                +'<td class="c-red">'+list[i].integral+'</td></tr>';
							$('#'+t).append($(str));
						}
						var recordPerPage = content.recordPerPage;
						var totalPage = content.totalPage;
						//初始化分页条
						if(totalPage > 1){
					    $("#pagination"+type).pagination({
					        items: recordPerPage*totalPage,
					        itemsOnPage: 4,
					        cssStyle: 'light-theme',
					        currentPage : page,
					        onPageClick: function(pageNum,event){
					        	mypoints.getMyPointsByPage(pageNum,type);
					        }
					    });
					    $("#pagination"+type).show();
					  }
					  else{
					  	$("#pagination"+type).hide();
					  }
					}
			}
			Modal.jsonp(config);
		}
}

//前端写的
tabs($('.tabs'));
$(function(){
	//初始化分页条
    $("#pagination1, #pagination2, #pagination3").pagination({
        items: 40,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
    mypoints.initMyPoints();
    $('.tabs-label li').eq(0).addClass('active');
    mypoints.getMyPointsByPage(1,1);
    mypoints.getMyPointsByPage(1,2);
    mypoints.getMyPointsByPage(1,3);
})