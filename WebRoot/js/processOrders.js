/**
 * 处理订单-processOrders.html
 */
ProcessOrders = {
	initOrders : function(){
		/*var config = {
				url : Sys.serviceDomain + "/listUserOwnBasket?key=" + sessionStorage.token,
				callbackParameter : "callback",
				success : function(data) {
					if (data.msg.code != "0000") {
						return;
					}*/
					$('.deal-neck').empty();
					$('.deal-body').empty();
					$('.deal-neck').append('订单号：ehs2364734test <span class="fr c-gray">下单时间：2015-04-23 14:33:44</span>');
					var bodyStr = '<img src="images/phone.png" height="160" width="160" class="fl" />'
						+ '<table>'
						+ '<tr>'
						+ '<td class="c-gray">手机型号：</td>'
						+ '<td>iPhone4s</td>'
						+ '</tr>'
						+ '<tr>'
						+ '<td class="c-gray">回收报价：</td>'
						+ '<td class="c-red">￥650</td>'
						+ '</tr>'
						+ '<tr>'
						+ '<td class="c-gray">实际回收数：</td>'
						+ '<td><select><option>1</option><option>2</option></select></td>'
						+ '</tr>'
						+ '<tr>'
						+ '<td class="c-gray">实际回收价：</td>'
						+ '<td><span class="yuan">￥</span><input type="text" class="num" value="450" /></td>'
						+ '</tr>'
						+ '</table>'
						+ '<br />'
						+ '<div class="deal-textarea">'
						+ '<span>操作备注：</span><textarea placeholder="请输入处理订单理由"></textarea>'
						+ '</div>';
					$('.deal-body').append(bodyStr);
				/*}
			}
			Modal.jsonp(config);*/
	}	
};

$(function(){
	ProcessOrders.initOrders();
});