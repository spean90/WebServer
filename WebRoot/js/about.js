/**
 * 关于我们
 */
var about = {
	initAbout : function() {
		var config = {
			url : Sys.serviceDomain + "/listUserOwnBasket?key=" + sessionStorage.token,
			callbackParameter : "callback",
			success : function(data) {
				if (data.msg.code != "0000") {
					return;
				}
				$('.about-left').empty();
				$('.about-right').empty();
				var leftStr = '<div><img src="pic/about_us.png" height="320" width="900" /></div><br />'
							+ '<p>壹回收网(www.yihuishou.com)是国内一家电子产品竞价回收平台。111</p>'
							+ '<p>壹回收网介绍</p>'
							+ '<h2 class="about-title">我们的服务</h2>'
							+ '<p>高价：我们的服务</p>'
							+ '<p>诚信：我们的服务</p>'
							+ '<p>便捷：我们的服务</p>'
							+ '<h2 class="about-title">我们的展望</h2>'
							+ '<p>我们的展望</p>'
							+ '<h2 class="about-title">联系我们</h2>'
							+ '<p>客服热线：联系我们</p>'
							+ '<p>客服QQ：联系我们</p>';
				var rightStr = '<p class="about-title2">联系我们：</p>'
							+ '<p>客服热线：联系我们</p>'
							+ '<p>客服QQ：联系我们</p>'
							+ '<br />'
							+ '<div><img src="pic/contact_us.png" height="189" width="280" /></div>';
				$('.about-left').append(leftStr);
				$('.about-right').append(rightStr);
			}
		}
		Modal.jsonp(config);
	}
};

$(function() {
	$('.nav.wrapper.clearfix li.on').removeClass('on');
	$('[href="about.html"]').parent().addClass('on');
	about.initAbout();
});