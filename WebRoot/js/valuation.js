var valuation = {
		init : function(){
			$('.valuation').empty();
			//获取手机回收信息
			var config = {
					url : Sys.serviceDomain+"/detailOneModels?modelsId="+$('#modelsId').text(),
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$('.valuation').empty();
						var str = '<div class="container clearfix">'
								  +'<div class="left">'
								  +'<img id="pic" src="'+content.modelsImage+'" alt="iPhone 4S" title="iPhone 4S">'
								  +'<h2 class="product_name">'+content.modelsName+'</h2>'
								  +'</div>'
								  +'<div class="right">'
								  +'<ul>'
								  +'<li>'
								  +'<div>'+content.recycleCount+'</div>'
								  +'<span>本月回收次数</span>'
								  +'</li>'
								  +'<li>'
								  +'<div>'+content.recyclePrice+'</div>'
								  +'<span>本月回收均价/元</span>'
								  +'</li>'
								  +'</ul>'				
								  +'</div>'				
								  +'</div>';
						$('.valuation').append($(str));
						var historyRecord = localStorage.historyRecord;
						if(historyRecord =='undefined' || historyRecord==null){
							historyRecord = [];
						}else{
							historyRecord = JSON.parse(historyRecord);
						}
						var record ={};
						record.src = content.modelsImage;
						record.modelsId = $('#modelsId').text();
						var isIn = false;
						for(var i=0;i<historyRecord.length;i++) {
							if(historyRecord[i].modelsId==record.modelsId){
								isIn = true;
								break;
							}
						}
						if(!isIn){
							if(historyRecord.length<4){
								historyRecord.push(record);
							}else{
								historyRecord.shift();
								historyRecord.push(record);
							}
						}
						//historyRecord.push(record);
						historyRecord = JSON.stringify(historyRecord);
						localStorage.historyRecord = historyRecord;
					}
			}
			Modal.jsonp(config);
			
			//获取步骤信息
			var config2 = {
					//url : Sys.serviceDomain+"/detailModel?modelsId="+$('#modelsId').text(),
					url : Sys.serviceDomain+"/listAllEvaluation?modelsId="+$('#modelsId').text()+"&cityId=1",
					callbackParameter: "callback",
					success : function(data){ 
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
								+'<a href="#step-'+i+'"><strong>'+i+'.</strong>第'+stepStr+'步</a>'
								+'</li>';
							$('#wizard_ul').append($(str));
						}
						$('.page').remove();
						
						for (var j = 0; j <list.length; j++) {
							
							var str = '<div id="step-'+(j+1)+'" data-step="'+list[j].evaluationId+'" class="page">' 
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