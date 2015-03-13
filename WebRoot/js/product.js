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
						
						
						
						//highChart
						$('#hightChartDiv').highcharts({
					        chart: {
					            type: 'area',
					            spacingBottom: 30
					            
					        },
					        title: {
					        	align:'left',
					            text: 'iphone4(黑/白)'
					        },
					        legend: {
					            layout: 'vertical',
					            align: 'left',
					            verticalAlign: 'top',
					            x: 150,
					            y: 100,
					            floating: true,
					            borderWidth: 1,
					            backgroundColor: '#FFFFFF'
					            
					        },
					        xAxis: {
					            categories: ['12月', '1月', '2月']
					        },
					        yAxis: {
					            title: {
					                text: ''
					            },
					            labels: {
					                formatter: function() {
					                    return this.value;
					                }
					            }
					        },
					        tooltip: {
					            formatter: function() {
					                return '<b>'+ this.x +'</b>'+': ￥'+ this.y;
					            }
					        },
					        plotOptions: {
					            area: {
					                fillOpacity: 0.2,
					                color:'#FF9900',
					                showInLegend : false


					            }
					        },
					        credits: {
					            enabled: false
					        },
					        series: [{
					            data: [1200, 1000,800,900]
					        }]
					    });
						
						
						
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
		} ,
		
		
		//加入购物车，存入localStorage
		addToCar : function() {
			var id = ((Math.random()*10).toFixed()).toString();
			var p = {"id":id,"name":"brand1","price":"100.00","img":"/common/images/logo.png"};
			var car = localStorage.car;
			if(car==null||car=="undefind") {
				alert(car +"购物车当前为空！");
				var newcar = {};
				var list=[];
				list.push(p);
				newcar.list = list;
				localStorage.car=JSON.stringify(newcar);
			}else {
				car = JSON.parse(car);
				if(Product.isInCar(p.id)){
					Modal.showAlert("已经在购物车内了");
				}else {
					car.list.push(p);
					localStorage.car=JSON.stringify(car);
				}
			}
			Product.showCar();
		},
		
		isInCar : function(pid) {
			var car = localStorage.car;
			car = JSON.parse(car);
			var list = car.list;
			for (var int = 0; int < list.length; int++) {
				if(pid==list[int].id) {
					return true;
				}
			}
			return false;
		},
		
		showCar : function() {
			var carList = $("li");
			carList.remove();
			var car = localStorage.car;
			car = JSON.parse(car);
			var list = car.list;
			var li = "";
			for (var int = 0; int < list.length; int++) {
				li = "<li>"+"<img alt='图片' src='"+list[int].img+"'></img>"+list[int].id+","+list[int].name+list[int].price+"</li>"
				$("#carList").append(li);
			}
		},
		
		removeToCar : function() {
			var car = localStorage.car;
			car = JSON.parse(car);
			var list = car.list;
			for (var int = 0; int < list.length; int++) {
				if(list[int].id==2){
					alert(int);
					list.splice(int,1);
					break;
				}
			}
			
			alert(JSON.stringify(list));
			 localStorage.car=JSON.stringify(car);
			 Product.showCar();
		}
		
		
}



$(function(){
	Product.init();
});