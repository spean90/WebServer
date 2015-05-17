var gasOrder = {
		searchGasOrder : function() {
			var userId = $('#userId').val();
			var orderId = $('#orderId').val();
			$('#gasOrderGrid').datagrid('load',{
				userId : userId,
				orderId : orderId
			})
		}
		
}

$(function(){
	$('#gasOrderGrid').datagrid({
		url : '/gasOrder/getGasOrderListByParams.do',
		pagination : true,
		title : '用户列表', 
		fitColumns : true,
		columns : [[
		            {field:'orderId',title:'订单号',width:100,align:'center'},
		            {field:'productId',title:'套餐id',width:100,align:'center'},
		            {field:'amount',title:'数量',width:60,align:'center'},
		            {field:'sum',title:'订单金额',width:100,align:'center'},
		            {field:'userId',title:'用户id',width:100,align:'center'},
		            {field:'payOrderId',title:'支付订单',width:100,align:'center'},
		            {field:'paySum',title:'支付金额',width:100,align:'center'},
		            {field:'couponId',title:'优惠券id',width:100,align:'center'},
		            {field:'createTime',title:'创建时间',width:100,align:'center'},
		            {field:'orderDesc',title:'订单描述',width:100,align:'center'}
//		            ,{field:'headImg',title:'头像',width:100,align:'center',
//		            	formatter:function(val){
//		            		var imgstr = "data:;base64,";
//		            		imgstr += val
//		            		imgstr = '<img src="'+imgstr+'" alt="头像" style="width:30px;height:30px;">'
//		            		return imgstr;
//		            	}}
		            ]]
		
	})
})


