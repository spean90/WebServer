$(function() {
	//搜索框

	//头部鼠标经过
	var $dd = $("#TopBar").find(".drop-down");
  var $li = $('.brand-list').find("li a"),
		$fh = $("#fristHover"),
		$sBtn=$("#sBtn");
	$dd.hover(function() {
		var $this = $(this);
		$this.addClass("hover")
	}, function() {
		var $this = $(this);
		$this.removeClass("hover")
	});
  $li.hover(function() {
    var $this = $(this);
    $this.addClass("hover")
  }, function() {
    var $this = $(this);
    $this.removeClass("hover")
  });
	$fh.hover(function() {
		var $this = $(this);
		$this.addClass("hover")
	}, function() {
		var $this = $(this);
		$this.removeClass("hover")
	});
	$sBtn.hover(function() {
		var $this = $(this);
		$this.addClass("header-btn-2-hover")
	}, function() {
		var $this = $(this);
		$this.removeClass("header-btn-2-hover")
	})

  //导航
  $select = $('.nav-box').find('.nav li');
  $select.click(function(){
    $(this).siblings().removeClass('on');
    $(this).addClass('on');
  })
})

	
	 function phoneList(){
		
		var $list= $(".phone-list"),$li=$list.find("li");
		
		for(var i=0 ; i < $li.length ; i++){
			$li.eq(i).append("<div class=\"trend-box\"><h4>"+"Phone4（黑/白）"+"</h4><div class=\"chart-box\"><canvas id=\"chart" + i +"\" style=\"z-index: 1000\"></canvas></div></div>");
			}
		
		$li.hover(function () {
			var $this = $(this),
				// $btn = $this.find(".phone-btn"),
				// priceTxt = "回收价"+"<em>￥"+ $btn.attr("data-price")+"</em>",
				$icon=$this.find(".trend-icon"),
				$trendBox=$this.find(".trend-box"),
				$chartBox=$this.find(".chart-box");
			
		
			// $btn.html(priceTxt);

      //修改click事件为mouseover
			$icon.mouseover(function(){
					$trendBox.show();
					var idTxt= $(this).parent().find("canvas").attr("id"),
					 ctx = document.getElementById(idTxt).getContext("2d"),
					 datalebel= $(this).parent().attr("data-label").split(","),
					 datadata= $(this).parent().attr("data-data").split(",");

					var myLineChart = new Chart(ctx).Line({
			labels : datalebel,
			datasets : [{
					fillColor : "rgba(253,245,211,0.9)",
					strokeColor : "rgba(252,223,112,1)",
					pointColor : "rgba(252,223,112,1)",
					pointStrokeColor : "#fff",
					data : datadata
				}]
			}, {responsive: true});
				})
			},function(){
			var $this = $(this),
				// $btn = $this.find(".phone-btn"),
				// numberTxt = "<em>"+ $btn.attr("data-number")+"</em>人回收",
				$icon=$this.find(".trend-icon"),
				$trendBox=$this.find(".trend-box");
			
		
			$trendBox.hide();
			// $btn.html(numberTxt);
			})
		}

$(document).ready(function() {
	 cTab({ tabHandleList: "#tabHandle > a", tabBodyList: "#tabMain > li", isAutoPlay: { time: 3000 }, bind: "mouseover", tabOnCssList: "#tabHandle > a", tabOnCssName: "on" });
	cTab({tabHandleList:"#tabHandle1 > li",tabBodyList:"#tabMain1 > .service-con",bind:"mouseover",tabOnCssList:"#tabHandle1 > li",tabOnCssName:"on"});
	cTab({tabHandleList:"#tabHandle2 > li",tabBodyList:"#tabMain2 > .index-con",bind:"mouseover",tabOnCssList:"#tabHandle2 > li",tabOnCssName:"on"});
	
	

    function scrollTop(){
      var tophtml="<div id=\"izl_rmenu\" class=\"izl-rmenu\"><a href=\"tencent://Message/?Uin=349614193&websiteName=sc.chinaz.com=&Menu=yes\" class=\"btn btn-qq\"><div class=\"kefu\">在线客服<i class=\"arrow-right\"></i></div></a><div class=\"btn btn-edit\"><div class=\"edit\">意见反馈<i class=\"arrow-right\"></i></div></div><div class=\"btn btn-help\"></div><div class=\"btn btn-top\"><div class=\"gotop\">返回顶部<i class=\"arrow-right\"></i></div></div></div>";
        $("#top").html(tophtml);
        $("#izl_rmenu").each(function(){
          // $(this).find(".btn-edit").mouseenter(function(){
          //   $(this).find(".pic").fadeIn("fast");
          // });
          // $(this).find(".btn-edit").mouseleave(function(){
          //   $(this).find(".pic").fadeOut("fast");
          // });

          $(this).find(".btn").mouseenter(function(){
            $(this).children('div').fadeIn("fast");
            // $(this).find(".edit")
          });
          $(this).find(".btn").mouseleave(function(){
            $(this).children('div').fadeOut("fast");
          });
          $(this).find(".btn-top").click(function(){
            $("html, body").animate({
              "scroll-top":0
            },"fast");
          });
        });
        var lastRmenuStatus=false;
        $(window).scroll(function(){//bug
          var _top=$(window).scrollTop();
          if(_top>200){
            $("#izl_rmenu").data("expanded",true);
          }else{
            $("#izl_rmenu").data("expanded",false);
          }
          if($("#izl_rmenu").data("expanded")!=lastRmenuStatus){
            lastRmenuStatus=$("#izl_rmenu").data("expanded");
            if(lastRmenuStatus){
              $("#izl_rmenu .btn-top").slideDown();
            }else{
              $("#izl_rmenu .btn-top").slideUp();
            }
          }
        });
    }

      function paginaton(){
         $("#pagination").pagination({
        items: 100,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
        });
      }
      function filter(){
        $('.listIndex').find('dd a').click(function(){
          $('.listIndex').find('dd a').removeClass('selected');
          $(this).addClass('selected');
         var search_word = $(this).children('span').text();
         $('.resultList .select').text(search_word+'：');
         $('.resultList').show();
         
        })
      }
    //   function getBrandMobile(search_word) {
    //     $.ajax({
    //         type: 'GET',
    //         url: "/json",
    //         dataType: "json",
    //         success: respgetCategoryCode,
    //         timeout: 3000, 
    //         data: {
    //             code: 
    //         }
    //     });
    // }
	phoneList();
  scrollTop();
  paginaton();
  filter();
})