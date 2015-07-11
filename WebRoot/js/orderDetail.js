var orderDetail = {
	initModelsList : function() {
		$('#itemList').empty();
		var config = {
				url : Sys.serviceDomain+"/detailOwnOneOrders?key="+sessionStorage.token+"&ordersId="+$('#orderId').text(), 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					console.log(content);
					var ordersItemList = content.ordersItemList;
					for(var i=0;i<ordersItemList.length;i++){
						var s = '<tr>'
								+'<td class="checkbox none"><input class="check-one check" type="checkbox"></td>'
								+'<td class="goods"><img src="'+ordersItemList[i].modelsImage+'" alt=""><span>'+ordersItemList[i].modelsName+'</span></td>'
								+'<td class="customer">'+content.customersPhone+'</td>'
								+'<td class="price">'+ordersItemList[i].recyclePrice+'</td>'
								+'<td class="status">价格有效</td>'
								+'<td class="num m_l32">'+ordersItemList[i].quantity+'</td>'
								+'<td class="subtotal">'+content.currency+ordersItemList[i].customersPrice+'</td>'
								+'</tr>';
						$('#itemList').append($(s));
					}
					$('#orderInfo').empty();
					var str ='<td><span>订单编号：</span>'+content.ordersId+'</td>'
						+'<td><span>联系人：</span>'+content.customersPhone+'</td>'
						+'<td><span>下单时间：</span>'+content.ordersDate+'</td>';
					$('#orderInfo').append($(str));
					$('#priceTotal').html(content.currency+content.ordersTotal);
					
				}
		}
		Modal.jsonp(config);
	},
	initOrderStatus : function(){
		$('#steps').empty();
		var config = {
				url : Sys.serviceDomain+"/listOneOrdersHistory?ordersId="+$('#orderId').text(), 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					console.log(content);
					var ordersItemList = content.ordersItemList;
					for(var i=0;i<ordersItemList.length;i++){
						var s = '<li class="flow-box first">'
			                  	+'<a href="#step-1"><span class="round-digit">1</span>未处理</a>'
			                  	+'</li>';
						$('#steps').append($(s));
					}
				}
		}
		Modal.jsonp(config);
	}
}

$(function(){
	orderDetail.initModelsList();
	orderDetail.initOrderStatus();
	
	
	
});