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
        + '<td class="goods evaluateResult"><img src="'+obj.pic+'" class="drop-down drop-down-f" /><span>'+obj.modelsName+'</span>';
    if( (sessionStorage.userType != null)&& (sessionStorage.userType != 'undefined') &&( (sessionStorage.userType == 2) || (sessionStorage.userType == 3)) ){
    	str = str + '<div class="tb tb1"><div class="tb-dbox"><strong>您可获得的回收抽成费：</strong><em>' + obj.result.currency + obj.result.agentCommission + '</em></div></div>';
    }
     str = str + '</td><td class="price">'+obj.result.currency + obj.result.lastEvaluationPrice.toFixed(2)+'</td>'
        + '<td class="status">价格有效</td>'
        + '<td class="num m_l32"><input class="count-input disable" disabled type="text" value="1"/></td>'
        + '<td class="subtotal">'+obj.result.currency + obj.result.lastEvaluationPrice.toFixed(2)+'</td>'
        + '<td class="operation">'
        + '<span class="reprice" onclick="history.go(-1)">重新询价</span>'
        + '</td>'
        + '</tr>';
	$('tbody').append($(str));
	$('#priceTotal').text(obj.result.lastEvaluationPrice.toFixed(2));
	$('#currency').text(obj.result.currency);
		var $ss = $('.evaluateResult').find('.drop-down');
		  $ss.hover(function() {
		  var $this = $(this);
		  $this.parent().addClass("hover")
		}, function() {
		  var $this = $(this);
		  $this.parent().removeClass("hover")
		});
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
							//window.location.href='/myRetrieveCar_'+content.customersBasketId+'.html'
							window.location.href='/pay_'+content.customersBasketId+'.html'
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