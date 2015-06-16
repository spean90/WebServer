var refundManage = {
		currentOid : '',
		searchGasOrder : function() {
			var userId = $('#userId').val();
			var orderId = $('#orderId').val();
			var userName = $('#userName').val();
			var status = $('#status').combobox('getValue');
			var gridOpts = $('#gasOrderGrid').datagrid('options');
		    gridOpts.url = '/gasOrder/getGasOrderListByParams.do';
			$('#gasOrderGrid').datagrid('load',{
				userId : userId,
				orderId : orderId,
				userName:userName,
				status : status
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
		//锁单、防止同时给退款
		handle : function(index) {
			var row = $('#gasOrderGrid').datagrid('getData').rows[index];
			if(row) {
				refundManage.currentOid = row.oId;
				var config = {
						url : '/gasOrder/lockFefundOrder.do?oId='+row.oId+'&status=5',
						success : function(data){
							if(data.code == "0000"){
								$('#refundForm').form('clear');
								$('#refundForm').form('load',row);
								$('#refundModal').modal('show');
							}else{
								Modal.showAlert(data.msg);
								$('#gasOrderGrid').datagrid('load')
								return;
							}
						}
				}
				Modal.ajax(config);
			}else{
				Modal.showAlert('请选择要处理的事项!');
			}
		},
		//意外退出后继续处理
		continueHandle : function(rowIndex) {
			var row = $('#gasOrderGrid').datagrid('getData').rows[rowIndex];
			if(row) {
				refundManage.currentOid = row.oId;
				if (row.refundMan == sessionStorage.managerAccount) {
					$('#refundForm').form('clear');
					$('#refundForm').form('load',row);
					$('#refundModal').modal('show');
				}else{
					Modal.showAlert(row.refundMan+' 正在处理中...');
					return;
				}
			}else{
				Modal.showAlert('请选择要处理的事项!');
			}
		},
		cancel : function(){
			var config = {
					url : '/gasOrder/lockFefundOrder.do?oId='+refundManage.currentOid+'&status=3',
					success : function(data){
						if(data.code == "0000"){
							$('#refundModal').modal('hide');
							$('#gasOrderGrid').datagrid('load')
						}else{
							Modal.showAlert(data.msg);
							$('#refundModal').modal('hide');
							return;
						}
					}
			}
			Modal.ajax(config);
		},
		
		save : function() {
			var refundSum = $('#refundSum').val();
			if (refundSum=='') {
				Modal.showAlert('请填写退款金额...');
				return;
			}
			var refundSign = $('#refundSign').val();
			if (refundSign=='') {
				Modal.showAlert('请填写备注...');
				return;
			}
			$('#refundForm').form('submit',{
				url : '/gasOrder/doRefund.do',
				success : function(data) {
					var result = JSON.StrToJSON(data);
					if(result.code == "0000"){
						Modal.showAlert('操作成功');
						$('#refundModal').modal('hide');
						$('#gasOrderGrid').datagrid('reload');
					}else{
						Modal.showAlert('服务器出错！');
						$('#refundModal').modal('hide');
					}
					
				}
			})
		},
		
}

$(function(){
	$('#status').combobox({
		data : [{
			name : "全部",
			value : ""
		},{
			name : "未支付",
			value : "1"
		},{
			name : "已支付",
			value : "2"
		},{
			name : "退款中",
			value : "3"
		},{
			name : "已退款",
			value : "4"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
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
		            {field:'refundSum',title:'退款金额',width:100,align:'center'},
		            {field:'refundMan',title:'退款办理人',width:100,align:'center'},
		            {field:'refundTime',title:'退款时间',width:100,align:'center'},
		            //{field:'orderDesc',title:'订单描述',width:100,align:'center'},
		            {field:'oId',title:'详情',width:100,align:'center',formatter:function(val,row,index){
		            		if(row.status==1){
		            			return '未支付';
		            		}
							return '<div class="btn btn-xs btn-success" onclick=refundManage.getBackLogInfo('+val+')>处理情况</div>';
		            	}
		            },{field:'tuikuan',title:'退款',width:100,align:'center',formatter:function(val,row,index){
	            		if(row.status==3){
	            			return '<div class="btn btn-xs btn-success" onclick=refundManage.handle('+index+')>确认退款</div>';
	            		}else if(row.status==4){
	            			return '已退款';
	            		}else if(row.status ==5 ){
	            			return '<div class="btn btn-default btn-xs" onclick=refundManage.continueHandle('+index+')>处理中..</div>';
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
						}else if(val==4) {
							return '异常';
						}else if(val==5) {
							return '已退款';
						}else if(val==6) {
							return '充值成功';
						}else if(val==7) {
							return '充值失败';
						}else {
							return val;
						}
		            }}
		            ]]
	});
})


