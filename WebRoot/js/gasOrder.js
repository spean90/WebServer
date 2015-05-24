var gasOrder = {
		searchGasOrder : function() {
			var userId = $('#userId').val();
			var orderId = $('#orderId').val();
			$('#gasOrderGrid').datagrid('load',{
				userId : userId,
				orderId : orderId
			})
		},
		detail : function() {
			var row = $('#gasOrderGrid').datagrid('getSelected');
			if(row) {
				$('#detailModal').modal('show');
				$('#form').form('load',row);
			}else{
				Modal.showAlert('请选择要查看的订单!');
			}
		},
		receive : function(index) {
			var row = $('#gasOrderGrid').datagrid('getData').rows[index];
			if(row) {
				$('#receiveModal').modal('show');
				$('#receiveForm').form('load',row);
			}else{
				Modal.showAlert('请选择要收款的订单!');
			}
		},
		save : function() {
			var oId = $('#oId').val();
			var paySum = $('#receiveSum').val();
			var orderDesc = $('#orderDesc').val();
			var subProductId = $('#subProductId').val();
			var amount = $('#amount').val();
			var data = {
					oId:oId,
					paySum:paySum,
					orderDesc:orderDesc,
					amount:amount,
					subProductId:subProductId
			}
			Modal.showConfirm('确认收款"'+paySum+'"元吗？',null,function(){
				var config = {
						url : '/gasOrder/receiveOrder.do',
						data : data,
						type : 'post',
						success : function(data){
							if(data.code=='0000'){
								Modal.showAlert('操作成功');
								$('#receiveModal').modal('hide');
								$('#gasOrderGrid').datagrid('load')
							}else{
								Modal.showAlert('服务器出错！');
								$('#couponModal').modal('hide');
							}
						}
				}
				Modal.ajax(config);
			})
			
		}
		
}

$(function(){
	$('#gasOrderGrid').datagrid({
		url : '/gasOrder/getGasOrderListByParams.do',
		pagination : true,
		title : '用户列表', 
		fitColumns : true,
		singleSelect : true,
		toolbar : '#tbar',
		columns : [[
		            {field:'orderId',title:'订单号',width:100,align:'center'},
		            {field:'productId',title:'套餐id',width:100,align:'center'},
		            {field:'amount',title:'数量',width:60,align:'center'},
		            {field:'sum',title:'订单金额',width:100,align:'center'},
		            {field:'userName',title:'用户名',width:100,align:'center'},
		            {field:'payOrderId',title:'支付订单',width:100,align:'center'},
		            {field:'paySum',title:'支付金额',width:100,align:'center'},
		            {field:'payType',title:'支付方式',width:100,align:'center',formatter:function(val){
		            	if (val==1) {
							return '支付宝';
						}else if(val==2){
							return '线下支付';
						}
		            }},
		            {field:'payAccount',title:'付款账号',width:100,align:'center'},
		            {field:'couponId',title:'优惠券id',width:100,align:'center'},
		            {field:'createTime',title:'创建时间',width:100,align:'center'},
		            {field:'orderDesc',title:'订单描述',width:100,align:'center'},
		            {field:'oid',title:'操作',width:100,align:'center',formatter:function(val,row,index){
		            	if (row.payType==2 && row.status==1) {
							return '<div class="btn btn-xs btn-success" onclick=gasOrder.receive('+index+')>确认收款</div>';
						}else if(row.payType==2 && row.status==2){
							return row.receiver+'已收款';
						}else{
							return '';
						}
		            	}
		            }
		            ]]
		
	})
})


