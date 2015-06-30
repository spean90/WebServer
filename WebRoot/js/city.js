var City = {
	/*获取热门城市列表*/
	listHotCity : function() {
		$(".city-list-1.clearfix").empty();
		$(".city-list-1.clearfix").append('<em style="font-style:normal;color:#FF2F2F">&nbsp;&nbsp;&nbsp;加载中...</em>');	
		var config = {
			url : Sys.serviceDomain + "/listHotCity?currentPage=0",
			callbackParameter : "callback",
			success : function(data) {
				if (data.msg.code != "0000") {
					$(".city-list-1.clearfix").append('<em style="font-style:normal;color:#FF2F2F">&nbsp;&nbsp;&nbsp;加载中失败!</em>');	
					return;
				}
				$(".city-list-1.clearfix").empty();
				var list = data.content.list;
				var str = '<dt>  热门城市</dt>';
				$(".city-list-1.clearfix").append(str);	
				for(var i=0; i<list.length; i++){
					str = '<dd><a onclick="City.checkCity(' + list[i].cityId + ',\'' + list[i].name + '\');">' + list[i].name + '</a></dd>';
					$(".city-list-1.clearfix").append(str);	
				}
			}
		}
		Modal.jsonp(config);
	},
	/*根据首字母获取所有城市列表*/
	listAllCity : function(provienceId){
		$(".city-list-result.clearfix").empty();
		$(".city-list-result.clearfix").append('<em style="font-style:normal;color:#FF2F2F">&nbsp;&nbsp;&nbsp;加载中...</em>');	
		var config = {
			url : Sys.serviceDomain + "/listAllCity?provienceId=3",
			callbackParameter : "callback",
			success : function(data) {
				if (data.msg.code != "0000") {
					$(".city-list-result.clearfix").append('<em style="font-style:normal;color:#FF2F2F">&nbsp;&nbsp;&nbsp;加载失败！</em>');	
					return;
				}
				$(".city-list-result.clearfix").empty();
				var list = data.content.list;
				for(var i=0; i<list.length; i++){
					str = '<dd><a onclick="City.checkCity(' + list[i].cityId + ',\'' + list[i].name + '\');">' + list[i].name + '</a></dd>';
					$(".city-list-result.clearfix").append(str);	
				}
			}
		}
		Modal.jsonp(config);
	},
	/*选中城市*/
	checkCity : function(id,name){
		$("#address").html(name);
		$("#address").click();
	}
};

$(function(){
	City.listHotCity();
	$(".city-list-3.clearfix a").click(function(){
		var value = $(this).html();
		var list = $(".active");
		for(var i=0; i<list.length; i++){
			$(list[i]).removeAttr('class');
		}
		$(this).attr("class","active");
		City.listAllCity(value);
	});
	$(".city-list-3.clearfix a:eq(0)").click();
});