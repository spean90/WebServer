var orderSuccess = {
		initPage : function(){
			var config = {
					url : Sys.serviceDomain+'/detailOwnOneOrders?ordersId='+$('#orderId').text()+'&key='+sessionStorage.token,
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						console.log(data);
					}
			}
			Modal.jsonp(config);
		}
}

$(function(){
	orderSuccess.initPage();
})