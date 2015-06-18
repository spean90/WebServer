var config = {
					url : "/gasOrder/countProductByParams.do",
					type : 'post',
					data : {},
					success : function(data) {
						var sum=0;
						var paySum=0;
						data = data.rows;
						productCount.productData = [];
						for(var i=0;i<data.length;i++) {
							var row = [];
							row.push(data[i].productName);
							row.push(data[i].sum);
							productCount.productData.push(row);
							sum += parseFloat(data[i].sum);
							paySum += parseFloat(data[i].paySum);
						}
						$('#sum').text(sum);
						//$('#paySum').text(paySum);
						 $('#productChart').highcharts({
						        chart: {
						            plotBackgroundColor: null,
						            plotBorderWidth: null,
						            plotShadow: false
						        },
						        credits:{
						            enabled:false // 禁用版权信息
						        },
						        title: {
						            text: '套餐销售情况'
						        },
						        tooltip: {
						    	    pointFormat: '{series.name}: <b>￥{point.y:.1f}</b>'
						        },
						        plotOptions: {
						            pie: {
						                allowPointSelect: true,
						                cursor: 'pointer',
						                dataLabels: {
						                    enabled: true,
						                    color: '#000000',
						                    connectorColor: '#000000',
						                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
						                }
						            }
						        },
						        series: [{
						            type: 'pie',
						            name: '金额',
						            data: productCount.productData
						        }]
						    });
					}
			}

var productCount = {
		productData : [],
		searchGasOrder : function() {
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
			
			$('#productGrid').datagrid('load',{
				beginTime : beginTime,
				endTime : endTime
			})
			config.data = {
				beginTime : beginTime,
				endTime : endTime
			}
			Modal.ajax(config);
		},
		initChart : function() {
			Modal.ajax(config);
		},
		initGrid : function() {
			$('#productGrid').datagrid({
				url : '/gasOrder/countProductByParams.do',
				title : '套餐销售情况列表', 
				fitColumns : true,
				//pagination : true,
				columns : [[
				            {field:'productName',title:'套餐名',width:100,align:'center'},
				            {field:'amount',title:'销售数量',width:100,align:'center'},
				            {field:'sum',title:'总销售金额',width:100,align:'center'},
				            {field:'paySum',title:'总支付金额',width:100,align:'center'}
				            ]]
				
			})
		}
		
}

$(function(){
	productCount.initChart();
	productCount.initGrid();
})


