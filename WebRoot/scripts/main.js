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

function ScrollText(content,btnPrevious,btnNext,autoStart,timeout,isSmoothScroll)
{
    this.Speed = 5;
    this.Timeout = timeout;
	  this.stopscroll =false;
	  this.isSmoothScroll= isSmoothScroll;
    this.LineHeight = 20;
    this.NextButton = this.$(btnNext);
    this.PreviousButton = this.$(btnPrevious);
    this.ScrollContent = this.$(content);
    this.ScrollContent.innerHTML += this.ScrollContent.innerHTML;
    
    if(autoStart)
    {
        this.Start();
    }
}

ScrollText.prototype = {
	$:function(element)
	{
		return document.getElementById(element);
	},
	Previous:function()
	{
		this.stopscroll = true;
		this.Scroll("up");
	},
	Next:function()
	{
		this.stopscroll = true;
		this.Scroll("down");
	},
	Start:function()
	{
		if(this.isSmoothScroll)
		{
			this.AutoScrollTimer = setInterval(this.GetFunction(this,"SmoothScroll"), this.Timeout);
		}
		else
		{		
			this.AutoScrollTimer = setInterval(this.GetFunction(this,"AutoScroll"), this.Timeout);
		}
	},
	Stop:function()
	{
		clearTimeout(this.AutoScrollTimer);
		this.DelayTimerStop = 0;
	},
	MouseOver:function()
	{	
		this.stopscroll = true;
	},
	MouseOut:function()
	{
		this.stopscroll = false;
	},
	AutoScroll:function()
	{
		if(this.stopscroll) 
		{
			return;
		}
		this.ScrollContent.scrollTop++;
		if(parseInt(this.ScrollContent.scrollTop) % this.LineHeight != 0)
		{
			this.ScrollTimer = setTimeout(this.GetFunction(this,"AutoScroll"), this.Speed);
		}
		else
		{
			if(parseInt(this.ScrollContent.scrollTop) >= parseInt(this.ScrollContent.scrollHeight) / 2)
			{
				this.ScrollContent.scrollTop = 0;
			}
			clearTimeout(this.ScrollTimer);
		}
	},
	SmoothScroll:function()
	{
		if(this.stopscroll) 
		{
			return;
		}
		this.ScrollContent.scrollTop++;
		if(parseInt(this.ScrollContent.scrollTop) >= parseInt(this.ScrollContent.scrollHeight) / 2)
		{
			this.ScrollContent.scrollTop = 0;
		}
	},
	Scroll:function(direction)
	{

		if(direction=="up")
		{
			this.ScrollContent.scrollTop--;
		}
		else
		{
			this.ScrollContent.scrollTop++;
		}
		if(parseInt(this.ScrollContent.scrollTop) >= parseInt(this.ScrollContent.scrollHeight) / 2)
		{
			this.ScrollContent.scrollTop = 0;
		}
		else if(parseInt(this.ScrollContent.scrollTop)<=0)
		{
			this.ScrollContent.scrollTop = parseInt(this.ScrollContent.scrollHeight) / 2;
		}
		
		if(parseInt(this.ScrollContent.scrollTop) % this.LineHeight != 0)
		{
			this.ScrollTimer = setTimeout(this.GetFunction(this,"Scroll",direction), this.Speed);
		}
	},
	GetFunction:function(variable,method,param)
	{
		return function()
		{
			variable[method](param);
		}
	}
}

function noticeList(){
   var scroll2 = new ScrollText("notice-list","","",true,50,true);
	scroll2.LineHeight = 63;
}