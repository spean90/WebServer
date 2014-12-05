var index = {
	init : function() {
		var config = {
				type : 'post',
				url : '/menu/initHome.do',
				success : function(data) {
					$('#acount').html(data.user.realName)
				}
		}
		Modal.ajax(config);
	}
}



$(function() {
	index.init();
});

