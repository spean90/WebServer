var Modal = {
		
		status : {
			'501' : '系统没有此操作',
			'403' : '访问权限异常,请重新登录',
			'500' : '服务器操作异常',
			'404' : '页面未找到异常',
			'400' : '请求参数异常',
			'401' : '登录超时异常'
		},
	/**
	 * 封装的ajax方法，对操作失败进行了封装处理
	 * 
	 * @param config
	 */
	ajax : function(config) {
		$.ajax({
			type : config.type || 'post',
			url : config.url,
			data : config.data,
			async: config.async || false,
			success : function(data) {
				data = JSON.StrToJSON(data);
				var success = data.success;
				
				if(success == false) {
					Modal.showError(data.message || "操作失败", "", function() {});
				}
				else {
					config.success(data);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				var status = XMLHttpRequest.status;
				if(status == 401) {
					Modal.showError(Modal.status[status], "错误提示", function() {
						window.location.href = "/login.html";
					});
				}
				else if(status == 403) {
					Modal.showError(Modal.status[status], "错误提示", function() {
						window.location.href = "/login.html";
					});
				} else {
					Modal.showError( Modal.status[status]||"服务器异常");
				}
			}
		});
	},

	/**
	 * 封装的表单submit方法，对操作失败进行了封装处理
	 * 
	 * @param formid form表单id
	 * @param config
	 */
	submit : function(formid, config) {
		$(formid).form('submit', {
			url : config.url,
			onSubmit : function() {
				return $(this).form('validate');
			},
			success : function(data) {
				data = JSON.StrToJSON(data);
				if (data.success == false) {
					Modal.showError(data.message || "操作失败", "", function() {});
				} else {
					config.success(data);
				}
			}
		});
		/*if($(formid).form('validate')) {
			Modal.ajax({
				type: config.type || 'post',
				url : config.url,
				data: $(formid).serialize(),
				success: function(data) {
					config.success(data);
				}
			});
		}*/
	},

	/**
	 * 弹出普通提示层
	 * 
	 * @param msg 提示内容
	 * @param titie 提示标题
	 */
	showAlert : function(msg, title) {
		$.messager.alert(title || '操作提示', msg, 'info');
	},

	/**
	 * 弹出错误提示层
	 * 
	 * @param msg 提示内容
	 * @param titie 提示标题
	 */
	showError : function(msg, titie, fuc) {
		$.messager.alert(titie || '错误提示', msg, 'error', fuc);
	},

	/**
	 * 弹出确认提示层
	 * 
	 * @param titie 提示标题
	 * @param msg 提示内容
	 * @param fuc 点击确定后执行的函数
	 */
	showConfirm : function(msg,titie, fuc) {
		$.messager.alert(titie || '提示', msg, 'info', fuc);
	},
	
	/**
	 * 无父页面则跳转无权限页面，不是刷新父页面
	 */
	gotoPermissionPage:function(status){
		if (window.top!=window.self) {
			Modal.showError(Modal.status[status], "错误提示", function() {
				window.parent.location.reload();
			});
		}else{ 
			Modal.showError(Modal.status[status], "错误提示", function() {
				window.location.href = "/login.html";
			});
		 } 
	}
	
};


//跨域iframe高度自适应  begin
function initFrameHeight() {
	var pdiv = window.parent.document.getElementById('mainDiv');
	pdiv.style.height = document.body.scrollHeight+'px';
	
	var piframe = window.parent.document.getElementById('centerIFrame');
	piframe.style.height = (document.body.scrollHeight-20)+'px';
}

$(function() {
	//跨域iframe高度自适应  begin
	window.onload = initFrameHeight;
});


