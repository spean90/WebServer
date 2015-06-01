var couponPackage = {
	url : '',
	addCouponPackage : function(){
		
		var gridOpts = $('#allCouponGrid').datagrid('options');
	    gridOpts.url = '/coupon/getCouponListByIds.do';
	    $('#allCouponGrid').datagrid('reload');
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
			var gridOpts = $('#allCouponGrid').datagrid('options');
		    gridOpts.url = '/coupon/getCouponListByIds.do';
		    $('#allCouponGrid').datagrid('reload');
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
		var ids = '';
		var rows = $('#allCouponGrid').datagrid('getSelections');
		for(var i=0; i<rows.length; i++){
		    ids+=","+rows[i].couponId;
		}
		
		$('#form').form('submit',{
			url : couponPackage.url,
			onSubmit: function(param){  
		        param.couponIds = ids; 
		    }, 
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
	},
	getCoupons : function(ids) {
		var gridOpts = $('#couponGrid').datagrid('options');
	    gridOpts.url = '/coupon/getCouponListByIds.do?couponIds='+ids;
	    $('#couponGrid').datagrid('reload');
		$('#detailModal').modal('show');
	}
}

$(function() {
	
	$('#allCouponGrid').datagrid({
		title : '优惠券列表',
		columns : [[
		            {field:'couponId',title:'优惠券id',width:100,align:'center'},
		            {field:'couponName',title:'优惠券名称',width:100,align:'center'},
		            {field:'isDeliver',title:'是否可转赠',width:60,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '是';
		            	}else if(val==0){
		            		return '否';
		            	}else {
		            		return val;
		            	}
		            }},
		            {field:'sum',title:'金额',width:60,align:'center'},
		            {field:'type',title:'类型',width:100,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '直冲抵用';
		            	}else if(val==2){
		            		return '套餐抵用';
		            	}else {
		            		return val;
		            	}
		            }},
		            {field:'deadTime',title:'失效时间',width:120,align:'center'}
		            ]]
	});
	
	$('#couponPackageGrid').datagrid({
		url : '/couponPackage/getCouponPackageListByParams.do',
		pagination : true,
		singleSelect : true,
		fitColumns : true,
		columns : [[
		            {field:'couponPackageId',title:'优惠券礼包id',width:100,align:'center'},
		            {field:'couponPackageName',title:'优惠券礼包名称',width:100,align:'center'},
		            {field:'packageDesc',title:'说明',width:100,align:'center'},
		            {field:'createTime',title:'创建时间',width:100,align:'center'},
		            {field:'couponIds',title:'礼包详情',width:100,align:'center',formatter:function(val){
		            	if (val == ''||val==null) {
		            		return '无'
						}else{
							return '<a href="#" onclick=couponPackage.getCoupons("'+val+'") >查看</a>'
						}
		            }}
		            ]],
		toolbar : '#tbar'
	});
	

	$('#couponGrid').datagrid({
		singleSelect : true,
		columns : [[
		            {field:'couponId',title:'优惠券id',width:100,align:'center'},
		            {field:'couponName',title:'优惠券名称',width:100,align:'center'},
		            {field:'isDeliver',title:'是否可转赠',width:60,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '是';
		            	}else if(val==0){
		            		return '否';
		            	}else {
		            		return val;
		            	}
		            }},
		            {field:'sum',title:'金额',width:60,align:'center'},
		            {field:'type',title:'类型',width:100,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '直冲抵用';
		            	}else if(val==2){
		            		return '套餐抵用';
		            	}else {
		            		return val;
		            	}
		            }},
		            {field:'deadTime',title:'失效时间',width:120,align:'center'}
		            ]]
	});
})