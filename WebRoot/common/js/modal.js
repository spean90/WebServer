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
	        	console.log(xOptions);
				//alert(textStatus);
				//window.location.href = "/index.html";
			}
		});
	},
	
	alert : function(content,title) {
		var mytitle = title?title:'友情提示';
		$('#modal').remove();
		//$(this).modal('modal',mytitle,content);
		$(this).hint('modal', mytitle, content);
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
	},
	/*
	 * 验证手机号码
	 * 验证规则：11位数字，以1开头。
	 */
	checkMobile : function(str) {
	    var re = /^1\d{10}$/
	    if (re.test(str)) {
	        //alert("正确");
	    	return 0;
	    } else {
	        //alert("错误");
	    	return 1;
	    }
	},
	/*
	 * 验证邮箱
	 * 验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
	 * 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
	 * 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
	 */
	checkEmail : function(str){
		var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		if(re.test(str)){
			//alert("正确");
			return 0;
		}else{
			//alert("错误");
			return 1;
		}
	}
};