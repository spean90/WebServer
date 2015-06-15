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
						$('.wallet-title .c-red').html(content.amount);
					}
			};
			Modal.jsonp(config);
		},
		getMyPointsByPage : function(page,type) {
			var t = 'all';
			if (type==1) {
				t = 'increase';
			}else if(type == 2){
				t = 'reduce';
			}
			var config = {
					url : Sys.serviceDomain+"/listHotModels?recordPerPage=4&currentPage="+page, 
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
							str = '<tr><td width="250">2015-04-13　18:20:58</td>'
				                +'<td>壹回收主站签到</td>'
				                +'<td>连续签到1天</td>'
				                +'<td class="c-red">'+list[i].modelsId+'</td></tr>';
							$('#'+t).append($(str));
						}
						var recordPerPage = content.recordPerPage;
						var totalPage = content.totalPage;
						//初始化分页条
					    $("#pagination"+type).pagination({
					        items: recordPerPage*totalPage,
					        itemsOnPage: 4,
					        cssStyle: 'light-theme',
					        currentPage : page,
					        onPageClick: function(pageNum,event){
					        	mypoints.getMyPointsByPage(pageNum,type);
					        }
					    });
					}
			}
			Modal.jsonp(config);
		}
}

//前端写的
tabs($('.tabs'));
$(function(){
	//初始化分页条
    $("#pagination, #pagination1, #pagination2").pagination({
        items: 40,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
    mypoints.initMyPoints();
    mypoints.getMyPointsByPage(1,'');
    mypoints.getMyPointsByPage(1,1);
    mypoints.getMyPointsByPage(1,2);
})