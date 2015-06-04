var userCoupon = {
		search : function() {
			var userId = $('#userId').val();
			var userName = $('#userName').val();
			var type = $('#type').combobox('getValue');
			$('#userCouponGrid').datagrid('load',{
				userId : userId,
				userName : userName,
				type : type
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
		            {field:'userName',title:'手机号',width:100,align:'center'},
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
		            {field:'deadTime',title:'失效时间',width:100,align:'center'}
		            //{field:'productIds',title:'限用套餐id',width:100,align:'center'}
		            ]]
		
	});
	$('#type').combobox({
		data : [{
			name : "全部",
			value : ""
		},{
			name : "直冲",
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


