<!DOCTYPE html>
<html>
	<head>
		<#include "header_include.ftl">
		<script type="text/javascript" src="/common/charts/fusioncharts.charts.js"></script>
		<script type="text/javascript" src="/common/charts/fusioncharts.js"></script>
		<script type="text/javascript" src="/js/product.js"></script>
		<title>${pid}</title>
	</head>
	<body>
		<p id="pid">${pid}</p>
		====================<br/>
		${dt?datetime}<br/>
		
		<div id="chartDiv"></div>
		
	</body>
</html>