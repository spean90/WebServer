var config = {
					url : "/gasOrder/countProductDetail.do",
					type : 'post',
					data : {},
					success : function(data) {
						if(data.code!='0000'){
							Modal.showAlert('服务器异常');	
							return;
						}
						var catagories = [];
						var map = {};
						var mapData = [];
						var obj = data.object;
						for (var i = 0; i < obj.length; i++) {
							catagories.push(obj[i].createTime);
							map.name = obj[i].productName;
							mapData.push(obj[i].productSum);
							
						}
						if ($('#productId').combobox('getValue')=='') {
							map.name = '总销售额';
						}
						map.data = mapData;
						 $('#productDetailChart').highcharts({
						        title: {
						            text: '套餐销售详情',
						            x: -20 //center
						        },
						        xAxis: {
						            categories: catagories
						        },
						        yAxis: {
						            title: {
						                text: '套餐销售金额'
						            },
						            plotLines: [{
						                value: 0,
						                width: 1,
						                color: '#808080'
						            }]
						        },
						        tooltip: {
						            valueSuffix: '￥'
						        },
						        legend: {
						            layout: 'vertical',
						            align: 'right',
						            verticalAlign: 'middle',
						            borderWidth: 0
						        },
						        series: [map]
						    });
					}
			}

var productDetailCount = {
		
//		initChart : function() {
//			Modal.ajax(config);
//		},
		search : function() {
			var beginTime = $('#beginTime').datebox('getValue');
			if (beginTime!=null && beginTime!='') {
				beginTime += " 00:00:00";
			}
			var endTime = $('#endTime').datebox('getValue');
			if (endTime!=null && endTime!='') {
				endTime += " 59:59:59";
			}
			if (beginTime>endTime) {
				Modal.showAlert('开始时间不能大于结束时间');
				return;
			}
			var productId = $('#productId').combobox('getValue');
			var type = $('#type').combobox('getValue');
			config.data = {
				beginTime : beginTime,
				endTime : endTime,
				productId:productId,
				createTime:type  //借用ceateTime字段、、、、
			}
			Modal.ajax(config);
		},
		
		
}

$(function(){
	$('#productId').combobox({
	    url:'/product/getProductListIds.do',
	    valueField:'productId',
	    textField:'productName',
	    panelHeight : 80
	});
	$('#type').combobox({
		data: [{
			label: '日',
			value: '%Y-%m-%d',
			selected: true
		},{
			label: '月',
			value: '%Y-%m'
		},{
			label: '年',
			value: '%Y'
		}],
		 valueField:'value',
		 textField:'label',
		panelHeight : 80
	});
	
	productDetailCount.search();
})


