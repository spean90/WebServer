/**
 * 结算页面
 */
var pay = {
	paySum : 0,	
	shipfee : 0,
	currency : '￥',
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
					pay.paySum = 0;
					pay.shipfee = 0;
					if (data.content.list==null||data.content.list.length==0) {
						console.log('回收车中还没有物品呦，赶紧去看看吧！');
						window.location.href='/index.html';
					}else {
						$('table').empty();
						var list = data.content.list;
						var str = '<tr>'
							+ '<th>物品名称</th>'
							+ '<th>最高报价</th>'
							+ '<th>数量</th>'
							+ '<th>最终金额</th>'
							+ '</tr>';
						$('table').append($(str));
						var sum = 0;
						var currency = '￥';
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							sum += item.lastEvaluationPrice;
							str = '<tr id="'+item.customersBasketId+'">'
								+ '<td>'+item.modelsName+'</td>'
								+ '<td>'+item.lastEvaluationPrice.toFixed(2)+'</td>'
								+ '<td>1</td>'
								+ '<td>'+item.lastEvaluationPrice.toFixed(2)+'</td>'
								+ '</tr>';
							$('table').append($(str));
							currency = item.currency;
						}
						$('.order-count.clearfix').empty();
						var s = ' <span class="fl">商家报价</span>'
							+'<span class="fr">共'+list.length+'件物品，合计'+currency+sum.toFixed(2)+'</span>';
						$('.order-count.clearfix').append($(s));
						
						$('.c-red').text(currency+sum.toFixed(2));
						pay.paySum = sum;
						pay.currency = data.content.currency;
						pay.shipfee = data.content.shippingFee;
						if($('#shipfee').is(':visible')){
							pay.paySum = pay.paySum + pay.shipfee;
						}
						$('#sum').text(currency+pay.paySum.toFixed(2));
						$('#shipfeetip').html('运费补贴:'+data.content.currency+pay.shipfee);
						$('#shipfee').html('运费补贴:<span  class="c-red">'+data.content.currency+pay.shipfee+'</span>');
						
					}
				}
		}
		Modal.jsonp(config);
	},
	//获取短信验证码
	generateCheckCode : function() {
		var username = $("#username").val();
		if(username==''){
			$("#username").parent().children('div').html('请输入回收客户姓名！');
			$("#username").parent().children('div').show();
			$("#username").focus();
			return false;
		}		
		var phone = $("#phone").val();
		if(phone==''){
			$("#phone").parent().children('div').html('请输入手机号码！');
			$("#phone").parent().children('div').show();
			$("#phone").focus();
			return false;
		}
		var config = {
				url : Sys.serviceDomain+"/generateCheckCode?codeType=4&phone="+phone,
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
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
				}
		}
		Modal.jsonp(config);
	},
	initCityRegion : function() {
		var str = '<option>'+localStorage.cityName+'</option>'
		$('#city').append($(str));
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
						var isFirst=1;
						for(var i=0;i<list.length;i++){
							if(list[i].methodType==1){
								if (list[i].recycleMethodId==1) {
									var str = '<label class="radio-box"><input type="radio" name="trade-way" id="online_bank" value="1" /> 网银转账：<span class="c-red"></span></label><span style="width:50px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
									$('#payType').append($(str));
//									var strs = '<label><input type="radio" name="trade-way" id="pay_cash" checked value="3" /> 现金交易：<span class="c-red"></span></label>';
//									$('#payType').append($(strs));
//									$('.bank-area').hide();
								}else if (list[i].recycleMethodId==2){
									var str = '<label class="radio-box"><input type="radio" name="trade-way" id="pay_cash" value="3" /> 现金交易：<span class="c-red"></span></label>';
									$('#payType').append($(str));
									$('.bank-area').hide();
								}
							}else{
								if(list[i].methodType==2) {
									if (list[i].recycleMethodId==1) {
										$('#shop').show();
										if(isFirst==1){
											$('#shop>input').attr("checked","checked");
										}
										isFirst++;
									}else if (list[i].recycleMethodId==2){
										$('#faceToFace').show();
										if(isFirst==1){
											$('#faceToFace input').attr("checked","checked");
										}
										isFirst++;
									}
									else if (list[i].recycleMethodId==3){
										$('#send').show();
										if(isFirst==1){
											$('#send input').attr("checked","checked");
										}
										isFirst++;
									}
								}
							}
						}
						$('#payType input').eq(0).attr("checked","checked");
						pay.initPage();
					}
					$('.c-red').text(pay.paySum);
				}
		}
		Modal.jsonp(config);
	},
	submitOrder : function() {
		if($('#clause').is(':checked')){
			var customersBasketIds = $('#customersBasketIds').text();
			var username = $('#username').val();
			var phone = $('#phone').val();
			var code = $('#code').val();
			var tradeWay = $("input[name='trade-way']:checked").val();
			var dealType = $("input[name='trade-way1']:checked").val();
			
			var bank = '';
			var bank_user = '';
			var bank_account = '';
			if(username==''){
				$("#username").parent().children('div').html('请输入回收客户姓名！');
				$("#username").parent().children('div').show();
				$('#username').focus();
				return ;
			}
			
			if(phone==''){
				$("#phone").parent().children('div').html('请输入手机号码！');
				$("#phone").parent().children('div').show();
				$('#phone').focus();
				return ;
			}
			if( (code=='')&&(sessionStorage.userType != 1) ){
				$("#phone").parent().children('div').html('请输入短信验证码！');
				$("#phone").parent().children('div').show();
				$('#code').focus();
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
					$('.bank-area').children('div').html("请填写完整您的银行卡信息");
					$('.bank-area').children('div').show();
					$('#bank_account').focus();
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
					$('#detailAddr').parent().children('div').html('请详细填写您的当面交易地址');
					$('#detailAddr').parent().children('div').show();
					$('#detailAddr').focus();
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
		jBox.open("iframe:http://m.ehuishou.com/serviceagreementdetail.html", "壹回收网服务条款", 925, 500, { buttons: { '同意并继续': true }, persistent: false,showIcon:false,top:'10%' });
		
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
	
		pay.showAddrDetail();
		var val = $('[name=trade-way]:checked').val();
		if(val==1){
			$('.bank-area').show();
		}else{
			$('.bank-area').hide();
		}
		//如果选择网银。显示输入银行卡信息
		$("[name=trade-way]").change(function() { 
			var val = $('[name=trade-way]:checked').val();
			if(val==1){
				$('.bank-area').show();
				//判断快递方式是否存在，存在则显示
				var sendmethod = $('#send');
				if(sendmethod)
				  sendmethod.show();
			}else{
				$('.bank-area').hide();
			}
			}); 
		  $('#pay_cash').click(function(){
		    $('.bank-area').hide();
		    //判断快递方式是否存在，存在则隐藏
				var sendmethod = $('#send');
				if(sendmethod)
				  sendmethod.hide();		    
		  });
		  $('.captcha-btn').click(function(){
		   
		  });

		  	$('input').iCheck({
			checkboxClass: 'icheckbox',
			radioClass: 'iradio',
			increaseArea: '20%'
			});
			
			$("select").selectui({
			// 是否自动计算宽度
			autoWidth: true,
			// 是否启用定时器刷新文本和宽度
			interval: true
		});

	},
	showAddrDetail : function(){
		var val = $('[name=trade-way1]:checked').val();
		if(val==3){
			$('#dealAddr').show();
		}else{
			$('#dealAddr').hide();
		}
		if(val==1){  //邮寄
			$('.addr').show();
			pay.paySum = parseInt(pay.paySum)  + parseInt(pay.shipfee);
			$('#shipfee').show();
			$('#sum').html(pay.currency+pay.paySum.toFixed(2));
		}else{
			if($('#shipfee').is(':visible')){
				pay.paySum -= pay.shipfee;
				$('#sum').html(pay.currency+pay.paySum.toFixed(2));
				$('#shipfee').hide();
			}
			$('.addr').hide();
		}
		
		
	},
	detailCityShip : function(){
		var config = {
				url : Sys.serviceDomain+"/detailCityShip?cityId="+localStorage.cityId, 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var addr = $('#send p').eq(1);
					var s = '&nbsp;&nbsp;&nbsp;快递到：'+content.shipAddress+" "+content.shipZipcode+" "+content.shipReceiver+"收 "+content.shipReceiverPhone;
					addr.html(s);
//					orderSuccess.shipReceiver = content.shipReceiver;
//					orderSuccess.shipAddress = content.shipAddress;
//					orderSuccess.shipZipcode = content.shipZipcode;
//					orderSuccess.shipReceiverPhone = content.shipReceiverPhone;
				}
		};
		Modal.jsonp(config);
	},
	
};

$(function(){
	$(".tip_div").hide();
	if(sessionStorage.userType==1){
		$('.captcha-btn').hide();
		$('#code').hide();
		$('#username').val(sessionStorage.account);
		$('#username').attr('readonly',"readonly");
		$('#phone').val(sessionStorage.userId);
		$('#phone').attr('readonly',"readonly");
	}
	$('#currentCity').text(localStorage.cityName);
	pay.detailCityShip();
	pay.initRetrieveList();
	pay.initCityRegion();
	pay.initPayType();
	//如果选择当面交易。显示输入交易地址
	$("[name=trade-way1]").change(function() { 
		pay.showAddrDetail();
		}); 
});