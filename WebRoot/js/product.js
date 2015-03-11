var Product = {
		init : function(){
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
							        "showvalues": "0", //在点上显示值
							        "showToolTip": "1",
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
		},
		
		bookmarkit : function() { 
			 $("#addFavorite").attr("href", window.location);
			 $("#addFavorite").attr("title", document.title);
			//alert(11);
		 var title = document.title; var url = location.href;  
		 // 浏览器用于 HTTP 请求的用户代理头的值，可判断浏览器种类  
		    var userAgent = navigator.userAgent.toLowerCase();  
		    if (userAgent.indexOf("360se") > -1) {  
		        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");  
		    } else if (userAgent.indexOf("msie 8") > -1) {  
		    	alert("ie8")
		        window.external.AddToFavoritesBar(url, title); // IE8  
		    } else if (document.all) { // 用于判断IE  
		        try {  
		            window.external.addFavorite(url, title);  
		        } catch (e) {  
		            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');  
		        }  
		    } else if (window.sidebar) { // Firefox已经取消window.sidebar.addPanel 处理方法见后面  
		        // window.sidebar.addPanel(title, url, ""); 
		    } else {  
		        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');  
		    }   
		} 
}



$(function(){
	Product.init();
	
	
});