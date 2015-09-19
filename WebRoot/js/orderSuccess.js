var orderSuccess = {
		shipReceiver : '',
		shipAddress : '',
		shipZipcode : '',
		shipReceiverPhone : '',
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
						//当面交易
						if(content.transactionType==3){
							//当面交易显示
							var str = '<div class="status status1">'
						          	+'<div class="tips">'
						          	+'<p><i class="icon icon-success"></i>回收单提交成功！壹回收将在'+content.dealHours+'小时内安排工程师进行单面交易!</p>'
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
						          	+'<span class="then"><a href="/index.html">继续回收</a> |<a class="notice">注意事项</a></span>'
						          	+'</li>'
						          	+'</ul>'
						          	+'</div>'
						          	+'</div>';
							$('.successpanel.fl').append($(str));
						}else if(content.transactionType==1){ //快递 
							var str = '<div class="status status2">'
									+'<div class="tips">'
									+'<p><i class="icon icon-success"></i>回收单提交成功！请在'+content.dealHours+'小时内将订单物品寄达壹回收！</p>'
									+'</div>'
									+'<div class="info">'
									+'<ul>'
									+'<li>'
									+'<label for="">订单号：</label>'
									+'<span>'
									+'<span>'+content.ordersId+'</span>'
									+'<a class="view-detail" href="/orderDetail_'+content.ordersId+'.html">查看订单详情</a>'
						          	+'</span>'
									+'</li>'
									+'<li>'
									+'<label for="">交易方式：</label>'
									+'<span>'+content.ordersType+'</span>'
						          	+'</li>'
									+'<li>'
									+'<label for="">邮寄地址：</label>'
									+'<span>'
									+' <ul>'
									+'<li><label for="">联系人：</label><span>'+orderSuccess.shipReceiver+'</span></li>'
									+'<li><label for="">联系电话：</label><span>'+orderSuccess.shipReceiverPhone+'</span></li>'
									+'<li><label for="">联系地址：</label><span>'+orderSuccess.shipAddress+'</span></li>'
									+'<li><label for="">邮编：</label><span>'+orderSuccess.shipZipcode+'</span></li>'
									+' </ul>'
									+'</span>'
									+'</li>'
									+'<li>'
									+'<label for="">交易金额：</label>'
									+'<span class="money">'+content.currency+content.ordersTotal.toFixed(2)+'</span>'
						      +'</li>'
									+'<li>'
									+'<label for="">运费补贴：</label>'
									+'<span class="money">'+content.currency+content.shippingFee.toFixed(2)+'</span>'
						      +'</li>'						      
									+'<li>'
									+'<label for="">接下里你可以：</label>'
									+'<span class="then"><a href="/index.html">继续回收</a> |<a class="notice">注意事项</a></span>'
						          	+'</li>'
									+'</ul>'
									+'</div>'
									+'</div>';
							
							$('.successpanel.fl').append($(str));	
						}else if(content.transactionType==2){  //门店
							var str = '<div class="status status3">'
										+'<div class="tips">'
										+'<p><i class="icon icon-success"></i>回收单提交成功！请在'+content.dealHours+'小时内去就近门店进行交易!</p>'
										+'</div>'
										+'<div class="info">'
										+' <ul>'
										+'<li>'
										+'<label for="">订单号：</label>'
										+'<span style="color:#ccc">'
										+'<span>'+content.ordersId+'</span>'
										+'<a class="view-detail" href="/orderDetail_'+content.ordersId+'.html">查看订单详情</a>'
							          	+'<a class="around" href="/outlets.html"><i class="icon-map"></i>周边网点</a>'
										+' </span>'
										+'</li>'
										+'<li>'
										+'<label for="">交易方式：</label>'
										+'<span>'+content.ordersType+'</span>'
										+'</li>'
										+'<li>'
										+'<label for="">交易金额：</label>'
										+'<span class="money">'+content.currency+content.ordersTotal.toFixed(2)+'</span>'
							          	+'</li>'
										+'<li>'
										+'<label for="">接下里你可以：</label>'
										+'<span class="then"><a href="/index.html">继续回收</a> |<a class="notice">注意事项</a></span>'
							          	+'</li>'
										+'</ul>'
										+'</div>'
										+'</div>';
							$('.successpanel.fl').append($(str));	
						}
						
					}
			}
			Modal.jsonp(config);
		},
		detailCityShip : function(){
			var config = {
					url : Sys.serviceDomain+"/detailCityShip?cityId="+localStorage.cityId, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						orderSuccess.shipReceiver = content.shipReceiver;
						orderSuccess.shipAddress = content.shipAddress;
						orderSuccess.shipZipcode = content.shipZipcode;
						orderSuccess.shipReceiverPhone = content.shipReceiverPhone;
						orderSuccess.initPage();
					}
			};
			Modal.jsonp(config);
		},
}

$(function(){
	orderSuccess.detailCityShip();
	
})