/**
 * 回收车结算
 */
var myRetrieveCar = {
		initRetrieveCar : function(){
			$('tbody').empty();
			var config = {
					url : Sys.serviceDomain+"/listUserOwnBasket?key="+sessionStorage.token+"&customersBasketId="+$('#customersBasketId').text(), 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						if (data.content.list==null||data.content.list.length==0) {
							console.log('回收车中还没有商品呦，赶紧去看看吧！');
						}else {
							$('tbody').empty();
							var list = data.content.list;
							var str = '';
							for (var i = 0; i < list.length; i++) {
								var item = list[i];
								str = '<tr id="'+item.customersBasketId+'">'
									  + '<td class="checkbox"><input class="check-one check" type="checkbox"/></td>'
									  + '<td class="goods"><img src="'+item.modelsImage+'" alt=""/><span>'+item.modelsName+'</span></td>'
									  + '<td class="price">'+item.lastEvaluationPrice+'</td>'
									  + '<td class="status">价格有效</td>'
									  + '<td class="num m_l32"><input class="count-input disable" disabled type="text" value="1"/></td>'
									  + '<td class="subtotal">'+item.lastEvaluationPrice+'</td>'
									  + '<td class="operation">'
									  + '<span class="delete" onclick=toolBar.removeFromCar('+item.customersBasketId+')>删除</span>'
									  + '<span class="reprice">重新询价</span>'
									  + '</td>'
									  + '</tr>';
								$('tbody').append($(str));
							}
							onloadCar();//❤重新加载购物车内容❤
						}
					}
			}
			Modal.jsonp(config);
			//settlement.initRetrieveCar();
		},
		removeFromCar : function(id) {
			var config = {
					url : Sys.serviceDomain+"/deleteUserOwnBasket?customersBasketId="+id+'&key='+sessionStorage.token, 
					callbackParameter: "callback",
					success : function(data){
						if (data.msg.code!="0000") {
							return ;
						}
						//重新获取购物车内容
						myRetrieveCar.initRetrieveCar();
					}
			}
			Modal.jsonp(config);
		}
};


$(function(){
	myRetrieveCar.initRetrieveCar();
});