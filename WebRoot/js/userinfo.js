/**
 * 个人资料
 */
var user_province;
var user_city;
var user_region;
var UserInfo = {
		//TODO 接口还没有
		initUserInfo : function(){
			var config = {
					url : Sys.serviceDomain+"/detailOwnCustomers?key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						//var data = {"msg":{"time":"2015-04-24 18:03:04.595","code":"0000","desc":"成功"},"content":{"recordPerPage":2,"list":[{"modelsId":1,"brandsId":1,"brandsTagsId":1,"modelsName":"机型1","modelsNickname":"苹果","modelsImage":"http://120.26.48.53:8080/ehuishou/img/models/1/a.png","color":"","recyclePrice":1000.0,"recycleCount":100,"metaTite":"","metaKeywords":"","metaDescription":"","modelsMonthPricesList":[{"priceMonth":"201504","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201503","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201502","customerRecycleCount":0,"customerAvgPrice":0.0}]},{"modelsId":3,"brandsId":1,"brandsTagsId":2,"modelsName":"机型3","modelsNickname":"苹果","modelsImage":"http://120.26.48.53:8080/ehuishou/img/models/1/a.png","color":"","recyclePrice":100.0,"recycleCount":1,"metaTite":"","metaKeywords":"","metaDescription":"","modelsMonthPricesList":[{"priceMonth":"201504","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201503","customerRecycleCount":0,"customerAvgPrice":0.0},{"priceMonth":"201502","customerRecycleCount":0,"customerAvgPrice":0.0}]}],"currentPage":1,"totalPage":1}};
						var content = data.content;
						$(".infomation").empty();
						var str = '<div class="fl left">'
								+ '<img src="'+content.image+'" alt="" />'
								+ '<a href="javascript:void(0)"><span>修改头像</span></a>'
								+ '</div>'
								+ '<div class="fl right">'
								+ '<p><i class="icon icon-warn"></i>为了更好保护你的利益,请如实填写个人资料！</p>'
								+ '<div class="formwrap">'
								+ '<form action="">'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>昵称：</span>'
								+ '<input type="text" class="input" value='+content.name+'/>'
								+ '</div>'
//								+ '<div class="line raido">'
//								+ '<span class="label"><em>*</em>性别：</span>'
//								+ '<input  type="radio" name="sex" value="男" checked="checked"/>'
//								+ '<label for="ss1">先生</label>'
//								+ '<input  type="radio" name="sex" value="女"/>'
//								+ '<label for="ss1">女士</label>'
//								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>手机号码：</span>'
								+ '<span>'+content.customersId+'</span><span class="isvalid">已经验证</span>'
								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>邮箱：</span>'
								+ '<span>'+content.email+'</span><span class="isvalid">已经验证</span>'
								+ '</div>'
//								+ '<div class="line">'
//								+ '<span class="label"><em>*</em>真实姓名：</span>'
//								+ '<input type="text" class="input" value="'+list[0].modelsId+'"/>'
//								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>所在城市：</span>'
								+ '<select name="" id="province" onchange="UserInfo.listAllCity();"></select>'
								+ '<select name="" id="city" onchange="UserInfo.listAllRegion();"></select>'
								+ '<select name="" id="region"></select>'
								+ '</div>'
//								+ '<div class="line">'
//								+ '<span class="label"><em>*</em>详细地址：</span>'
//								+ '<input type="text" class="input" value="'+list[0].modelsId+'"/>'
//								+ '</div>'
//								+ '<div class="line">'
//								+ '<span class="label"><em>*</em>邮政编码：</span>'
//								+ '<input type="text" class="input" value="'+list[0].modelsId+'"/>'
//								+ '</div>'
								+ '<div class="line">'
								+ '<span class="label"><em>*</em>星级</span><span>';
								for(var i=0;i<content.starLevel;i++){
									str = str+ '<span class="star"></span>';
								}
								str = str+ '</span>'
								+ '</div>'
								+ '<div class="line">'
								+ '<a class="btnsave" onclick="UserInfo.update()">保存</a>'
								+ '</div></form></div></div>';
						$(".infomation").append(str);
						$('#update_img').attr('src',content.image);
						user_province = content.cityId;
						user_city = content.cityId;
						user_region = content.regionId;
						UserInfo.listAllProvience();
						 
				}
			};
			Modal.jsonp(config);
		},
		/*根据省份所有城市列表*/
		listAllCity : function(){
			var provienceId = $("#province").val();
			$("#city").empty();
			$("#city").append('<option value="">--请选择--</option>');	
			if(provienceId==''){
				return;
			}
			var config = {
				url : Sys.serviceDomain + "/listAllCity?provienceId="+provienceId,
				callbackParameter : "callback",
				success : function(data) {
					if (data.msg.code != "0000") {
						return;
					}
					var list = data.content.list;
					for(var i=0; i<list.length; i++){
						$("#city").append('<option value="' + list[i].cityId + '">' + list[i].name + '</option>');	
					}
					if($('#province').val()==user_province){
						$("#city").val(user_city);
					}
					UserInfo.listAllRegion();
				}
			}
			Modal.jsonp(config);
		},
		/*获取所有的 省份*/
		listAllProvience : function(){
			$("#province").empty();
			$("#province").append('<option value="">--请选择--</option>');	
			var config = {
				url : Sys.serviceDomain + "/listAllProvince?currentPage=0",
				callbackParameter : "callback",
				success : function(data) {
					if (data.msg.code != "0000") {
						return;
					}
					var list = data.content.list;
					for(var i=0; i<list.length; i++){
						$("#province").append($('<option value="' + list[i].provinceId + '">' + list[i].provinceName + '</option>'));	
					}
					$("#province").val(1);
					UserInfo.listAllCity();
				}
			}
			Modal.jsonp(config);
		},
		/*获取所有的区*/
		listAllRegion : function(){
			var city = $("#city").val();
			if(city==''){
				return;
			}
			$("#region").empty();
			$("#region").append('<option value="">--请选择--</option>');	
			var config = {
				url : Sys.serviceDomain + "/listOneCityRegion?cityId="+city,
				callbackParameter : "callback",
				success : function(data) {
					if (data.msg.code != "0000") {
						return;
					}
					var list = data.content.list;
					for(var i=0; i<list.length; i++){
						$("#region").append($('<option value="' + list[i].regionId + '">' + list[i].name + '</option>'));	
					}
					$("#region").val(user_region);
				}
			}
			Modal.jsonp(config);
		},
		update : function() {
			alert(1);
		}
};

$(function(){
	  tabs($('.tabs'));
	  UserInfo.initUserInfo();
	  $(".infomation a:eq(0)").click(function(){
		 $(".tabs li:eq(1)>a").click(); 
	  });
	  $('.attachment-btn').click(function(){
			$(this).siblings('input[type="file"]').trigger('click');
			$(this).siblings('input[type="file"]').change(function(){
				$('.attchment-label').html($('input[type="file"]')[0].files[0].name);
			});
		});
});