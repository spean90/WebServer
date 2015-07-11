var orderSuccess = {
		initPage : function(){
			$('.successpanel.fl').empty();
			var config = {
					url : Sys.serviceDomain+'/detailOwnOneOrders?ordersId='+$('#orderId').text()+'&key='+sessionStorage.token,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						content = data.content;
						if(content.transactionType==3){
							//当面交易显示
							var str = '<div class="status status1">'
						          	+'<div class="tips">'
						          	+'<p><i class="icon icon-success"></i>订单提交成功！壹回收将在XX小时内安排工程师进行单面交易!</p>'
						          	+'</div>'
						          	+'<div class="info">'
						          	+' <ul>'
						          	+' <li>'
						          	+'<label for="">订单号：</label>'
						          	+'<span>'
						          	+'<span>'+content.ordersId+'</span>'
						          	+'<a class="view-detail" href="/orderDetail_'+content.ordersId+'.html">查看订单详情</a>'
						          	+'</span>'
						          	+'</li>'
						          	+'<li>'
						          	+' <label for="">交易方式：</label>'
						          	+'<span>'+content.ordersType+'</span>'
						          	+' </li>'
						          	+'<li>'
						          	+'<label for="">单面交易地址：</label>'
						          	+'<span>'+content.address+'</span>'
						          	+'</li>'
						          	+'<li>'
						          	+'<label for="">交易金额：</label>'
						          	+'<span class="money">'+content.currency+content.ordersTotal.toFixed(2)+'</span>'
						          	+'</li>'
						          	+'<li>'
						          	+'<label for="">接下里你可以：</label>'
						          	+'<span class="next"><a href="/index.html">继续回收</a> |<a class="notice">注意事项</a></span>'
						          	+'</li>'
						          	+'</ul>'
						          	+'</div>'
						          	+'</div>';
							$('.successpanel.fl').append($(str));
						}
						
					}
			}
			Modal.jsonp(config);
		}
}

$(function(){
	orderSuccess.initPage();
})