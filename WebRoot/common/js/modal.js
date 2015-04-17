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
				data = JSON.parse(data);
				var success = data.success;
				
				if(success == false) {
					alert("操作失败");
				}
				else {
					config.success(data);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				var status = XMLHttpRequest.status;
				if(status == 401) {
					alert("操作失败");
				}
				else if(status == 403) {
					window.location.href = "/login.html";
				} else {
					alert("操作失败");
				}
			}
		});
	},

	jsonp : function(config){
		$.jsonp({
			url : config.url,
			data : config.data,
			callbackParameter: "callback",
			success : function(data){ 
				config.success(data);
			},
			complete: function() {
	          // 数据获取完成后，需要做的事，此为隐藏读取数据的滚动条。
	        },
	        error : function(xOptions, textStatus) {
				alert(textStatus);
				//window.location.href = "/index.html";
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
				data = JSON.parse(data);
				if (data.success == false) {
					alert("操作失败");
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
	}
};