var productManage = {
		url : '',
		sub_url : '',
		detail_productId : '',
		showDetail : function(productId) {
			productManage.detail_productId = productId;
			var gridOpts = $('#subProductGrid').datagrid('options');
		    gridOpts.url = '/subProduct/getSubProductListByProductId.do?productId='+productId;
		    $('#subProductGrid').datagrid('load');
			$('#detailModal').modal('show');
		},
		addProduct : function(){
			$('#form').form('clear');
//			$('#type').combobox('select',"2");
//			$('#isDeliver').combobox('select',"0");
			$('.modal-title').html('新增套餐');
			productManage.url = '/product/addProduct.do';
			$('#dialogModal').modal('show');
		},
		addSubProduct : function() {
			productManage.sub_url = '/subProduct/addSubProduct.do';
			$('#discountform').form('clear');
			$('#productId_sub').val(productManage.detail_productId);
			$('#subFormModal .modal-title').html('新增折扣');
			$('#subFormModal').modal('show');
		},
		save : function() {
			Modal.showConfirm('确定要新增该套餐吗？套餐信息不可修改！','警告',function(){
				var productName = $('#productName').val();
				var price = $('#price').val();
				$('#productType').val(2);
				if(productName==''){
					Modal.showAlert('请输入套餐名称');
					return;
				}
				if(isNaN(price)) {
					Modal.showAlert('金额必须为数字')
					return;
				}
				$('#form').form('submit',{
					url : productManage.url,
					success : function(data) {
						var result = JSON.StrToJSON(data);
						if(result.code == "0000"){
							Modal.showAlert('操作成功');
							$('#dialogModal').modal('hide');
							$('#productgrid').datagrid('reload');
						}else{
							Modal.showAlert('服务器出错！');
							$('#dialogModal').modal('hide');
						}
						
					}
				})
			});
		},
		saveSubProduct : function() {
			Modal.showConfirm('确定要新增该折扣吗？添加后套餐信息不可修改！','警告',function(){
				var month = $('#month').val();
				var discount = $('#discount').val();
				if(isNaN(month)){
					Modal.showAlert('月数必须为整数');
					return;
				}
				if(isNaN(discount)||discount>1||discount<=0) {
					Modal.showAlert('折扣必须为0-1之间的数字')
					return;
				}
				$('#discountform').form('submit',{
					url : productManage.sub_url,
					success : function(data) {
						var result = JSON.StrToJSON(data);
						if(result.code == "0000"){
							Modal.showAlert('操作成功');
							$('#subFormModal').modal('hide');
							$('#subProductGrid').datagrid('reload');
						}else{
							Modal.showAlert('服务器出错！');
							$('#subFormModal').modal('hide');
						}
						
					}
				})
			});
		},
		openSubProduct : function(val){
			Modal.showConfirm('启用后，用户可以购买','警告',function(){
				var config = {
						url : '/subProduct/updateSubProduct.do?subProductId='+val+"&status=1",
						success : function(data) {
							if(data.code == "0000"){
								Modal.showAlert('操作成功');
								$('#subProductGrid').datagrid('reload');
							}else{
								Modal.showAlert('服务器出错！');
							}
						}
				}
				Modal.ajax(config);
			});
		},
		closeSubProduct : function(){
			Modal.showConfirm('禁用后，用户不可见','警告',function(){
				var config = {
						url : '/subProduct/updateSubProduct.do?subProductId='+val+"&status=1",
						success : function(data) {
							if(data.code == "0000"){
								Modal.showAlert('操作成功');
								$('#subProductGrid').datagrid('reload');
							}else{
								Modal.showAlert('服务器出错！');
							}
						}
				}
				Modal.ajax(config);
			});
		},
		open : function(val){
			Modal.showConfirm('启用套餐后，用户可以购买','警告',function(){
				var config = {
						url : '/product/setProductStatus.do?productId='+val+"&status=1",
						success : function(data) {
							if(data.code == "0000"){
								Modal.showAlert('操作成功');
								$('#productgrid').datagrid('reload');
							}else{
								Modal.showAlert('服务器出错！');
							}
						}
				}
				Modal.ajax(config);
			});
		},
		close : function(val) {
			Modal.showConfirm('禁用套餐后，用户将看不到改套餐','警告',function(){
				var config = {
						url : '/product/setProductStatus.do?productId='+val+"&status=0",
						success : function(data) {
							if(data.code == "0000"){
								Modal.showAlert('操作成功');
								$('#productgrid').datagrid('reload');
							}else{
								Modal.showAlert('服务器出错！');
							}
						}
				}
				Modal.ajax(config);
			});
		}
		
}

$(function(){
	$('#subProductGrid').datagrid({
		singleSelect : true,
		title : '折扣列表', 
		toolbar : '#sub_tbar',
		columns : [[
		            {field:'subProductId',title:'id',width:150,align:'center'},
		            {field:'month',title:'月数',width:150,align:'center'},
		            {field:'discount',title:'折扣',width:150,align:'center'},
		            {field:'status',title:'操作',width:100,align:'center',formatter:function(val,row){
		            	if (val==1) {
		            		return '<a href="#" onclick=productManage.closeSubProduct('+row.subProductId+')>禁用</a>';
						}else {
							return '<a href="#" onclick=productManage.openSubProduct('+row.subProductId+')>启用</a>';
						}
		            }}
		            ]]
	});
	
	
	
	$('#productgrid').datagrid({
		url : '/product/getProductListByParams.do',
		pagination : true,
		singleSelect : true,
		title : '套餐列表', 
		fitColumns : true,
		toolbar: '#tbar',
		columns : [[
		            {field:'productId',title:'套餐ID',width:100,align:'center'},
		            {field:'productName',title:'套餐名',width:100,align:'center'},
		            {field:'price',title:'价格（元/月）',width:100,align:'center'},
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
		            {field:'createTime',title:'创建时间',width:100,align:'center'},
		            {field:'limitTime',title:'折扣信息',width:100,align:'center',formatter:function(val,row){
		            	return '<a href="#" onclick=productManage.showDetail('+row.productId+')>详情</a>';
		            }},
		            {field:'status',title:'操作',width:100,align:'center',formatter:function(val,row){
		            	if (val==1) {
		            		return '<a href="#" onclick=productManage.close('+row.productId+')>禁用</a>';
						}else {
							return '<a href="#" onclick=productManage.open('+row.productId+')>启用</a>';
						}
		            }}
		            ]]
		
	})
})


