var backlog = {
		url : '',
		backlogId : '',//当前处理的backlogId
		searchUserInfo : function() {
			var userName = $('#userName').val();
			var idCard = $('#idCard').val();
			var realName = $('#realName').val();
			$('#playergrid').datagrid('load',{
				userName : userName,
				idCard : idCard,
				realName : realName
			})
		},
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
								$('#status').combobox('select',3);
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
					$('#status').combobox('select',3);
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
		}
		
}

$(function(){
	$('#status').combobox({
		data : [{
			name : "已处理",
			value : "3"
		},{
			name : "异常",
			value : "4"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
	$('#backlogGrid').datagrid({
		url : '/backlog/getBackLogListByParams.do',
		pagination : true,
		singleSelect :true,
		title : '代办事件', 
		fitColumns : true,
		columns : [[
		            {field:'rechargeTime',title:'充值时间',width:120,align:'center'},
		            {field:'account',title:'油卡账号',width:100,align:'center'},
		            {field:'company',title:'油卡归属',width:100,align:'center'},
		            {field:'owner',title:'持卡人',width:100,align:'center'},
		            {field:'sum',title:'金额',width:100,align:'center'},
		            {field:'createTime',title:'注册时间',width:160,align:'center'},
		            {field:'updateTime',title:'处理时间',width:160,align:'center'},
		            {field:'managerAccount',title:'办理人',width:100,align:'center'},
		            {field:'result',title:'结果',width:200,align:'center'},
		            {field:'status',title:'状态',width:80,align:'center',formatter: function(val,row,index){
		            	if (val==1) {
							return '<a href="#" class="btn btn-primary btn-xs" onclick=backlog.handle('+index+')>待处理</a>';
						}else if (val==2) {
							return '<a href="#" class="btn btn-default btn-xs" onclick=backlog.continueHandle('+index+')>处理中..</a>';
						}else if (val==3) {
							return '<a href="#" class="btn btn-success btn-xs">已处理</a>';
						}else if (val==4) {
							return '<a href="#" class="btn btn-danger btn-xs">异常</a>';
						}
		            }},
		            ]]
		
	})
})


