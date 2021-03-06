/**
 * 商品类别js
 */

var category = {
		initBandName:"",
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
							initBandName = list[i].brandsName;
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
					if(brandName==null){
						brandName = $('.listIndex[attr="terminal_brand_s"]>dd a.selected').attr("attrval");
					}
					$(".resultList> .select").text(brandName+'：');
					var dd = $('.resultList>dd');
					dd.empty();
					dd.append('<a href="javascript:void(0)" onclick="category.focusOnTAG(this,null);"  attrval="all">全部</a>');
					for(var i=0; i<list.length; i++){
						var str = '<a href="javascript:void(0)" id='+list[i].brandsTagsId+' onclick="category.focusOnTAG(this,'+list[i].brandsTagsId+');"'
									+ 'attrval="'+list[i].tagsName+'">'+list[i].tagsName+'</a> ';
						dd.append(str);
					}
					$('.resultList').show();
					if(list.length==0){

						$('.resultList').empty();
						$('.resultList').hide();
					}
				}
			});
		},
		/*获取手机列表*/
		getPhoneList : function(bId,tagId){
			
			var url = '';
			if(bId==0){//获取热门手机
				url = Sys.serviceDomain+"/listHotModels?recordPerPage=10&currentPage=1";
			}else{
				if (tagId==null) {
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage=1";
				}else{
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage=1&tagIds="+tagId;
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
					var recordPerPage = content.recordPerPage;
					var totalPage = content.totalPage;
					var totalRecordCount = content.totalRecordCount;
					//初始化分页条
					if(totalPage > 1){
				    $("#pagination").pagination({
				        items: recordPerPage*totalPage,
				        itemsOnPage: 10,
				        cssStyle: 'light-theme',
				        onPageClick: function(pageNum,event){
				        	category.onPageClick(pageNum,event);
				        }
				    });
				    $("#pagination").show();
				  }
				  else{
				  	$("#pagination").hide();
				  }
				  category.drawPhoneList(list,totalRecordCount);
					category.setButtonClass(1);
				}
			});
		},
		/*获取手机列表--按分页*/
		getPhoneListByPage : function(page){
			var bId = $('.listIndex .selected').attr('id');
			var tagId = null;
			var tag = $('.resultList .selected');
			if(tag != null){//是否选择了全部
				tagId = $(tag).attr('id')
			}
			var url = '';
			if(bId==null){//没有选中品牌
				url = Sys.serviceDomain+"/listHotModels?recordPerPage=10&currentPage="+page;
			}else{
				if(tagId==null||tagId=='undefined'){
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage="+page;
				}else{
					url = Sys.serviceDomain+"/listModelsByTag?recordPerPage=10&brandsId="+bId+"&currentPage="+page+"&tagIds="+tagId;
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
		drawPhoneList : function(list,totalRecordCount){//渲染手机列表
			var totalSum = '<div class="warning">如果你的机型有点老，在回收列表找不到，说明他的价值很低请进行环保回收！ <a href="/valuation_1.html">点击回收</a></div><div class="warning" style="float:right;">该分类共<span class="text-main pl5 pr5" id="resultnumber">' + totalRecordCount + '</span>件</div>';
      $(".hasBeenSelected").html(totalSum); 			
			$('.phone-list').empty();
			for (var i = 0; i < list.length; i++) {
				var monthStr = '';
				var monthPrice = '';
				var monthPricesList = list[i].modelsMonthPricesList;
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
				var str = '<li data-label="'+monthStr+'" data-data="'+monthPrice+'">'
				            +'<a href="/valuation_'+list[i].modelsId+'.html"><img src="'+list[i].modelsImage+'" alt="'+list[i].modelsName+'" width="160" height="160" /></a>'
				            +'<div class="product-info">'
				            +'<div class="fl">'
				            +'<span class="phone-name" title="'+list[i].modelsName+'">'+list[i].modelsName+'</span>'
				            +'<span class="recovery">回收价：<em class="red">￥'+list[i].recyclePrice+'</em></span>'
				            +'<span class="badge">'+list[i].recycleCount+'人回收</span>'
				            +'</div>'
				            +'</div>'
				            +'<a class="index-spr trend-icon"></a> '
				            +'</li>';
				if ((i+1)%5==0) {
					str = '<li data-label="'+monthStr+'" data-data="'+monthPrice+'" class="last">'
			            +'<a href="/valuation_'+list[i].modelsId+'.html"><img src="'+list[i].modelsImage+'" alt="'+list[i].modelsName+'" width="160" height="160" /></a>'
			            +'<div class="product-info">'
			            +'<div class="fl">'
			            +'<span class="phone-name" title="'+list[i].modelsName+'">'+ list[i].modelsName+'</span>'
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
			category.getPhoneList(bId,null);
		},
		//点击了TAG，使其获取焦点,并获取手机信息
		focusOnTAG : function(obj,tagId){
			var bId = $('.listIndex .selected').attr('id');
			var selected = $('.resultList .selected');
			if(selected!=null){
				selected.removeClass('selected');
			}
			$(obj).addClass('selected');
			category.getPhoneList(bId,tagId);
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
		}
}

$(function(){
	$('.nav.wrapper.clearfix li.on').removeClass('on');
	$('[href="/brands_0.html"]').parent().addClass('on');
	var bid = $('#brandId').text();
	category.getHotBrands(bid);
	category.getOtherBrands(bid);
	if(bid!='0'){
		category.getTagList(bid,null);
	}else{
		$(".resultList> .select").empty();
		$(".resultList> dd").empty();
		$(".resultList").hide();
	}
	category.getPhoneList(bid,null);
	
	
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


