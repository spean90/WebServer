var Cookies = {};

Cookies.clear = function(name, options) {
	var path = options.path ? '; path=' + (options.path) : '';
	var domain = options.domain ? '; domain=' + (options.domain) : '';
	document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT; domain=" + domain + "; path=" + path;
};
Cookies.removeItem = function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  };

Cookies.hasItem = function (sKey) {
	    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	  };
