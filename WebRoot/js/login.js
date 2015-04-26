var login = {
		login : function() {
			var userId = $('#username').val();
			var passwd = $('#password').val();
			if (userId==''||passwd=='') {
				alert('请输入用户名和密码！');
				return;
			}
			var config = {
					url : Sys.serviceDomain+"/userlogin?userId="+userId+'&passwd='+passwd, 
					callbackParameter: "callback",
					success : function(data){
						console.log(data);
						if (data.msg.code!="0000") {
							alert('登录失败！');
							return;
						}
						sessionStorage.token = data.key;
						window.location.href = '/index.html';
					}
			}
			Modal.jsonp(config);
		}
		
}
$(function(){
})
