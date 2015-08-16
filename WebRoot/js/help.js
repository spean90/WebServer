/**
 * 帮助中心
 */
var help = {
		initFaqCategories : function(){
			var config = {
					url : Sys.serviceDomain+"/listAllFaqCategories?currentPage=0", 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						//var list = [{"faqCategoriesId":1,"faqCategoriesName":"问题目录1"},{"faqCategoriesId":2,"faqCategoriesName":"问题目录2"},{"faqCategoriesId":3,"faqCategoriesName":"问题目录3"},{"faqCategoriesId":4,"faqCategoriesName":"问题目录4"},{"faqCategoriesId":5,"faqCategoriesName":"问题目录5"}];
						$('.help-left.clearfix').empty();
						var str = ' <dl class="on"><dt onclick="help.detailFaq(1)"><i class="icon-help"></i>常见问题</dt> </dl>';
						$('.help-left.clearfix').append(str);
						for(var i=0; i<list.length; i++){
							var item = list[i];
							str = '<dl id="'+list[i].faqCategoriesId+'">' 
							+ '<dt><i class="icon-help"></i>'+list[i].faqCategoriesName+'</dt>'; 
							for(var j=0;j<item.faqList.length;j++){
								str+='<dd><a href="/faq_f'+item.faqList[j].faqId+'.html">'+item.faqList[j].faqName+'</a></dd>';
							}
							str += '</dl>';
							$('.help-left.clearfix').append(str);
						}

						  help.helpNav();
						 // $('.help-left dt:eq(0)').click();
						  help.detailFaq($('#faq_id').html());
					}
			};
			Modal.jsonp(config);
		},
		listFaqOfCategories : function(id){
			var config = {
					url : Sys.serviceDomain+"/listFaqOfCategories?faqId="+id, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$(".help-right").empty();
						var str=content.desc;
						$(".help-right").append(str);
					}
			};
			Modal.jsonp(config);
		},
		helpNav : function(){
			$('.help-left dt').click(function(){
				$(this).parent('dl').toggleClass('on');
				//help.listFaqOfCategories($(this),$(this).parent('dl').attr('id'));
			});
		},
		detailFaq : function(faqId){
			var config = {
					url : Sys.serviceDomain+"/detailFaq?faqId="+faqId, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						$('.help-title').html(data.content.faqName);
						$('.help-content').html(data.content.faqDescription);
						var id = data.content.faqCategoriesId;
						var dl = document.getElementById(id);
						$(dl).addClass('on');
					}
			};
			Modal.jsonp(config);
		}
};

$(function(){
	$('.nav.wrapper.clearfix li.on').removeClass('on');
	$('[href="help.html"]').parent().addClass('on');
	help.initFaqCategories();
});