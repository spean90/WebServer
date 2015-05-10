var couponPackage = {
	url : '',
	addCouponPackage : function(){
		$('#form').form('clear');
		$('.modal-title').html('添加优惠礼包');
		couponPackage.url = '/couponPackage/addCouponPackage.do';
		$('#couponModal').modal('show');
	},
	updateCouponPackage : function(){
		var row = $('#couponPackageGrid').datagrid('getSelected');
		if(row) {
			$('#form').form('clear');
			$('#couponPackageId').val(row.couponPackageId);
			$('#couponPackageName').val(row.couponPackageName);
			$('#packageDesc').val(row.packageDesc);
			$('.modal-title').html('修改优惠礼包');
			couponPackage.url = '/couponPackage/updateCouponPackage.do';
			$('#couponModal').modal('show');
		}else{
			Modal.showAlert('请选择要修改的优惠券!');
		}
		
	},
	deleteCouponPackage : function() {
		var row = $('#couponPackageGrid').datagrid('getSelected');
		if(row) {
			Modal.showConfirm('确定要删除礼包"'+row.couponPackageName+'"吗？',null,function(){
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
		}else{
			Modal.showAlert('请选择要删除的礼包!');
		}
	},
	save : function(){
		var couponPackageName = $('#couponPackageName').val();
		if(couponPackageName==''){
			Modal.showAlert('请输入优惠礼包名称');
			return;
		}
		$('#form').form('submit',{
			url : couponPackage.url,
			success : function(data) {
				var result = JSON.StrToJSON(data);
				if(result.code == "0000"){
					Modal.showAlert('操作成功');
					$('#couponModal').modal('hide');
					$('#couponPackageGrid').datagrid('reload');
				}else{
					Modal.showAlert('服务器出错！');
					$('#couponModal').modal('hide');
				}
				
			}
		})
	},
	search : function() {
		var couponPackageName = $('#couponPackageName_search').val();
		$('#couponPackageGrid').datagrid('load',{
			couponPackageName : couponPackageName
		})
	}
}

$(function() {
	
	$('#couponPackageGrid').datagrid({
		url : '/couponPackage/getCouponPackageListByParams.do',
		pagination : true,
		singleSelect : true,
		fitColumns : true,
		columns : [[
		            {field:'couponPackageId',title:'优惠券礼包id',width:100,align:'center'},
		            {field:'couponPackageName',title:'优惠券礼包名称',width:100,align:'center'},
		            {field:'packageDesc',title:'说明',width:100,align:'center'},
		            {field:'createTime',title:'创建时间',width:100,align:'center'}
		            ]],
		toolbar : '#tbar'
	});
})