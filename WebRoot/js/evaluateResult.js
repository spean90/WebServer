/**
 * 估计结果页
 */
var evaluateResult = {
	/*初始化回收车*/
	initCar : function(){
		var config = {
				url : Sys.serviceDomain+"/listUserOwnBasket?key="+sessionStorage.token, 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					if (data.content.list==null||data.content.list.length==0) {
						console.log('回收车中还没有商品呦，赶紧去看看吧！');
					}else {
						$('tbody').empty();
						var list = data.content.list;
						var str = '';
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							str = '<tr id="'+item.customersBasketId+'">'
					            + '<td class="checkbox none"><input class="check-one check" type="checkbox"/></td>'
					            + '<td class="goods"><img src="'+item.modelsImage+'" alt=""/><span>'+item.modelsName+'</span></td>'
					            + '<td class="price">'+item.lastEvaluationPrice+'</td>'
					            + '<td class="status">价格有效</td>'
					            + '<td class="num m_l32"><input class="count-input disable" disabled type="text" value="1"/></td>'
					            + '<td class="subtotal">'+item.lastEvaluationPrice+'</td>'
					            + '<td class="operation">'
					            + '<span class="delete">删除</span>'
					            + '<span class="reprice">重新询价</span>'
					            + '</td>'
					            + '</tr>';
							$('tbody').append($(str));
						}
						onloadCar();//❤重新加载购物车内容❤
					}
				}
		}
		Modal.jsonp(config);
	},
	/*添加到回收车*/
	addToCart : function(isPop){
		if(isPop){//弹窗? 添加到回收车需要弹窗
			$(this).modal('evaluateResultPop.html', 'evaluateResult_pop');
		}
		
	},
	/*	去结算
	 * 1、添加到回收车；
	 * 2、跳转到回收车界面；
	 */
	goToCart : function(){
		evaluateResult.addToCart(false);
		alert("去结算");
	}
};

/*添加到回收车按钮绑定事件*/
$('#add_to_cart').click(function(){
	evaluateResult.addToCart(true);
});

/*去结算按钮绑定事件*/
$('.common-btn.red').click(function(){
	evaluateResult.goToCart();
});


$(function(){
	evaluateResult.initCar();
});