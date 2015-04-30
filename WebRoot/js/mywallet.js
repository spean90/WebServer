var mywallet = {
		initMyWallet : function() {
			var config = {
					url : Sys.serviceDomain+"/listCustomersReviewsOrder?recordPerPage=4", 
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
					url : Sys.serviceDomain+"/listHotModels?recordPerPage=5&currentPage="+page, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						var list = content.list;
						$('#statement tr:gt(0)').remove();
						var str = '';
						for(var i=0;i<list.length;i++) {
							str = '<tr>'
								+'<td>ehs324654</td>'
								+'<td>2015-03-01 --  2015-03-30</td>'
								+'<td>'+list[i].modelsId+'</td>'
								+'<td>200</td>'
								+'<td>￥800</td>'
								+'<td class="c-red">未付款</td>'
								+'</tr>';
							$('#statement').append($(str));
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
					url : Sys.serviceDomain+"/listHotModels?recordPerPage=4&currentPage="+page, 
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
				                +'<td>ehs324654</td>'
				                +'<td>1778877657</td>'
				                +'<td>￥400</td>'
				                +'<td>￥200</td>'
				                +'<td>2014-04-23  12:32:21</td>'
				                +'<td>'+list[i].modelsId+'</td>'
				                +'<td class="c-red">未出帐</td>'
				                +'</tr>';
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
	//初始化分页条
    $("#pagination, #pagination1").pagination({
        items: 40,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
    
    mywallet.initMyWallet();
    mywallet.getStatementByPage(1);//初始化结算单；
    mywallet.getDetailByPage(1);//初始化详细清单；
    
});