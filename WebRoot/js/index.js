var index = {
	init : function() {
		var config = {
				type : 'post',
				url : '/menu/initHome.do',
				success : function(data) {
					$('#acount').html('<a href="#" onclick="index.openUserCenter()">'+data.user.realName+'</a>')
					sessionStorage.account = data.user.account;
					sessionStorage.uid = data.user.uid;
					sessionStorage.password = data.user.password;
					sessionStorage.realName = data.user.realName;
					var menuData = data.menus;
					$('#menu-div').remove();
					$('#analyse-basic').append('<div id="menu-div"></div>');
					
					var str = '';
					var length = menuData.length;
					
					for(var i=0; i<length; i++) {
						str += 
							'<div class="vl-box-2 ' + (i == 0 ? 'no-line' : '') + '">' +
								'<div class="box-2-title"><em class="menu-user-attribute l"></em><span class="l">' + (menuData[i].menuName) + '</span></div>' +
								'<ul class="menu-ul"' + ((length < 4 || i == 0) ? '' : ' style="display:none"') + '>';
						
						var children = menuData[i].children;
						if(children && children.length > 0) {
							for(var j=0; j<children.length; j++) {
								if(i == 0 && j == 0) {
									$('#address').html(children[j].menuName);
									document.getElementById("centerIFrame").src =children[j].menuUrl;
									str += '<li><a class="selected" href="javascript:void(0);" onclick="show(this, \'' + children[j].menuName + '\', \'' + children[j].menuUrl + '\');">' + (children[j].menuName) + ' <em class="menu-icon-point"></em> </a></li>';
								}
								else {
									str += '<li><a href="javascript:void(0);" onclick="show(this, \'' + children[j].menuName + '\', \'' + children[j].menuUrl + '\');">' + (children[j].menuName) + ' </a></li>';
								}
							}
						}
						str += '</ul></div>';
					}
					$('#menu-div').append(str);
					$('.box-2-title').click(function() {
						$(this).parent().find('ul').slideToggle('fast');
					});
				}
		}
		Modal.ajax(config);
	},
	openAll : function() {
		$('.menu-ul').slideToggle('fast');
	},
	openUserCenter :function() {
		$('#address').html("用户中心");
		$(".menu-ul .selected").removeClass("selected");
		$(".menu-icon-point").remove();
		
		var iframe = document.getElementById("centerIFrame");
		iframe.style.height = "600px";
		iframe.src = "/html/userCenter.html";
	},
	logout : function() {
		var config = {
				url : '/sys/logout.do',
				success : function(data) {
					parent.window.location.href = '/login.html';
					var domain = document.domain;
					//转换成顶级域名
					domain = domain.substring(domain.indexOf(".") + 1, domain.length);
					//登陆成功后先清除原来的cookie
					//Cookies.clear("JSESSIONID", {domain: domain, path: "/"});
					Cookies.removeItem("JSESSIONID", "/", "localhost");
				}
		}
		Modal.ajax(config);

		
	}
	
}
function show(a, name, url) {
	if(!url || url != "null") {
		$(".menu-ul .selected").removeClass("selected");
		$(a).addClass("selected");
		
		$(".menu-icon-point").remove();
		$(a).append('<em class="menu-icon-point"></em>');
		$('#address').html(name);
		var iframe = document.getElementById("centerIFrame");
		iframe.style.height = "600px";
		iframe.src = url;
	}
}


$(function() {
	index.init();
});

