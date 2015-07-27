/**
 * 估计结果页
 */
var evaluateResult = {
	/*初始化回收车*/
	initCar : function(){
		var key = $('#key').text();
		var obj = sessionStorage.getItem(key);
		obj = JSON.parse(obj)
		$('tbody').empty();
		str = '<tr id="'+obj.modelsId+'">'
        + '<td class="checkbox none"><input class="check-one check" type="checkbox"/></td>'
        + '<td class="goods"><img src="'+obj.pic+'" alt=""/><span>'+obj.modelsName+'</span></td>'
        + '<td class="price">'+obj.result.lastEvaluationPrice.toFixed(2)+'</td>'
        + '<td class="status">价格有效</td>'
        + '<td class="num m_l32"><input class="count-input disable" disabled type="text" value="1"/></td>'
        + '<td class="subtotal">'+obj.result.lastEvaluationPrice.toFixed(2)+'</td>'
        + '<td class="operation">'
      //  + '<span class="delete">删除</span>'
        + '<span class="reprice" onclick="history.go(-1)">重新询价</span>'
        + '</td>'
        + '</tr>';
	$('tbody').append($(str));
	$('#priceTotal').text(obj.result.lastEvaluationPrice.toFixed(2));
	$('#currency').text(obj.result.currency);
	},
	/*添加到回收车*/
	addToCart : function(isPop){
		if(sessionStorage.userId==null){
			var key = $('#key').text();
			window.location.href = '/login.html?ReturnUrl=evaluateResult_'+key+'.html';
			return;
		}
		var key = $('#key').text();
		var obj = sessionStorage.getItem(key);
		obj = JSON.parse(obj);
		var paramStr = JSON.stringify(obj.param);
	     paramStr = encodeURI(paramStr);
		 var config = {
					url : Sys.serviceDomain+"/addNewCustomersBasket?evaluations="+paramStr+"&modelsId="+ obj.modelsId
							+"&key=" + sessionStorage.token,
					callbackParameter: "callback",
					success : function(data){ 
						 if (data.msg.code!="0000") {
							return;
						} 
						var content = data.content;
						if(isPop){//弹窗? 添加到回收车需要弹窗
							$(this).modal('evaluateResultPop.html', 'evaluateResult_pop');
						}else{
							//去结算
							window.location.href='/myRetrieveCar_'+content.customersBasketId+'.html'
						}
						sessionStorage.removeItem(key)
					}
			}
		 Modal.jsonp(config);
	},
	/*	去结算
	 * 1、添加到回收车；
	 * 2、跳转到回收车界面；
	 */
	goToCart : function(){
		evaluateResult.addToCart(false);
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