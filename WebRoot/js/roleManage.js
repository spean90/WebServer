

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
                        var s = '<span  class="glyphicon glyphicon-pencil"></span>' +
                            '<span  class="glyphicon glyphicon-remove"></span>"';
                      return s;
                   }}
		]],
		toolbar: '#tbar'
	})
})