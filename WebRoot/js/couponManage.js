var coupon = {
	url : '',
	addCoupon : function(){
		$('#form').form('clear');
		$('#type').combobox('select',"2");
		$('#isDeliver').combobox('select',"0");
		$('.modal-title').html('添加优惠券');
		coupon.url = '/coupon/addCoupon.do';
		
		var gridOpts = $('#allProductGrid').datagrid('options');
	    gridOpts.url = '/product/getProductListIds.do';
	    $('#allProductGrid').datagrid('load');
		$('#couponModal').modal('show');
	},
	updateCoupon : function(){
		var row = $('#couponGrid').datagrid('getSelected');
		if(row) {
			$('#form').form('clear');
			$('#couponId').val(row.couponId);
			$('#couponName').val(row.couponName);
			$('#sum').val(row.sum);
			$('#type').combobox('select',row.type);
			$('#isDeliver').combobox('select',row.isDeliver);
			$('#couponDesc').val(row.couponDesc);
			$('.modal-title').html('修改优惠券');
			coupon.url = '/coupon/updateCoupon.do';
			$('#couponModal').modal('show');
		}else{
			Modal.showAlert('请选择要修改的优惠券!');
		}
		
	},
	deleteCoupon : function() {
		var row = $('#couponGrid').datagrid('getSelected');
		if(row) {
			Modal.showConfirm('确定要删除优惠券"'+row.couponName+'"吗？',null,function(){
				var config = {
						type:"post",
						url:'/coupon/deleteCouponById.do?couponId='+row.couponId,
						success:function(data){
							if(data.code == "0000"){
								Modal.showAlert('删除成功');
								$('#couponModal').modal('hide');
								$('#couponGrid').datagrid('reload');
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
		Modal.showConfirm('确定要新增改优惠券吗？优惠券信息不可修改！','警告',function(){
			var couponName = $('#couponName').val();
			var sum = $('#sum').val();
			var type = $('#type').combobox('getValue');
			var isDeliver = $('#isDeliver').combobox('getValue');
			if(couponName==''){
				Modal.showAlert('请输入优惠券名称');
				return;
			}
			if(isNaN(sum)) {
				Modal.showAlert('金额必须为数字')
				return;
			}
			var ids = '';
			var rows = $('#allProductGrid').datagrid('getSelections');
			for(var i=0; i<rows.length; i++){
			    ids+=","+rows[i].productId;
			}
			ids = ids.substring(1);
			$('#form').form('submit',{
				url : coupon.url,
				 onSubmit: function(param){  
				        param.productIds = ids; 
				    },   
				success : function(data) {
					var result = JSON.StrToJSON(data);
					if(result.code == "0000"){
						Modal.showAlert('操作成功');
						$('#couponModal').modal('hide');
						$('#couponGrid').datagrid('reload');
					}else{
						Modal.showAlert('服务器出错！');
						$('#couponModal').modal('hide');
					}
					
				}
			})
		});
		
	},
	search : function() {
		var couponName = $('#couponName_search').val();
		var type = $('#type_search').combobox('getValue');
		var isDeliver = $('#isDeliver_search').combobox('getValue');
		$('#couponGrid').datagrid('load',{
			couponName : couponName,
			type : type,
			isDeliver : isDeliver
		})
	},
	getExclusiveProducts : function(productIds){
		var gridOpts = $('#productGrid').datagrid('options');
	    gridOpts.url = '/product/getProductListIds.do?productIds='+productIds;
	    $('#productGrid').datagrid('reload');
		$('#detailModal').modal('show');
	}
}

$(function() {
	$('#allProductGrid').datagrid({
		title : '套餐列表',
		columns : [[
		            {field:'productId',title:'套餐ID',width:100,align:'center'},
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
		            	}}
		            ]]
	});
	
	
	$('#productGrid').datagrid({
		title : '套餐列表',
		columns : [[
		            {field:'productId',title:'套餐ID',width:100,align:'center'},
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
		            	}}
		            ]]
	});
	
	$('#type').combobox({
		data : [{
			name : "直冲抵用",
			value : "1"
		},{
			name : "套餐抵用",
			value : "2"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 60
	});
	$('#type_search').combobox({
		data : [{
			name : "全部",
			value : ""
		},{
			name : "直冲抵用",
			value : "1"
		},{
			name : "套餐抵用",
			value : "2"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
	$('#isDeliver').combobox({
		data : [{
			name : "是",
			value : "1"
		},{
			name : "否",
			value : "0"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 60
	});
	$('#isDeliver_search').combobox({
		data : [{
			name : "全部",
			value : ""
		},{
			name : "是",
			value : "1"
		},{
			name : "否",
			value : "0"
		}],
		textField : 'name',
		valueField : 'value',
		panelHeight : 80
	});
	
	$('#couponGrid').datagrid({
		url : '/coupon/getCouponListByParams.do',
		pagination : true,
		singleSelect : true,
		fitColumns : true,
		columns : [[
		            {field:'couponId',title:'优惠券id',width:100,align:'center'},
		            {field:'couponName',title:'优惠券名称',width:100,align:'center'},
		            {field:'couponDesc',title:'说明',width:100,align:'center'},
		            {field:'isDeliver',title:'是否可转赠',width:100,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '是';
		            	}else if(val==0){
		            		return '否';
		            	}else {
		            		return val;
		            	}
		            }},
		            {field:'sum',title:'金额',width:100,align:'center'},
		            {field:'type',title:'类型',width:100,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '直冲抵用';
		            	}else if(val==2){
		            		return '套餐抵用';
		            	}else {
		            		return val;
		            	}
		            }},
		            {field:'createTime',title:'创建时间',width:100,align:'center'},
		            {field:'deadTime',title:'失效时间',width:100,align:'center'},
		            {field:'productIds',title:'套餐专用',width:100,align:'center',formatter:function(val){
		            	if (val == ''||val==null) {
		            		return '所有套餐'
						}else{
							return '<a href="#" onclick=coupon.getExclusiveProducts("'+val+'") >查看</a>'
						}
		            }}
		            ]],
		toolbar : '#tbar'
	});
})