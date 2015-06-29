/**
 * 个人资料
 */
var UserInfo = {
		//TODO 接口还没有
		initUserInfo : function(){
			/*var config = {
					url : Sys.serviceDomain+"/listAllFaqCategories", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}*/
						var data = {"msg":{"time":"2015-04-24 18:03:04.595","code":"0000","desc":"成功"},"content":{"recordPerPage":2,"list":[{"modelsId":1,"brandsId":1,"brandsTagsId":1,"modelsName":"机型1","modelsNickname":"苹果","modelsImage":"http://120.26.48.53:8080/ehuishou/img/models/1/a.png","color":"","recyclePrice":1000.0,"recycleCount":100,"metaTite":"","metaKeywords":"","metaDescription":"","modelsMonthPricesList":[{"priceMonth":"201504","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201503","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201502","customerRecycleCount":0,"customerAvgPrice":0.0}]},{"modelsId":3,"brandsId":1,"brandsTagsId":2,"modelsName":"机型3","modelsNickname":"苹果","modelsImage":"http://120.26.48.53:8080/ehuishou/img/models/1/a.png","color":"","recyclePrice":100.0,"recycleCount":1,"metaTite":"","metaKeywords":"","metaDescription":"","modelsMonthPricesList":[{"priceMonth":"201504","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201503","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201502","customerRecycleCount":0,"customerAvgPrice":0.0}]}],"currentPage":1,"totalPage":1}};
						var content = data.content;
						var list = content.list;
						
						$(".infomation").empty();
						var str = '<div class="fl left">'
								+ '<img src="'+list[0].modelsImage+'" alt="" />'
								+ '<a href="javascript:void(0)"><span>修改头像</span></a>'
								+ '</div>'
								+ '<div class="fl right">'
								+ '<p><i class="icon icon-warn"></i>为了更好保护你的利益,请如实填写个人资料！</p>'
								+ '<div class="formwrap">'
								+ '<form action="">'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>昵称：</span>'
								+ '<input type="text" class="input" value='+list[0].modelsName+'/>'
								+ '</div>'
								+ '<div class="line raido">'
								+ '<span class="label"><em>*</em>性别：</span>'
								+ '<input  type="radio" name="sex" value="男" checked="checked"/>'
								+ '<label for="ss1">先生</label>'
								+ '<input  type="radio" name="sex" value="女"/>'
								+ '<label for="ss1">女士</label>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>手机号码：</span>'
								+ '<span>'+list[0].modelsId+'</span><span class="isvalid">已经验证</span>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>邮箱：</span>'
								+ '<span>'+list[0].modelsId+'</span><span class="isvalid">已经验证</span>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>真实姓名：</span>'
								+ '<input type="text" class="input" value="'+list[0].modelsId+'"/>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>所在城市：</span>'
								+ '<select name="" id=""></select>'
								+ '<select name="" id=""></select>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>详细地址：</span>'
								+ '<input type="text" class="input" value="'+list[0].modelsId+'"/>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>邮政编码：</span>'
								+ '<input type="text" class="input" value="'+list[0].modelsId+'"/>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>星级</span>'
								+ '<span><span class="star"></span><span class="star"></span><span class="star"></span></span>'
								+ '</div></form></div></div>';
						$(".infomation").append(str);
				/*}
			};
			Modal.jsonp(config);*/
		}
};

$(function(){
	  tabs($('.tabs'));
	  UserInfo.initUserInfo();
	  $(".infomation a:eq(0)").click(function(){
		 $(".tabs li:eq(1)>a").click(); 
	  });
});