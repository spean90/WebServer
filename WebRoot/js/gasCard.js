var gasCard = {
		search : function() {
			var phone = $('#phone').val();
			var gasAccount = $('#gasAccount').val();
			var status = $('#status').combobox('getValue');
			$('#playergrid').datagrid('load',{
				phone : phone,
				gasAccount : gasAccount,
				status : status
			})
		},
		detail : function(gasId,index) {
			var data=$('#playergrid').datagrid('getData');
			console.log(data.rows);
			var rows = data.rows;
			var sign = rows[index].sign;
			$('#sign').html(sign);
			$('#detailModal').modal('show');
		}
}

$(function(){
	$('#playergrid').datagrid({
		url : '/gasCard/getGasCardListByParam.do',
		pagination : true,
		singleSelect : true,
		title : '用户列表', 
		fitColumns : true,
		columns : [[
		            {field:'userId',title:'用户ID',width:80,align:'center'},
		            {field:'phone',title:'绑定电话',width:80,align:'center'},
		            {field:'gasAccount',title:'油卡号',width:80,align:'center'},
		            {field:'company',title:'油卡类型',width:150,align:'center'},
		            {field:'owner',title:'持卡人',width:100,align:'center'},
		            {field:'status',title:'状态',width:100,align:'center',formatter : function(val,row){
		            	if(val==1){
		            		return '正常';
		            	}else if(val==2){
		            		return "挂失中";
		            	}else if(val==3){
		            		return '已解绑';
		            	}else{
		            		return val
		            	}
		            }},
		            {field:'sign',title:'备注',width:100,align:'center'},
		            {field:'gasId',title:'详情',width:100,align:'center',formatter : function(val,row,index){
		            	return '<div class="btn btn-success btn-xs" onclick=gasCard.detail('+row.gasId+','+index+')>变更详情</div>'
		            }}
		            ]]
		
	});
	$('#status').combobox({
		data : [{
			name : "全部",
			value : ""
		},{
			name : "正常",
			value : "1"
		},{
			name : "挂失",
			value : "2"
		},{
			name : "解绑",
			value : "3"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
})


