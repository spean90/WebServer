/**
 * 顶部工具栏js-----
 * huangsp
 */
var toolBar = {
		initRetrieveCar : function() {
			sessionStorage.token = 'Y6dE9ahZ1ee9OllaU5JvKjd2b7gp6QimDNo0gAUjsKEH0ld9fLeCsaynC9T091K4';
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
			                          +' <li>回收价：<span>￥'+item.lastEvaluationPrice+'</span><a onclick=index.removeFromCar('+item.customersBasketId+')>删除</a></li>'
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
		}
		
}

$(function(){
	toolBar.initRetrieveCar()//初始化购物车；
});








