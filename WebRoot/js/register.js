/**
 * 注册界面
 */
var register = {
		//获取短信验证码
		generateCheckCode : function() {
			var tel = $("input[name='tel']").val();
			if(tel==''){
				Modal.alert('请输入联系电话！');
				return false;
			}
			var config = {
					url : Sys.serviceDomain+"/generateCheckCode?codeType=1&phone="+tel+"&picCheckCode="+$("#volidCoder_register_ps").val(),
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
		getCheckCode : function(){
			var tel = $("input[name='tel']").val();
			if(tel==''){
				Modal.alert('请输入联系电话！');
				return false;
			}else{
				if(Modal.checkMobile(tel)==1){
					Modal.alert("手机号码格式错误，请输入11位有效号码！");
					return false;
				}
			}
			//TODO 获取验证码
		},
		//提交注册信息_个人
		submitRegister_person : function(){
			//TODO 提交注册信息
			if($("input[name='username']").parent().children('i').is(':hidden')){
				$("input[name='username']").focus();
				return;
			}
			if($("input[name='password']").parent().children('i').is(':hidden')){
				$("input[name='password']").focus();
				return;
			}
			if($("input[name='rpassword']").parent().children('i').is(':hidden')){
				$("input[name='rpassword']").focus();
				return;
			}
			if($("input[name='tel']").parent().children('i').is(':hidden')){
				$("input[name='tel']").focus();
				return;
			}
			if($('#volidCoder_register').val()==''){
				$('#volidCoder_register').focus();
				return;
			}
			if($('#volidCoder_register_ps').val()==''){
				$('#volidCoder_register_ps').focus();
				return;
			}
			
			var username = $("input[name='username']:eq(0)").val();
			var passwd = $("input[name='password']:eq(0)").val();
			var randomCode = $('#volidCoder_register').val();
			var tel = $("input[name='tel']").val();
			var config = {
					url : Sys.serviceDomain+"/registerUser?passwd="+passwd+"&phone="+tel+"&randomCode="+randomCode+"&userName="+username,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							Modal.alert('注册失败，请稍后再试！');
							return;
						}
						//Modal.alert('注册成功！'); 
						location.href = "login.html";
					}
			}
			Modal.jsonp(config);
			
		},
		//用户名验证
		checkUsername : function(obj){
			if(obj==null){
				obj = this;
			}
			var username = $(obj).val();
			if(username==""||username.length<4||username.length>20){
				//Modal.alert("用户名格式错误！");
				$(obj).siblings("div").attr('class','tip_div errtip');
				$(obj).siblings("div").show();
				$(obj).siblings("i").attr('class','blank i-name');
				$("input[name='username']").parent().children('i').hide();
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
			}
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
		//验证手机号码
		checkTel : function(obj){
			if(obj==null){
				obj = this;
			}
			var tel = $(obj).val();
			if(Modal.checkMobile(tel)==1){
				$(obj).siblings("div").attr('class','tip_div errtip');
				$(obj).siblings("div").show();
				$(obj).siblings("i").attr('class','blank i-mobile');
				$("input[name='tel']").parent().children('i').hide();
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
				//$("input[name='tel']").parent().children('i').show();
			}
		},
		//验证邮箱
		checkEmail : function(obj){
			var email = $(obj).val();
			if(Modal.checkEmail(email)==1){
				$(obj).siblings("div").attr('class','tip_div errtip');
				$(obj).siblings("div").show();
				$(obj).siblings("i").attr('class','blank i-mobile');
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
			}
		},
		//验证邮箱
		checkOther : function(obj){
			var str = $(obj).val();
			if(str==''){
				$(obj).siblings("div").attr('class','tip_div errtip');
				$(obj).siblings("div").show();
				$(obj).siblings("i").attr('class','blank i-mobile');
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
			}
		},
		changeVerifyCode : function() {
			$('.verifycode img').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
		},
		ckeckUserName : function() {
			var username = $("input[name='username']:eq(0)").val();
			var config = {
					url : Sys.serviceDomain+"/verifyUserName?userName="+username,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							$("input[name='username']").parent().children('div').html(data.content.verfiyDesc);
							$("input[name='username']").parent().children('i').hide();
							return;
						}else{
							if(data.content.verfiyResult=='0'){
								$("input[name='username']").parent().children('i').show();
							}else{
								$("input[name='username']").parent().children('div').html(data.content.verfiyDesc);
								$("input[name='username']").parent().children('div').removeClass('defaulttip');
								$("input[name='username']").parent().children('div').addClass('errtip');
								$("input[name='username']").parent().children('div').show();
								$("input[name='username']").parent().children('i').hide();
							}
						}
						
					}
			}
			Modal.jsonp(config);
		},
		checkUniqueTel : function() {
			var tel = $("input[name='tel']:eq(0)").val();
			var config = {
					url : Sys.serviceDomain+"/verifyUserId?userId="+tel,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							$("input[name='tel']").parent().children('div').html(data.content.verfiyDesc);
							$("input[name='tel']").parent().children('i').hide();
							return;
						}else{
							var content = data.content;
							if(content.verfiyResult=='0'){
								$("input[name='tel']").parent().children('i').show();
								$("input[name='tel']").parent().children('div').hiden();
							}else{
								$("input[name='tel']").parent().children('div').html(content.verfiyDesc);
								$("input[name='tel']").parent().children('div').removeClass('defaulttip');
								$("input[name='tel']").parent().children('div').addClass('errtip');
								$("input[name='tel']").parent().children('div').show();
							}
							
						}
						
					}
			}
			Modal.jsonp(config);
		}
}


$(function(){
	$('.header.clearfix').hide();
	$('.verifycode img').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
	$(".verifycode img").click(register.changeVerifyCode);
	$('.verifycode').click(register.changeVerifyCode);
	
	$(".tip_div").hide();
	$('.blank.succeed').hide();
	/*绑定事件，校验输入-个人用户注册*/
	$("input[name='username']").focus(function(){
		register.checkUsername(this);
	});
	$("input[name='username']").keyup(function(){
		register.checkUsername(this);
	});
	$("input[name='username']").blur(function(){
		register.checkUsername(this);
		register.ckeckUserName();
	});
	$("input[name='password']").focus(function(){
		register.checkPassword(this);
	});
	$("input[name='password']").keyup(function(){
		register.checkPassword(this);
	});
	$("input[name='password']").blur(function(){
		register.checkPassword(this);
	});
	$("input[name='rpassword']:eq(0)").focus(function(){
		var password = $("input[name='password']:eq(0)").val();
		register.checkRePassword(password,this);
	});
	$("input[name='rpassword']:eq(0)").keyup(function(){
		var password = $("input[name='password']:eq(0)").val();
		register.checkRePassword(password,this);
	});
	$("input[name='rpassword']:eq(0)").blur(function(){
		var password = $("input[name='password']:eq(0)").val();
		register.checkRePassword(password,this);
	});
	$("input[name='tel']").focus(function(){
		register.checkTel(this);
	});
	$("input[name='tel']").keyup(function(){
		register.checkTel(this);
	});
	$("input[name='tel']").blur(function(){
		register.checkTel(this);
		register.checkUniqueTel();
	});
	

	// 获取短信验证码
	var validCode = true;
	$(".msgs").click(function() {
		if($("input[name='tel']").parent().children('i').is(':hidden')){
			$("input[name='tel']").focus();
			return;
		}
		if($("#volidCoder_register_ps").val()==''){
			$("#volidCoder_register_ps").focus();
			return;
		}
		var time = 30;
		var code = $(this);
		if (validCode) {
			validCode = false;
			code.parent().attr("disabled", "true");
			code.parent().addClass("msgs1");
			var t = setInterval(function() {
				time--;
				code.html(time + "秒");
				if (time == 0) {
					clearInterval(t);
					code.html("重新获取");
					validCode = true;
					code.parent().removeAttr("disabled");
					code.parent().removeClass("msgs1");
				}
			}, 1000);
			register.generateCheckCode();
		}
	});

	$("#codeImg_regist").click(register.getCheckCode);
	$(".btn-submit:eq(0)").click(register.submitRegister_person);
	$("input[name='username']").blur(function(){
		var userName = $("input[name='username']").val();
		var config = {
				url : Sys.serviceDomain+"/verifyUserName?userName="+userName,
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						$("input[name='username']").parent().children('div.tip_div').html(data.content.verfiyDesc);
						$("input[name='username']").parent().children('div.tip_div').removeClass('defaulttip');
						$("input[name='username']").parent().children('div.tip_div').addClass('successtip');
						$("input[name='username']").parent().children('div.tip_div').show();
						return;
					}
				}
		}
		Modal.jsonp(config);
	});
});
