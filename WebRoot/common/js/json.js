/**
 * JSON格式转换类
 */
var JSON = {
	StrToJSON : function(str) {
		var a;
		eval('a=' + str + ';');
		return a;
	},
	
	JsonToStr : function(obj) {
		switch (typeof(obj)) {
			case 'object' :
				var ret = [];
				if (obj instanceof Array) {
					for (var i = 0; i < obj.length; i++) {
						ret.push(JSON.JsonToStr(obj[i]));
					}
					return '[' + ret.join(',') + ']';
				} else if (obj instanceof RegExp) {
					return obj.toString();
				} else {
					for (var a in obj) {
						ret.push('"' + a + '":' + JSON.JsonToStr(obj[a]));
					}
					return '{' + ret.join(',') + '}';
				}
			case 'function' :
				return 'function() {}';
			case 'number' :
				return obj.toString();
			case 'string' :
				if(obj == "") {
					return null;
				}
				return "\""
						+ obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
								function(a) {
									return ("\n" == a) ? "\\n" : ("\r" == a)
											? "\\r"
											: ("\t" == a) ? "\\t" : "";
								}) + "\"";
			case 'boolean' :
				if(obj == true) {
					return 1;
				}
				else {
					return 0;
				}
			default :
				return obj.toString();
		}
	}
};