/**
 * 商品类别js
 */

var category = {
		/*获取热门品牌*/
		getHotBrands:function (bId){
			$.jsonp({
				url : Sys.serviceDomain+"/listHotBrands?recordPerPage=17",
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					//var list = content.list;
					var list = [{"id":"11","name":"苹果","english_name":"apple","count":"5"},
					            {"id":"12","name":"小米","english_name":"apple","count":"5"},
					            {"id":"13","name":"华为","english_name":"apple","count":"5"},
					            {"id":"14","name":"中兴","english_name":"apple","count":"5"},
					            {"id":"15","name":"htc","english_name":"apple","count":"5"},
					            {"id":"16","name":"htc","english_name":"apple","count":"5"},
					            {"id":"17","name":"htc","english_name":"apple","count":"5"},
					            {"id":"18","name":"htc","english_name":"apple","count":"5"},
					            {"id":"19","name":"htc","english_name":"apple","count":"5"}];
					var dd = $('.listIndex[attr="terminal_brand_s"]>dd');
					dd.empty();
					for(var i=0; i<list.length; i++){
						var str = '';
						if(bId==list[i].id){
							str = str + '<a href="javascript:void(0)"  onclick="category.focusOnBrand(this,'+list[i].id+');" attrval="'+list[i].english_name+'" class="selected"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}else{
							str = str + '<a href="javascript:void(0)"  onclick="category.focusOnBrand(this,'+list[i].id+');" attrval="'+list[i].english_name+'"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}
						if(i<list.length-1){
							str = str + " <span>|</span>";
						}
						dd.append(str);
					}
				}
			});
		},
		/*获取其他品牌*/
		getOtherBrands : function(bId){
			$.jsonp({
				url : Sys.serviceDomain+"/listHotBrands?recordPerPage=17",
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					//var list = content.list;
					var list = [{"id":"2","name":"苹果","english_name":"apple","count":"5"},
					            {"id":"22","name":"htc","english_name":"apple","count":"5"},
					            {"id":"23","name":"htc","english_name":"apple","count":"5"},
					            {"id":"24","name":"htc","english_name":"apple","count":"5"},
					            {"id":"25","name":"htc","english_name":"apple","count":"5"},
					            {"id":"26","name":"htc","english_name":"apple","count":"5"},
					            {"id":"27","name":"htc","english_name":"apple","count":"5"},
					            {"id":"28","name":"htc","english_name":"apple","count":"5"},
					            {"id":"29","name":"htc","english_name":"apple","count":"5"},
					            {"id":"30","name":"htc","english_name":"apple","count":"5"},
					            {"id":"31","name":"小米","english_name":"apple","count":"5"},
					            {"id":"32","name":"华为","english_name":"apple","count":"5"},
					            {"id":"33","name":"中兴","english_name":"apple","count":"5"},
					            {"id":"34","name":"酷派","english_name":"apple","count":"5"},
					            {"id":"35","name":"诺基亚","english_name":"apple","count":"5"},
					            {"id":"36","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"37","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"38","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"39","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"40","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"41","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"42","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"43","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"44","name":"品牌","english_name":"apple","count":"5"},
					            {"id":"45","name":"品牌","english_name":"apple","count":"5"}];
					var dd = $('.listIndex[attr="其他品牌"]>dd');
					dd.empty();
					for(var i=0; i<list.length; i++){
						var str = '';
						if(bId==list[i].id){
							str = str + '<a href="javascript:void(0)" onclick="category.focusOnBrand(this,'+list[i].id+');"  attrval="'+list[i].english_name+'" class="selected"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}else{
							str = str + '<a href="javascript:void(0)" onclick="category.focusOnBrand(this,'+list[i].id+');"  attrval="'+list[i].english_name+'"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}
						if(i<list.length-1){
							str = str + " <span>|</span>";
						}
						dd.append(str);
					}
				}
			});
		},
		/*获取具体品牌下TAG*/
		getTagList : function(bId){
			$.jsonp({
				url : Sys.serviceDomain+"/listHotBrands?recordPerPage=17",
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					content.name = "苹果";
					//var list = content.list;
					var list = [{"name":"苹果_tag"+bId,"english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag"+bId,"english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag"+bId,"english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag"+bId,"english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag"+bId,"english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag"+bId,"english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag"+bId,"english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag"+bId,"english_name":"apple","count":"5"}];
					$(".resultList> .select").html(content.name+'：');
					var dd = $('.resultList>dd');
					dd.empty();
					dd.append('<a href="javascript:void(0)"  attrval="all">全部</a>');
					for(var i=0; i<list.length; i++){
						dd.append('<a href="javascript:void(0)"  attrval="'+list[i].name+'">'+list[i].name+'</a> ');
						
					}
					$(".resultList").append(dd);
				}
			});
		},
		/*获取手机列表*/
		getPhoneList : function(bId,tagId){
			$.jsonp({
				url : Sys.serviceDomain+"/listHotBrands?recordPerPage=17",
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					//var list = content.list;
					$(".phone-list").empty("");
					for(var i=0; i<10; i++){
						var str = '';
						if((i+1)%5==0){
							str = '<li data-label="4月,5月,6月" data-data="1200,1300,800" class="last">'
						}else{
							str = '<li data-label="4月,5月,6月" data-data="1200,1300,800">'
						}
						str = str + '<a><img src="pic/phone.png" alt="iphone4" width="80" height="160" /></a>'
				            	+ '<div class="product-info">'
				            	+ '<div class="fl">'
				            	+ '<span class="phone-name">iPhone 4</span>'
				            	+ '<span class="recovery">回收价：<em class="red">￥550</em></span>'
				            	+ '<span class="badge">37693人回收</span>'
				            	+ '</div>'
				            	+ '</div>'
				            	+ '<a class="index-spr trend-icon"></a> '
				            	+ '</li>';
						$(".phone-list").append(str);
					}
					phoneList();
				}
			});
		},
		//点击了品牌，使其获取焦点
		focusOnBrand : function(obj,bId){
			var selected = $('.listIndex .selected');
			if(selected!=null){
				selected.removeClass('selected');
			}
			$(obj).addClass('selected');
			category.getTagList(bId);
		}
		
}

$(function(){
	$('[href="/brands_0.html"]').parent().addClass('on');
	var bid = $('#brandId').text();
	bid = "11";
	category.getHotBrands(bid);
	category.getOtherBrands(bid);
	if(bid!='0'){
		category.getTagList(bid);
	}else{
		$(".resultList").empty();
	}
	category.getPhoneList(bid,null);
});


