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
					var list = [{"id":"1","name":"苹果","english_name":"apple","count":"5"},
					            {"id":"12","name":"小米","english_name":"apple","count":"5"},
					            {"id":"12","name":"华为","english_name":"apple","count":"5"},
					            {"id":"12","name":"中兴","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"}];
					$('.listIndex[attr="terminal_brand_s"]').empty();
					$('.listIndex[attr="terminal_brand_s"]').append('<dt>热门品牌</dt>');
					var str = '<dd>';
					for(var i=0; i<list.length; i++){
						if(bId==list[i].id){
							str = str + '<a href="javascript:void(0)"  attrval="'+list[i].english_name+'" class="selected"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}else{
							str = str + '<a href="javascript:void(0)"  attrval="'+list[i].english_name+'"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}
						if(i<list.length-1){
							str = str + " <span>|</span>";
						}
					}
					str = str + '</dd>';
					$('.listIndex[attr="terminal_brand_s"]').append(str);
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
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"htc","english_name":"apple","count":"5"},
					            {"id":"12","name":"小米","english_name":"apple","count":"5"},
					            {"id":"12","name":"华为","english_name":"apple","count":"5"},
					            {"id":"12","name":"中兴","english_name":"apple","count":"5"},
					            {"name":"酷派","english_name":"apple","count":"5"},
					            {"name":"诺基亚","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"},
					            {"name":"品牌","english_name":"apple","count":"5"}];
					$('.listIndex[attr="其他品牌"]').empty();
					$('.listIndex[attr="其他品牌"]').append('<dt>其他品牌</dt>');
					var str = '<dd>';
					for(var i=0; i<list.length; i++){
						if(bId==list[i].id){
							str = str + '<a href="javascript:void(0)"  attrval="'+list[i].english_name+'" class="selected"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}else{
							str = str + '<a href="javascript:void(0)"  attrval="'+list[i].english_name+'"><span>'+list[i].name+'</span>('+list[i].count+')</a>';
						}
						if(i<list.length-1){
							str = str + " <span>|</span>";
						}
					}
					str = str + '</dd>';
					$('.listIndex[attr="其他品牌"]').append(str);
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
					var list = [{"name":"苹果_tag","english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag","english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag","english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag","english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag","english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag","english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag","english_name":"apple","count":"5"},
					            {"name":"htc苹果_tag","english_name":"apple","count":"5"}];
					$(".resultList").empty("");
					$(".resultList").append('<dt class="select">'+content.name+'：</dt>');
					$(".resultList").append('<dd id="tagList">');
					$(".resultList").append('<a href="javascript:void(0)"  attrval="all">全部</a> ');
					for(var i=0; i<list.length; i++){
						var str = '<a href="javascript:void(0)"  attrval="'+list[i].name+'">'+list[i].name+'</a> ';
						$("#tagList").append(str);
					}
					$(".resultList").append("</dd>");
				}
			});
		},
		/*获取手机列表*/
		getPhoneList : function(bid,tagId){
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
						str = str + '	<a><img src="pic/phone.png" alt="iphone4" width="80" height="160" /></a>'
				            	+ '	<div class="product-info">'
				            	+ '  	<div class="fl">'
				            	+ '    		<span class="phone-name">iPhone 4</span>'
				            	+ '    		<span class="recovery">回收价：<em class="red">￥550</em></span>'
				            	+ '    		<span class="badge">37693人回收</span>'
				            	+ '  	</div>'
				            	+ '	</div>'
				            	+ '<a class="index-spr trend-icon"></a> '
				            	+ '</li>';
						$(".phone-list").append(str);
					}
				}
			});
		}
}

$(function(){
	$('[href="/brands_0.html"]').parent().addClass('on');
	var bid = $('#brandId').text();
	bid = "1";
	category.getHotBrands(bid);
	category.getOtherBrands(bid);
	if(bid!='0'){
		category.getTagList(bid);
	}else{
		$(".resultList").empty();
	}
	category.getPhoneList(bid,null);
});


