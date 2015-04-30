function tabs(obj){
	obj.children('.tabs-label').find('a').click(function(e){
		e.preventDefault();
		_index = $(this).parent().index();
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.tabs-label').siblings('.tabs-content').children('div:eq(' + _index + ')').show().siblings().hide();
	});
}

$(function(){
	$.fn.modal = function(id,title,content){
		var _html =	'<div class="pop" id="' + id + '"><div class="pop-box"><div class="pop-header">' + title + ' <i class="icon-close close-pop"></i></div><div class="pop-body">' + content + '</div><div class="pop-footer"><input type="button" class="close-pop btn-green" value="确 定" /></div></div><div class="dark-mask"></div></div>';
		$('body').append(_html);
//		this.click(function(e){
//			e.preventDefault();
//			$('#'+id).show('fast', function(){
//				var _height = -$('#'+id).children('.pop-box').height()/2;
//				$('#'+id).children('.pop-box').animate({'margin-top': _height}, 'fast');
//			});
//		});
		$('#'+id).show('fast', function(){
			var _height = -$('#'+id).children('.pop-box').height()/2;
			$('#'+id).children('.pop-box').animate({'margin-top': _height}, 'fast');
		});
		$('#'+id).find('.close-pop, .dark-mask').click(function(e){
			e.preventDefault();
			$('#'+id).hide('fast');
		});
	}
})