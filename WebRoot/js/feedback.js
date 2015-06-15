var feedback = {
		submit : function() {
			var type = $('select').val();
			var text = $('.gray-textarea').val();
			if (text=='') {
				Modal.alert('请输入您的意见或建议！');
				return;
			}
			var email = $('.feedback-email').val();
			if(email == ''){
				Modal.alert('请输入您的邮箱！');
				return;
			}
			
		},
		changeVerifyCode : function() {
			$("#valid_code").attr("src","valid_code");
		}
		
}

$(function(){
	$("#valid_code_btn").click(feedback.changeVerifyCode);
	$('.oran-btn').click(feedback.submit);
})