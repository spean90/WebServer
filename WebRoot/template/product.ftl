<!DOCTYPE html>
<html>
	<head>
		<#include "header_include.ftl">
		<script type="text/javascript" src="/common/charts/fusioncharts.charts.js"></script>
		<script type="text/javascript" src="/common/charts/fusioncharts.js"></script>
		<script type="text/javascript" src="/common/charts/highcharts.js"></script>
		<script type="text/javascript" src="/js/product.js"></script>
		<title>${pid}</title>
	</head>
	<body>
	<a href="#" id="addFavorite" rel="sidebar" onclick="Product.bookmarkit()">加入收藏夹</a>
		<p id="pid">${pid}</p>
		====================<br/>
		${dt?datetime}<br/>
		
		<div id="chartDiv" style="float:left; "></div>
		<div id="hightChartDiv" style="float:left;width: 300px;height: 200px;"></div>
		
		<table border="1" style="width: 500px;clear:both">
			<thead>
			<tr>
			<th>Heading</th>
			<th>Another Heading</th>
			</tr>
			</thead>
			<tbody>
			<#list list as p>
			<tr>
			<td align="center">${p.label}</td>
			<td align="center">${p.value}</td>
			</tr>
			</#list>
			</tbody>
		</table>
		
		<button type="button" onclick="Product.addToCar()">添加入购物车</button>
		<div>
			<ul id="carList">
				<li>sdjfsfd</li>
				<li>sdjfsfd</li>
				<li>sdjfsfd</li>
			</ul>
		</div>
	</body>
</html>