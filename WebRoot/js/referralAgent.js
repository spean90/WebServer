var recordPerPage_set = 10;//每页多少条
var referralAgent = {
		getRefferalAgent : function(page) {
			/*if(sessionStorage.token==null){
				alert("还未登录，请登录~");
				return;
			}*/
			if(page==null||page=='undefined'){
				page=1;
			}
			var phone = $(".search-txt").val();
			$(".agent-list>ul").empty();
			var config = {
					url : Sys.serviceDomain + "/listRecommendCustomers?key=" + sessionStorage.token + "&customersId="+phone+"&recordPerPage="+recordPerPage_set+"&currentPage="+page, 
					callbackParameter : "callback",
					success : function(data) {
						if (data.msg.code != "0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$(".agent-list>ul").empty();
						var str = '';
						for(var i=0;i<list.length;i++) {
							str = '<li>'
								  + '<img src="'+list[i].image+'" height="160" width="160" />'
								  + '<p>名称：'+list[i].name+'</p>'
								  + '<p>手机号码：'+list[i].customersId+'</p>'
								  + '<p class="cor-gary">回收类型：'+list[i].userTypeChinese+'</p>'
								  + '</li>';
							$('.agent-list>ul').append($(str));
						}
						var recordPerPage = content.recordPerPage;
						var totalPage = content.totalPage;
						//初始化分页条
					    $("#pagination").pagination({
					        items: recordPerPage*totalPage,
					        itemsOnPage: recordPerPage,
					        cssStyle: 'light-theme',
					        currentPage : page,
					        onPageClick: function(pageNum,event){
					        	referralAgent.getRefferalAgent(pageNum);
					        }
					    });
					}
				}
				Modal.jsonp(config);
		},
		/*点击【搜索】按钮*/
		searchRefferalAgent : function(){
			referralAgent.getRefferalAgent(1);
		}
}

$(function(){
	if(sessionStorage.userId==null){
		window.location.href = '/login.html';
	}else{
	//初始化分页条
	    $("#pagination").pagination({
	        items: 30,
	        itemsOnPage: 10,
	        cssStyle: 'light-theme'
	    });
		referralAgent.getRefferalAgent(1);
		$(".search-btn").click(referralAgent.searchRefferalAgent);
	}
});