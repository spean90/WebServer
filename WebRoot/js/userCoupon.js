var userCoupon = {
		searchGasOrder : function() {
			var userId = $('#userId').val();
			var orderId = $('#orderId').val();
			$('#gasOrderGrid').datagrid('load',{
				userId : userId,
				orderId : orderId
			})
		}
		
}

$(function(){
	$('#userCouponGrid').datagrid({
		url : '/userCoupon/getUserCouponListByParams.do',
		pagination : true,
		title : '用户优惠券列表', 
		fitColumns : true,
		columns : [[
		            {field:'userId',title:'用户id',width:100,align:'center'},
		            {field:'couponName',title:'优惠券名',width:100,align:'center'},
		            {field:'type',title:'类型',width:100,align:'center',formatter:function(val){
		            	if(val==1){
		            		return '直冲抵用';
		            	}else if(val==2){
		            		return '套餐抵用';
		            	}else {
		            		return val;
		            	}
		            }},
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
		            {field:'deadTime',title:'失效时间',width:100,align:'center'},
		            {field:'productIds',title:'限用套餐id',width:100,align:'center'}
		            ]]
		
	})
})


