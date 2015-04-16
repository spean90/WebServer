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
				$("#current_city").text(current_city);
			}
			$('.city-list-2.clearfix').empty();
			var citylist = sessionStorage.citylist;
			if(citylist==null||citylist=="undefind") {
				console.log("城市信息为空！向服务端发送请求....");
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
			$("#current_city").text(city);
			$(".drop-down.drop-down-s.more-city").removeClass('hover');
			localStorage.current_city = city;
		},
		initHotBrand : function() {
			var config = {
					url : Sys.serviceDomain+"/getHotPhone.do", 
					callbackParameter: "callback",
					success : function(data){ 
						$('.brand-list.clearfix').empty();
						for (var i = 0; i < 17; i++) {
							var str = '<li><a href="#" class="images"><img src="images/apple.png"></a></li>';
							if (i==8) {
								str = '<li class="list-9n"><a href="#" class="images"><img src="images/apple.png"></a></li>';
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
					url : Sys.serviceDomain+"/getHotPhone.do", 
					callbackParameter: "callback",
					success : function(data){ 
						$('.phone-list.clearfix').empty();
						for (var i = 0; i < 10; i++) {
							var str = '<li data-label="4月,5月,6月" data-data="1'+i+'00,1300,800">'
							           +'<a><img src="pic/phone.jpg" alt="iphone4" width="80" height="160" /></a>'
							           +'<div class="product-info">'
							           +' <div class="fl">'
							           +'   <span class="phone-name">iPhone '+i+'</span>'
							           +'   <span class="recovery">回收价：<em class="red">￥550</em></span>'
							           +'   <span class="badge">37693人回收</span>'
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
					url : Sys.serviceDomain+"/getHotPhone.do", 
					callbackParameter: "callback",
					success : function(data){ 
						$('.aps-list.clearfix').empty();
						for (var i = 0; i < 4; i++) {
							var str = '<li><span class="aps-name"><em>緔弦玥玥玥玥玥玥玥</em>12月2日 11:30</span>'+
							'<span class="aps-pic"><img src="pic/2.jpg" alt="name" width="60" height="60"/></span>'
							+'<span class="aps-txt">自己的旧手机在壹回收网上面成功交易，总体来说交易很迅速，回收前的客服解答很耐心，期待你们未来做的更好自己的旧手机在壹回收网上面成功交易，总体来说交易很迅速，回收前的客服解答很耐心，期待你们未来做的更好</span>'
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
					url : Sys.serviceDomain+"/getHotPhone.do", 
					callbackParameter: "callback",
					success : function(data){ 
						$('.index-news-list.clearfix').empty();
						for (var i = 0; i < 2; i++) {
							var str = '<li><a><img src="pic/3.jpg" alt="name" width="280" height="180" /></a>'
					            +'<h4><a>299元+21天长待机 诺基亚215发布 诺基亚215发布</a></h4>'
					            +'<span>2015/3/12</span>'
					            +'<p>日前,诺基亚正式发布了1050的继任者215,号称是“最具性价比的入门级互联网手机”。 该机配备了一块2.4英寸320×240分辨率显示屏以及一颗VGA摄像头,...</p>'
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
					url : Sys.serviceDomain+"/getHotPhone.do", 
					callbackParameter: "callback",
					success : function(data){ 
						$('.retrieve-list.clearfix').empty();
						for (var i = 0; i < 18; i++) {
							var str = '<li><span class="col-1">138****1234</span>'
							+'<span class="col-2"><em>100</em>元</span>'
							+'<span class="col-3">回收了三星<em> GALAXY S4（I9500）</em></span>'
							+'</li>';
							var retrieve = $(str);
							$('.retrieve-list.clearfix').append(retrieve);
						}
					}
			}
			Modal.jsonp(config);
		}
		
}




/**
 * 要在index.html中new citySelect执行之前执行；所以放在这里；
 */
index.initCity(); //初始化城市信息
index.initHotBrand(); //初始化热门品牌
index.initPhoneList(); //初始化热门手机
index.initComments(); //初始化客户评价
index.initNewsList(); //初始化最新咨询
index.initRetrieveList();  //初始化最新回收单
$(function(){
});










