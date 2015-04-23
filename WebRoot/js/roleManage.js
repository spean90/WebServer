var role = {
	saveUrl : '',
    newRole : function(){
    	role.saveUrl = '/role/addRole.do';
    	$('#roleName').val('');
    	$('#menuTree').tree({
    		url:'/menu/getMenuTree.do?roleId=0',
    		formatter:function(node){
    			return node.menuName;
    		}
    	});
        $('#dialog').dialog('open').dialog('setTitle','新增角色');
        
    },
    updateRole : function(roleId,roleName){
    	role.saveUrl = '/role/updateRole.do?roleId='+roleId;
    	$('#roleName').val(roleName);
    	$('#menuTree').tree({
    		url:'/menu/getMenuTree.do?roleId='+roleId,
    		formatter:function(node){
    			return node.menuName;
    		}
    	});
        $('#dialog').dialog('open').dialog('setTitle','更新角色');
        
    },
	save : function() {
		var roleName = $('#roleName').val();
		if(roleName==null || roleName=='') {
			Modal.showAlert('请输入角色名称');
		} 
		var nodes = $('#menuTree').tree('getChecked', ['checked','indeterminate']);
		var ids = '';
		for(var i in nodes){
			ids += nodes[i].menuId+","
		}
		var config = {
				type : 'post',
				url : role.saveUrl,
				data : {
					'roleName' : roleName,
					'menuIds' : ids
				},
				success : function(data){
					$('#roleGrid').datagrid('reload');
					$('#dialog').dialog('close');
				}
		}
		Modal.ajax(config);
	},
	deleteRole : function(roleId,roleName) {
		Modal.showConfirm('确定要删除" '+roleName+' "吗？','操作提示',function() {
			var config = {
					type : 'post',
					url : '/role/deleteRole.do?roleId='+roleId,
					success : function(data) {
						$('#roleGrid').datagrid('reload');
						$('#dialog').dialog('close');
						if (data.code=='0001') {
							console.log(data.msg);
							Modal.showError("服务器异常","错误");
						}
					}
			}
			Modal.ajax(config);
		})
	}
}


$(function(){
	$('#roleGrid').datagrid({
		url : '/role/getAll.do',
		singleSelect : true,
		fitColumns : true,
		//pagination : true,
		columns :[[
		           {field:'roleName',title:'角色名称',width:100,align:'center'},
		           {field:'addTime',title:'创建时间',width:100,align:'center'},
		           {field:'addMan',title:'创建人',width:100,align:'center'},
                   {field:'roleId',title:'操作',width:100,align:'center',formatter:function(val,row){
                        var s = '<a iconCls="icon-add" plain="true" href="#" onclick=role.updateRole('+val+',"'+row.roleName+'")>修改</a>' +
                            '&nbsp;&nbsp;'+'<a iconCls="icon-add" plain="true" href="#" onclick=role.deleteRole('+val+',"'+row.roleName+'")>删除</a>';
                      return s;
                   }}
		]],
		toolbar: '#tbar'
	})
	
})