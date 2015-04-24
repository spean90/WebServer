/**
 * 结算页js
 */

var settlement = {
		initRetrieveCar : function() {
			sessionStorage.token = 'Y6dE9ahZ1ee9OllaU5JvKjd2b7gp6QimDNo0gAUjsKEH0ld9fLeCsaynC9T091K4';
			if(sessionStorage.token==null||sessionStorage.token=='undefined'){
				console.log('未登录，不能获取回收车内容');
				return;
			}
			
			var config = {
					url : Sys.serviceDomain+"/listUserOwnBasket?key="+sessionStorage.token, 
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
								str = '<tr>'
						              +'<td class="checkbox"><input class="check-one check" type="checkbox"/></td>'
						              +'<td class="goods"><img src="'+item.modelsImage+'" alt=""/><span>'+item.modelsName+'</span></td>'
						              +' <td class="price">'+item.lastEvaluationPrice+'</td>'
						              +' <td class="status">价格有效</td>'
						              +' <td class="num m_l32"><span class="reduce"></span><input class="count-input" type="text" value="1"/><span class="add"></span></td>'
						              +' <td class="subtotal">'+item.lastEvaluationPrice+'</td>'
						              +' <td class="operation">'
						              +' <span class="delete">删除</span>'
						              +' <span class="reprice">重新询价</span>'
						              +' </td>'
						              +' </tr>';
								$('tbody').append($(str));
							}
						}
					}
			}
			Modal.jsonp(config);
		}
}

$(function(){
	settlement.initRetrieveCar();
});