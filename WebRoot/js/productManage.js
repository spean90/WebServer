var productManage = {
}

$(function(){
	$('#productgrid').datagrid({
		url : '/product/getProductListByParams.do',
		pagination : true,
		singleSelect : true,
		title : '套餐列表', 
		fitColumns : true,
		toolbar: '#tbar',
		columns : [[
		            {field:'productName',title:'套餐名',width:100,align:'center'},
		            {field:'price',title:'价格',width:100,align:'center'},
		            {field:'limitTime',title:'期限（月）',width:100,align:'center'},
		            {field:'productType',title:'套餐类型',width:100,align:'center',
		            	formatter:function(val) {
		            		if (val == 1) {
								return "直冲";
							}else if (val == 2) {
								return "套餐";
							}else {
								return val;
							}
		            	}},
		            {field:'productDesc',title:'套餐说明',width:200,align:'center'},
		            {field:'createTime',title:'创建时间',width:100,align:'center',
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


