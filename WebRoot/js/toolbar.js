/**
 * 顶部工具栏js-----
 * huangsp
 */
var toolBar = {
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
			                          +' <li>回收价：<span>￥'+item.lastEvaluationPrice+'</span><a onclick=toolBar.removeFromCar('+item.customersBasketId+')>删除</a></li>'
			                          +'   <li>12306人回收</li>'
			                          +' </ul>'
			                          +' </span>'
			                          +' </div>';
								var retrieve = $(str);
								$('.hs-box-js>ul').append(retrieve);
							}
							$('.total span:first').text('共'+list.length+'件商品');
							$('.total span em').text('￥'+totalMoney)
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
				window.location.href = '/login.html';
			}
		}
		
}

$(function(){
	toolBar.initRetrieveCar()//初始化购物车；
	//判断是否已经登录
	if(sessionStorage.userId!=null){
		$(".top-bar-rt-1>a>span").html(sessionStorage.userId);
		$(".top-bar-rt-1>a").attr('href','#');
		
		$(".link-login").html("欢迎您，"+sessionStorage.userId);
	}
	//右侧帮助按钮弹窗
	$(".btn.btn-help").click(function(){
		window.open("/help.html");
	})
	//右侧意见反馈按钮弹窗
	$(".edit").click(function(){
		
	})
});








