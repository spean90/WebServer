var index = {
	init : function() {
		var config = {
				type : 'post',
				url : '/menu/initHome.do',
				success : function(data) {
					alert('success');
				}
		}
		Modal.ajax(config);
	}
}



$(function() {
	index.init();
});

