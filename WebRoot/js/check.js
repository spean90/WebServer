var check = {
		check : function() {
			var imei = $('.search-common').val();
			var config = {
					url : Sys.serviceDomain+"/listCustomersReviewsOrder?recordPerPage=4", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.breadcrumb>ul').append($('<li class="on"><a href="#">查询结果</a></li>'))
						$('.verify-section').empty();
						var str = '';
						if (list.length==0) {
							str = '<i class="icon-search"></i> 亲，没有查询到相关信息哦！'
								+'<br /><br />'
								+'<a href="javascript:;" class="big-btn mt-30" onclick="check.reCheck()">重新查询</a>';
						}else{
							str = '<p class="verify-result">查询结果：该手机为正品手机</p>'
								+' <div class="verify-table">'
								+'<table>'
								+'<tr>'
								+' <td>电池状态：正在充电(USB)</td>'
								+' <td>服务状态：</td>'
								+' <td>IMEI SV：01</td>'
								+' </tr>'
								+' <tr>'
								+' <td>电池电量：41%</td>'
								+' <td>漫游状态：非漫游</td>'
								+' <td>IP地址：192.168.1.1</td>'
								+' </tr>'
								+' <tr>'
								+' <td>网络：中国移动</td>'
								+' <td>移动网络状态：</td>'
								+'<td></td>'
								+'</tr>'
								+'<tr>'
								+'<td>信号强度：</td>'
								+'<td>本机号码：</td>'
								+'<td></td>'
								+'</tr>'
								+'<tr>'
								+'<td>手机网络类型：</td>'
								+'<td>IMEI：888888888</td>'
								+'<td></td>'
								+'</tr>'
								+'</table>'
								+'</div>'
								+'<br /><br />'
								+'<a href="javascript:;" class="big-btn mt-30" onclick="check.reCheck()">重新查询</a>';
						}
						$('.verify-section').append($(str));
					}
			}
			Modal.jsonp(config);
		},
		reCheck : function() {
			$('.breadcrumb>ul li:last').remove();
			$('.verify-section').empty();
			var str = '<input type="text" class="search-common" placeholder="请输入手机IMEI码" />'
					+'<br /><br />'
					+'<a href="javascript:;" class="big-btn mt-30" onclick="check.check()">开始查询</a>';
				$('.verify-section').append($(str));	
		}
		
}


$(function(){
	var li = $('[href="check.html"]').parent();
	li.addClass('on');
	$('.big-btn.mt-30').click(check.check);
});
