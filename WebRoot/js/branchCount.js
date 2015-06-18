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
			var  subProductId = $('#type').combobox('getValue');
			$('#userPaySumGrid').datagrid('load',{
				beginTime : beginTime,
				endTime : endTime,
				userName:userName,
				subProductId : subProductId
			})
		},
		initGrid : function() {
			$('#userPaySumGrid').datagrid({
				url : '/gasOrder/countSumByUser.do?recommendId='+sessionStorage.managerAccount,
				title : '用户消费情况列表',
				singleSelect : true,
				fitColumns : true,
				//pagination : true,
				columns : [[
				            {field:'userName',title:'手机号',width:100,align:'center'},
				            {field:'paySum',title:'总支付金额',width:100,align:'center'}
				            ]],
				onLoadSuccess : function(data){
					var data = data.rows;
					var sum = 0;
					for(var i=0;i<data.length;i++){
						sum+=parseFloat(data[i].sum);
					}
					$('#sum').html('<strong>合计：</strong>'+sum.toFixed(2));
				}
				
			});
		}
	
		
}

$(function(){
	userPaySumCount.initGrid();
	$('#type').combobox({
		data : [{
			name : "全部",
			value : ""
		},{
			name : "直充",
			value : "1"
		},{
			name : "套餐",
			value : "2"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
})


