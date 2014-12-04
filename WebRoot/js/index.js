var index = {
	init : function() {
		$.ajax({
			type : "get",
			url : '/menu/initHome.do',
			success : function(data) {
				data = JSON.StrToJSON(data);
				var success = data.success;
				if(success == false) {
					Modal.showError(data.message || "操作失败", "", function() {});
				}
				else {
					alert('success');
				}
			}
		});
	}
}



$(function() {
	index.init();
});

