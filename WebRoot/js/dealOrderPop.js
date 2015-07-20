var DealOrderPop = {
	initDealOrders : function(orderId){
		var config = {
				url : Sys.serviceDomain+"/detailOwnOneOrders?ordersId="+orderId+'&key='+sessionStorage.token, 
				callbackParameter: "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					$(".deal-neck").empty();
					var content = data.content;
					var list = content.ordersItemList;
						var str1 = '订单号：'+content.ordersId+'<span class="fr c-gray">下单时间：'+content.ordersDate+'</span>'
						$(".deal-neck").append(str1);
						
						$(".deal-body").empty();
						for(var i=0; i<list.length; i++){
							var item = list[i];
							var str = '<img src="'+item.modelsImage+'" height="160" width="160" class="fl" />'
								+ '<table>'
								+ '<tr><td class="c-gray">手机型号：</td><td>'+item.modelsName+'</td></tr>'
								+ '<tr><td class="c-gray">回收报价：</td><td class="c-red">'+content.currency+item.recyclePrice+'</td></tr>'
								+ '<tr>'
								+ '<td class="c-gray">实际回收数：</td>'
								+ '<td><select><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></td>'
								+ '</tr>'
								+ '<tr>'
								+ '<td class="c-gray">实际回收价：</td>'
								+ '<td><span class="yuan">'+content.currency+'</span><input type="text" class="num" value="'+item.recyclePrice+'" /></td>'
								+ '</tr>'
								+ '</table>'
								+ '<br />';
							$(".deal-body").append(str);
						}
						var str2 = '<div class="deal-textarea">'
								+ '<span>操作备注：</span><textarea placeholder="请输入处理订单理由"></textarea>'
								+ '</div>';
						$(".deal-body").append(str2);
				}
		}
		Modal.jsonp(config);
	}	
};

$(function(){
	var orderId = $("#orderId").text();
	DealOrderPop.initDealOrders(orderId);
	//DealOrderPop.initDealOrders(26);
});