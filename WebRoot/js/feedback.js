var feedback = {
		submit : function() {
			var type = $('select').val();
			if(type=='咨询类'){
				type = '1';
			}else if(type=="建议类"){
				type = '2';
			}else if(type=="投诉类"){
				type = '3';
			}
			
			var title = $('table input:eq(0)').val();
			if(title==''){
				Modal.alert('标题不可为空，请输入标题！');
				return;
			}
			var text = $('.gray-textarea').val();
			if (text=='') {
				Modal.alert('内容不可为空，请输入您的意见或建议！');
				return;
			}
			$('#form').form('submit',{
				url : action=Sys.serviceDomain+"/addMyAsk?key=" + sessionStorage.token,
				success : function(data){
					Modal.alert("提交成功!");
					//window.parent.location.href = '/index.html';
				}
			});
			//$('#form').submit();
//			var config = {
//					url : Sys.serviceDomain+"/addMyAsk?key=" + sessionStorage.token 
//						+ "&title=" + title 
//						+ "&askText=" + text
//						+ "&askType=" + type, 
//					callbackParameter: "callback",
//					success : function(data){ 
//						if (data.msg.code!="0000") {
//							return;
//						}
//						Modal.alert("提交成功!");
//						$('table input:eq(0)').val("");
//						$('.gray-textarea').val("");
//					}
//			}
//			Modal.jsonp(config);
		}
//		changeVerifyCode : function() {
//			$('#valid_code').attr('src',Sys.serviceDomain+'/generatePicCheckCode?r='+ Math.random());
//		}
		
}

$(function(){
//	$("#valid_code_btn").click(feedback.changeVerifyCode);
//	$("#valid_code_btn").click();
	$('.oran-btn').click(feedback.submit);
})