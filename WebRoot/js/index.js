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
					url : Sys.serviceDomain+"/listHotBrands?recordPerPage=17", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.brand-list.clearfix').empty();
						for (var i = 0; i < list.length; i++) {
							var str = '<li><a href="/brands_'+list[i].brandsId+'.html"><img class="img-default" src="'+list[i].brandImage+'">'
										+'<img class="img-hover" src="'+list[i].brandImageHover+'"></a></li>';
							if (i==8) {
								str = '<li class="list-9n"><a href="/brands_'+list[i].brandsId+'.html"><img class="img-default" src="'+list[i].brandImage+'">'
								+'<img class="img-hover" src="'+list[i].brandImageHover+'"></a></li>';
							}
							var brand = $(str);
							$('.brand-list.clearfix').append(brand);
						}
						$('.brand-list.clearfix').append('<li class="list-9n"><a href="/brands_0.html"><img class="img-default" src="images/more.png"><img class="img-hover" src="images/more-h.png"></a></li>')
						$('a').hover(function() {
						    var $this = $(this);
						    $this.addClass("hover")
						  }, function() {
						    var $this = $(this);
						    $this.removeClass("hover")
						  });
					}
			}
			Modal.jsonp(config);
		},
		initPhoneList : function(){
			var config = {
					url : Sys.serviceDomain+"/listHotModels?recordPerPage=10&currentPage=1", 
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
							monthPricesList.sort(function (a, b) {
								  if (a.priceMonth > b.priceMonth) {
								    return 1;
								  }
								  if (a.priceMonth < b.priceMonth) {
								    return -1;
								  }
								  return 0;
								});
							for (var j = 0; j < monthPricesList.length; j++) {
								monthStr += ','+parseInt(monthPricesList[j].priceMonth.substring(4))+'月';
								monthPrice += ','+monthPricesList[j].customerAvgPrice;
							}
							monthStr = monthStr.substring(1);
							monthPrice = monthPrice.substring(1);
							var str = '<li data-label="'+monthStr+'" data-data="'+monthPrice+'">'
							            +'<a href="/valuation_'+list[i].modelsId+'.html"><img src="'+list[i].modelsImage+'" alt="'+list[i].modelsName+'" width="160" height="160" /></a>'
							            +'<div class="product-info">'
							            +'<div class="fl">'
							            +'<span class="phone-name" title="'+list[i].modelsName+'">'+list[i].modelsName+'</span>'
							            +'<span class="recovery">回收价：<em class="red">￥'+list[i].recyclePrice+'</em></span>'
							            +'<span class="badge">'+list[i].recycleCount+'人回收</span>'
							            +'</div>'
							            +'</div>'
							            +'<a class="index-spr trend-icon"></a> '
							            +'</li>';
							if ((i+1)%5==0) {
								str = '<li data-label="'+monthStr+'" data-data="'+monthPrice+'" class="last">'
						            +'<a href="/valuation_'+list[i].modelsId+'.html"><img src="'+list[i].modelsImage+'" alt="'+list[i].modelsName+'" width="160" height="160" /></a>'
						            +'<div class="product-info">'
						            +'<div class="fl">'
						            +'<span class="phone-name" title="'+list[i].modelsName+'">'+list[i].modelsName+'</span>'
						            +'<span class="recovery">回收价：<em class="red">￥'+list[i].recyclePrice+'</em></span>'
						            +'<span class="badge">'+list[i].recycleCount+'人回收</span>'
						            +'</div>'
						            +'</div>'
						            +'<a class="index-spr trend-icon"></a> '
						            +'</li>';
							}						
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
					url : Sys.serviceDomain+"/listNewsOrder?recordPerPage=12&currentPage=1", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.index-news-list').empty();
						var str = '<ul>';
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							str +='<li onclick=index.detailNews("'+item.newsId+'")>'+item.newsTitle+'</li>';
						}
						str += '</ul>';
						var news = $(str);
						$('.index-news-list').append(news);
					}
			}
			Modal.jsonp(config);
		},
		initRetrieveList : function() {
			var config = {
					url : Sys.serviceDomain+"/listNewestOrders?recordPerPage=18&currentPage=1", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.retrieve-h3 em').text(content.orderCount);
						$('.retrieve-list.clearfix').empty();
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							var str = '<li><span class="col-1">'+item.telephone+'</span>'
							+'<span class="col-2"><em>'+item.customersPrice+'</em>元</span>'
							+'<span class="col-3">回收了<em> '+item.modelsName+'</em></span>'
							+'</li>';
							var retrieve = $(str);
							$('.retrieve-list.clearfix').append(retrieve);
						}
					}
			}
			Modal.jsonp(config);
		},
		
		doDetail : function(id) {
			window.open('detail-'+id+'.html', "_blank");
		},
		initUserInfo : function() {
			var config = {
					url : Sys.serviceDomain+"/detailOwnCustomers?key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						sessionStorage.personImg = content.image;
						sessionStorage.userType = content.userType;
						sessionStorage.account = content.name
					}
			}
			Modal.jsonp(config);
		},
		initNotice : function() {
			var config = {
					url : Sys.serviceDomain+"/listNewestAnnounce", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						$('#notice-list').empty();
						var list = data.content.list;
						for(var i=0;i<list.length;i++){
							var s = '<li>'
					               	+'<h1>'+list[i].announceTitle+'</h1>'
					               	+'<p>'+list[i].announceContent+'</p>'
					               	+'</li>';
							$('#notice-list').append($(s));
						}
					}
			}
			Modal.jsonp(config);
		},
		detailNews : function(newsId) {
			window.open('/detailNews_'+newsId+".html");
		},
		initBanners : function(){
			var config = {
					url : Sys.serviceDomain+"/listAllBanners", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						$("#tabMain").empty();
						$('#tabHandle').empty();
						var list = data.content.list;
						for(var i=0;i<list.length;i++){
							var s = '<li><a><img src="'+list[i].image+'" width="832" height="300" alt="'+list[i].name+'" /></a></li>';
							$('#tabMain').append($(s));
							var str = "<a></a>";
							$('#tabHandle').append($(str));
							
						}
						$('#tabHandle a').eq(0).addClass('on');
						cTab({ tabHandleList: "#tabHandle > a", tabBodyList: "#tabMain > li", isAutoPlay: { time: 3000 }, bind: "mouseover", tabOnCssList: "#tabHandle > a", tabOnCssName: "on" });
						cTab({tabHandleList:"#tabHandle1 > li",tabBodyList:"#tabMain1 > .service-con",bind:"mouseover",tabOnCssList:"#tabHandle1 > li",tabOnCssName:"on"});
						cTab({tabHandleList:"#tabHandle2 > li",tabBodyList:"#tabMain2 > .index-con",bind:"mouseover",tabOnCssList:"#tabHandle2 > li",tabOnCssName:"on"});
						
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
index.initPhoneList(); //初始化热门手机
index.initComments(); //初始化客户评价
index.initNewsList(); //初始化最新咨询
index.initRetrieveList();  //初始化最新回收单
//index.initUserInfo();
index.initNotice();  //公告
index.initBanners();//banners
noticeList();
$(function(){
});










