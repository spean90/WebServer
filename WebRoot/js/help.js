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
						var str = ' <dl class="on"><dt onclick="help.listFaqOfCategories()"><i class="icon-help"></i>常见问题</dt> </dl>';
						$('.help-left.clearfix').append(str);
						for(var i=0; i<list.length; i++){
							var item = list[i];
							str = '<dl id="'+list[i].faqCategoriesId+'">' 
							+ '<dt><i class="icon-help"></i>'+list[i].faqCategoriesName+'</dt>'; 
							for(var j=0;j<item.faqList.length;j++){
								str+='<dd><a href="javascript:;">'+item.faqList[j].faqName+'</a></dd>';
							}
							str += '</dl>';
							$('.help-left.clearfix').append(str);
						}

						  help.helpNav();
						  $('.help-left dt:eq(0)').click();
					}
			};
			Modal.jsonp(config);
		},
		listFaqOfCategories : function(obj,id){
			var config = {
					url : Sys.serviceDomain+"/listFaqOfCategories?faqId="+id, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$(obj).parent('dl').children('dd').remove();
						$(".help-right").empty();
						//var list = [{"faqId":9,"faqCategoriesId":2,"addedDate":"2015-05-11","faqName":"问题9"+"-"+id,"faqDescription":"问题描述9"},{"faqId":10,"faqCategoriesId":2,"addedDate":"2015-05-11","faqName":"问题10","faqDescription":"问题描述10"},{"faqId":8,"faqCategoriesId":2,"addedDate":"2015-05-11","faqName":"问题8","faqDescription":"问题描述8"},{"faqId":7,"faqCategoriesId":2,"addedDate":"2015-05-11","faqName":"问题7","faqDescription":"问题描述7"}];
						var str = '';
						for(var i=0; i<list.length; i++){
							str = '<dd><a href="javascript:;">'+list[i].faqName+'</a></dd>';
							$(obj).parent('dl').append(str);
							str = '<div class="help-title">'+list[i].faqName+'</div>' 
								+ '<p class="c-black">'+list[i].faqName+'</p>' 
								+ '<p>'+list[i].faqDescription+'</p>' 
								+ '<br />';
							$(".help-right").append(str);
						}
					}
			};
			Modal.jsonp(config);
		},
		helpNav : function(){
			$('.help-left dt').click(function(){
				$(this).parent('dl').toggleClass('on');
				//help.listFaqOfCategories($(this),$(this).parent('dl').attr('id'));
			});
		}
};

$(function(){
	$('.nav.wrapper.clearfix li.on').removeClass('on');
	$('[href="help.html"]').parent().addClass('on');
	  help.initFaqCategories();
});