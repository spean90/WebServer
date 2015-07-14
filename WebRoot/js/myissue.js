/*
 * 我的咨询
 */
var myissue = {
	/*获取我的咨询*/
	getMyIssueByPage : function(page) {
		if(sessionStorage.token==null){
			window.location.href = '/login.html';
			return;
		}
		$('.my-consult').html('<em style="font-style:normal;color:#FF2F2F">加载中...</em>');
		var config = {
			url : Sys.serviceDomain + "/listOwnAsk?key=" + sessionStorage.token + "&recordPerPage=5&currentPage="+page,
			callbackParameter : "callback",
			success : function(data) {
				$('.my-consult').empty();
				if (data.msg.code != "0000") {
					var html = '<div>查询出错了，请稍后重试！</div>';
					$('.my-consult').append(html);
					$("#adviceBtn").click(function(){
						$(this).modal('/feedback.html', '反馈')
					});
				}else{
					var content = data.content;
					var list = content.list;
					$('.my-consult').empty();
					//还未有过咨询
					if(list.length==0){
						var html = '<div>您还没有任何咨询！</div>' + 
								'<div>您可以在此给我们留言，我们会在第一时间为您解答！<a style="color: red" id="adviceBtn" href="javascript:void(0);">点此进行咨询或建议</a></div>';
						$('.my-consult').append(html);
						$("#adviceBtn").click(function(){
							$(this).modal('/feedback.html', '反馈')
						});
						return;
					}
					var str = '';
					for(var i=0; i<list.length; i++){
						str = '<div class="consult-title">'+
						      '<i class="icon-question"></i>&nbsp;' + list[i].title +
						      '<span class="date-time">' + list[i].askTime + '</span>' +
						      '</div>'+
						      '<p>' + list[i].askText + '</p>' +
						      '<div class="consult-attach">';
						if(list[i].attachment!=undefined){
							str += '<span class="cor-gary">附件</span>　 <img src="'+list[i].attachment+'" height="120" width="120" />　 <a href="'+list[i].attachment+'" class="btn-gray"><i class="icon-download"></i> 下载</a>';
						}     
						str += '</div>'+
						      '<div class="consult-box" id="cb_'+list[i].askId+'">';
							var replyList = list[i].replyList;
							if(replyList.length==0){
								str = str + '<p>暂无回复</p>';
							}
							var name = '';
							for(var j=0; j<replyList.length; j++){
								if(replyList[j].isCustomer==0){
									name = '我';
								}else{
									name = '壹回收';
								}
								str = str + '<p>'+
						        	'<span class="c-black">' + name + '：</span>'+ replyList[j].replyContent +
						        	'<span class="date-time">' + replyList[j].replyDate + '</span>'+
						        	'</p>';
							}
							str = str + '</div>';
							if(list[i].askType==1){//是否已经关闭回复，若已经关闭，则不可再回复list[i].isClosed==1 && 
							    str = str + '<div class="consult-comment">' +
							      '<span class="c-black">我：</span>' +
							      '<textarea id="rc_'+list[i].askId+'" placeholder="您可以在此给我们留言，我们会在第一时间为您解答！"></textarea>' +
							    '</div>' +
							    '<div class="tx-cen">' +
							      '<input type="button" class="oran-btn" value="回 复" onclick="myissue.addMyReply('+list[i].askId+');"/>' +
							    '</div>';
							}
						$('.my-consult').append(str);
					}
					var html = '' + 
					    '<div id="pagination" class="page"></div><br />';
					$('.my-consult').append(html);
					var recordPerPage = content.recordPerPage;
					var totalPage = content.totalPage;
					//初始化分页条
				    $("#pagination").pagination({
				        items: recordPerPage*totalPage,
				        itemsOnPage: 5,
				        cssStyle: 'light-theme',
				        currentPage : page,
				        onPageClick: function(pageNum,event){
				        	myissue.getMyIssueByPage(pageNum);
				        }
				    });
				}
			}
		}
		Modal.jsonp(config);
	},
	/*提交我的回复*/
	addMyReply : function(askId){
		var replyContent = $("#rc_"+askId).val();
		if(replyContent==''){
			Modal.alert("回复内容不可为空！");
			return;
		}
		var config = {
				url : Sys.serviceDomain+"/addMyReply?key="+sessionStorage.token+"&replyContent="+replyContent+"&askId="+askId, 
				callbackParameter: "callback",
				success : function(data){ 
					if (data.msg.code!="0000") {
						Modal.alert("回复失败，请稍后重试！" + data.msg.desc);
						return;
					}
					Modal.alert("回复成功!");
					//拼接刚刚的回复到页面上
					var myreply_html = '<p><span class="c-black">我：</span>' + replyContent 
					+ '<span class="date-time">刚刚</span></p>';
					$("#cb_"+askId).append(myreply_html);
					$("#rc_"+askId).val('');
					//window.location.href = "/myissue.html";
				}
		}
		Modal.jsonp(config);
	}
};

$(function() {
	myissue.getMyIssueByPage(1);
});