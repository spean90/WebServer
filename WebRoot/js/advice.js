/**
 * 弹窗-咨询与建议 advicePop.html
 */

var Advice = {
	initAdvice : function(){
		/*var config = {
				url : Sys.serviceDomain+"/listAllFaqCategories", 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
				}
		};
		Modal.jsonp(config);*/
	},
	commitAdvice : function(){
		alert("提交");
	}
};

$(function(){
	Advice.initAdvice();
	$('.oran-btn').click(Advice.commitAdvice);
});