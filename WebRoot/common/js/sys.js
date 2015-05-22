var Sys = {
		user : {},
		ctx : Sys.getContextPath(),
		getContextPath : function (){ 
			var pathName = document.location.pathname; 
			var index = pathName.substr(1).indexOf("/"); 
			var result = pathName.substr(0,index+1); 
			alert(result);
			return result; 
		} 
}