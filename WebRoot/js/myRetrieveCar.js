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
							var sum=0;
							var currency = '';
							for (var i = 0; i < list.length; i++) {
								var item = list[i];
								currency = item.currency;
								str = '<tr id="'+item.customersBasketId+'">'
									  + '<td class="checkbox"><input class="check-one check" checked type="checkbox" value="'+item.customersBasketId+'"/></td>'
									  + '<td class="goods"><img src="'+item.modelsImage+'" alt=""/><span>'+item.modelsName+'</span></td>'
									  + '<td class="price">'+item.lastEvaluationPrice.toFixed(2)+'</td>'
									  + '<td class="status">价格有效</td>'
									  + '<td class="num m_l32"><input class="count-input disable" disabled type="text" value="1"/></td>'
									  + '<td class="subtotal">'+item.lastEvaluationPrice.toFixed(2)+'</td>'
									  + '<td class="operation">'
									  + '<span class="delete" onclick=toolBar.removeFromCar('+item.customersBasketId+')>删除</span>'
									  + '<span class="reprice" onclick=window.location.href="valuation_'+item.modelsId+'.html">重新询价</span>'
									  + '</td>'
									  + '</tr>';
								$('tbody').append($(str));
								sum += parseFloat(item.lastEvaluationPrice.toFixed(2));
							}
							$('#priceTotal').text(sum);
							$('#currency').text(currency);
							$('#selectedTotal').text(list.length);
							//onloadCar();//❤重新加载购物车内容❤
						}
					}
			}
			Modal.jsonp(config);
			//settlement.initRetrieveCar();
		},
		//批量删除
		removeAllFromCar : function() {
//			 var table = document.getElementById('cartTable');
//			 var tr = table.children[1].rows; //行
//			 var id = '';
//			 for (var i = 0; i < tr.length; i++) {
//                 // 如果被选中，就删除相应的行
//                 if (tr[i].getElementsByTagName('input')[0].checked) {
//                    id = ','+tr[i].attr('id');
//                 }
//             }
//			alert(id);
//			var config = {
//					url : Sys.serviceDomain+"/deleteUserOwnBaskets?customersBasketIds="+id+'&key='+sessionStorage.token, 
//					callbackParameter: "callback",
//					success : function(data){
//						if (data.msg.code!="0000") {
//							return ;
//						}
//						//重新获取购物车内容
//						myRetrieveCar.initRetrieveCar();
//					}
//			}
//			//Modal.jsonp(config);
		},
		goToPay : function() {
			var arr= $('.check-one.check');
			var ids = '';
			for(i=0;i<arr.length;i++){
				if(arr[i].checked){
				var a = arr[i].value;
					ids = ids+","+a;
				}
			}
			if(ids!=null) {
				ids = ids.substring(1);
			}
			window.location.href='/pay_'+ids+'.html';
		}
};


$(function(){
	myRetrieveCar.initRetrieveCar();
	$('#deleteAll').hide();
	$('#deleteAll').click(function(){
		//myRetrieveCar.removeAllFromCar();
	})
});