var userCenter = {
		submit:function() {
			var valid = $('#form').form('validate');
			if(!valid){
				return;
			}
			var pwd = $('#password').val();
			pwd = hex_md5(pwd).toUpperCase();
			if(pwd!=sessionStorage.password){
				Modal.showAlert('密码不正确!');
				return;
			}
			var re_pwd = $('#re_password').val();
			var new_pwd = $('#new_password').val();
			if(new_pwd!=re_pwd){
				Modal.showAlert('密码不一致！');
				return;
			}
			$('#password').val(hex_md5(new_pwd).toUpperCase())
			$('#form').form('submit',{
				success : function(data) {
					var result = JSON.StrToJSON(data);
					if(result.success){
						Modal.showConfirm('密码修改成功,请重新登录！',null,function(){
							var config = {
									url : '/sys/logout.do',
									success : function(data) {
										parent.window.location.href = '/login.html';
										var domain = document.domain;
										//转换成顶级域名
										domain = domain.substring(domain.indexOf(".") + 1, domain.length);
										//登陆成功后先清除原来的cookie
										Cookies.clear("JSESSIONID", {domain: domain, path: "/"});
									}
							}
							Modal.ajax(config);

						})
					}else{
						Modal.showAlert('服务器出错！');
					}
					
				}
			})
		}
}




$(function(){
	var account = sessionStorage.managerAccount;
	$('#managerAccount').val(account);
	$('#mId').val(sessionStorage.mId);
	$('#realName').val(sessionStorage.realName);
	$('#pic').attr("src",sessionStorage.pic);
	$('#signup_pic').attr('src',sessionStorage.signup_pic);
})