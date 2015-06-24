/**
 * 订单详情
 */
myOrder = {
		getOrders : function(page,orderType,divIndex){
			var config = {
					url : Sys.serviceDomain+"/listMyOrders?recordPerPage=2&currentPage="
						+ page + "&key=" + sessionStorage.token
						+ "&ordersStatusId="+orderType, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$(".tabs-content>div:eq("+divIndex+")").empty();
						var str = '';
						var item;
						var ordersItemList;
						for(var i=0;i<list.length;i++) {
							item = list[i];
							ordersItemList = list[i].ordersItemList;
							if(i==0){
								str = '<div class="catbox order-table">';
							}else{
								str = '<div class="catbox order-table mt-30">';
							}
							var sum = 0;
							var count = 0;
							str = str + '<table>'
			                + '<thead>'
			                + '<tr>'
			                + '<th class="w_96 t_c table_l_line none"><label><input class="check-all check" type="checkbox"/>&nbsp;全选</label></th>'
			                + '<th class="w_456">手机型号</th>'
			                + '<th>商家最高价</th>'
			                + '<th>价格状态</th>'
			                + '<th>回收数量</th>'
			                + '<th class="w_93 t_c table_l_line">金额小计</th>'
			                + '<th class="t_c table_l_line">评估情况</th>'
			                + '<th>订单状态</th>'
			                + '</tr>'
			                + '<tr class="dark">'
			                + '<th class="tx-left" colspan="6"><label><input type="checkbox" /> <span class="fb">2015-04-26</span></label><span class="order-id">订单号：'+item.ordersId+'</span>　　<a href="/orderDetail.html" class="underline">订单详情</a></th>'
			                + '<th class="c-red">待处理</th>'
			                + '</tr>'
			                + '</thead>'
			                + '<tbody>';
			                for(var j=0; j<ordersItemList.length; j++){
				               str = str + '<tr>'
				                + '<td class="checkbox none"><input class="check-one check" type="checkbox"/></td>'
				                + '<td class="goods"><img src="'+ordersItemList[j].modelsImage+'" alt=""/><span>'+ordersItemList[j].modelsName+'</span></td>'
				                + '<td class="price">'+item.currency+item.currencyValue+'</td>'
				                + '<td class="status">价格有效</td>'
				                + '<td class="num m_l32"><span class="reduce none"></span><input class="count-input disable" disabled type="text" value="'+ordersItemList[j].quantity+'"/><span class="add none"></span></td>'
				                + '<td class="subtotal">'+item.currency+ordersItemList[j].recyclePrice+'</td>'
				                + '<td><a href="javascript:;" class="underline">评估详情</a></td>'
				                + '<td></td>'
				                + '</tr>'
				                sum = sum+ordersItemList[j].recyclePrice;
				                count+=1;
			                }
			                str = str + '</tbody>'
			                + '</table>'
			                + '<div class="foot" id="foot">'
			                + '<label class="fl select-all none"><input type="checkbox" class="check-all check"/>&nbsp;全选</label>'
			                + '<a class="fl delete none" id="deleteAll" href="javascript:;">删除</a>'
			                + '<div class="fr total">合计：￥<span id="priceTotal">'+sum+'</span></div>'
			                + '<div class="fr selected" id="selected">共<span id="selectedTotal">'+count+'</span>件<span class="arrow up none">︽</span><span class="arrow down none">︾</span></div>'
			                + '<div class="selected-view none">'
			                + '<div id="selectedViewList" class="clearfix">'
			                + '<div><img src="images/1.jpg"><span>取消选择</span></div>'
			                + '</div>'
			                + '</div>'
			                + '</div>'
			                + '<table class="order-table" style="margin-top: -10px;">'
			                + '<tr class="item">'
			                + '<td colspan="6" class="tx-right">'
			                + '<a href="#" class="btn-radius">客户发货</a> &nbsp;'
			                + '<a href="#" class="btn-radius">　取消　</a> &nbsp;'
			                + '<a href="#" class="btn-radius">　评价　</a> &nbsp;'
			                + '</td>'
			                + '</tr>'
			                + '</table>'
			                + '</div>';
							$(".tabs-content>div:eq("+divIndex+")").append($(str));
							str = null;
						}
						str = '<div class="mt-30">'
			                + '<label><input type="checkbox" /> 全选</label>'
			                + '<div id="pagination" class="page mt-30 fr"></div>'
			                + '</div>';
						$(".tabs-content>div:eq("+divIndex+")").append($(str));
						var recordPerPage = content.recordPerPage;
						var totalPage = content.totalPage;
						//初始化分页条
					    $("#pagination").pagination({
					        items: recordPerPage*totalPage,
					        itemsOnPage: recordPerPage,
					        cssStyle: 'light-theme',
					        currentPage : page,
					        onPageClick: function(pageNum,event){
					        	myOrder.getOrders(pageNum,orderType,divIndex);
					        }
					    });
					}
			}
			Modal.jsonp(config);
		}
		
};

function tabs(obj){
	obj.children('.tabs-label').find('a').click(function(e){
		e.preventDefault();
		_index = $(this).parent().index();
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.tabs-label').siblings('.tabs-content').children('div:eq(' + _index + ')').show().siblings().hide();
		$(this).parents('.tabs-label').siblings('.tabs-content').children('div').empty();
		if(_index==0){
			myOrder.getOrders(1,1,_index);//'全部'
		}else if(_index==1){
			myOrder.getOrders(1,2,_index);//'待处理'
		}else if(_index==2){
			myOrder.getOrders(1,3,_index);//'回收成功'
		}else if(_index==3){
			myOrder.getOrders(1,4,_index);//'回收失败'
		}
		
	});
}

$(function(){
	tabs($('.tabs'));

	  $('#wizard2').smartWizard(
	  { transitionEffect: "",
	    enableAllSteps: true,
	    enableFinishButtonOnlyLastStep: true,
	    onFinish:test,  // triggers when Finish button is clicke
	    onPreviousStep:PreviouStepCallback,
	    onLeaveStep:leaveAStepCallback, // triggers when leaving a step
	    onShowStep:showStepCallback,  // triggers when showing a step
	    onFinish: null,  // triggers when Finish button is clicked
	    onNextStep:NextStepCallback//点击下一步时 触发回调函数
	  });
	  function PreviouStepCallback(obj){
	   var step_num= obj.attr('rel'); 
	   // $('#wizard_ul [rel = '+step_num+']').removeClass("do");
	   return true;
	  }
	  function NextStepCallback(obj){
	     var step_num= obj.attr('rel'); 
	     return true;
	  }

	  function leaveAStepCallback(obj){
	         var step_num= obj.attr('rel'); 
	         // alert(step_num);
	       
	       var finishbutton = true;
	       $('.page dl dd').each(function(){
	        if($(this).attr('name')==='radio')
	        {
	           if($(this).parent().find('.property_title').hasClass('selected')==false)
	            {
	              finishbutton = false;
	              return false;
	            }
	        }
	       });
	      if(finishbutton){
	       $('.buttonFinish').removeClass("buttonDisabled");
	      }
	        return true;
	  }
	  function showStepCallback(obj){
	      var step_num= obj.attr('rel')-1;
	      $('.actionBar').hide();
	    
	  }
	  function test(obj){
	    // $('#wizard').smartWizard('skipTo',3)
	  $('#wizard').smartWizard('showMessage','Finish Clicked');

	  }
	  
	  
	  myOrder.getOrders(1,1,1);//'待处理'
});
