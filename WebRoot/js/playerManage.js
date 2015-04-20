var playerManage = {
		
		
}

$(function(){
	$('#playergrid').datagrid({
		url : '/player/getPlayerList.do',
		pagination : true,
		title : '用户列表', 
		fitColumns : true,
		columns : [[
		            {field:'playerId',title:'用户ID',width:100,align:'center'},
		            {field:'account',title:'用户账号',width:100,align:'center'},
		            {field:'addTime',title:'注册时间',width:100,align:'center',
		            	formatter:function(val) {
		            		return new Date(val).format('yyyy-MM-dd HH:mm:ss')
		            	}}
//		            ,{field:'headImg',title:'头像',width:100,align:'center',
//		            	formatter:function(val){
//		            		var imgstr = "data:;base64,";
//		            		imgstr += val
//		            		imgstr = '<img src="'+imgstr+'" alt="头像" style="width:30px;height:30px;">'
//		            		return imgstr;
//		            	}}
		            ]]
		
	})
})


