<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<script src="/scripts/jquery-1.9.1.min.js"></script>
<script src="/common/jquery/jquery.jsonp-2.4.0.min.js"></script>
<script src="/common/js/sys.js"></script>
<script src="/common/js/modal.js"></script>
<script type="text/javascript">
function initDetail() {
	var pid = $('#pid').text();
	var config = {
			url : Sys.serviceDomain+"/getHotPhone.do", 
			callbackParameter: "callback",
			success : function(data){ 
				console.log(data);
			}
	}
	Modal.jsonp(config);
}

</script>
</head>
<body onload="initDetail()">
<p hidden id="pid">${pid }</p>

hehhehhhhh

</body>
</html>