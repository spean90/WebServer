var forgetPwd = {
		forgetPhone : '',
		nextStep : 1,
		checkCode : '',
		changeVerifyCode : function() {
			$('.item-info.verifycode img').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
		},
		checkUser : function() {  
			var tel = $("input[name='username']").val();
			var config = {
					url : Sys.serviceDomain+"/verifyUser?userId="+tel,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							$("input[name='username']").parent().children('div').html(data.content.verfiyDesc);
							$("input[name='username']").parent().children('i').hide();
							return;
						}else{
							var content = data.content;
							if(content.verifyResult=='0'){
								$("input[name='username']").parent().children('i').show();
								$("input[name='username']").parent().children('div').hide();
								forgetPwd.forgetPhone = content.phone;
								$('#forgetPhone').html(content.phone);
							}else{
								$("input[name='username']").parent().children('div').html(content.verfiyDesc);
								$("input[name='username']").parent().children('div').removeClass('defaulttip');
								$("input[name='username']").parent().children('div').addClass('errtip');
								$("input[name='username']").parent().children('div').show();
							}
							
						}
						
					}
			}
			Modal.jsonp(config);
		},
		//获取短信验证码
		generateCheckCode : function() {
			var tel = forgetPwd.forgetPhone;
			var config = {
					url : Sys.serviceDomain+"/generateCheckCode?codeType=2&phone="+tel,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						//跳到下一步
						 $('.processorBox li').removeClass('current').eq(forgetPwd.nextStep).addClass('current');
					      $('.step').fadeOut(300).eq(forgetPwd.nextStep).fadeIn(500);
					      forgetPwd.nextStep++;
					}
			}
			Modal.jsonp(config);
		},
		//验证短信验证码
		checkCode : function() {
			var code = $('.commom-input.verifyCode').val();
			if(code==''){
				$('.commom-input.verifyCode').focus();
				return;
			}
			var config = {
					url : Sys.serviceDomain+"/verifyCheckCode?randomCode="+code+"&phone="+forgetPwd.forgetPhone,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						forgetPwd.checkCode = code;
						//跳到下一步
						var content = data.content;
						if(content.verifyResult=='0'){
							 $('.processorBox li').removeClass('current').eq(forgetPwd.nextStep).addClass('current');
						      $('.step').fadeOut(300).eq(forgetPwd.nextStep).fadeIn(500);
						      forgetPwd.nextStep++;
						}
					}
			}
			Modal.jsonp(config);
		},
		//密码校验
		checkPassword : function(obj){
			if(obj==null){
				obj = this;
			}
			var password = $(obj).val();//密码
			if(password==""||password.length<4||password.length>20){
				//Modal.alert("用户名格式错误！");
				$(obj).siblings("div").attr('class','tip_div errtip');
				$(obj).siblings("div").show();
				$(obj).siblings("i").attr('class','blank i-pass');
				$("input[name='password']").parent().children('i').hide();
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
				$("input[name='password']").parent().children('i').show();
			}
		},
		//确认密码校验
		checkRePassword : function(password,obj){
			var rpassword = $(obj).val();//确认密码
			if(password==''){
				return false;
			}
			if(password!=rpassword){
				//Modal.alert("确认密码与密码不一致，请重新填写！");
				$(obj).siblings("div").attr('class','tip_div errtip');
				$(obj).siblings("div").show();
				$(obj).siblings("i").attr('class','blank i-pass');
				$("input[name='rpassword']").parent().children('i').hide();
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
				$("input[name='rpassword']").parent().children('i').show();
			}
		},
		//更改密码
		updatePwd : function() {
			var pwd = $("input[name='password']").val();
			if($("input[name='password']").parent().children('i').is(':hidden')){
				$("input[name='password']").focus();
				return;
			}
			if($("input[name='rpassword']").parent().children('i').is(':hidden')){
				$("input[name='rpassword']").focus();
				return;
			}
			var config = {
					url : Sys.serviceDomain+"/resetUser?passwd="+pwd+"&phone="+forgetPwd.forgetPhone+"&randomCode="+forgetPwd.checkCode,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						//跳到下一步
							 $('.processorBox li').removeClass('current').eq(forgetPwd.nextStep).addClass('current');
						      $('.step').fadeOut(300).eq(forgetPwd.nextStep).fadeIn(500);
						      forgetPwd.nextStep++;
					}
			}
			Modal.jsonp(config);
		},
}

$(function(){
//	$('.item-info.verifycode img').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
//	$('.item-info.verifycode img').click(forgetPwd.changeVerifyCode);
//	$('.item-info.verifycode').click(forgetPwd.changeVerifyCode);
	$(".tip_div").hide();
	$('.blank.succeed').hide();
	
	//第一步
	$("input[name='username']").blur(function(){
		forgetPwd.checkUser();
	});
	$('#nextBtn1').click(function(){
		if($("input[name='username']").parent().children('i').is(':hidden')){
			$("input[name='username']").focus();
			return;
		}
	      $('.processorBox li').removeClass('current').eq(forgetPwd.nextStep).addClass('current');
	      $('.step').fadeOut(300).eq(forgetPwd.nextStep).fadeIn(500);
	      forgetPwd.nextStep ++;
	});
	//第二步
	$('#byPhone').click(function(){
		forgetPwd.generateCheckCode();
	});
	$('#byAdmin').click(function(){
		 $('.processorBox li').removeClass('current').eq(4).addClass('current');
	      $('.step').fadeOut(300).eq(4).fadeIn(500);
		$('.mb-10').html('客服热线：400-6600-282<br/>客服QQ：2965968813<br/>服务邮箱：service@ehuishou.com<br/>')
	});
	//第三步
	$('#nextBtn2').click(function(){
		forgetPwd.checkCode();
	});
	
	//第四步
	$("input[name='password']").focus(function(){
		forgetPwd.checkPassword(this);
	});
	$("input[name='password']").keyup(function(){
		forgetPwd.checkPassword(this);
	});
	$("input[name='password']").blur(function(){
		forgetPwd.checkPassword(this);
	});
	$("input[name='rpassword']:eq(0)").focus(function(){
		var password = $("input[name='password']:eq(0)").val();
		forgetPwd.checkRePassword(password,this);
	});
	$("input[name='rpassword']:eq(0)").keyup(function(){
		var password = $("input[name='password']:eq(0)").val();
		forgetPwd.checkRePassword(password,this);
	});
	$("input[name='rpassword']:eq(0)").blur(function(){
		var password = $("input[name='password']:eq(0)").val();
		forgetPwd.checkRePassword(password,this);
	});
	$('#nextBtn3').click(function(){
		forgetPwd.updatePwd();
	});
	
//	  //第一步
//	  $('.item-info .button').click(function(){
//	      var i = $(this).parentsUntil('.step').index();
//	      $('.processorBox li').removeClass('current').eq(i).addClass('current');
//	      $('.step').fadeOut(300).eq(i).fadeIn(500);
//	    });
	  
	  
    //切换步骤（目前只用来演示）
//    $('.processorBox li').click(function(){
//      var i = $(this).index();
//      $('.processorBox li').removeClass('current').eq(i).addClass('current');
//      $('.step').fadeOut(300).eq(i).fadeIn(500);
//    });
  });