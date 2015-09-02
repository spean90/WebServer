var orderDetail = {
	initModelsList : function() {
		$('#itemList').empty();
		var config = {
				url : Sys.serviceDomain+"/detailOwnOneOrders?key="+sessionStorage.token+"&ordersId="+$('#orderId').text(), 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					console.log(content);
					var ordersItemList = content.ordersItemList;
					for(var i=0;i<ordersItemList.length;i++){
						var s = '<tr>'
								+'<td class="checkbox none"><input class="check-one check" type="checkbox"></td>'
							    +'<td class="goods"><img src="'+ordersItemList[i].modelsImage+'" alt=""></td>'
								+'<td class="customer">'+ordersItemList[i].modelsName+'</td>'
								+'<td class="price">'+ordersItemList[i].recyclePrice+'</td>'
								+'<td class="num m_l32">'+ordersItemList[i].quantity+'</td>'
								+'<td class="subtotal">'+content.currency+ordersItemList[i].customersPrice+'</td>'
								+'</tr>';
						$('#itemList').append($(s));
					}
					$('#orderInfo').empty();
					var str ='<td><span>订单编号：</span>'+content.ordersId+'</td>'
						+'<td><span>联系人：</span>'+content.customersPhone+'</td>'
						+'<td><span>下单时间：</span>'+content.ordersDate+'</td>';
					$('#orderInfo').append($(str));
					$('#priceTotal').html(content.currency+content.ordersTotal);
				}
		}
		Modal.jsonp(config);
	},
	initOrderStatus : function(){
		$('#steps').empty();
		$('#stepDiv').empty();
		$("#step-1 tbody").empty();
		var config = {
				url : Sys.serviceDomain+"/listOneOrdersHistory?key="+sessionStorage.token+"&ordersId="+$('#orderId').text(), 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
					//var list = [{"ordersStatusHistoryId":71,"ordersId":96,"ordersStatusId":1,"addedDate":"2015-07-30 10:46:03","customerNotified":0,"ordersStatusName":"未处理"},{"ordersStatusHistoryId":71,"ordersId":97,"ordersStatusId":2,"addedDate":"2015-07-30 10:46:03","customerNotified":0,"ordersStatusName":"未处理2"}];
					//var str = '<li class="flow-box first">' +'<a href="#step-1">订单状态历史</a>' +'</li>'; //导航条
					var str = '';
					for(var i=0;i<list.length;i++){
						var item = list[i];
						var s='';  //总的订单历史现实
						//每步订单详情
						var strDept = '<div id="step-'+(i+2)+'" class="page" style="display: none;">'
			                   +'<div class="tipbox">'
			                   +'<i class="arrow-top"></i>'
			                   +'<table width="100%">'
			                   +'<tbody>'
			                   +'<tr class="first">'
			                   +'<td class="first">当前选中状态：</td>';
						if(i==list.length-1){
							s= '<tr class="first">'
								+'<td class="first">当前订单状态：</td>';
						}else{
							s= '<tr>'
								+'<td >历史订单状态：</td>';
						}
						str = str + '<li class="flow-box">';
						str = str +'<a href="#step-'+(i+2)+'"><span class="round-digit">'+(i+1);
						if(item.ordersStatusId==1){
							str = str + '</span>待处理</a></li>';
							s = s+ ' <td>待处理</td>'
								+ '</tr>';
							strDept = strDept +'<td>待处理</td>';
						}else if(item.ordersStatusId==2){
							str = str + '</span>已发货</a></li>';
							s = s+ ' <td>已发货</td>'
							+ '</tr>';
							strDept = strDept +'<td>已发货</td>'
						}else if(item.ordersStatusId==3){
							str = str + '</span>待检测</a></li>';
							s = s+ ' <td>待检测</td>'
							+ '</tr>';
							strDept = strDept +'<td>待检测</td>'
						}else if(item.ordersStatusId==4){
							str = str + '</span>完成检测</a></li>';
							s = s+ ' <td>完成检测</td>'
							+ '</tr>';
							strDept = strDept +'<td>完成检测</td>'
						}else if(item.ordersStatusId==5){
							str = str + '</span>已回寄</a></li>';
							s = s+ ' <td>已回寄</td>'
							+ '</tr>';
							strDept = strDept +'<td>已回寄</td>'
						}else if(item.ordersStatusId==6){
							str = str + '</span>已退回</a></li>';
							s = s+ ' <td>已退回</td>'
							+ '</tr>';
							strDept = strDept +'<td>已退回</td>'
						}else if(item.ordersStatusId==7){
							str = str + '</span>已取消</a></li>';
							s = s+ ' <td>已取消</td>'
							+ '</tr>';
							strDept = strDept +'<td>已取消</td>'
						}else if(item.ordersStatusId==8){
							str = str + '</span>已收单</a></li>';
							s = s+ ' <td>已收单</td>'
							+ '</tr>';
							strDept = strDept +'<td>已收单</td>'
						}else if(item.ordersStatusId==9){
							str = str + '</span>已回收</a></li>';
							s = s+ ' <td>已回收</td>'
							+ '</tr>';
							strDept = strDept +'<td>已回收</td>'
						}else if(item.ordersStatusId==10){
							str = str + '</span>已评价</a></li>';
							s = s+ ' <td>已评价</td>'
							+ '</tr>';
							strDept = strDept +'<td>已评价</td>'
						}else if(item.ordersStatusId==11){
							str = str + '</span>已结算</a></li>';
							s = s+ ' <td>已结算</td>'
							+ '</tr>';
							strDept = strDept +'<td>已结算</td>'
						}else{
							str = str + '</span>'+item.ordersStatusId+'</a></li>';
							s = s+ ' <td>+item.ordersStatusId+</td>'
							+ '</tr>';
							strDept = strDept +'<td>'+item.ordersStatusId+'</td>'
						}
						s = s+'<tr>'
                            +'<td>操作备注：</td>';
						strDept = strDept +'<tr>'
                        +'<td>操作备注：</td>';
                            if(item.comments!=undefined){
                            	s = s+'<td>'+item.comments+'</td>';
                            	strDept = strDept+'</tr><td>'+item.comments+'</td>';
                            }else{
                            	s = s+'<td>无</td>';
                            	strDept = strDept+'<td>无</td>';
                            }
                            s = s+'</tr>'
                            +'<tr>'
                            +'<td>操作时间：</td>'
                            +'<td>'+item.addedDate+'</td>'
                            +'</tr>';
                            
                            strDept = strDept+'</tr>'
			                   +'<tr>'
			                   +'<td class="first">操作时间：</td>'
			                   +'<td>'+item.addedDate+'</td>'
			                   +'</tr>'
			                   +'</tbody>'
			                   +'</table>'
			                   +'</div>'
			                   +'</div>'
						$('#steps').append($(str));
						$("#step-1 tbody").prepend($(s));
						//$('#stepDiv').append($(strDept));
						str = '';
						console.log(s);
					}
					orderDetail.init();
				}
		}
		Modal.jsonp(config);
	},
	init : function(){
		$('#wizard2').smartWizard(
				  { transitionEffect: "",
				    enableAllSteps: true,
				    enableFinishButtonOnlyLastStep: true,
				   // onFinish:test,  // triggers when Finish button is clicke
				    //onPreviousStep:PreviouStepCallback,
				    //onLeaveStep:leaveAStepCallback, // triggers when leaving a step
				    onShowStep:showStepCallback,  // triggers when showing a step
				   // onFinish: null,  // triggers when Finish button is clicked
				   // onNextStep:NextStepCallback//点击下一步时 触发回调函数
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
				     //var step_num= obj.attr('rel')-1;
				     $('.actionBar').hide();
				  }
				  

				  function test(obj){
					  
				  $('#wizard').smartWizard('showMessage','Finish Clicked');

				  }
	}
}

$(function(){
	orderDetail.initModelsList();
	orderDetail.initOrderStatus();
	//orderDetail.init();
	
});