var userPaySumCount = {
		currentUserId : '',
		currentUserName : '',
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
				url : '/gasOrder/countSumByUser.do',
				title : '用户消费情况列表',
				singleSelect : true,
				fitColumns : true,
				pagination : true,
				columns : [[
				            {field:'userName',title:'手机号',width:100,align:'center'},
				            {field:'paySum',title:'总支付金额',width:100,align:'center'},
				            {field:'userId',title:'操作',width:100,align:'center',formatter : function(val,row){
				            	return '<div class="btn btn-success btn-xs" onclick=userPaySumCount.sendCoupon('+row.userId+',"'+row.userName+'")>发送礼包</div>'
				            }}
				            ]]
				
			});
			$('#couponPackageGrid').datagrid({
				title : '礼包列表', 
				columns : [[
				            {field:'couponPackageId',title:'优惠券礼包id',width:100,align:'center'},
				            {field:'couponPackageName',title:'优惠券礼包名称',width:100,align:'center'},
				            {field:'packageDesc',title:'说明',width:350,align:'center'}
				            ]],
				
			});
		},
		sendCoupon : function(val,name){
			userPaySumCount.currentUserId = val;
			userPaySumCount.currentUserName = name;
			var gridOpts = $('#couponPackageGrid').datagrid('options');
		    gridOpts.url = '/couponPackage/getCouponPackageListByParams.do';
		    $('#couponPackageGrid').datagrid('load');
			$('#detailModal').modal('show');
		},
		submit : function(){
			var rows =  $('#couponPackageGrid').datagrid('getSelections');
			if (rows==null || rows.length==0) {
				Modal.showAlert('请选择要发送的优惠礼包');
			}else{
				var packageIds = '';
				var packageNames = '';
				for (var i = 0; i < rows.length; i++) {
					packageIds += ','+rows[i].couponPackageId;
					packageNames +=','+rows[i].couponPackageName;
				}
				packageIds = packageIds.substring(1);
				packageNames = packageNames.substring(1);
				Modal.showConfirm('确定要给"'+userPaySumCount.currentUserName+'"发送礼包"'+packageNames+'"吗？',null,function(){
					var config = {
							type:"post",
							url:'/userCoupon/addUserCoupon.do?couponPackageIds='+packageIds+"&userId="+userPaySumCount.currentUserId,
							success:function(data){
								if(data.code == "0000"){
									Modal.showAlert('发送成功');
									$('#detailModal').modal('hide');
								}else{
									Modal.showAlert('服务器出错！');
									$('#detailModal').modal('hide');
								}
							}
					}
					Modal.ajax(config);
				})
			}
		}
		
}

$(function(){
	userPaySumCount.initGrid();
})


