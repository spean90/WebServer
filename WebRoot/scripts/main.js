function tabs(obj){
	obj.children('.tabs-label').find('a').click(function(e){
		e.preventDefault();
		_index = $(this).parent().index();
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.tabs-label').siblings('.tabs-content').children('div:eq(' + _index + ')').show().siblings().hide();
	});
}

$(function(){
	$.fn.hint = function(id, title, hint){
		var _html =	'<div class="pop" id="' + id + '"><div class="pop-box"><div class="pop-header">' + title + ' <i class="icon-close close-pop"></i></div><div class="pop-body">' + hint + '</div><div class="pop-footer"><input type="button" class="close-pop btn-green" value="确 定" /></div></div><div class="dark-mask"></div></div>';
		$('body').append(_html);
		$('#'+id).show('fast', function(){
			var _height = -$('#'+id).children('.pop-box').height()/2;
			$('#'+id).children('.pop-box').animate({'margin-top': _height}, 'fast');
		});
		$('#'+id).find('.close-pop, .dark-mask').click(function(e){
			e.preventDefault();
			$('#'+id).hide('fast');
		});
	}

	$.fn.modal = function(src, id){
		var _html =	'<div class="pop" id="' + id + '"><div class="pop-box"><iframe src="' + src + '" width="100%" frameborder="0" scrolling="no"></iframe></div><div class="dark-mask"></div></div>';
		$('body').append(_html);
		$('#'+id).show('fast', function(){
			var _boxW = $('#'+id).find('iframe').contents().width();
			var _boxH = $('#'+id).find('iframe').contents().height();
			$('#'+id).find('iframe').css({'height': _boxH});
			var _height = -_boxH/2;
			var _left = -_boxW/2;
			$('#'+id).children('.pop-box').css({'width': _boxW, 'height': _boxH}).animate({'margin-top': _height, 'margin-left': _left}, 'fast');
			$('#'+id).find('iframe').contents().find('.close-pop').click(function(e){
				e.preventDefault();
				$('#'+id).hide('fase');
			});
		});
		$('#'+id).find('.close-pop, .dark-mask').click(function(e){
			e.preventDefault();
			$('#'+id).hide('fast');
		});
	}
});

function helpNav(){
	$('.help-left dt').click(function(){
		$(this).parent('dl').toggleClass('on');
	});
}

function noticeList(time){ 
var $this = $(".notice-list"); 
var scrollTimer; 
$this.hover(function(){ 
clearInterval(scrollTimer); 
},function(){ 
scrollTimer = setInterval(function(){ 
scrollNews( $this ); 
}, 2000 ); 
}).trigger("mouseout"); 
 
} 

function scrollNews(obj){ 
var $self = obj.find("ul:first"); 
$self.animate({ "margin-top" : -35 +"px" },600 , function(){ 
$self.css({"margin-top":"0px"}).find("li:first").appendTo($self); 
}) 
}

function scroll(){
        $('.notice-list li:last').hide().insertBefore( $('.notice-list li:first')).slideDown(1000);
}