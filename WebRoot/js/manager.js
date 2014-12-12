var manager = {
	url : '',
	addManager : function(){
		$('#pwd').show();
		$('#repwd').show();
		$('#form').form('clear');
		$('#isLock').combobox('select','0');
		manager.url = '/user/addUser.do'
		$('#dialog').dialog('setTitle','新增管理员').dialog('open');
	},
	updateManager : function(){
		var row = $('#userGrid').datagrid('getSelected');
		if(row) {
			$('#pwd').hide();
			$('#repwd').hide();
			$('#re_password').val(row.password);
			$('#dialog').dialog('setTitle','修改管理员信息').dialog('open');
			$('#form').form('load',row);
			manager.url = '/user/updateUser.do'
		}else{
			Modal.showAlert('请选择要修改的管理员!');
		}
		
	},
	deleteManager : function() {
		var row = $('#userGrid').datagrid('getSelected');
		if(row) {
			Modal.showConfirm('确定要删除管理员"'+row.realName+'"吗？',null,function(){
				var config = {
						type:"post",
						url:'/user/deleteUser.do?uid='+row.uid,
						success:function(data){
							$('#dialog').dialog('close');
							$('#userGrid').datagrid('reload');
						}
				}
				Modal.ajax(config);
			})
		}else{
			Modal.showAlert('请选择要删除的管理员!');
		}
	},
	save : function(){
		var valid = $('#form').form('validate');
		if(!valid){
			return;
		}
		var pwd = $('#password').val();
		var re_pwd = $('#re_password').val();
		if(pwd!=re_pwd){
			Modal.showAlert('密码不一致！');
			return;
		}
		$('#form').form('submit',{
			url : manager.url,
			success : function(data) {
				var result = JSON.StrToJSON(data);
				if(result.success){
					$('#dialog').dialog('close');
					$('#userGrid').datagrid('reload');
				}else{
					Modal.showAlert('服务器出错！');
					$('#dialog').dialog('close');
					$('#userGrid').datagrid('reload');
				}
				
			}
		})
	}
}

$(function() {
	$('#userGrid').datagrid({
		url : '/user/getAllUser.do',
		pagination : true,
		fitColumns : true,
		columns : [[
		            {field:'account',title:'账号',width:100,align:'center'},
		            {field:'realName',title:'真实姓名',width:100,align:'center'},
		            {field:'roleName',title:'所属角色',width:100,align:'center'},
		            {field:'addMan',title:'创建人',width:100,align:'center'},
		            {field:'addTime',title:'创建时间',width:100,align:'center'},
		            {field:'isLock',title:'状态',width:100,align:'center',formatter:function(val){
		            	if(val==0){
		            		return '可用';
		            	}else{
		            		return '禁用';
		            	}
		            }}
		            ]],
		toolbar : '#tbar'
	});
	$('#roleId').combobox({
		url : '/role/getAll.do',
		textField : 'roleName',
		valueField : 'roleId',
		panelHeight : 100
	});
})