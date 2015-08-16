var login = {
		
		login : function() {
			var userId = $('#username').val();
			var passwd = $('#password').val();
			var checkCode = $('#volidCoder_register_ps').val();
			if (userId==''||passwd=='') {
				//初始化弹窗功能
				Modal.alert("请输入用户名和密码！");
				return;
			}
			
			var config = {
					url : Sys.serviceDomain+"/userlogin?userId="+userId+'&passwd='+passwd+"&checkCode="+checkCode, 
					callbackParameter: "callback",
					success : function(data){
						console.log(data);
						if (data.msg.code!="0000") {
							Modal.alert(data.msg.desc);
							return;
						}
						localStorage.aa=new Date().getTime()+"-"+data.key;  //判断是否有登录过
						sessionStorage.token = data.key;
						//sessionStorage.token = 'Y6dE9ahZ1ee9OllaU5JvKvZhww8MtD/UtoRzlrCBwSkfZ0PHWe2Shq0Q3KCrTgmi';
						sessionStorage.userId = userId;
						var query = window.location.search;
						if(query!=''){
							var arr = query.split('=');
							window.location.href = '/'+arr[1];
						}else{
							window.location.href = '/index.html';
						}
					}
			}
			Modal.jsonp(config);
		},
		changeVerifyCode : function() {
			$('.btn-get-verify img').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
		}
		
}
$(function(){
	$('.btn-get-verify img').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
	$(".btn-get-verify img").click(login.changeVerifyCode);
	$('.btn-get-verify').click(login.changeVerifyCode);
})
