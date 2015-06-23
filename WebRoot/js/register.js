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
			if($('form:eq(0) i[class="blank succeed"]').length==4){
				var phone = $("input[name='username']:eq(0)").val();
				var passwd = $("input[name='password']:eq(0)").val();
				var randomCode = $('#volidCoder_register_ps').val();
				var config = {
						url : Sys.serviceDomain+"/registerUser?passwd="+passwd+"&phone="+phone+"&randomCode="+randomCode,
						callbackParameter: "callback",
						success : function(data){ 
							if (data.msg.code!="0000") {
								Modal.alert('注册失败，请稍后再试！');
								return;
							}
							Modal.alert('注册成功！');
						}
				}
				Modal.jsonp(config);
			}else{
				register.checkUsername($("input[name='username']:eq(0)"));
				register.checkPassword($("input[name='password']:eq(0)"));
				register.checkRePassword($("input[name='password']:eq(0)").val(),$("input[name='rpassword']:eq(0)"));
				register.checkTel($("input[name='tel']:eq(0)"));
				return false;
			}
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
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
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
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
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
			}else{
				$(obj).siblings("div").attr('class','tip_div defaulttip');
				$(obj).siblings("div").hide();
				$(obj).siblings("i").attr('class','blank succeed');
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
		}
}


$(function(){
	$("div[class='tip_div']").hide();
	/*绑定事件，校验输入-个人用户注册*/
	$("input[name='username']").focus(function(){
		register.checkUsername(this);
	});
	$("input[name='username']").keyup(function(){
		register.checkUsername(this);
	});
	$("input[name='password']").focus(function(){
		register.checkPassword(this);
	});
	$("input[name='password']").keyup(function(){
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
	$("input[name='tel']").focus(function(){
		register.checkTel(this);
	});
	$("input[name='tel']").keyup(function(){
		register.checkTel(this);
	});
	

	/*绑定事件，校验输入-企业用户注册*/
	$("input[name='rpassword']:eq(1)").focus(function(){
		var password = $("input[name='password']:eq(1)").val();
		register.checkRePassword(password,this);
	});
	$("input[name='rpassword']:eq(1)").keyup(function(){
		var password = $("input[name='password']:eq(1)").val();
		register.checkRePassword(password,this);
	});

	$("input[name='email']").focus(function(){
		register.checkEmail(this);
	});
	$("input[name='email']").keyup(function(){
		register.checkEmail(this);
	});
	$("input[name='companyName']").focus(function(){
		register.checkOther(this);
	});
	$("input[name='companyName']").keyup(function(){
		register.checkOther(this);
	});

	// 获取短信验证码
	var validCode = true;
	$(".msgs").click(function() {
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

	// x注册切换
	$(".tab li").click(function() {
		$(this).siblings().removeClass('curr');
		$(this).addClass('curr');
		var index = $(this).index();
		if (index == 0) {
			$(".reg_content .person").show();
			$(".reg_content .company").hide();
		}
		if (index == 1) {
			$(".reg_content .person").hide();
			$(".reg_content .company").show();
		}
	});
	
	
	$('.header-con.clearfix').hide();
	$('.nav-box.clearfix').hide();
	$('.header.clearfix').removeClass('header');
	$('.footer-t').hide();
	$('.footer-m').hide();
	$("#codeImg_regist").click(register.getCheckCode);
	$(".btn-submit:eq(0)").click(register.submitRegister_person);
});
