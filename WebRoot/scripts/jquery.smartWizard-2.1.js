/*
 * SmartWizard 2.0 plugin
 * jQuery Wizard control Plugin
 * by Dipu 
 * 
 * http://www.techlaboratory.net 
 * http://tech-laboratory.blogspot.com
 */
(function($){
    $.fn.smartWizard = function(action) {
        var options = $.extend({}, $.fn.smartWizard.defaults, action);
        var args = arguments;

        return this.each(function(){
                var obj = $(this);
                var curStepIdx = options.selected;
                var steps = $("ul > li > a", obj); // Get all anchors in this array
                var contentWidth = 0;
                var loader,msgBox,elmActionBar,elmStepContainer,btNext,btPrevious,btFinish,btReturn;
                elmActionBar = $('.actionBar',obj);
                if(elmActionBar.length == 0){
                  elmActionBar = $('<div></div>').addClass("actionBar");                
                }

                msgBox = $('.msgBox',obj);
                if(msgBox.length == 0){
                  msgBox = $('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>');
                  elmActionBar.append(msgBox);                
                }
                
                $('.close',msgBox).click(function() {
                    msgBox.fadeOut("normal");
                    return false;
                });

                // Method calling logic
                if (!action || action === 'init' || typeof action === 'object') {
                  init();
                }else if (action === 'showMessage') {
                  //showMessage(Array.prototype.slice.call( args, 1 ));
                  var ar =  Array.prototype.slice.call( args, 1 );
                  showMessage(ar[0]);
                  return true;
                }else if (action === 'setError') {
                  var ar =  Array.prototype.slice.call( args, 1 );
                  setError(ar[0].stepnum,ar[0].iserror);
                  return true;
                }else if (action === 'skipTo') {
                	/*
                	 * create by zhushukai
                	 * 增加跳转动作,参数传需要跳转到的步骤数字
                	 * $('#yourId').smartWizard('skipTo',2);跳转到第二步
                	 */
                   
                   var ar =  Array.prototype.slice.call( args, 1 );
                   steps.eq(ar[0]-1).click();
  
                   return true;
                } else {
                  $.error( 'Method ' +  action + ' does not exist' );
                }
                
                function init(){
                  var allDivs =obj.children('div'); //$("div", obj);                
                  obj.children('ul').addClass("anchor");
                  allDivs.addClass("content");
                  // Create Elements
                  loader = $('<div>Loading</div>').addClass("loader");
                  elmActionBar = $('<div></div>').addClass("actionBar");
                  elmStepContainer = $('<div></div>').addClass("stepContainer");
                  btNext = $('<a>'+options.labelNext+'</a>').attr("href","#").addClass("buttonNext");
                  btPrevious = $('<a>'+options.labelPrevious+'</a>').attr("href","#").addClass("buttonPrevious");
                  btFinish = $('<a>'+options.labelFinish+'</a>').attr("href","#").addClass("buttonFinish");
                  if(options.labelReturn!=null){
                 	 btReturn=$("<a>"+options.labelReturn+'</a>').attr("href","#").addClass("buttonReturn");
                  }
                  // highlight steps with errors
                  
                  if(options.errorSteps && options.errorSteps.length>0){
                    $.each(options.errorSteps, function(i, n){
                      setError(n,true);
                    });
                  }
                  
                  elmStepContainer.append(allDivs);
                  elmActionBar.append(loader);
                  obj.append(elmStepContainer);
                  obj.append(elmActionBar); 
                  elmActionBar.append(btFinish).append(btNext).append(btPrevious).append(btReturn); 
                  contentWidth = elmStepContainer.width();

                  $(btNext).click(function() {
                      doForwardProgress();
                      return false;
                  }); 

                  
                  
                  $(btPrevious).click(function() {
                	  if($.isFunction(options.onPreviousStep)){
                		  if(options.onPreviousStep.call(this,$(steps.eq(curStepIdx), obj))){
                			  doBackwardProgress();
                		  }
                	  }
                      return false;
                  }); 
                  if(btReturn!=null){
	                  $(btReturn).click(function(){
	                  	if($.isFunction(options.onReturnStep)) {
	                        options.onReturnStep.call(this);
	                        doFirstProgress();
	                      }
	                  	return false;
	                  });
                  }
                  $(btFinish).click(function() {
                      if(!$(this).hasClass('buttonDisabled')){
                         if($.isFunction(options.onFinish)) {
                            if(!options.onFinish.call(this,$(steps))){
                              return false;
                            }
                         }else{
                           var frm = obj.parents('form');
                           if(frm && frm.length){
                             frm.submit();
                           }                         
                         }                      
                      }

                      return false;
                  }); 
                  


                  $(steps).bind("click", function(e){
                      
                      if(steps.index(this) == curStepIdx){
                        return false;                    
                      }
                     
                      var nextStepIdx = steps.index(this);
                      var isDone = steps.eq(nextStepIdx).attr("isDone") - 0;
                      if(isDone == 1){
                      	 //进入下一步前 回调onNextStep的函数
	                 	  if($.isFunction(options.onNextStep)&&nextStepIdx>curStepIdx) {
	                      	  if(!options.onNextStep.call(this,$(steps.eq(curStepIdx), obj))){
		                        return false;
		                      }else{
		                      	LoadContent(nextStepIdx);
		                      }
	                 	  }
                      else{
	                      		LoadContent(nextStepIdx);
	                      }
                                           
                      }
                      return false;
                  }); 
                  
                  // Enable keyboard navigation                 
                  if(options.keyNavigation){
                      $(document).keyup(function(e){
                          if(e.which==39){ // Right Arrow
                            doForwardProgress();
                          }else if(e.which==37){ // Left Arrow
                            doBackwardProgress();
                          }
                      });
                  }
                  //  Prepare the steps
                  prepareSteps();
                  // Show the first slected step
                  LoadContent(curStepIdx);                  
                }

                function prepareSteps(){
                  if(!options.enableAllSteps){
                    $(steps, obj).removeClass("selected").removeClass("done").addClass("disabled"); 
                    $(steps, obj).attr("isDone",0);                 
                  }else{
                    $(steps, obj).removeClass("selected").removeClass("disabled").addClass("done"); 
                    $(steps, obj).attr("isDone",1); 
                  }

            	    $(steps, obj).each(function(i){
                        $($(this).attr("href"), obj).hide();
                        $(this).attr("rel",i+1);
                  });
                }
                
                function LoadContent(stepIdx){
                    var selStep = steps.eq(stepIdx);
                    var ajaxurl = options.contentURL;
                    var hasContent =  selStep.data('hasContent');
                    stepNum = stepIdx+1;
                    if(ajaxurl && ajaxurl.length>0){
                       if(options.contentCache && hasContent){
                           showStep(stepIdx);                          
                       }else{
                           $.ajax({
                            url: ajaxurl,
                            type: "POST",
                            data: ({step_number : stepNum}),
                            dataType: "text",
                            beforeSend: function(){ loader.show(); },
                            error: function(){loader.hide();},
                            success: function(res){ 
                              loader.hide();       
                              if(res && res.length>0){  
                                 selStep.data('hasContent',true);            
                                 $($(selStep, obj).attr("href"), obj).html(res);
                                 showStep(stepIdx);
                              }
                            }
                          }); 
                      }
                    }else{
                      showStep(stepIdx);
                    }
                }
                
                function showStep(stepIdx){
                    var selStep = steps.eq(stepIdx); 
                    var prevStep = steps.eq(stepIdx+1);
                    var curStep = steps.eq(curStepIdx);
                    var nextStep =steps.eq(stepIdx-1);
                    if(stepIdx != curStepIdx){
                      if($.isFunction(options.onLeaveStep)) {
                        if(!options.onLeaveStep.call(this,$(curStep))){
                          return false;
                        }
                      }
                    }                 
                    if(options.transitionEffect == 'slideUp'){
                        var top = $($(selStep, obj).attr("href"), obj).outerHeight();
                        var top1= 0;
                        var top2 = 0-$($(selStep, obj).attr("href"), obj).outerHeight();

                        $($(prevStep, obj).attr("href"), obj).nextAll().animate({
                          top: top*2
                        }, 300);
                        $($(selStep, obj).attr("href"), obj).prevAll().animate({
                          top: top2
                        }, 300);
                        
                         $($(prevStep, obj).attr("href"), obj).animate({top: top  }, 300,function(e){
                            $($(prevStep, obj).attr("href"), obj).show();
                            });
                          
                    
                        $($(selStep, obj).attr("href"), obj).animate({top:top1},300,function(e){
                            $($(selStep, obj).attr("href"), obj).show();
                            curStepIdx =  stepIdx;
                            SetupStep(curStep,selStep);                      
                            });
                    }
                     else{
                    	//ie7不支持
                       $($(curStep, obj).attr("href"), obj).hide(); 
                       $($(selStep, obj).attr("href"), obj).show();
                        curStepIdx =  stepIdx;                        
                        SetupStep(curStep,selStep);
                    }
                    return true;
                }
                
                function SetupStep(curStep,selStep){

               
                   adjustButton();
                   if($.isFunction(options.onShowStep)) {
                      if(!options.onShowStep.call(this,$(selStep))){
                        return false;
                      }
                   } 
                }                
               //跳转到第一步
              function doFirstProgress() {

				var stepIdx = 0;
				var selStep = steps.eq(stepIdx);
				stepNum = stepIdx + 1;
				var selStep = steps.eq(stepIdx);
				var curStep = steps.eq(curStepIdx);

				$($(curStep, obj).attr("href"), obj).hide();
				$($(selStep, obj).attr("href"), obj).show();
				curStepIdx = stepIdx;
				for(var i=0;i<steps.length;i++){
					if(i!=stepIdx){
					$(steps.eq(i), obj).removeClass("selected");
					$(steps.eq(i), obj).removeClass("done");
					$(steps.eq(i), obj).attr("isDone", 0);
					$(steps.eq(i), obj).addClass("disabled");
					}
				}

				adjustButton();

			}
                function doForwardProgress(){

                  var nextStepIdx = curStepIdx + 1;
                  if(steps.length <= nextStepIdx){
                    if(!options.cycleSteps){
                      return false;
                    }                  
                    nextStepIdx = 0;
                  }
                  //进入下一步前 回调onNextStep的函数
                  if($.isFunction(options.onNextStep)) {
                      if(!options.onNextStep.call(this,$(steps.eq(curStepIdx), obj))){
                        return false;
                      }else{
                      	LoadContent(nextStepIdx);
                      }
                   }else{//没有onNextStep回调函数 直接执行加载页面
                   		LoadContent(nextStepIdx);
                   }
                  
                   
                  
                }
                
                function doBackwardProgress(){
                  var nextStepIdx = curStepIdx-1;
                  if(0 > nextStepIdx){
                    if(!options.cycleSteps){
                      return false;
                    }
                    nextStepIdx = steps.length - 1;
                  }
                  LoadContent(nextStepIdx);
                
                 
                }  
                
                function adjustButton(){
                  if(!options.cycleSteps){                
                    if(0 >= curStepIdx){
                      $(btPrevious).addClass("buttonDisabled");
                    }else{
                      $(btPrevious).removeClass("buttonDisabled");
                    }
                    if((steps.length-1) <= curStepIdx){
                      $(btNext).addClass("buttonDisabled").hide();
                    }else{
                      $(btNext).removeClass("buttonDisabled").show();
                    }
                  }
                  // Finish Button 
                  if(!steps.hasClass('disabled') || options.enableFinishButton){
                    $(btFinish).removeClass("buttonDisabled");
                  }else{
                    $(btFinish).addClass("buttonDisabled");
                  }
                  
                  if(options.enableFinishButtonOnlyLastStep){
                  	if((steps.length-1) <= curStepIdx){
                      $(btFinish).removeClass("buttonDisabled");
                    }else{
                      $(btFinish).addClass("buttonDisabled");
                    }
                  }
                }
                
                function showMessage(msg){
                  $('.content',msgBox).html(msg);
              		msgBox.show();
                }
                
                function setError(stepnum,iserror){
                  if(iserror){                    
                    $(steps.eq(stepnum-1), obj).addClass('error')
                  }else{
                    $(steps.eq(stepnum-1), obj).removeClass("error");
                  }                                   
                }                        
        });  
    };  
 
    // Default Properties and Events
    $.fn.smartWizard.defaults = {
          selected: 0,  // Selected Step, 0 = first step   
          keyNavigation: true, // Enable/Disable key navigation(left and right keys are used if enabled)
          enableAllSteps: false,
          transitionEffect: 'fade', // Effect on navigation, none/fade/slide/slideleft
          contentURL:null, // content url, Enables Ajax content loading
          contentCache:true, // cache step contents, if false content is fetched always from ajax url
          cycleSteps: false, // cycle step navigation
          enableFinishButton: false, // make finish button enabled always
          enableFinishButtonOnlyLastStep: false, // make finish button enabled only last step
          errorSteps:[],    // Array Steps with errors
          labelNext:'下一步', 
		      labelPrevious:'上一步',
		      labelFinish:'立即询价',
          labelReturn:null,
          onPreviousStep : null,
          onLeaveStep: null, // triggers when leaving a step
          onShowStep: null,  // triggers when showing a step
          onFinish: null,  // triggers when Finish button is clicked
          onReturnStep:null,//labelReturn 点击时触发回调函数
          onNextStep:null//点击下一步时 触发回调函数
    };    
    
})(jQuery);