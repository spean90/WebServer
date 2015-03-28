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
		          var city = new  citySelect($("#citySelect"),$,1,function(element,height){
		        	    var  h = element.height();
		        	    element.css("marginTop",-h/2);
		        	    window.onscroll = function(){
		        	        var scrollHeight = document.body.scrollTop||document.documentElement.scrollTop;
		        	        element.css("top",scrollHeight+height/2)
		        	    }
		        	});
			}
			
			
			
		},
		changeCity : function(city){
			$("#current_city").text(city);
			$("#citySelect").hide();
		},
		initPhoneList : function(){
			$('.phone-list.clearfix').empty();
			
			for (var i = 0; i < 15; i++) {
				var phone = $('<li data-label="4月,5月,6月" data-data="1200,1300,800"><a><img src="pic/phone.jpg" alt="iphone4" width="145" height="220" /><span class="phone-name">iPhone 4</span></a><a class="phone-btn" data-number="37693" data-price="500"><em>37693</em>人回收</a><a class="index-spr trend-icon"></a></li>');
				$('.phone-list.clearfix').append(phone);
			}
			
		}
		
}




/**
 * 要在index.html中new citySelect执行之前执行；所以放在这里；
 */
index.initCity();
index.initPhoneList();
$(function(){
});










