$(document).ready(function () {
	$('input, textarea').placeholder({customClass:'my-placeholder'});
    var $terms = [
//            'search',
//            'test',
//            'css',
//            'apple',
//            'bear',
//            'cat',
//            'crabapple',
//            'creep',
//            'czar',
//            'danger',
//            'dominant',
//            'doppler',
//            'everclear',
//            'evangelism',
//            'frodo'
        ].sort(), $return = [];
    function strInArray(str, strArray) {
        for (var j = 0; j < strArray.length; j++) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            if ((strArray[j].modelsName.match(str)||strArray[j].modelsNickname.match(str)) && $return.length < 5) {
                var $h = strArray[j].modelsName.replace(str, '<strong>' + str + '</strong>');
                if (strArray[j].modelsNickname.match(str)) {
                	$h = strArray[j].modelsNickname.replace(str, '<strong>' + str + '</strong>');
				}
                $return.push('<li class="prediction-item"><span class="prediction-text">' + $h + '</span><span class="prediction-num">'+strArray[j].recycleCount+'人回收</span></li>');
            }
        }
        window.CP.exitedLoop(1);
    }
    function nextItem(kp) {
        if ($('.focus').length > 0) {
            var $next = $('.focus').next(), $prev = $('.focus').prev();
        }
        if (kp == 38) {
            if ($('.focus').is(':first-child')) {
                $prev = $('.prediction-item:last-child');
            }
            $('.prediction-item').removeClass('focus');
            $prev.addClass('focus');
        } else if (kp == 40) {
            if ($('.focus').is(':last-child')) {
                $next = $('.prediction-item:first-child');
            }
            $('.prediction-item').removeClass('focus');
            $next.addClass('focus');
        }
    }
    $(function () {
        $('#search-bar').keydown(function (e) {
            $key = e.keyCode;
            if ($key == 38 || $key == 40) {
                nextItem($key);
                return;
            }
            setTimeout(function () {
                var $search = $('#search-bar').val();
                $return = [];
                if ($search == '' || !$('input').val) {
                     $('.icon-so').show();
                } else {
                    $('.icon-so').hide();
                }
                var config = {
    					url : Sys.serviceDomain+"/searchModels?recordPerPage=5&keywords="+$search, 
    					callbackParameter: "callback",
    					success : function(data){ 
//    						if (data.msg.code!="0000" && data.msg.code!="0024" ) {
//    							return;
//    						}
    						var content = data.content;
    						var list = content.list;
    						$terms = list;
    						strInArray($search, $terms);
    						 if ($search == '' || !$('input').val) {
    			                    $('.output').html('').slideUp();
    			                } else {
    			                    $('.output').html($return).slideDown();
    			                }
    			                $('.prediction-item').on('click', function () {
    			                	$text = $(this).find('span.prediction-text').text();
    			                    $('.output').slideUp(function () {
    			                        $(this).html('');
    			                    });
    			                    $('#search-bar').val($text);
    			                });
    			                $('.prediction-item:first-child').addClass('focus');
    					}
    			}
    			Modal.jsonp(config);
            }, 50);
        });
    });
    $('#search-bar').focus(function () {
        if ($('.prediction-item').length > 0) {
            $('.output').slideDown();

        }
        $('#searchform').submit(function (e) {
            e.preventDefault();
            $text = $('.focus').find('span').text();
            $('.output').slideUp();
            $('#search-bar').val($text);
            $('input').blur();
        });

    });
  
    $('#search-bar').blur(function () {
        if ($('.prediction-item').length > 0) {
            $('.output').slideUp();
        }
        if($('#search-bar').val()==''){
        	 $('.icon-so').show();
        }
        //$(this).val('');
      // $('.search-input').css('paddingLeft',40);
    });
});