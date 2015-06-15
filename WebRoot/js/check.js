var check = {
		check : function() {
			var imei = $('.search-common').val();
			if(imei==""){
				Modal.alert("IMEI码为空，请输入手机IMEI码！");
				return false;
			}
			var config = {
					url : Sys.serviceDomain+"/detailTacTerminalByImei?tac=" + imei, 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$('.breadcrumb>ul').append($('<li class="on"><a href="#">查询结果</a></li>'))
						$('.verify-section').empty();
						var str = '';
						if (!content.tac) {
							str = '<i class="icon-search"></i> 亲，没有查询到相关信息哦！'
								+'<br /><br />'
								+'<a href="javascript:;" class="big-btn mt-30" onclick="check.reCheck()">重新查询</a>';
						}else{
							var terminalProperty = content.terminalProperty;
							str = '<p class="verify-result">查询结果：该手机为正品手机</p>'
								+' <div class="verify-table">'
								+'<table>'
								+'<tr>'
								+' <td>主屏尺寸：'+terminalProperty.screenSize+'</td>'
								+' <td>www支持：'+terminalProperty.isWww+'</td>'
								+' <td>操作系统：'+terminalProperty.operatingSystem+'</td>'
								+' </tr>'
								+' <tr>'
								+' <td>waln功能：'+terminalProperty.isWlan+'</td>'
								+' <td>自有业务：'+terminalProperty.privateBus+'</td>'
								+' <td>后摄像头像素：'+terminalProperty.flankCameraPixel+'</td>'
								+' </tr>'
								+'<tr>'
								+' <td>手写输入：'+terminalProperty.isHandwriting+'</td>'
								+' <td>2g模式：'+terminalProperty.is2g+'</td>'
								+' <td>终端品牌编码：'+terminalProperty.modelNameId+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>主流第三方业务：'+terminalProperty.thirdPartyBus+'</td>'
								+' <td>终端款式：'+terminalProperty.modelStyle+'</td>'
								+' <td>终端类型：'+terminalProperty.modelType+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>4g模式：'+terminalProperty.is4g+'</td>'
								+' <td>蓝牙：'+terminalProperty.isBluetooth+'</td>'
								+' <td>终端型号：'+terminalProperty.modelDesc+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>别名：'+terminalProperty.otherName+'</td>'
								+' <td>屏幕像素：'+terminalProperty.screenPixel+'</td>'
								+' <td>终端设备标识：'+terminalProperty.modelId+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>触摸屏类型：'+terminalProperty.touchType+'</td>'
								+' <td>gps功能：'+terminalProperty.isGps+'</td>'
								+' <td>usb：'+terminalProperty.isUsb+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>彩信功能：'+terminalProperty.isMms+'</td>'
								+' <td>彩色屏色深：'+terminalProperty.colorScreenDepth+'</td>'
								+' <td>3g模式：'+terminalProperty.is3g+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>前摄像头像素：'+terminalProperty.frontCameraPixel+'</td>'
								+' <td>终端品牌：'+terminalProperty.modelName+'</td>'
								+' <td>红外：'+terminalProperty.isIrda+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>操作系统版本：'+terminalProperty.systemVersion+'</td>'
								+' <td>wap支持：'+terminalProperty.isWap+'</td>'
								+' <td>是否智能机：'+terminalProperty.isIntelligent+'</td>'
								+'</tr>'
								+'<tr>'
								+' <td>gprs功能：'+terminalProperty.isGprs+'</td>'
								+' <td></td>'
								+' <td></td>'
								+'</tr>'
								+'</table>'
								+'</div>'
								+'<br /><br />'
								+'<a href="javascript:;" class="big-btn mt-30" onclick="check.reCheck()">重新查询</a>';
						}
						$('.verify-section').append($(str));
					}
			}
			Modal.jsonp(config);
		},
		reCheck : function() {
			$('.breadcrumb>ul li:last').remove();
			$('.verify-section').empty();
			var str = '<input type="text" class="search-common" placeholder="请输入手机IMEI码" />'
					+'<br /><br />'
					+'<a href="javascript:;" class="big-btn mt-30" onclick="check.check()">开始查询</a>';
				$('.verify-section').append($(str));	
		}
		
}


$(function(){
	var li = $('[href="check.html"]').parent();
	li.addClass('on');
	$('.big-btn.mt-30').click(check.check);
});
