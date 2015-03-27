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
			var citylist = localStorage.citylist;
			if(citylist==null||citylist=="undefind") {
				alert("城市信息为空！向服务端发送请求....");
				$.jsonp({
					url : Sys.serviceDomain+"/getCity.do", 
					callbackParameter: "callback",
					success : function(data){ 
						console.log(">>>>"+data)
				        	alert(data.result);
				          citylist = data.result;
				          localStorage.citylist = JSON.stringify(citylist);
				        },  
					error : function(xOptions, textStatus) {
						alert(textStatus);
						window.location.href = "/index.html";
					}
				});
			}else{
				citylist = JSON.parse(citylist);
			}
			
			
			
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
		},
		changeCity : function(city){
			$("#current_city").text(city);
			$("#citySelect").hide();
		}
		
}
/**
 * 要在index.html中new citySelect执行之前执行；所以放在这里；
 */
index.initCity();

$(function(){
});










