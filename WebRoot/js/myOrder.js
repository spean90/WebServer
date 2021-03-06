/**
 * 订单详情
 */
myOrder = {
		getOrders : function(page,orderType,divIndex){
			$('#reflash').text(page+'_'+orderType+'_'+divIndex);
			$(".tabs-content>div:eq("+divIndex+")").empty();
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
							console.log(">>"+JSON.stringify(item));
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
			                + '<th class="w_96 t_c table_l_line none"></th>'
			                + '<th class="w_456">手机型号</th>'
			                + '<th>商家最高价</th>'
			                + '<th>价格状态</th>'
			                + '<th>回收数量</th>'
			                + '<th class="w_93 t_c table_l_line">金额小计</th>'
			                + '<th class="t_c table_l_line">评估情况</th>'
			                + '<th>订单状态</th>'
			                + '</tr>'
			                + '<tr class="dark">'
			                + '<th class="tx-left" colspan="6"><label> <span class="fb">'+item.ordersDate+'</span></label><span class="order-id">订单号：'+item.ordersId+'</span>　　<a href="/orderDetail_'+item.ordersId+'.html" class="text-main underline">订单详情</a></th>';
							if(item.ordersStatusId==1){
								str = str + '<th class="c-red">待处理</th>';
							}else if(item.ordersStatusId==2){
								str = str + '<th class="c-red">已发货</th>';
							}else if(item.ordersStatusId==3){
								str = str + '<th class="c-red">待检测</th>';
							}else if(item.ordersStatusId==4){
								str = str + '<th class="c-red">完成检测</th>';
							}else if(item.ordersStatusId==5){
								str = str + '<th class="c-red">已回寄 </th>';
							}else if(item.ordersStatusId==6){
								str = str + '<th class="c-red">已退回</th>';
							}else if(item.ordersStatusId==7){
								str = str + '<th class="c-red">已取消</th>';
							}else if(item.ordersStatusId==8){
								str = str + '<th class="c-red">已收单</th>';
							}else if(item.ordersStatusId==9){
								str = str + '<th class="c-red">已回收</th>';
							}else if(item.ordersStatusId==10){
								str = str + '<th class="c-red">已评价</th>';
							}else if(item.ordersStatusId==11){
								str = str + '<th class="c-red">已结算</th>';
							}else{
								str = str + '<th class="c-red">'+item.ordersStatusId+'</th>';
							}
							str = str + '</tr>'
			                + '</thead>'
			                + '<tbody>';
			                for(var j=0; j<ordersItemList.length; j++){
				               str = str + '<tr>'
				                + '<td class="checkbox none"><input class="check-one check" type="checkbox"/></td>'
				                + '<td class="goods"><img src="'+ordersItemList[j].modelsImage+'" alt=""/><span>'+ordersItemList[j].modelsName+'</span></td>'
				                + '<td class="price">'+item.currency+ordersItemList[j].recyclePrice+'</td>'
				                + '<td class="status">价格有效</td>'
				                + '<td class="num m_l32"><span class="reduce none"></span><input class="count-input disable" disabled type="text" value="'+ordersItemList[j].quantity+'"/><span class="add none"></span></td>'
				                + '<td class="subtotal">'+item.currency+ordersItemList[j].customersPrice+'</td>'
				                + '<td><a href="javascript:;" onclick="myOrder.showAssessDetail('+ordersItemList[j].customersBasketId+')" class="underline text-main">评估详情</a></td>'
				                + '<td></td>'
				                + '</tr>'
				                sum = sum+ordersItemList[j].customersPrice;
				                count+=1;
			                }
			                sum = sum+item.shippingFee;
			                str = str + '</tbody>'
			                + '</table>'
			                + '<div class="foot" id="foot">'
			                //+ '<label class="fl select-all none"><input type="checkbox" class="check-all check"/>&nbsp;全选</label>'
			                + '<a class="fl delete none" id="deleteAll" href="javascript:;">删除</a>'
			                + '<div class="fr total"><span class="sf shippingFee_span'+item.transactionType+'">运费补贴：<span class="price">'+item.shippingFee+'</span>&nbsp;&nbsp;&nbsp;</span>合计：'+item.currency+'<span id="priceTotal">'+sum+'</span></div>'
			               // + '<div class="fr selected" id="selected">共<span id="selectedTotal">'+count+'</span>件<span class="arrow up none">︽</span><span class="arrow down none">︾</span></div>'
			                + '<div class="selected-view none">'
			                + '<div id="selectedViewList" class="clearfix">'
			                + '<div><img src="images/1.jpg"><span>取消选择</span></div>'
			                + '</div>'
			                + '</div>'
			                + '</div>'
			                + '<table class="order-table" style="margin-top: -10px;">'
			                + '<tr class="item">'
			                + '<td colspan="6" class="tx-right">';
			                if(item.ordersStatusId=="1"){
			                	//未处理 
			                	if(item.transactionType == '1'){
			                		str = str + '<a href="#" onclick="myOrder.showOrderOper('+item.ordersId+',2);" class="btn-radius">客户发货</a> &nbsp;';
			                	}
			                	str = str + '<a href="#" class="btn-radius" onclick="myOrder.showOrderOper('+item.ordersId+',7);">　取消　</a> &nbsp;';
			                }else if(item.ordersStratusId=="5"){
			                	//已回寄
			                	str = str  + '<a href="#" onclick="myOrder.showOrderOper('+item.ordersId+');" class="btn-radius">完成回退</a> &nbsp;';
			                }else if(item.ordersStratusId=="6" || item.ordersStratusId=="7"){
			                	//已回寄
			                	str = str  + '<a href="#" onclick="myOrder.showAssessment('+item.ordersId+');" class="btn-radius">评价</a> &nbsp;';
			                }
			                //str = str  + '<a href="#" onclick="myOrder.showAssessment('+item.ordersId+');" class="btn-radius">评价</a> &nbsp;';
			               str = str + '</td>'
			                + '</tr>'
			                + '</table>'
			                + '</div>';
							$(".tabs-content>div:eq("+divIndex+")").append($(str));
							str = null;
						}
						str = '<div class="mt-30">'
			                //+ '<label><input type="checkbox" /> 全选</label>'
			                + '<div id="pagination" class="page mt-30 fr"></div>'
			                + '</div>';
						$(".tabs-content>div:eq("+divIndex+")").append($(str));
						$('.sf').hide();
						$('.shippingFee_span1').show();
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
		},
		showAssessment : function(ordersId){
			var placeholder = '请输入评价相关信息，以便我们进一笔改进服务 ';
			var submit = function (v, h, f) {
				if (f.satisty == undefined) {
			        $.jBox.tip('请选择满意度', 'error', { focusId: "satisty" }); // 关闭设置 yourname 为焦点
			        return false;
			    }
			    if (f.message == '') {
			        $.jBox.tip(placeholder, 'error', { focusId: "message" }); // 关闭设置 yourname 为焦点
			        return false;
			    }
			    var data = {
						ordersId : ordersId,
						ordersStatusId : 10,
						customersReviews : f.message,
						reviewsLevel : f.satisty,
						key : sessionStorage.token
				}
				var config = {
						url : Sys.serviceDomain+"/addOneCustomersReviews",
						callbackParameter: "callback",
						data : data,
						success : function(data){ 
							if (data.msg.code!="0000") {
								$.jBox.tip("提交操作失败!");
								return;
							}
							$.jBox.tip("操作成功");
							$('#reflash', window.top.document).click();
						}
				}
				Modal.jsonp(config);
			    return true;
			};
			//$(this).modal('/orderOperPop_'+ordersId+'_'+status+'.html', 'orderOperPopId')
			//jBox.open('iframe:/orderOperPop_'+ordersId+'_'+status+'.html', "订单操作", 925, 500, { buttons: {}, persistent: false,showIcon:false,top:'10%' });
			var html1 = '<div class="msg-div" style="padding:10px">' +
            '<p>订单评价：</p><div class="green-radio"> <label><input type="radio" name="satisty" value="3" /> <span>非常满意</span></label> &nbsp;<label><input type="radio" name="satisty" value="2" /> <span>满意</span></label> &nbsp;<label><input type="radio" name="satisty" value="1" /> <span>一般</span></label> &nbsp; <label><input type="radio" name="satisty" value="0" /> <span>不满意</span></label>  </div><p class="mt-20">评价说明：</p><div class="field"><textarea id="message" name="message" style="width:  380px;height: 60px"></textarea></div>' +'</div>';
           $.jBox(html1, { title: "评价订单", submit: submit });
   		$('textarea').attr('placeholder',placeholder);
		},
		showOrderOper : function(ordersId,status){
			var placeholder = '';
			
			   if(status==2){
				 placeholder = '请输入发货的物流公司及物流单号相关信息';
	    		}else if(status==7){
	    			placeholder = '请输入取消订单的原因';
	    		}
	    		else if(status==6){
	    			placeholder = '请输入需要补充反馈的信息';
	    		}
	    		else if(status==10){
	    			placeholder = '请输入评价相关信息，以便我们进一笔改进服务 ';
	    		}
			
			var submit = function (v, h, f) {
			    if (f.message == '') {
			        $.jBox.tip(placeholder, 'error', { focusId: "message" }); // 关闭设置 yourname 为焦点
			        return false;
			    }
			    var data = {
						ordersId : ordersId,
						ordersStatusId : status,
						comments : f.message
				}
				var config = {
						url : Sys.serviceDomain+'/updateOwnOrdersStatus?key='+sessionStorage.token,
						callbackParameter: "callback",
						data : data,
						success : function(data){ 
							if (data.msg.code!="0000") {
								$.jBox.tip("提交操作失败!");
								return;
							}
							$.jBox.tip("操作成功");
							$('#reflash', window.top.document).click();
						}
				}
				Modal.jsonp(config);
			    return true;
			};
			//$(this).modal('/orderOperPop_'+ordersId+'_'+status+'.html', 'orderOperPopId')
			//jBox.open('iframe:/orderOperPop_'+ordersId+'_'+status+'.html', "订单操作", 925, 500, { buttons: {}, persistent: false,showIcon:false,top:'10%' });
			 var html1 = '<div class="msg-div" style="padding:10px">' +
             '<p>订单操作提示：</p><p>亲你是否要修改订单状态?</p><p>操作说明：</p><div class="field"><textarea id="message" name="message" style="width: 380px;height: 60px"></textarea></div>' +'</div>';
            $.jBox(html1, { title: "订单操作", submit: submit });
    		$('textarea').attr('placeholder',placeholder);
		},
		showAssessDetail : function(customersBasketId) {
			
            jBox.open('iframe:/assessDetails_'+customersBasketId+'.html', "评估详情", 925, 500, { buttons: {}, persistent: false,showIcon:false,top:'10%' });
			
		},
		reflash : function(){
			var reflashText = $('#reflash').text();
			var arr = reflashText.split('_');
			myOrder.getOrders(arr[0],arr[1],arr[2]);
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
	  
	  $('.tabs-label').children('li').eq(0).addClass('active');
	  myOrder.getOrders(1,1,1);//'待处理'
});
