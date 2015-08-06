/**
 * 弹窗-评估详情 assessDetails.html
 */

AssessDetails = {
	initAssessDetail : function(){
		var config = {
		url : Sys.serviceDomain + "/detailUserOwnCustomersBasket?key="+sessionStorage.token+"&customersBasketId="+$('#customersBasketId').text(),
		callbackParameter : "callback",
		success : function(data) {
			if (data.msg.code != "0000") {
				return;
			}
			var content = data.content;
			$('.deal-neck').empty();
			$('.deal-neck').append('订单号：ehs2364734test <span class="fr c-gray">下单时间：2015-04-23 14:33:44</span>');
			
			$('.fl').empty();
			var evaluationList = content.evaluationList;
			var flStr = '<tr><td class="c-gray">手机型号：</td><td>'+content.modelsName+'</td></tr>'
				+ '<tr><td class="c-gray">回收报价：</td><td class="c-red">'+content.currency+content.lastEvaluationPrice.toFixed(2)+'</td></tr>';
			for(var i=0;i<evaluationList.length;i++){
				var values = '';
				var evaluationItemList = evaluationList[i].evaluationItemList;
				for(var j=0;j<evaluationItemList.length;j++){
					values +=','+evaluationItemList[j].name;
				}
				if(values!=''){
					values = values.substring(1);
				}
				flStr = flStr+ '<tr><td class="c-gray">'+evaluationList[i].name.split('（')[0]+'：</td><td>'+values+'</td></tr>';
			}
			$('.fl').append(flStr);
			
			$('.fb').empty();
			$('.fb').html(content.modelsName);
			var modelsMonthPricesList = content.modelsMonthPricesList;
			var labels=[];
			var prices=[];
			for(var k=0;k<modelsMonthPricesList.length;k++){
				labels.push(modelsMonthPricesList[k].priceMonth.substring(4));
				prices.push(modelsMonthPricesList[k].customerAvgPrice.toFixed(2))
			}

			var ctx = document.getElementById("myChart").getContext("2d");
			var data = {
			    labels: labels,
			    datasets: [{
			            fillColor : "rgba(253,245,211,0.9)",
						strokeColor : "rgba(252,223,112,1)",
						pointColor : "rgba(252,223,112,1)",
						pointStrokeColor : "#fff",
			            data: prices
			    }]
			};
			var myLineChart = new Chart(ctx).Line(data);
		}
	   }
	Modal.jsonp(config);
	}
};

$(function(){
	AssessDetails.initAssessDetail();
});