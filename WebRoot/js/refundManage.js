var refundManage = {
		searchGasOrder : function() {
			var userId = $('#userId').val();
			var orderId = $('#orderId').val();
			var userName = $('#userName').val();
			$('#gasOrderGrid').datagrid('load',{
				userId : userId,
				orderId : orderId,
				userName:userName
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
		getBackLogInfo : function(val) {
			var gridOpts = $('#backlogGrid').datagrid('options');
		    gridOpts.url = '/backlog/getBackLogListByParams.do?oId='+val;
		    $('#backlogGrid').datagrid('load');
			$('#backlogModal').modal('show');
		},
		refund : function(val) {
			Modal.showConfirm('确认要申请退款吗？',null,function(){
				var config = {
						url : '/gasOrder/doRefund.do?oId='+val,
						type : 'post',
						success : function(data){
							if(data.code=='0000'){
								Modal.showAlert('操作成功');
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
		url : '/gasOrder/getGasOrderListByParams.do?status=3',
		pagination : true,
		title : '用户列表', 
		fitColumns : true,
		singleSelect : true,
		toolbar : '#tbar',
		columns : [[
		            //{field:'orderId',title:'订单号',width:100,align:'center'},
		            {field:'productName',title:'套餐名',width:200,align:'center'},
		            {field:'amount',title:'数量',width:60,align:'center'},
		            //{field:'sum',title:'订单金额',width:100,align:'center'},
		            {field:'userName',title:'手机号',width:100,align:'center'},
		           // {field:'payOrderId',title:'支付订单',width:100,align:'center'},
		            {field:'paySum',title:'支付金额',width:100,align:'center'},
		            {field:'payType',title:'支付方式',width:100,align:'center',formatter:function(val){
		            	if (val==1) {
							return '支付宝';
						}else if(val==2){
							return '线下支付';
						}
		            }},
		           // {field:'payAccount',title:'付款账号',width:100,align:'center'},
		           // {field:'couponId',title:'优惠券id',width:100,align:'center'},
		            {field:'createTime',title:'创建时间',width:100,align:'center'},
		            //{field:'orderDesc',title:'订单描述',width:100,align:'center'},
		            {field:'oId',title:'详情',width:100,align:'center',formatter:function(val,row,index){
		            		if(row.status==1){
		            			return '未支付';
		            		}
							return '<div class="btn btn-xs btn-success" onclick=refundManage.getBackLogInfo('+val+')>处理情况</div>';
		            	}
		            },{field:'tuikuan',title:'退款',width:100,align:'center',formatter:function(val,row,index){
	            		if(row.status==3){
	            			return '<div class="btn btn-xs btn-success" onclick=refundManage.refund('+row.oId+')>确认退款</div>';
	            		}else if(row.status==4){
	            			return '已退款';
	            		}
	            	}
	            }
		            ]]
		
	});
	$('#backlogGrid').datagrid({
		singleSelect : true,
		title : '待办列表', 
		columns : [[
		            {field:'rechargeTime',title:'充值时间',width:150,align:'center'},
		            {field:'sum',title:'金额',width:150,align:'center'},
		            {field:'manager_account',title:'办理人',width:150,align:'center'},
		            {field:'status',title:'操作',width:100,align:'center',formatter:function(val,row){
		            	if (val==0) {
		            		return '未生效';
						}else if(val==1) {
							return '待处理';
						}else if(val==2) {
							return '处理中';
						}else if(val==3) {
							return '已处理';
						}else if(val==4){
							return '异常';
						}else if(val==5){
							return '退款';
						}
		            }}
		            ]]
	});
})


