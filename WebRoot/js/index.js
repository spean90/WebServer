/**
 * 首页  index.js
 */
var index = {
		//定义加入收藏夹函数
		join_favorite:function(){  
			 $("#addFavorite").attr("href", window.location);
			 $("#addFavorite").attr("title", document.title);
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
		},
		initCity : function(){
			var current_city = localStorage.current_city;
			if(current_city!=null&&current_city!="undefind") {
				$("#address").text(current_city);
			}
			$('.city-list-2.clearfix').empty();
			var citylist = sessionStorage.citylist;
			if(citylist==null||citylist=="undefind") {
				$.jsonp({
					url : Sys.serviceDomain+"/getCity.do", 
					callbackParameter: "callback",
					success : function(data){ 
				          citylist = data.result;
				          sessionStorage.citylist = JSON.stringify(citylist);
				          //渲染页面
				          for (var i = 0; i < citylist.length; i++) {
								var provinceData = citylist[i]
								var province = $('<li><a class="p-r">'+provinceData.name+'<em></em></a></li>');
								$('.city-list-2.clearfix').append(province)
								var span = $('<span></span>');
								var citys = provinceData.city;
								for (var j = 0; j < citys.length; j++) {
									var city = citys[j];
									span.append('<a onclick="index.changeCity(\''+city.name+'\')">'+city.name+'</a>');
								}
								province.append(span)
							}
				          //请求数据为异步操作，返回数据后需要重新渲染页面上城市信息；
				          var city = new  citySelect($("#citySelect"),$,1,function(element,height){
				        	    var  h = element.height();
				        	    element.css("marginTop",-h/2);
				        	    window.onscroll = function(){
				        	        var scrollHeight = document.body.scrollTop||document.documentElement.scrollTop;
				        	        element.css("top",scrollHeight+height/2)
				        	    }
				        	});
				          
				        },  
					error : function(xOptions, textStatus) {
						alert(textStatus);
						//window.location.href = "/index.html";
					}
				});
			}else{
				citylist = JSON.parse(citylist);
				  //渲染页面
		          for (var i = 0; i < citylist.length; i++) {
						var provinceData = citylist[i]
						var province = $('<li><a class="p-r">'+provinceData.name+'<em></em></a></li>');
						$('.city-list-2.clearfix').append(province)
						var span = $('<span></span>');
						var citys = provinceData.city;
						for (var j = 0; j < citys.length; j++) {
							var city = citys[j];
							span.append('<a onclick="index.changeCity(\''+city.name+'\')">'+city.name+'</a>');
						}
						province.append(span)
					}
		         
			}
			
			
			
		},
		changeCity : function(city){
			localStorage.current_city = city;
		},
		initHotBrand : function() {
			var config = {
					url : Sys.serviceDomain+"/listHostBrands?recordPerPage=17", 
					callbackParameter: "callback",
					success : function(data){ 
						console.log(data);
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.brand-list.clearfix').empty();
						for (var i = 0; i < list.length; i++) {
							var str = '<li><a href="#" class="images"><img src="'+list[i].brandImage+'"></a></li>';
							if (i==8) {
								str = '<li class="list-9n"><a href="#" class="images"><img src="'+list[i].brandImage+'"></a></li>';
							}
							var brand = $(str);
							$('.brand-list.clearfix').append(brand);
						}
						$('.brand-list.clearfix').append('<li class="list-9n"><a><i class="brand-icon brand-icon-18"></i></a></li>')
					}
			}
			Modal.jsonp(config);
		},
		initPhoneList : function(){
			var config = {
					url : Sys.serviceDomain+"/listHotModels?recordPerPage=10", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.phone-list.clearfix').empty();
						for (var i = 0; i < list.length; i++) {
							var monthStr = '';
							var monthPrice = '';
							var monthPricesList = list[i].modelsMonthPricesList;
							for (var j = 0; j < monthPricesList.length; j++) {
								monthStr = ','+monthPricesList[j].priceMonth+'月';
								monthPrice = ','+monthPricesList[j].recycleAvgPrice;
							}
							monthStr = monthStr.substring(1);
							monthPrice = monthPrice.substring(1);
							var str = '<li data-label="'+monthStr+'" data-data="'+monthPrice+'" onclick=index.doDetail('+i+')>'
							           +'<a ><img src="'+list[i].modelsImage+'" alt="'+list[i].modelsNickname+'" width="80" height="160" /></a>'
							           +'<div class="product-info">'
							           +' <div class="fl">'
							           +'   <span class="phone-name">'+list[i].modelsNickname+'</span>'
							           +'   <span class="recovery">回收价：<em class="red">￥'+list[i].recyclePrice+'</em></span>'
							           +'   <span class="badge">'+list[i].recycleCount+'人回收</span>'
							           +' </div>'
							           +' </div>'
							           +' <a class="index-spr trend-icon"></a> '
							           +'</li>';
							var phone = $(str);
							$('.phone-list.clearfix').append(phone);
						}
						phoneList();
					}
			}
			Modal.jsonp(config);
		},
		initComments : function() {
			var config = {
					url : Sys.serviceDomain+"/listCustomersReviewsOrder?recordPerPage=4", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.aps-list.clearfix').empty();
						for (var i = 0; i < list.length; i++) {
							var str = '<li><span class="aps-name"><em>'+list[i].customersName+'</em>'+list[i].addedDate+'</span>'+
							'<span class="aps-pic"><img src="'+list[i].customersImage+'" alt="'+list[i].customersName+'" width="60" height="60"/></span>'
							+'<span class="aps-txt">'+list[i].customersReviews+'</span>'
							+'</li>';
							var comments = $(str);
							$('.aps-list.clearfix').append(comments);
						}
					}
			}
			Modal.jsonp(config);
		},
		initNewsList : function() {
			var config = {
					url : Sys.serviceDomain+"/listNewsOrder?recordPerPage=2", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.index-news-list.clearfix').empty();
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							var str = '<li><a><img src="'+item.newsImage+'" alt="'+item.newsTitle+'" width="280" height="180" /></a>'
					            +'<h4><a>'+item.newsTitle+'</a></h4>'
					            +'<span>'+item.addedDate+'</span>'
					            +'<p>'+item.newsTitle+'</p>'
					            +'</li>';
							var news = $(str);
							$('.index-news-list.clearfix').append(news);
						}
					}
			}
			Modal.jsonp(config);
		},
		initRetrieveList : function() {
			var config = {
					url : Sys.serviceDomain+"/listNewestOrders?recordPerPage=18", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.retrieve-list.clearfix').empty();
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							var str = '<li><span class="col-1">'+item.telephone+'</span>'
							+'<span class="col-2"><em>'+item.ordersTotal+'</em>元</span>'
							+'<span class="col-3">回收了三星<em> GALAXY S4（I9500）</em></span>'
							+'</li>';
							var retrieve = $(str);
							$('.retrieve-list.clearfix').append(retrieve);
						}
					}
			}
			Modal.jsonp(config);
		},
		initRetrieveCar : function() {
			if(sessionStorage.key==null&&sessionStorage.key=='undefined'){
				console.log('未登录，不能获取回收车内容');
			}
			var config = {
					url : Sys.serviceDomain+"/listUserOwnBasket?key="+sessionStorage.key, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						if (data.content.list==null||data.content.list.length==0) {
							$('.hs-box-js').remove();
							var boxNone = $('<div class="hs-box-none"> 回收车中还没有商品呦，赶紧去看看吧！ </div>');
							$('.hs-box').append(boxNone);
						}else {
							$('.hs-box-none').remove();
							$('.hs-box-js>ul').empty();
							var list = data.content.list;
							for (var i = 0; i < list.length; i++) {
								var item = list[i];
								var str = '<div class="item clearfix">'
			                          +'<img src="'+item.modelsImage+'" alt="" width="30" height="60"/>'
			                          +'<span>'
			                          +' <ul>'
			                          +' <li>'+item.modelsName+'</li>'
			                          +' <li>回收价：<span>￥'+item.lastEvaluationPrice+'</span><a onclick=index.removeFromCar(1)>删除</a></li>'
			                          +'   <li>12306人回收</li>'
			                          +' </ul>'
			                          +' </span>'
			                          +' </div>';
								var retrieve = $(str);
								$('.hs-box-js>ul').append(retrieve);
							}
						}
					}
			}
			Modal.jsonp(config);
		},
		doDetail : function(id) {
			window.open('detail-'+id+'.html', "_blank");
		},
		removeFromCar : function(id) {
			var config = {
					url : Sys.serviceDomain+"/removeFromcar.do", 
					callbackParameter: "callback",
					success : function(data){
						//重新获取购物车内容
						index.initRetrieveCar();
					}
			}
			Modal.jsonp(config);
		}
		
}




/**
 * 要在index.html中new citySelect执行之前执行；所以放在这里；
 */
//index.initCity(); //初始化城市信息
index.initHotBrand(); //初始化热门品牌
//index.initPhoneList(); //初始化热门手机
//index.initComments(); //初始化客户评价
//index.initNewsList(); //初始化最新咨询
//index.initRetrieveList();  //初始化最新回收单
//index.initRetrieveCar();//初始化回收车
$(function(){
});










