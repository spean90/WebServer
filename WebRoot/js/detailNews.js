var detailNews = {
		initNews : function() {
			var config = {
					url : Sys.serviceDomain+"/detailOneNews?newsId="+$('#newsId').text(), 
					callbackParameter: "callback",
					success : function(data){ 
						if (data.msg.code!="0000") {
							return;
						}
						var content = data.content;
						$('.title').html(content.newsTitle);
						$('#time').html(content.addedDate);
						$('#content').html(content.newsText);
					}
			}
			Modal.jsonp(config);
		},
		nextNews : function() {
			var newsId = parseInt($('#newsId').text());
			newsId += 1;
			window.location.href='/detailNews_'+newsId+".html";
		},
		preNews : function() {
			var newsId = parseInt($('#newsId').text())
			newsId -= 1;
			if(newsId<1){
				Modal.alert('已经是第一条了');
				return;
			}
			window.location.href='/detailNews_'+newsId+".html";
		}

		
}

$(function(){
	detailNews.initNews();
})