var playerManage = {
		searchUserInfo : function() {
			var userName = $('#userName').val();
			var idCard = $('#idCard').val();
			var realName = $('#realName').val();
			$('#playergrid').datagrid('load',{
				userName : userName,
				idCard : idCard,
				realName : realName
			})
		}
		
}

$(function(){
	$('#playergrid').datagrid({
		url : '/userInfo/getUserInfoListByParams.do',
		pagination : true,
		title : '用户列表', 
		fitColumns : true,
		columns : [[
		            {field:'userName',title:'账户',width:100,align:'center'},
		            {field:'realName',title:'用户姓名',width:100,align:'center'},
		            {field:'idCard',title:'身份证号',width:200,align:'center'},
		            {field:'addTime',title:'注册时间',width:100,align:'center',
		            	formatter:function(val) {
		            		return new Date(val).format('yyyy-MM-dd HH:mm:ss')
		            	}},
		            
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


