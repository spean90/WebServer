var user = {
	addUser : function(){
		$('#dialog').dialog('setTitle','新增管理员').dialog('open');
	},
	updateUser : function(){
		$('#dialog').dialog('setTitle','修改管理员').dialog('open');
	},
	deleteUser : function() {
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
		panelHeight : 100,
	})
})