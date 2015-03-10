
$(function(){
	var pid = $("#pid").text();
	var options = {
			type : "post",
			url : "/testCharts.do",
			data : {"pid":pid},
			success : function(data) {
				var sourcedata = {
					    "chart": {
					        "caption": "标题",
					        "numberprefix": "￥",
					        "bgcolor": "FFFFFF",
					        "showalternatehgridcolor": "0",
					        "plotbordercolor": "008ee4",
					        "plotborderthickness": "3",
					        "showvalues": "0",
					        "divlinecolor": "CCCCCC",
					        "showcanvasborder": "0",
					        "tooltipbgcolor": "00396d",
					        "tooltipcolor": "FFFFFF",
					        "tooltipbordercolor": "00396d",
					        "numdivlines": "2",   //控制纵方向行数
					        "yaxisvaluespadding": "20",//视图与纵轴的padding距离
					        "anchorbgcolor": "008ee4",
					        "anchorborderthickness": "0",
					        "showshadow": "0",
					        "anchorradius": "4",//折线节点半径,折点半径
					        "chartrightmargin": "25",
					        "canvasborderalpha": "0",
					        "showborder": "0",
					        "decimalPrecision" : "2",
					        "baseFontSize" : "12"
					    },
					    "data": data
					};
				var revenueChart = new FusionCharts({
			        "type": "line",
			        "renderAt": "chartDiv",
			        "width": "300",
			        "height": "200",
			        "dataFormat": "json",
			        "dataSource": sourcedata
				});
				revenueChart.render();
			}
	}
	Modal.ajax(options);
});