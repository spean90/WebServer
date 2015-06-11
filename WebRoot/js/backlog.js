var backlog = {
		url : '',
		backlogId : '',//当前处理的backlogId
		handle : function(index) {
			var row = $('#backlogGrid').datagrid('getData').rows[index];
			if(row) {
				backlog.backlogId = row.backlogId;
				var config = {
						url : '/backlog/lockBacklog.do?backlogId='+row.backlogId+'&status=2',
						success : function(data){
							if(data.code == "0000"){
								$('#form').form('clear');
								$('#backlogId').val(row.backlogId);
								$('#company').val(row.company);
								$('#account').val(row.account);
								$('#sum').val(row.sum);
								$('#owner').val(row.owner);
								$('#userId').val(row.userId);
								$('#status').combobox('select',6);
								$('#orderId').val(row.orderId);
								$('#result').val(row.result);
								$('.modal-title').html('办理事项');
								backlog.url = '/backlog/updateBacklog.do';
								$('#modal').modal('show');
							}else{
								Modal.showAlert(data.msg);
								$('#backlogGrid').datagrid('load')
								return;
							}
						}
				}
				Modal.ajax(config);
			}else{
				Modal.showAlert('请选择要处理的事项!');
			}
		},
		continueHandle : function(rowIndex) {
			var row = $('#backlogGrid').datagrid('getData').rows[rowIndex];
			if(row) {
				backlog.backlogId = row.backlogId;
				if (row.managerAccount == sessionStorage.managerAccount) {
					$('#form').form('clear');
					$('#backlogId').val(row.backlogId);
					$('#company').val(row.company);
					$('#account').val(row.account);
					$('#sum').val(row.sum);
					$('#owner').val(row.owner);
					$('#userId').val(row.userId);
					$('#status').combobox('select',6);
					$('#orderId').val(row.orderId);
					$('#result').val(row.result);
					$('.modal-title').html('办理事项');
					backlog.url = '/backlog/updateBacklog.do';
					$('#modal').modal('show');
				}else{
					Modal.showAlert(row.managerAccount+' 正在处理中...');
					return;
				}
			}else{
				Modal.showAlert('请选择要处理的事项!');
			}
		},
		cancel : function(){
			var config = {
					url : '/backlog/lockBacklog.do?status=1&backlogId='+backlog.backlogId,
					success : function(data){
						if(data.code == "0000"){
							$('#modal').modal('hide');
							$('#backlogGrid').datagrid('load')
						}else{
							Modal.showAlert(data.msg);
							$('#modal').modal('hide');
							return;
						}
					}
			}
			Modal.ajax(config);
		},
		save : function() {
			var result = $('#result').val();
			if (result=='') {
				Modal.showAlert('请填写处理结果...');
				return;
			}
			$('#form').form('submit',{
				url : backlog.url,
				success : function(data) {
					var result = JSON.StrToJSON(data);
					if(result.code == "0000"){
						Modal.showAlert('操作成功');
						$('#modal').modal('hide');
						$('#backlogGrid').datagrid('reload');
					}else{
						Modal.showAlert('服务器出错！');
						$('#modal').modal('hide');
					}
					
				}
			})
		},
		juheRecharge : function() {
			Modal.showConfirm('确定使用聚合充值油卡吗？','提示',function(){
				$('#form').form('submit',{
					url : '/backlog/juheRecharge.do',
					success : function(data) {
						var result = JSON.StrToJSON(data);
						if(result.code == "0000"){
							Modal.showAlert('操作成功');
							$('#modal').modal('hide');
							$('#backlogGrid').datagrid('reload');
						}else{
							Modal.showAlert(result.msg);
							$('#modal').modal('hide');
						}
						
					}
				})
			});
		},
		reflashDataGrid : function(){
			$('#backlogGrid').datagrid('reload');
		},
		search : function() {
			var gridOpts = $('#backlogGrid').datagrid('options');
		    gridOpts.url = '/backlog/getBackLogListByParams.do';
			$('#backlogGrid').datagrid('reload',{
				owner : $('#owner_search').val(),
				account : $('#account_search').val(),
				juheOrderId : $('#juheOrderId_search').val(),
				status : $('#status_search').combobox('getValue')
			});
		}
		
}

$(function(){
	setInterval(backlog.reflashDataGrid, 1000*60*5);
	$('#status').combobox({
		data : [{
			name : "充值成功",
			value : "6"
		},{
			name : "充值失败",
			value : "7"
		},{
			name : "异常",
			value : "4"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
	$('#status_search').combobox({
		data : [{
			name : "未生效",
			value : "0"
		},{
			name : "未处理",
			value : "1"
		},{
			name : "已处理",
			value : "3"
		},{
			name : "充值成功",
			value : "6"
		},{
			name : "充值失败",
			value : "7"
		},{
			name : "异常",
			value : "4"
		},{
			name : "已退款",
			value : "5"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
	$('#backlogGrid').datagrid({
		url : '/backlog/getBackLogListByParams.do?status=1',
		pagination : true,
		singleSelect :true,
		title : '代办事件', 
		fitColumns : true,
		columns : [[
		            {field:'rechargeTime',title:'充值时间',width:120,align:'center'},
		            {field:'account',title:'油卡账号',width:100,align:'center'},
		            {field:'orderId',title:'orderId',width:100,align:'center'},
		            {field:'company',title:'油卡归属',width:100,align:'center'},
		            {field:'owner',title:'持卡人',width:100,align:'center'},
		            {field:'sum',title:'金额',width:100,align:'center'},
		            {field:'juheOrderId',title:'聚合订单号',width:160,align:'center'},
		            {field:'juheRechargeTime',title:'聚合处理时间',width:160,align:'center'},
		            {field:'managerAccount',title:'办理人',width:100,align:'center'},
		            {field:'result',title:'结果',width:200,align:'center'},
		            {field:'status',title:'状态',width:80,align:'center',formatter: function(val,row,index){
		            	if(row.gasCardStatus==2){
		            		return '挂失中...';
		            	}
		            	if (val==1) {
							return '<div class="btn btn-primary btn-xs" onclick=backlog.handle('+index+')>待处理</div>';
						}else if (val==2) {
							return '<div class="btn btn-default btn-xs" onclick=backlog.continueHandle('+index+')>处理中..</div>';
						}else if (val==3) {
							return '<div class="btn btn-success btn-xs">已处理</div>';
						}else if (val==4) {
							return '<div class="btn btn-danger btn-xs">异常</div>';
						}else if (val==5) {
							return '<div class="btn btn-default btn-xs">已退款</div>';
						}else if (val==6) {
							return '<div class="btn btn-default btn-xs">充值成功</div>';
						}else if (val==7) {
							return '<div class="btn btn-default btn-xs">充值失败</div>';
						}
		            }},
		            ]]
		
	})
})


