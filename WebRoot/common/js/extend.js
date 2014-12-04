function ex(status) {
	if(status == 403) {
		Modal.showAlert("没有访问权限");
	}
	else if(status == 500) {
		Modal.showAlert("系统错误");
	}
	else if(status == 401) {
		Modal.showError("系统超时，3秒后将自动跳转到登录页面", "错误提示", function() {
			//window.location.href = "login.html";
			window.parent.location.reload();
		});
	}
}

(function() {
	$.fn['tmodal'] = function(title) {
		$(this).find('.modal-header').find('h3').html(title);
	};
	
	var language = Cookies.get("language") || "zh";	
	easyloader.locale = language; // 本地化设置
	easyloader.theme = "gray"; // 设置主题
	using(['datagrid', 'treegrid', 'dialog', 'window', 'form'],  function () {
		$.extend($.fn.datagrid.defaults, {
			height: 600,
			pagination: true,
			rownumbers: true,
			fitColumns: true,
			singleSelect: true,
			nowrap: false,
			striped: true,
			pageSize: 20,
			onLoadError: function(data) {
				ex(data.status);
			}
		});
		
		$.extend($.fn.dialog.defaults, {
			resizable: true,
			modal: true,
			shadow: true,
			closed: true,
			resizable: false
		});
		
		if(loader_url) {
			Util.importFile(loader_url, "js");
		}
		
		$('body').css("display", "");
	});
})(jQuery);

/**
 * 重写Array的移除方法
 * @param {} dx
 * @return {Boolean}
 */
Array.prototype.remove = function(dx) {
	if(isNaN(dx) || dx > this.length) {
		return false;
	}
		
	for(var i=0, n=0; i<this.length; i++) {
		if(this[i] != this[dx]) {
			this[n++] = this[i];
		}
	}
	
	this.length -= 1;
};

/**
 * 重写Array的indexOf方法
 */
if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(val) {
		alert(22);
	   	var value = this;
	   	for(var i =0; i < value.length; i++) {
	      	if(value[i] == val) return i;
	   	}
	   	return -1;
	};  
}