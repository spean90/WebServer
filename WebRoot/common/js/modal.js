var Modal = {
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
				var responseText = JSON.StrToJSON(XMLHttpRequest.responseText);
				var message = responseText.message;
				$.messager.progress('close');

				if(status == 401) {
					Modal.showError(Sys.status[status], "错误提示", function() {
						window.location.href = "login.jsp";
					});
				}
				else if(status == 403) {
					Modal.showError(Sys.status[status], "错误提示", function() {
						window.location.href = "common/html/403.html";
					});
				} else {
					Modal.showError(message || Sys.status[status]);
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
		$.scojs_message(msg, 2);
		//$.messager.alert(titie || '操作提示', msg, 'info');
	},

	/**
	 * 弹出错误提示层
	 * 
	 * @param msg 提示内容
	 * @param titie 提示标题
	 */
	showError : function(msg, titie, fuc) {
		$.scojs_message(msg, 1);
		window.setTimeout(function() {
			fuc();
		}, 3000);
		//$.messager.alert(titie || '错误提示', msg, 'error', fuc);
	},

	/**
	 * 弹出确认提示层
	 * 
	 * @param titie 提示标题
	 * @param msg 提示内容
	 * @param fuc 点击确定后执行的函数
	 */
	showConfirm : function(titie, msg, fuc) {
		var confirm = $.scojs_confirm({
			content: msg,
			action: function() {
				fuc();
			}
		});
		confirm.show();
	}
};