/**
 * 新闻列表
 */

News = {
	getNews : function(page){
		/*var config = {
				url : Sys.serviceDomain+"/detailTacTerminalByImei?tac=" + imei, 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						return;
					}
					var content = data.content;
					var list = content.list;
					*/
					$(".store-list ul").empty();
					var list = [{"id":1,"name":"新闻列表1,"+page,"content":"新闻列表展示内容1,"+page},{"id":2,"name":"新闻列表2,"+page,"content":"新闻列表展示内容2,"+page},
						        {"id":3,"name":"新闻列表3,"+page,"content":"新闻列表展示内容3,"+page},{"id":4,"name":"新闻列表4,"+page,"content":"新闻列表展示内容4,"+page},
						        {"id":5,"name":"新闻列表5,"+page,"content":"新闻列表展示内容5,"+page},{"id":6,"name":"新闻列表6,"+page,"content":"新闻列表展示内容6,"+page},
						        {"id":7,"name":"新闻列表7,"+page,"content":"新闻列表展示内容,"+page},{"id":8,"name":"新闻列表7,"+page,"content":"新闻列表展示内容7,"+page},
						        {"id":9,"name":"新闻列表9,"+page,"content":"新闻列表展示内容9,"+page},{"id":10,"name":"新闻列表10,"+page,"content":"新闻列表展示内容10,"+page}];
					var content = {"recordPerPage":10,"currentPage":page,"totalPage":8};
					for(var i=0; i<list.length; i++){
						var item = list[i];
						str = '<li><a href="#" onclick="News.setNewsContent(\''+item.content+'\');">'+item.name+'</a></li>';
						$(".store-list ul").append(str);
					}
					var recordPerPage = content.recordPerPage;
					var totalPage = content.totalPage;
					//初始化分页条
				    $("#pagination").pagination({
				        items: recordPerPage*totalPage,
				        itemsOnPage: 10,
				        cssStyle: 'light-theme',
				        currentPage : page,
				        onPageClick: function(pageNum,event){
				        	News.getNews(pageNum);
				        }
				    });
				    News.setCss();
				    $(".store-list>ul>li:eq(0)").click();
				    $(".store-list>ul>li>a:eq(0)").click();
			/*	}
		}
		Modal.jsonp(config);*/
	},
	setNewsContent : function(content){
		$(".parea").empty();
		$(".parea").append(content);
	},
	setCss : function(){
	    // 门店切换
	    $('.store-list > ul > li').click(function(){
	      $(this).addClass('active').siblings().removeClass('active');
	      $(this).parents('.store-list').siblings('.map-area').animate({'width': '700px'}, 300);
	      $(this).parents('.store-list').siblings('.store-photo').show(300);
	    });
	    $('.store-photo').hover(function(){
	      $(this).animate({'width': '500px'}, 300);
	      $(this).siblings('.map-area').animate({'width': '450px'}, 300);
	    }, function(){
	      $(this).animate({'width': '250px'}, 'fast', function(){
	        if ($(this).css('display') == 'block') {
	          $(this).siblings('.map-area').animate({'width': '700px'}, 'fast');
	        }
	      });
	    });
	    $('.store-photo i.icon-close').click(function(){
	      $(this).parent().hide(300);
	      $(this).parent().siblings('.map-area').animate({'width': '950px'}, 300);
	    });
	}
};
    
$(function(){//初始化分页条
	$("#pagination").pagination({
        items: 40,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
	News.getNews(1);
});