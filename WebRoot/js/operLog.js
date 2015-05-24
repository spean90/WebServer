var operLog = {
		searchOperLog : function() {
			var mId = $('#mId').val();
			var operAction = $('#operAction').val();
			var beginTime = $('#beginTime').datebox('getValue')+" 00:00:00";
			var endTime = $('#endTime').datebox('getValue')+" 59:59:59";
			if (beginTime>endTime) {
				Modal.showAlert('开始时间不能大于结束时间');
				return;
			}
			$('#operLogGrid').datagrid('load',{
				mId : mId,
				operAction : operAction,
				beginTime : beginTime,
				endTime : endTime
			})
		}
		
}

$(function(){
	$('#operLogGrid').datagrid({
		url : '/operLog/getLogListByParams.do',
		pagination : true,
		title : '操作日志列表', 
		fitColumns : true,
		columns : [[
		            {field:'mId',title:'管理员id',width:100,align:'center'},
		            {field:'operAction',title:'操作事项',width:100,align:'center'},
		            {field:'status',title:'结果',width:100,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '成功';
		            	}else {
		            		return '失败';
		            	}
		            }},
		            {field:'url',title:'url',width:100,align:'center'},
		            {field:'params',title:'参数',width:100,align:'center'},
		            {field:'operTime',title:'操作时间',width:100,align:'center',formatter:function(val){
		            	return new Date(val).format("yyyy-MM-dd HH:mm:ss");
		            }}
		            /*{field:'ip',title:'IP',width:100,align:'center'}*/
		            ]]
		
	})
})


