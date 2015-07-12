/**
 * 结算页面
 */
var pay = {
	//初始化回收清单
	initRetrieveList : function(){
		$('table').empty();
		var config = {
				url : Sys.serviceDomain+"/listUserOwnBasket?key="+sessionStorage.token+"&customersBasketIds="+$('#customersBasketIds').text(), 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					if (data.content.list==null||data.content.list.length==0) {
						console.log('回收车中还没有商品呦，赶紧去看看吧！');
						window.location.href='/index.html';
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
						var currency = '￥';
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							sum += item.lastEvaluationPrice;
							str = '<tr id="'+item.customersBasketId+'">'
								+ '<td>'+item.modelsName+'</td>'
								+ '<td></td>'
								+ '<td>'+item.lastEvaluationPrice.toFixed(2)+'</td>'
								+ '<td>1</td>'
								+ '<td>'+item.lastEvaluationPrice.toFixed(2)+'</td>'
								+ '</tr>';
							$('table').append($(str));
							currency = item.currency;
						}
						$('.order-count.clearfix').empty();
						var s = ' <span class="fl">商家报价</span>'
							+'<span class="fr">共'+list.length+'件商品，合计'+currency+sum.toFixed(2)+'</span>';
						$('.order-count.clearfix').append($(s));
						$('#sum').text(currency+sum.toFixed(2));
						$('.c-red').text(currency+sum.toFixed(2));
					}
				}
		}
		Modal.jsonp(config);
	},
	//获取短信验证码
	generateCheckCode : function() {
		var tel = $("#phone").val();
		if(tel==''){
			Modal.alert('请输入联系电话！');
			return false;
		}
		var config = {
				url : Sys.serviceDomain+"/generateCheckCode?codeType=1&phone="+tel,
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						Modal.alert('短信发送失败，请稍后再试！');
						return;
					}
					Modal.alert('短信发送成功！');
				}
		}
		Modal.jsonp(config);
	},
	initCityRegion : function() {
		var config = {
				url : Sys.serviceDomain+"/listOneCityRegion?currentPage=0&cityId="+localStorage.cityId,
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						//Modal.alert('短信发送失败，请稍后再试！');
						return;
					}
					var content = data.content;
					if (content.list!=null&&content.list.length!=0) {
						var list = content.list;
						for(var i=0;i<list.length;i++){
							var str = '<option value="'+list[i].regionId+'">'+list[i].name+'</option>'
							$('#cityRegion').append($(str));
						}
					}
				}
		}
		Modal.jsonp(config);
	},
	changeProvincer : function(val) {
		$('#city').empty();
		var config = {
				url : Sys.serviceDomain+"/listAllCity?provienceId="+val,
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						//Modal.alert('短信发送失败，请稍后再试！');
						return;
					}
					var content = data.content;
					if (content.list!=null&&content.list.length!=0) {
						var list = content.list;
						for(var i=0;i<list.length;i++){
							var str = '<option value="'+list[i].cityId+'">'+list[i].name+'</option>'
							$('#city').append($(str));
						}
					}
				}
		}
		Modal.jsonp(config);
	},
	initPayType : function() {
		$('#payType').empty();
		var config = {
				url : Sys.serviceDomain+"/listOneCityRecycleMethod?cityId="+localStorage.cityId,
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					if (content.list!=null&&content.list.length!=0) {
						var list = content.list;
						for(var i=0;i<list.length;i++){
							if(list[i].methodType==1){
								if (list[i].recycleMethodId==1) {
									var str = '<label><input type="radio" name="trade-way" id="online_bank" checked value="1" /> 网银转账：<span class="c-red"></span></label>';
									$('#payType').append($(str));
									var strs = '<label><input type="radio" name="trade-way" id="pay_cash" checked value="3" /> 现金交易：<span class="c-red"></span></label>';
									$('#payType').append($(strs));
									$('.bank-area').hide();
								}else if (list[i].recycleMethodId==2){
									var str = '<label><input type="radio" name="trade-way" id="pay_cash" checked value="3" /> 现金交易：<span class="c-red"></span></label>';
									$('#payType').append($(str));
									$('.bank-area').hide();
								}
							}else{
								if(list[i].methodType==2) {
									if (list[i].recycleMethodId==1) {
										$('#shop').show();
										$('#faceToFace').show();
										$('#send').show();
									}else if (list[i].recycleMethodId==2){
										$('#shop').show();
										$('#faceToFace').show();
										$('#send').show();
									}
									else if (list[i].recycleMethodId==3){
										$('#shop').show();
										$('#faceToFace').show();
										$('#send').show();
									}
								}
							}
						}
						pay.initPage();
					}
				}
		}
		Modal.jsonp(config);
	},
	submitOrder : function() {
		if($('#clause').is(':checked')){
			var customersBasketIds = $('#customersBasketIds').text();
			var username = $('username').val();
			var phone = $('#phone').val();
			var code = $('#code').val();
			var tradeWay = $("input[name='trade-way']:checked").val();
			var dealType = $("input[name='trade-way1']:checked").val();
			var bank = '';
			var bank_user = '';
			var bank_account = '';
			if(username==''){
				Modal.alert('请输入姓名');
				return ;
			}
			if(phone==''){
				Modal.alert('请输入电话');
				return ;
			}
			if(code==''&&sessionStorage.userType!=1){
				Modal.alert('请输入短信验证码');
				return ;
			}
			if(tradeWay=='' || tradeWay==undefined){
				Modal.alert('请选择收款方式');
				return ;
			}
			var data = {
					customersBasketIds : $('#customersBasketIds').text(),
					userId : sessionStorage.userId,
					ordersSource : sessionStorage.userType,
					customerName : username,
					paymentType : tradeWay,
					cityId : localStorage.cityId,
					transactionType : dealType
			};
			//如果是网银转账
			if(tradeWay==1){
				bank = $('#bank').val();
				bank_user = $('#bank_user').val();
				bank_account = $('#bank_account').val();
				if(bank=='0'||bank_user==''||bank_account==''){
					Modal.alert('请输入银行卡信息');
					return ;
				}
				data.accountBank = bank;
				data.paymentAccount = bank_account;
				data.accountName = bank_user;
			}
			//如果当面交易
			if(dealType==3){
				var regionId = $('#cityRegion').val();
				var addr = $('#detailAddr').val();
				if(regionId==''||addr==''){
					Modal.alert('请输入您的地址信息');
					return ;
				}
				data.regionId = regionId;
				data.address = addr;
			}
			
			
			var config = {
					url : Sys.serviceDomain+"/addOrdersDirect?key="+sessionStorage.token,
					callbackParameter: "callback",
					data : data,
					success : function(data){ 
						if (data.msg.code!="0000") {
							//Modal.alert('短信发送失败，请稍后再试！');
							return;
						}
						var content = data.content;
						window.location.href = '/orderSuccess_'+content.ordersId+'.html';
					}
			}
			Modal.jsonp(config);
			
		}else{
			Modal.alert('请先同意壹回收网服务条款');
		}
	},
	showClause : function() {
		$(this).modal('clausePop.html', 'clausePop');
	},
	changeCity : function() {
		$('.drop-down.drop-down-s.more-city').addClass('hover');
	},
	reValuation : function() {
		//alert(111);
//		var config = {
//		url : Sys.serviceDomain+"/listAllCity?provienceId="+val,
//		callbackParameter: "callback",
//		success : function(data){ 
//			if (data.msg.code!="0000") {
//				//Modal.alert('短信发送失败，请稍后再试！');
//				return;
//			}
//			var content = data.content;
//			if (content.list!=null&&content.list.length!=0) {
//				var list = content.list;
//				for(var i=0;i<list.length;i++){
//					var str = '<option value="'+list[i].cityId+'">'+list[i].name+'</option>'
//					$('#city').append($(str));
//				}
//			}
//		}
//}
//Modal.jsonp(config);
	},
	//初始化页面后。添加响应
	initPage : function(){
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
	}
	
};

$(function(){
	if(sessionStorage.userType==1){
		$('.captcha-btn').hide();
		$('#code').hide();
	}
	$('#currentCity').text(localStorage.cityName);
	pay.initRetrieveList();
	pay.initCityRegion();
	pay.initPayType();
});