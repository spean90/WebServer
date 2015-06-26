/**
 * 结算页面
 */
var pay = {
	//初始化回收清单
	initRetrieveList : function(){
		$('table').empty();
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
						$('table').empty();
						var list = data.content.list;
						var str = '<tr>'
							+ '<th>物品名称</th>'
							+ '<th>回收商家</th>'
							+ '<th>最高报价</th>'
							+ '<th>数量</th>'
							+ '<th>收款方式</th>'
							+ '</tr>';
						$('table').append($(str));
						var sum = 0;
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							sum += item.lastEvaluationPrice;
							str = '<tr id="'+item.customersBasketId+'">'
								+ '<td>'+item.modelsName+'</td>'
								+ '<td></td>'
								+ '<td>'+item.lastEvaluationPrice+'</td>'
								+ '<td>1</td>'
								+ '<td>'+item.lastEvaluationPrice+'</td>'
								+ '</tr>';
							$('table').append($(str));
						}
						$('.order-count.clearfix').empty();
						var s = ' <span class="fl">商家报价</span>'
							+'<span class="fr">共'+list.length+'件商品，合计￥'+sum+'</span>';
						$('.order-count.clearfix').append($(s));
						$('#sum').text('￥'+sum);
					}
				}
		}
		Modal.jsonp(config);
	},
};

$(function(){
	pay.initRetrieveList();
	 $('#online_bank').click(function(){
		    $('.bank-area').show();
		  });
	  $('#pay_cash').click(function(){
	    $('.bank-area').hide();
	  });
	  $('.captcha-btn').click(function(){
	    $(this).addClass('disabled');
	    var _second = 60;
	    var _timer = setInterval(function(){
	      _second -= 1;
	      if (_second > 0) {
	        $('.captcha-btn').text(_second + 's后可重发');
	      }else{
	        $('.captcha-btn').text('发送验证码').removeClass('disabled');
	        clearInterval(_timer);
	      }
	    }, 1000);
	  });
});