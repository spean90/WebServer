var valuation = {
		init : function(){
			//获取手机回收信息
			var config = {
					//url : Sys.serviceDomain+"/detailModel?modelsId="+$('#modelsId').text(),
					url : Sys.serviceDomain+"/listHotBrands?recordPerPage=17",
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$('.valuation').empty();
						var str = '<div class="container clearfix">'
								  +'<div class="left">'
								  +'<img src="images/phone.png" alt="iPhone 4S" title="iPhone 4S">'
								  +'<h2 class="product_name">iPhone 4S</h2>'
								  +'</div>'
								  +'<div class="right">'
								  +'<ul>'
								  +'<li>'
								  +'<div>11772</div>'
								  +'<span>本月回收次数</span>'
								  +'</li>'
								  +'<li>'
								  +'<div>740</div>'
								  +'<span>本月回收均价/元</span>'
								  +'</li>'
								  +'</ul>'				
								  +'</div>'				
								  +'</div>';
						$('.valuation').append($(str));
					}
			}
			Modal.jsonp(config);
			
			//获取步骤信息
			var config2 = {
					//url : Sys.serviceDomain+"/detailModel?modelsId="+$('#modelsId').text(),
					url : Sys.serviceDomain+"/listHotBrands?recordPerPage=17",
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$('#wizard_ul').empty();
						var str = '';
						var list = content.list;
						for (var i = 1; i < 3; i++) {
							var stepStr = '一';
							switch(i){
							case 1:
								stepStr = '一';
								break;
							case 2:
								stepStr = '二';
								break;
							case 3:
								stepStr = '三';
								break;
							case 4:
								stepStr = '四';
								break;
							case 5:
								stepStr = '五';
								break;
							case 6:
								stepStr = '六';
								break;
							case 7:
								stepStr = '七';
								break;
							case 8:
								stepStr = '八';
								break;
							case 9:
								stepStr = '九';
								break;
							case 10:
								stepStr = '十';
								break;
							default :
								stepStr = i;
							}
							str = '<li>'
								+'<a href="#step-'+i+'"><strong>'+i+'.</strong>第'+stepStr+'步</a>'
								+'</li>';
							$('#wizard_ul').append($(str));
						}
						$('.page').remove();
						for (var j = 1; j < 3; j++) {
							var str = '<div id="step-'+j+'" class="page">' 
								     +'<dl>'
								     +'<dt class="property_title first">'
								     +'<span class="square"><span class="gou"></span></span>'
								     +'<h3>购买渠道</h3>'
								     +'</dt>'
								     +'<dd class="first" >'
								     +'<ul>'
								     +'<li data-id="1" class="  ">'
								     +'<span class="property_value">大陆国行</span>'
								     +'<span class="property_detail">有“进网许可”标签</span>'
								     +'<span class="gou"></span>'                
								     +'</li>'
								     +'<li data-id="2" class="  ">'
								     +'<span class="property_value">香港行货</span>'
								     +'<span class="property_detail">香港购买，全球联保</span>'
								     +'<span class="gou"></span>'                
								     +'</li>'
								     +'<li data-id="3" class="  ">'
								     +'<span class="property_value">水货有锁</span>'
								     +'<span class="property_detail">日/韩/美等非特殊机，需要“卡贴”解锁</span>'
								     +'<span class="gou"></span>'                
								     +'</li>'
								     +'<li data-id="4" class="  ">'
								     +'<span class="property_value">水货无锁</span>'
								     +'<span class="property_detail">非国行/港行，其他国家</span>'
								     +'<span class="gou"></span>'                
								     +'</li>'
								     +'</ul>'
								     +'</dd>'
								     +'</dl>'
								     +'</div>';
							$('#wizard').append($(str));
						}
						
						pcInit();
					}
			}
			Modal.jsonp(config2);
			
		}
}

$(function(){
	valuation.init();
})