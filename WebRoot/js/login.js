var login = {		
		login : function() {
			var userId = $('#username').val();
			var passwd = $('#password').val();
			var checkCode = $('#volidCoder_register_ps').val();
			if (userId==''||passwd=='') {
				$(".msg-wrap").show();
				$(".msg-error").html('请输入用户名和密码！');
				return;
			}
			
			var config = {
					url : Sys.serviceDomain+"/userlogin?userId="+userId+'&passwd='+passwd+"&checkCode="+checkCode, 
					callbackParameter: "callback",
					success : function(data){
						//console.log(data);
						if (data.msg.code!="0000") {
							$(".msg-wrap").show();
							$(".msg-error").html(data.msg.desc);							
							return;
						}
						localStorage.aa=new Date().getTime()+"-"+data.key;  //判断是否有登录过
						localStorage.hp=userId; //历史登录记录
						sessionStorage.token = data.key;
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
	if(localStorage.hp!=null && localStorage.hp!=undefined){
		$('#username').val(localStorage.hp);
	}
	//$('.btn-get-verify img').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
	//$(".btn-get-verify img").click(login.changeVerifyCode);
	//$('.btn-get-verify').click(login.changeVerifyCode);
	
	
})
