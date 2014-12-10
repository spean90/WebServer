var role = {
    newRole : function(){
        $('#dialog').dialog('open').dialog('setTitle','新增角色');
    }
}


$(function(){
	$('#roleGrid').datagrid({
		url : '/role/getAll.do',
		singleSelect : true,
		fitColumns : true,
		columns :[[
		           {field:'roleName',title:'角色名称',width:100,align:'center'},
		           {field:'addTime',title:'创建时间',width:100,align:'center'},
		           {field:'addMan',title:'创建人',width:100,align:'center'},
                   {field:'roleId',title:'操作',width:100,align:'center',formatter:function(val){
                        var s = '<a iconCls="icon-add" plain="true" href="/role/updateRole.do?roleId='+val+'">修改</a>' +
                            '&nbsp;&nbsp;'+'<a iconCls="icon-add" plain="true" href="/role/updateRole.do?roleId='+val+'">删除</a>';
                      return s;
                   }}
		]],
		toolbar: '#tbar'
	})
})