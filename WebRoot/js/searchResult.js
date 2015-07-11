/**
 * 商品类别js
 */

var category = {
		/*获取热门品牌*/
		getHotBrands:function (bId){
			$.jsonp({
				url : Sys.serviceDomain+"/listHotBrands?currentPage=0",
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
					var dd = $('.listIndex[attr="terminal_brand_s"]>dd');
					dd.empty();
					for(var i=0; i<list.length; i++){
						var str = '';
						if(bId==list[i].brandsId){
							str = str + '<a href="javascript:void(0)" id="'+list[i].brandsId+'"  onclick="category.focusOnBrand(this,'+list[i].brandsId+',\''+list[i].brandsName+'\');" attrval="'+list[i].brandsName+'" class="selected"><span>'+list[i].brandsName+'</span>('+list[i].modelsCount+')</a>';
						}else{
							str = str + '<a href="javascript:void(0)" id="'+list[i].brandsId+'"  onclick="category.focusOnBrand(this,'+list[i].brandsId+',\''+list[i].brandsName+'\');" attrval="'+list[i].brandsName+'"><span>'+list[i].brandsName+'</span>('+list[i].modelsCount+')</a>';
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
				url : Sys.serviceDomain+"/listHotBrands?currentPage=0&isHot=0",
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
					var dd = $('.listIndex[attr="其他品牌"]>dd');
					dd.empty();
					for(var i=0; i<list.length; i++){
						var str = '';
						if(bId==list[i].brandsId){
							str = str + '<a href="javascript:void(0)" id="'+list[i].brandsId+'" onclick="category.focusOnBrand(this,'+list[i].brandsId+',\''+list[i].brandsName+'\');"  attrval="'+list[i].brandsName+'" class="selected"><span>'+list[i].brandsName+'</span>('+list[i].modelsCount+')</a>';
						}else{
							str = str + '<a href="javascript:void(0)" id="'+list[i].brandsId+'" onclick="category.focusOnBrand(this,'+list[i].brandsId+',\''+list[i].brandsName+'\');"  attrval="'+list[i].brandsName+'"><span>'+list[i].brandsName+'</span>('+list[i].modelsCount+')</a>';
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
		getTagList : function(bId,bName){
			//alert('/*获取具体品牌下TAG*/'+bId);
			$.jsonp({
				url : Sys.serviceDomain+"/listOneBrandsAllTags?brandsId="+bId+"&currentPage=0",
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
					var brandName = bName;
					$(".resultList> .select").text(brandName+'：');
					var dd = $('.resultList>dd');
					dd.empty();
					dd.append('<a href="javascript:void(0)" onclick="category.focusOnTAG(this,null);"  attrval="all">全部</a>');
					for(var i=0; i<list.length; i++){
						var str = '<a href="javascript:void(0)" id='+list[i].brandsTagsId+' onclick="category.focusOnTAG(this,'+list[i].brandsTagsId+');"'
									+ 'attrval="'+list[i].tagsName+'">'+list[i].tagsName+'</a> ';
						dd.append(str);
					}
				}
			});
		},
		/*获取手机列表*/
		getPhoneList : function(bId,tagId,keyword){
			
			var url = '';
			if(bId==0){
				url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&currentPage=1&keywords="+keyword;
			}else{
				if (tagId==null) {
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage=0&keywords="+keyword;
				}else{
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage=0&tagIds="+tagId+"&keywords="+keyword;
				}
			}
			//console.log(url);
			$.jsonp({
				url : url,
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
					var recordPerPage = content.recordPerPage;
					var totalPage = content.totalPage;
					//初始化分页条
				    $("#pagination").pagination({
				        items: recordPerPage*totalPage,
				        itemsOnPage: 10,
				        cssStyle: 'light-theme',
				        onPageClick: function(pageNum,event){
				        	category.onPageClick(pageNum,event);
				        }
				    });
				    category.drawPhoneList(list);
					category.setButtonClass(1);
				}
			});
		},
		/*获取手机列表--按分页*/
		getPhoneListByPage : function(page){
			var keyword = $("#keyword").html();
			var bId = $('.listIndex .selected').attr('id');
			var tagId = null;
			var tag = $('.resultList .selected');
			if(tag != null){//是否选择了全部
				tagId = $(tag).attr('id')
			}
			var url = '';
			if(bId==null){//没有选中品牌
				url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&currentPage="+page+"&keywords="+keyword;
			}else{
				if(tagId==null||tagId=='undefined'){
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage="+page+"&keywords="+keyword;
				}else{
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage="+page+"&tagIds="+tagId+"&keywords="+keyword;
				}
			}
			$.jsonp({
				url : url,
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
				    category.drawPhoneList(list);
				}
			});
		},
		drawPhoneList : function(list){//渲染手机列表
			$('.phone-list').empty();
			for (var i = 0; i < list.length; i++) {
				var monthStr = '';
				var monthPrice = '';
				var monthPricesList = list[i].modelsMonthPricesList;
				if(monthPricesList){
					monthPricesList.sort(function (a, b) {
						  if (a.priceMonth > b.priceMonth) {
						    return 1;
						  }
						  if (a.priceMonth < b.priceMonth) {
						    return -1;
						  }
						  return 0;
						});
					for (var j = 0; j < monthPricesList.length; j++) {
						monthStr += ','+parseInt(monthPricesList[j].priceMonth.substring(4))+'月';
						monthPrice += ','+monthPricesList[j].customerAvgPrice;
					}
					monthStr = monthStr.substring(1);
					monthPrice = monthPrice.substring(1);
				}
				
				var str = '<li data-label="'+monthStr+'" data-data="'+monthPrice+'">'
				            +'<a href="/valuation_'+list[i].modelsId+'.html"><img src="'+list[i].modelsImage+'" alt="'+list[i].modelsNickname+'" width="160" height="160" /></a>'
				            +'<div class="product-info">'
				            +'<div class="fl">'
				            +'<span class="phone-name">'+list[i].modelsNickname+'</span>'
				            +'<span class="recovery">回收价：<em class="red">￥'+list[i].recyclePrice+'</em></span>'
				            +'<span class="badge">'+list[i].recycleCount+'人回收</span>'
				            +'</div>'
				            +'</div>'
				            +'<a class="index-spr trend-icon"></a> '
				            +'</li>';
				if ((i+1)%5==0) {
					str = '<li data-label="'+monthStr+'" data-data="'+monthPrice+'" class="last">'
			            +'<a href="/valuation_'+list[i].modelsId+'.html"><img src="'+list[i].modelsImage+'" alt="'+list[i].modelsNickname+'" width="160" height="160" /></a>'
			            +'<div class="product-info">'
			            +'<div class="fl">'
			            +'<span class="phone-name">'+list[i].modelsNickname+'</span>'
			            +'<span class="recovery">回收价：<em class="red">￥'+list[i].recyclePrice+'</em></span>'
			            +'<span class="badge">'+list[i].recycleCount+'人回收</span>'
			            +'</div>'
			            +'</div>'
			            +'<a class="index-spr trend-icon"></a> '
			            +'</li>';
				}
				var phone = $(str);
				$('.phone-list').append(phone);
			}
			phoneList();
		},
		//点击了品牌，使其获取焦点，并获取TAG及手机信息
		focusOnBrand : function(obj,bId,bName){
			var selected = $('.listIndex .selected');
			if(selected!=null){
				selected.removeClass('selected');
			}
			$(obj).addClass('selected');
			category.getTagList(bId,bName);
			var keyword = $("#keyword").html();
			category.getPhoneList(bId,null,keyword);
		},
		//点击了TAG，使其获取焦点,并获取手机信息
		focusOnTAG : function(obj,tagId){
			var bId = $('.listIndex .selected').attr('id');
			var selected = $('.resultList .selected');
			if(selected!=null){
				selected.removeClass('selected');
			}
			$(obj).addClass('selected');
			var keyword = $("#keyword").html();
			category.getPhoneList(bId,tagId,keyword);
		},
		//点击分页，重新获取数据
		onPageClick:function(pageNumber, event){
			category.getPhoneListByPage(pageNumber);
			category.setButtonClass(pageNumber);
		},
		//上一页,下一页
		onChangePage : function(){
			var id = $(this).attr('id')
			var reqPage = $("#pagination").pagination('getCurrentPage');
			if(id=='filter_pager_prev'){//点击了上一页
				reqPage = reqPage-1;
				$("#pagination").pagination('prevPage');
			}else{//点击了下一页
				reqPage = reqPage+1;
				$("#pagination").pagination('nextPage');
			}
			category.setButtonClass(reqPage);
		},
		//设置上一页，下一页按样式
		setButtonClass:function(reqPage){
		    var PagesCount = $("#pagination").pagination('getPagesCount');
		    if(reqPage==1){
		    	$("#filter_pager_prev").attr("class","disabled");
		    }else{
		    	$("#filter_pager_prev").attr("class","");
		    }
		    if(reqPage==PagesCount){
		    	$("#filter_pager_next").attr("class","disabled");
		    }else{
		    	$("#filter_pager_next").attr("class","");
		    }
		}/*,
		getPhoneListBySearch : function(keyword){

			var url = Sys.serviceDomain+"/searchModels?recordPerPage=10&currentPage=1&keywords="+keyword;
			$.jsonp({
				url : url,
				callbackParameter : "callback",
				success : function(data){
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
					var recordPerPage = content.recordPerPage;
					var totalPage = content.totalPage;
					//初始化分页条
				    $("#pagination").pagination({
				        items: recordPerPage*totalPage,
				        itemsOnPage: 10,
				        cssStyle: 'light-theme',
				        onPageClick: function(pageNum,event){
				        	category.onPageClick(pageNum,event);
				        }
				    });
				    category.drawPhoneList(list);
					category.setButtonClass(1);
				}
			});
		}*/
}

$(function(){
	var keyword = $("#keyword").html();
	$("#search-bar").val(keyword);
	$('[href="/brands_0.html"]').parent().addClass('on');
	var bid = $('#brandId').text();
	var keyword = $('#keyword').text();
	category.getHotBrands(bid);
	category.getOtherBrands(bid);
	if(bid!='0'){
		category.getTagList(bid);
	}else{
		$(".resultList> .select").empty();
		$(".resultList> dd").empty();
	}
	category.getPhoneList(bid,null,keyword);
	//category.getPhoneListBySearch(keyword);
	
/*	 $("#pagination").pagination({
	        items: 100,
	        itemsOnPage: 10,
	        cssStyle: 'light-theme',
	        onPageClick: function(pageNum,event){
	        	category.onPageClick(pageNum,event);
	        }
	    });*/
	//注册上一页，下一页按钮点击事件
	$("#filter_pager_prev").click(category.onChangePage);
	$("#filter_pager_next").click(category.onChangePage);
});


