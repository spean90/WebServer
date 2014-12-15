var Cookies = {};

Cookies.clear = function(name, options) {
	var path = options.path ? '; path=' + (options.path) : '';
	var domain = options.domain ? '; domain=' + (options.domain) : '';
	document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT; domain=" + domain + "; path=" + path;
};


