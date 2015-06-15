/**
 * 弹窗-评估详情 assessDetails.html
 */

AssessDetails = {
	initAssessDetail : function(){
		/*var config = {
		url : Sys.serviceDomain + "/listUserOwnBasket?key=" + sessionStorage.token,
		callbackParameter : "callback",
		success : function(data) {
			if (data.msg.code != "0000") {
				return;
			}*/
			$('.deal-neck').empty();
			$('.deal-neck').append('订单号：ehs2364734test <span class="fr c-gray">下单时间：2015-04-23 14:33:44</span>');
			
			$('.fl').empty();
			var flStr = '<tr><td class="c-gray">手机型号：</td><td>iPhone5s</td></tr>'
				+ '<tr><td class="c-gray">回收报价：</td><td class="c-red">￥650</td></tr>'
				+ '<tr><td class="c-gray">购买渠道：</td><td>大陆国行(有进网许可标签)</td></tr>'
				+ '<tr><td class="c-gray">屏幕外观：</td><td>有划痕(屏幕有划痕或凹凸)</td></tr>'
				+ '<tr><td class="c-gray">边框背板：</td><td>有划痕或磨损(边框外壳有轻微划痕或轻微磨损)</td></tr>'
				+ '<tr><td class="c-gray">备注：</td><td>屏幕有划痕，机身外壳有磨损</td></tr>';
			$('.fl').append(flStr);
			
			$('.fb').empty();
			$('.fb').html('iphone5s');

			var ctx = document.getElementById("myChart").getContext("2d");
			var data = {
			    labels: ["", "四月", "五月", "六月"],
			    datasets: [{
			            fillColor : "rgba(253,245,211,0.9)",
						strokeColor : "rgba(252,223,112,1)",
						pointColor : "rgba(252,223,112,1)",
						pointStrokeColor : "#fff",
			            data: [0, 0, 0, 40]
			    }]
			};
			var myLineChart = new Chart(ctx).Line(data);
		/*}
	   }
	Modal.jsonp(config);*/
	}
};

$(function(){
	AssessDetails.initAssessDetail();
});