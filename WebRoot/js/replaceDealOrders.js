var replaceDealOrders = {
		 initOrderList : function(pageNum){
			 $('#orderList').empty();
			 var config = {
						url : Sys.serviceDomain+"/listMyInsteadOrders?recordPerPage=4&currentPage="+pageNum+"&userId="+$('.search-txt').val()+"&key="+sessionStorage.token, 
						callbackParameter: "callback",
						success : function(data){ 
							if (data.msg.code!="0000") {
								return;
							}
							var content = data.content;
							var list = content.list;
							for(var i=0;i<list.length;i++){
								var item = list[i];
								var ordersItemList = list[i].ordersItemList;
								var sum = 0;
								var count = 0;
								var str = '<div class="catbox order-table">'
								      	+'<table class="cartTable">'
								      	+'<thead>'
								      	+'<tr>'
								      	+'<th class="w_96 t_c table_l_line none"><label><input class="check-all check" type="checkbox"/>&nbsp;全选</label></th>'
								      	+'<th class="w_456 tx-left">　手机型号</th>'
								      	+'<th>下单客户</th>'
								      	+'<th>最高报价</th>'
								      	+'<th>价格状态</th>'
								      	+'<th>实际回收数量</th>'
								      	+'<th class="w_93 t_c table_l_line">实际回收金额</th>'
								      	+'<th class="t_c table_l_line">评估情况</th>'
								      	+'<th>订单状态</th>'
								      	+'</tr>'
								      	+'<tr class="dark">'
								      	+'<th class="tx-left" colspan="7"><label><input type="checkbox" /> <span class="fb">'+item.ordersDate+'</span></label><span class="order-id">订单号：'+item.ordersId+'</span>　　<a href="/orderDetail_'+item.ordersId+'.html" class="underline">订单详情</a>　</th>';//　<i class="icon-rob"></i>
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
								      	str = str +'</tr>'
								      	+'</thead>'
								      	+'<tbody>';
								      	
								      	 for(var j=0; j<ordersItemList.length; j++){
								               str = str + '<tr>'
								                + '<td class="checkbox none"><input class="check-one check" type="checkbox"/></td>'
								                + '<td class="goods"><img src="'+ordersItemList[j].modelsImage+'" alt=""/><span>'+ordersItemList[j].modelsName+'</span></td>'
								                + '<td>'+item.customersPhone+'</td>'
								                + '<td class="price">'+item.currency+ordersItemList[j].recyclePrice+'</td>'
								                + '<td class="status">价格有效</td>'
								                + '<td class="num m_l32"><span class="reduce none"></span><input class="count-input disable" disabled type="text" value="'+ordersItemList[j].quantity+'"/><span class="add none"></span></td>'
								                + '<td class="subtotal">'+item.currency+ordersItemList[j].customersPrice+'</td>'
								                + '<td><a href="javascript:;" onclick="replaceDealOrders.showAssessDetail('+ordersItemList[j].customersBasketId+')" class="underline">评估详情</a></td>'
								                + '<td></td>'
								                + '</tr>'
								                sum = sum+ordersItemList[j].customersPrice;
								                count+=1;
							                }
								      	 str = str + '</tbody>'
							                + '</table>'
							                + '<div class="foot" id="foot">'
							                + '<label class="fl select-all none"><input type="checkbox" class="check-all check"/>&nbsp;全选</label>'
							                + '<a class="fl delete none" id="deleteAll" href="javascript:;">删除</a>'
							                + '<div class="fr total">合计：'+item.currency+'<span id="priceTotal">'+sum+'</span></div>'
							                + '<div class="fr selected" id="selected">共<span id="selectedTotal">'+count+'</span>件<span class="arrow up none">︽</span><span class="arrow down none">︾</span></div>'
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
								      		 str = str + '<a href="#" onclick="replaceDealOrders.dealOrder('+item.ordersId+')" class="btn-radius">完成收单</a>　　<a href="javascript:;" onclick="replaceDealOrders.cancelOrder('+item.ordersId+')" class="btn-radius">取消订单</a>　&nbsp;';
										      	 
								      	 }
								      	str = str +'</td>'
								      	+'</tr>'
								      	+'</table>'
								      	+'</div>';
								$('#orderList').append($(str));
								var recordPerPage = content.recordPerPage;
								var totalPage = content.totalPage;
								//初始化分页条
							    $("#pagination").pagination({
							        items: recordPerPage*totalPage,
							        itemsOnPage: 4,
							        cssStyle: 'light-theme',
							        currentPage : pageNum,
							        onPageClick: function(pageNum,event){
							        	replaceDealOrders.initOrderList(pageNum);
							        }
							    });
							}
						}
				}
			 Modal.jsonp(config);
		 },
		dealOrder : function(orderId){
			$(this).modal('/dealOrder_'+orderId+'.html', '完成收单')
		},
		cancelOrder : function(orderId){
			$(this).modal('/orderOperPop_'+orderId+'.html', '订单操作')
		},
		showAssessDetail : function(customersBasketId) {
			$(this).modal('/assessDetails_'+customersBasketId+'.html', '评估详情')
		},
		search : function(){
			replaceDealOrders.initOrderList(1);
		}
}

$(function(){
	replaceDealOrders.initOrderList(1);
})