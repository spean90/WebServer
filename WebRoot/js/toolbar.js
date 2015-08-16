/**
 * 顶部工具栏js-----
 * huangsp
 */
var toolBar = {
		initHistoryRecord : function() {
			$('#historyRecord').empty();
			var historyRecord = localStorage.historyRecord;
			if(historyRecord =='undefined' || historyRecord==null){
				return;
			}else{
				historyRecord = JSON.parse(historyRecord);
				var length = historyRecord.length>4?4:historyRecord.length;
				for(var i=0;i<length;i++){
					var record = historyRecord[i];
					var str = '<li><a href="/valuation_'+record.modelsId+'.html"><img src="'+record.src+'" alt="" /></a></li>';
					$('#historyRecord').append($(str));
				}
			}
		},
		initRetrieveCar : function() {
			//sessionStorage.token = 'Y6dE9ahZ1ee9OllaU5JvKjd2b7gp6QimDNo0gAUjsKEH0ld9fLeCsaynC9T091K4';
			if(sessionStorage.token==null||sessionStorage.token=='undefined'){
				console.log('未登录，不能获取回收车内容');
				$('.hs-box-js').remove();
				var boxNone = $('<div class="hs-box-none"> 回收车中还没有商品呦，赶紧去看看吧！ </div>');
				$('.hs-box').append(boxNone);
				return;
			}
			
			var config = {
					url : Sys.serviceDomain+"/listUserOwnBasket?key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							$('.hs-box-js').remove();
							var boxNone = $('<div class="hs-box-none"> 回收车中还没有商品呦，赶紧去看看吧！ </div>');
							$('.hs-box').append(boxNone);
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
							var totalMoney = 0;
							for (var i = 0; i < list.length; i++) {
								var item = list[i];
								totalMoney += item.lastEvaluationPrice;
								var str = '<div class="item clearfix">'
			                          +'<img src="'+item.modelsImage+'" alt=""/>'
			                          +'<span>'
			                          +' <ul>'
			                          +' <li>'+item.modelsName+'</li>'
			                          +' <li>回收价：<span>'+item.currency+item.lastEvaluationPrice.toFixed(2)+'</span><a onclick=toolBar.removeFromCar('+item.customersBasketId+')>删除</a></li>'
			                         // +'   <li>12306人回收</li>'
			                          +' </ul>'
			                          +' </span>'
			                          +' </div>';
								var retrieve = $(str);
								$('.hs-box-js>ul').append(retrieve);
							}
							$('.total span:first').text('共'+list.length+'件商品');
							$('.total span em').text(item.currency+totalMoney.toFixed(2))
						}
					}
			}
			Modal.jsonp(config);
		},
		removeFromCar : function(id) {
			var config = {
					url : Sys.serviceDomain+"/deleteUserOwnBasket?customersBasketId="+id+'&key='+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){
						if (data.msg.code!="0000") {
							return;
						}
						//重新获取购物车内容
						toolBar.initRetrieveCar();
					}
			}
			Modal.jsonp(config);
		},
		//页面跳转，判断是否已经登录
		goTo : function(href){
			if(sessionStorage.userId!=null){
				window.location.href = href;
			}else{
				if(href.substring(0,1)=='/'){
					href = href.substring(1);
				}
				window.location.href = '/login.html?ReturnUrl='+href;
			}
		},
		doSearch : function(){
			var keyword = $('#search-bar').val();
			keyword = keyword.replace(/\//g,' ');
			var bId = "0";
			var tagId = "0";
			var bIdObj = $('.listIndex .selected');
			if(bIdObj){
				bId = bIdObj.attr('id');
				if(bId){
					
				}else{
					bId = "0";
				}
			}
			var tagIdObj = $('.resultList .selected');
			if(tagIdObj){
				tagId = tagIdObj.attr('id');
				if(tagId){
					
				}else{
					tagId = "0";
				}
			}
			window.location.href = '/search_'+bId+'-'+tagId+'-'+keyword+'.html';
		},
		initSignIntegral : function(){
			if(sessionStorage.token==undefined){
				return;
			}
			var config = {
					url : Sys.serviceDomain+'/detailTodaySignIntegral?&key='+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){
						if (data.msg.code!="0000") {
							return;
						}
						if(data.content.isSignToday==1){
							$('.qiandao').html('已签到');
						}else{
							$('#element').html('+'+data.content.integral);
						}
						
					}
			}
			Modal.jsonp(config);
		},
		signIntegral : function() {
			if(sessionStorage.token==undefined){
				window.location.href='/login.html';
				return;
			}
			var config = {
					url : Sys.serviceDomain+'/signIntegralDetail?&key='+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){
						Modal.alert(data.msg.desc);
						if(data.msg.code=='0000'){
							//签到动画
							  /* 元素 */
							var element = document.getElementById("element"), 
							target = document.getElementById("target"),
							qiandao = document.getElementById("qiandao");

							var parabola = funParabola(element, target);
							// 抛物线运动的触发
							element.style.marginLeft = "0px";
							element.style.marginTop = "0px";
							parabola.init();
						}
						toolBar.initSignIntegral();//初始化签到按钮；
					}
			}
			Modal.jsonp(config);
		},
		initHeatWord : function(){
			$('.search-label').empty();
			$('.search-label').append('热门搜索：');
			var config = {
					url : Sys.serviceDomain+"/listHotSearchKeywords", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var list = data.content.list;
						for(var i=0;i<list.length;i++){
							if(list[i].hotLevel==2){
								var s = '<a class="cor-org" href="/search_0-0-'+list[i].keywords+'.html">'+list[i].keywords+'</a>';
								$('.search-label').append($(s));
							}else{
								var s = '<a href="/search_0-0-'+list[i].keywords+'.html">'+list[i].keywords+'</a>';
								$('.search-label').append($(s));
							}
							
							
						}
					}
			}
			Modal.jsonp(config);
		},
		initUserInfo : function() {
			if(sessionStorage.userType!=null||sessionStorage.userType!=undefined){
				return;
			}
			var aa = localStorage.aa;
			if(aa!=undefined){
				var arr = aa.split('-');
				var now = new Date().getTime();
				if(now-arr[0]<1000*60*60){
					sessionStorage.token = arr[1];
				}
			}
			var config = {
					url : Sys.serviceDomain+"/detailOwnCustomers?key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						if(content.cityId!=undefined){
							localStorage.cityId = content.cityId;
							localStorage.cityName = content.cityName;
						}
						$("#address").html(content.cityName);
						sessionStorage.personImg = content.image;
						sessionStorage.userType = content.userType;
						sessionStorage.account = content.name;
						sessionStorage.userId = content.customersId;
						if(sessionStorage.userType=="1"){
							$('.role').hide();
						}
						//判断是否已经登录
						if(sessionStorage.userId!=null){
							$(".top-bar-rt-1>a>span").html('欢迎您，'+sessionStorage.userId);
							$(".top-bar-rt-1>a").attr('href','userinfo.html');
							$(".top-bar-rt-1>a:eq(1)").html('退出');
							$(".top-bar-rt-1>a:eq(1)").attr('href',"#");
							$(".top-bar-rt-1>a:eq(1)").click(function(){
								sessionStorage.clear();
								localStorage.removeItem('aa');
								window.location.href='/login.html'
							});
							$(".link-login").html(sessionStorage.userId);
							$(".link-login").attr('href','userinfo.html');
							$(".u-pic img").attr('src',sessionStorage.personImg);
							$(".u-pic a").attr('href','userinfo.html');
							if(sessionStorage.userType=="1"){
								$('.role').hide();
							}
						}
					}
			}
			Modal.jsonp(config);
		}
}

$(function(){
	toolBar.initHeatWord();//初始化热搜词
	toolBar.initHistoryRecord();//初始化浏览记录
	toolBar.initRetrieveCar();//初始化购物车；
	toolBar.initSignIntegral();//初始化签到按钮；
	toolBar.initUserInfo();//初始化用户信息
	$('.qiandao').click(toolBar.signIntegral);//签到
	
	
	//判断是否已经登录
	if(sessionStorage.userId!=null){
		$(".top-bar-rt-1>a>span").html('欢迎您，'+sessionStorage.userId);
		$(".top-bar-rt-1>a").attr('href','userinfo.html');
		$(".top-bar-rt-1>a:eq(1)").html('退出');
		$(".top-bar-rt-1>a:eq(1)").attr('href',"#");
		$(".top-bar-rt-1>a:eq(1)").click(function(){
			sessionStorage.clear();
			localStorage.removeItem('aa');
			window.location.href='/login.html'
		});
		$(".link-login").html(sessionStorage.userId);
		$(".link-login").attr('href','userinfo.html');
		$(".u-pic img").attr('src',sessionStorage.personImg);
		$(".u-pic a").attr('href','userinfo.html');
		if(sessionStorage.userType=="1"){
			$('.role').hide();
		}
	}
	//右侧帮助按钮弹窗
	$(".btn.btn-help").click(function(){
		window.open("/faq_f1.html");
	});
	//右侧意见反馈按钮弹窗
	$(".btn.btn-edit").click(function(){
		$(this).modal('/feedback.html', 'feedbackPopId')
	});
	//搜索按钮
	$(".search-button").click(function(){
		toolBar.doSearch();
	})
	//搜索回车
	$('#search-bar').bind('keypress',function(event){
        if(event.keyCode == "13"){
        	toolBar.doSearch();
        }
    });
});








