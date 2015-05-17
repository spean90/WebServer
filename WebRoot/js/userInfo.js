var playerManage = {
		currentUserId : '',
		currentUserName : '',
		searchUserInfo : function() {
			var userName = $('#userName').val();
			var idCard = $('#idCard').val();
			var realName = $('#realName').val();
			$('#playergrid').datagrid('load',{
				userName : userName,
				idCard : idCard,
				realName : realName
			})
		},
		sendCoupon : function(val,name){
			playerManage.currentUserId = val;
			playerManage.currentUserName = name;
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
				Modal.showConfirm('确定要给"'+playerManage.currentUserName+'"发送礼包"'+packageNames+'"吗？',null,function(){
					var config = {
							type:"post",
							url:'/couponPackage/deleteCouponPackageById.do?couponPackageId='+row.couponPackageId,
							success:function(data){
								if(data.code == "0000"){
									Modal.showAlert('删除成功');
									$('#couponModal').modal('hide');
									$('#couponPackageGrid').datagrid('reload');
								}else{
									Modal.showAlert('服务器出错！');
									$('#couponModal').modal('hide');
								}
							}
					}
					Modal.ajax(config);
				})
			}
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
		            {field:'addTime',title:'注册时间',width:100,align:'center'},
		            {field:'userId',title:'操作',width:100,align:'center',formatter : function(val,row){
		            	return '<div class="btn btn-success btn-xs" onclick=playerManage.sendCoupon('+val+',"'+row.userName+'")>发送礼包</div>'
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
		
	})
})


