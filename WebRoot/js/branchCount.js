var userPaySumCount = {
		search : function() {
			var beginTime = $('#beginTime').datebox('getValue');
			if (beginTime!=null && beginTime!='') {
				beginTime += " 00:00:00";
			}
			var endTime = $('#endTime').datebox('getValue');
			if (endTime!=null && endTime!='') {
				endTime += " 59:59:59";
			}
			if (beginTime>endTime) {
				Modal.showAlert('开始时间不能大于结束时间');
				return;
			}
			var userName = $('#userName').val();
			$('#userPaySumGrid').datagrid('load',{
				beginTime : beginTime,
				endTime : endTime,
				userName:userName
			})
		},
		initGrid : function() {
			$('#userPaySumGrid').datagrid({
				url : '/gasOrder/countSumByUser.do?recommendId='+sessionStorage.managerAccount,
				title : '用户消费情况列表',
				singleSelect : true,
				fitColumns : true,
				pagination : true,
				columns : [[
				            {field:'userName',title:'手机号',width:100,align:'center'},
				            {field:'paySum',title:'总支付金额',width:100,align:'center'}
				            ]]
				
			});
		}
	
		
}

$(function(){
	userPaySumCount.initGrid();
})


