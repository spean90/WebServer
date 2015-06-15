var mywallet = {
		initMyWallet : function() {
			var config = {
					url : Sys.serviceDomain+"/listOwnRecommendInvoice?recordPerPage=4&key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('.wallet-title .c-red').html('12345');
					}
			}
			Modal.jsonp(config);
		},
		getStatementByPage : function(page) {
			var config = {
					url : Sys.serviceDomain+"/listOwnRecommendInvoice?recordPerPage=5&currentPage="+page+"&key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('#statement tr:gt(0)').remove();
						var str = '';
						for(var i=0; i<list.length;i++){
							var item = list[i];
							var isSettled = item.isSettled;
							str = '<tr>'
								+ '<td>'+item.recommendInvoiceId+'</td>'
								+ '<td>'+item.beginDate+' --  '+item.endDate+'</td>'
								+ '<td>'+item.totalOrderCount+'</td>'
								+ '<td>'+item.totalCount+'</td>'
								+ '<td>￥'+item.totalAmount+'</td>';
							if(isSettled=='0'){
								str = str + '<td class="c-red">未付款</td>'
							}else{
								str = str + '<td class="c-red">已付款</td>'
							}
							str = str + '</tr>';
							$("#statement").append(str);
						}
						var recordPerPage = content.recordPerPage;
						var totalPage = content.totalPage;
						//初始化分页条
					    $("#pagination1").pagination({
					        items: recordPerPage*totalPage,
					        itemsOnPage: 5,
					        currentPage : page,
					        cssStyle: 'light-theme',
					        onPageClick: function(pageNum,event){
					        	mywallet.getStatementByPage(pageNum);
					        }
					    });
					}
			}
			Modal.jsonp(config);
		},
		getDetailByPage : function(page) {
			var config = {
					url : Sys.serviceDomain+"/listOwnRecommendDetailFee?recordPerPage=4&currentPage="+page+"&key="+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('#detail tr:gt(0)').remove();
						var str = '';
						for(var i=0;i<list.length;i++) {
							str = '<tr>'
				                +'<td>'+list[i].ordersId+'</td>'
				                +'<td>'+list[i].customersId+'</td>'
				                +'<td>￥'+list[i].finalPrice+'</td>'
				                +'<td>￥'+list[i].recommendFee+'</td>'
				                +'<td>'+list[i].addedDate+'</td>'
				                +'<td>'+list[i].recommendInvoiceId+'</td>';
							if(list[i].isCharged=='0'){
								str = str + '<td class="c-red">未出账,未打款</td>';
							}else if(list[i].isCharged=='0'){
								str = str + '<td class="c-red">未出账</td>';
							}else if(list[i].isCharged=='0'){
								str = str + '<td class="c-red">已出账,未打款</td>';
							}else{
								str = str + '<td class="c-red">未知状态</td>';
							}
				            str = str + '</tr>';
							$('#detail').append($(str));
						}
						var recordPerPage = content.recordPerPage;
						var totalPage = content.totalPage;
						//初始化分页条
					    $("#pagination").pagination({
					        items: recordPerPage*totalPage,
					        itemsOnPage: 4,
					        cssStyle: 'light-theme',
					        currentPage : page,
					        onPageClick: function(pageNum,event){
					        	mywallet.getDetailByPage(pageNum);
					        }
					    });
					}
			}
			Modal.jsonp(config);
		}

}

//前端写的
tabs($('.tabs'));
$(function(){
	if(sessionStorage.userId==null){
		window.location.href = '/login.html';
	}else{
		//初始化分页条
	    $("#pagination, #pagination1").pagination({
	        items: 40,
	        itemsOnPage: 10,
	        cssStyle: 'light-theme'
	    });
	    mywallet.initMyWallet();
	    mywallet.getStatementByPage(1);//初始化结算单；
	    mywallet.getDetailByPage(1);//初始化详细清单；
	
	}
});