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
						data = '{"msg":{"time":"2015-06-24 16:06:55.449","code":"0000","desc":"成功"},"content":{"list":[{"evaluationId":2,"name":"存储容量（单选)","type":1,"evaluationItemList":[{"evaluationId":2,"itemId":1,"name":"8G","sortOrder":1},{"evaluationId":2,"itemId":3,"name":"32G","sortOrder":2},{"evaluationId":2,"itemId":2,"name":"16G","sortOrder":3},{"evaluationId":2,"itemId":4,"name":"64G","sortOrder":4},{"evaluationId":2,"itemId":5,"name":"128G","sortOrder":5}]},{"evaluationId":3,"name":"颜色（单选)","type":1,"evaluationItemList":[{"evaluationId":3,"itemId":1,"name":"金","sortOrder":1},{"evaluationId":3,"itemId":2,"name":"白","sortOrder":2},{"evaluationId":3,"itemId":3,"name":"黑","sortOrder":3}]},{"evaluationId":4,"name":"保修情况（单选)","type":1,"evaluationItemList":[{"evaluationId":4,"itemId":1,"name":"一个月以上","sortOrder":1},{"evaluationId":4,"itemId":2,"name":"一个月以下或无保修期","sortOrder":2}]},{"evaluationId":6,"name":"维修机拆机史（单选)","type":1,"evaluationItemList":[{"evaluationId":6,"itemId":1,"name":"无拆修","sortOrder":1,"description":"没有维修过"},{"evaluationId":6,"itemId":2,"name":"小拆修","sortOrder":2,"description":"没有维修过主要部件，组装屏"},{"evaluationId":6,"itemId":3,"name":"大拆修","sortOrder":3,"description":"维修过主板、CPU，非原装部件"},{"evaluationId":6,"itemId":4,"name":"报废","sortOrder":4,"description":"内部缺损"}]},{"evaluationId":7,"name":"受潮状况（单选)","type":1,"evaluationItemList":[{"evaluationId":7,"itemId":1,"name":"机身无进水","sortOrder":1},{"evaluationId":7,"itemId":2,"name":"机身进水","sortOrder":2},{"evaluationId":7,"itemId":3,"name":"机身受潮","sortOrder":3}]},{"evaluationId":8,"name":"是否存在故障现象（可多选 ，若无问题，请直接评估下一步）","type":2,"evaluationItemList":[{"evaluationId":8,"itemId":1,"name":"通话不正常","sortOrder":1},{"evaluationId":8,"itemId":2,"name":"触屏不正常","sortOrder":2},{"evaluationId":8,"itemId":3,"name":"充电不正常","sortOrder":3},{"evaluationId":8,"itemId":4,"name":"WIFI不正常","sortOrder":4},{"evaluationId":8,"itemId":5,"name":"按键不正常","sortOrder":5},{"evaluationId":8,"itemId":6,"name":"蓝牙不正常","sortOrder":6},{"evaluationId":8,"itemId":7,"name":"GPS不正常","sortOrder":7},{"evaluationId":8,"itemId":8,"name":"无法开机","sortOrder":8},{"evaluationId":8,"itemId":9,"name":"iCloud已绑定并无法解除","sortOrder":9},{"evaluationId":8,"itemId":10,"name":"指纹功能不正常","sortOrder":10},{"evaluationId":8,"itemId":11,"name":"机身变形","sortOrder":11}]},{"evaluationId":9,"name":"屏幕显示（单选)","type":1,"evaluationItemList":[{"evaluationId":9,"itemId":1,"name":"显示正常","sortOrder":1,"description":"显示完好"},{"evaluationId":9,"itemId":2,"name":"有亮点/斑点/坏点","sortOrder":2,"description":"纯色背景下显示有小白斑或小黑斑"},{"evaluationId":9,"itemId":3,"name":"屏幕色差","sortOrder":3,"description":"在纯色背景下显示颜色有深浅"},{"evaluationId":9,"itemId":4,"name":"无法正常显示","sortOrder":4,"description":"液晶屏坏、无法显示、屏幕漏液"}]},{"evaluationId":10,"name":"屏幕外观（单选)","type":1,"evaluationItemList":[{"evaluationId":10,"itemId":1,"name":"屏幕无划痕","sortOrder":1,"description":"保护很好，一直贴膜"},{"evaluationId":10,"itemId":2,"name":"屏幕有划痕","sortOrder":2,"description":"有划痕"},{"evaluationId":10,"itemId":3,"name":"磕碰缺角","sortOrder":3,"description":"屏幕边缘有小缺口"},{"evaluationId":10,"itemId":4,"name":"碎裂/内屏破损","sortOrder":4,"description":"屏幕有裂痕/整块碎裂/大块缺角等"}]}]}}';
						data = JSON.parse(data);
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$('#wizard_ul').empty();
						var str = '';
						var list = content.list;
						for (var i = 1; i < list.length+1; i++) {
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
								+'<a href="#step-'+list[i-1].evaluationId+'"><strong>'+i+'.</strong>第'+stepStr+'步</a>'
								+'</li>';
							$('#wizard_ul').append($(str));
						}
						$('.page').remove();
						
						for (var j = 0; j <list.length; j++) {
							
							var str = '<div id="step-'+list[j].evaluationId+'" class="page">' 
								     +'<dl>';
							if(j==0){
								str = str +'<dt class="property_title first">'
								 +'<span class="square"><span class="gou"></span></span>'
							     +'<h3>'+list[j].name+'</h3>'
							     +'</dt>';
							     if(list[j].type==1){
							    	 str = str +'<dd name="radio" class="first">'
							    	 +'<ul>';
							     }else{
							    	 str = str +'<dd class="first">'
							    	 +'<ul>';
							     }
							     
							    
							}else{
								str = str +'<dt class="property_title">'
								 +'<span class="square"><span class="gou"></span></span>'
							     +'<h3>'+list[j].name+'</h3>'
							     +'</dt>'
							     if(list[j].type==1){
							    	 str = str +'<dd name="radio">'
							    	 +'<ul>';
							     }else{
							    	 str = str +'<dd>'
								     +'<ul>';
							     }
							    
							}
							var evaluationItemList = list[j].evaluationItemList;
							for(var k=0;k<evaluationItemList.length;k++){
								if((k+1)%4==0){
									str = str +'<li data-id="'+evaluationItemList[k].itemId+'" class="oneline last">'
								     +'<span class="property_value">'+evaluationItemList[k].name+'</span>'
								    // +'<span class="property_detail">有“进网许可”标签</span>'
								     +'<span class="gou"></span>'                
								     +'</li>';
								}else{
									str = str +'<li data-id="'+evaluationItemList[k].itemId+'" class="oneline">'
								     +'<span class="property_value">'+evaluationItemList[k].name+'</span>'
								    // +'<span class="property_detail">有“进网许可”标签</span>'
								     +'<span class="gou"></span>'                
								     +'</li>';
								}
								
							}
							str = str +'</ul>'
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
	//pcInit();
})