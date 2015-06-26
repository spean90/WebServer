var login = {
		
		login : function() {
			var userId = $('#username').val();
			var passwd = $('#password').val();
			if (userId==''||passwd=='') {
				//初始化弹窗功能
				Modal.alert("请输入用户名和密码！");
				return;
			}
			var config = {
					url : Sys.serviceDomain+"/userlogin?userId="+userId+'&passwd='+passwd, 
					callbackParameter: "callback",
					success : function(data){
						console.log(data);
						if (data.msg.code!="0000") {
							Modal.alert("登录失败！请稍后再试","错误");
							return;
						}
						sessionStorage.token = data.key;
						sessionStorage.userId = userId;
						window.location.href = '/index.html';
					}
			}
			Modal.jsonp(config);
		}
		
}
$(function(){
	
})